import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../lib/api";
import { setAuthSession } from "../lib/auth";
import { logLoginEvent } from "../lib/firestoreLogs";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const redirectTimer = useRef(null);

  useEffect(() => () => {
    if (redirectTimer.current) {
      clearTimeout(redirectTimer.current);
    }
  }, []);

  const speakWelcome = (name) => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(`Welcome ${name}`);
    utterance.rate = 1;
    utterance.pitch = 1.05;
    utterance.volume = 1;

    synth.cancel();
    synth.speak(utterance);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setShowSuccess(false);

    const trimmedEmail = email.trim();

    if (trimmedEmail === "" || password.trim() === "") {
      setStatus({ type: "error", message: "Please fill all fields." });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setStatus({ type: "error", message: "Please enter a valid email." });
      return;
    }

    if (password.length < 6) {
      setStatus({ type: "error", message: "Password must be at least 6 characters." });
      return;
    }

    setIsSubmitting(true);

    try {
      const lowerEmail = trimmedEmail.toLowerCase();
      const data = await loginUser({ email: lowerEmail, password });
      setAuthSession(data.token, data.user);
      const userId = data.user?.id || data.user?._id || data.user?.uid || null;
      void logLoginEvent({
        name: data.user?.name,
        email: data.user?.email || lowerEmail,
        userId
      });
      const displayName = data.user?.name || "back";
      setStatus({ type: "success", message: `Welcome ${displayName}!` });
      setShowSuccess(true);
      speakWelcome(displayName);
      redirectTimer.current = setTimeout(() => {
        navigate("/dashboard");
      }, 900);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-backdrop" aria-hidden="true">
        <div className="login-grid" />
        <div className="login-orb" />
        <div className="login-ring" />
      </div>

      {showSuccess && (
        <div className="success-overlay" role="status" aria-live="polite">
          <div className="success-card">
            <div className="success-check">✓</div>
            <h3>Login successful</h3>
            <p>Launching your dashboard...</p>
          </div>
        </div>
      )}

      <h2>Welcome Back</h2>
      <p className="login-subtitle">Login to your account</p>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {status.message && (
          <p className={`form-status ${status.type}`}>{status.message}</p>
        )}

        <button className="login-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="register-link">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
