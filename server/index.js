
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;
const DATA_DIR = path.join(__dirname, "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json");

const tokens = new Map();

app.use(express.json({ limit: "1mb" }));
app.use(cors());

const ensureFile = async (filePath, fallback) => {
  try {
    await fs.access(filePath);
  } catch (error) {
    await fs.writeFile(filePath, JSON.stringify(fallback, null, 2));
  }
};

const readJson = async (filePath, fallback) => {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
};

const writeJson = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

const hashPassword = (password, salt = crypto.randomBytes(16).toString("hex")) => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");

  return { salt, hash };
};

const verifyPassword = (password, salt, hash) => {
  const hashed = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512");
  const stored = Buffer.from(hash, "hex");

  if (stored.length !== hashed.length) {
    return false;
  }

  return crypto.timingSafeEqual(stored, hashed);
};

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
const isValidMobile = (mobile) => /^\d{10}$/.test(mobile);

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  mobile: user.mobile,
  createdAt: user.createdAt
});

const createToken = () => crypto.randomBytes(32).toString("hex");

const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token || !tokens.has(token)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.userId = tokens.get(token);
  return next();
};

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/auth/register", async (req, res) => {
  const { name, email, mobile, password } = req.body || {};

  if (!name || name.trim().length < 3) {
    return res.status(400).json({ error: "Name must be at least 3 characters" });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: "Please provide a valid email" });
  }

  if (!mobile || !isValidMobile(mobile)) {
    return res.status(400).json({ error: "Mobile must be 10 digits" });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  const users = await readJson(USERS_FILE, []);
  const exists = users.find((user) => user.email.toLowerCase() === email.toLowerCase());

  if (exists) {
    return res.status(409).json({ error: "Email already registered" });
  }

  const { salt, hash } = hashPassword(password);
  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    mobile,
    passwordHash: hash,
    passwordSalt: salt,
    createdAt: new Date().toISOString()
  };

  users.push(user);
  await writeJson(USERS_FILE, users);

  const token = createToken();
  tokens.set(token, user.id);

  return res.status(201).json({
    message: "Registration successful",
    token,
    user: sanitizeUser(user)
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: "Please provide a valid email" });
  }

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  const users = await readJson(USERS_FILE, []);
  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const isValid = verifyPassword(password, user.passwordSalt, user.passwordHash);

  if (!isValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = createToken();
  tokens.set(token, user.id);

  return res.json({
    message: "Login successful",
    token,
    user: sanitizeUser(user)
  });
});

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  const users = await readJson(USERS_FILE, []);
  const user = users.find((item) => item.id === req.userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json({ user: sanitizeUser(user) });
});

app.post("/api/contact", async (req, res) => {
  const { name, email, company, message } = req.body || {};

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ error: "Name is required" });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  if (!message || message.trim().length < 10) {
    return res.status(400).json({ error: "Message must be at least 10 characters" });
  }

  const contacts = await readJson(CONTACTS_FILE, []);
  contacts.push({
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    company: company ? company.trim() : "",
    message: message.trim(),
    createdAt: new Date().toISOString()
  });

  await writeJson(CONTACTS_FILE, contacts);

  return res.status(201).json({ message: "Message received" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

const bootstrap = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await ensureFile(USERS_FILE, []);
  await ensureFile(CONTACTS_FILE, []);

  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
};

bootstrap();
