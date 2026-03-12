import { getAuthToken } from "./auth";

const DEFAULT_API = "https://backend-repo-for-company.onrender.com";
const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || "")
  .replace(/\/+$/, "");

const resolvedBaseUrl = API_BASE_URL || DEFAULT_API;

const buildUrl = (path) => {
  if (!resolvedBaseUrl) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${resolvedBaseUrl}${normalizedPath}`;
};

const readResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text ? { message: text } : null;
};

export const apiRequest = async (path, options = {}) => {
  const token = getAuthToken();
  const headers = {
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const hasBody = options.body !== undefined;
  if (hasBody && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const url = buildUrl(path);

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await readResponse(response);

    if (!response.ok) {
      const message = data?.error || data?.message || `Request failed (${response.status})`;
      throw new Error(message);
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.name === "TypeError") {
      const target = resolvedBaseUrl || "the current site";
      throw new Error(`Unable to reach the API server at ${target}. Is it running?`);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Request failed");
  }
};

export const registerUser = (payload) =>
  apiRequest("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const loginUser = (payload) =>
  apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const fetchProfile = () => apiRequest("/api/auth/me");

export const submitContact = (payload) =>
  apiRequest("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload)
  });
