import "./Register.css";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../lib/api";
import { setAuthSession } from "../lib/auth";
import { logRegisterEvent } from "../lib/firestoreLogs";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "", 
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const redirectTimer = useRef(null);

  useEffect(() => () => {
    if (redirectTimer.current) {
      clearTimeout(redirectTimer.current);
    }
  }, []);

  const validate = (name, value, currentForm = form) => {
    let message = "";

    if (name === "name") {
      if (value.trim().length < 3) {
        message = "Name must be at least 3 characters";
      }
    }

    if (name === "email") {
      const trimmedEmail = value.trim();
      if (!/^[A-Za-z][A-Za-z0-9._%+-]*@\S+\.\S+$/.test(trimmedEmail)) {
        message = "Email must start with a letter";
      }
    }

    if (name === "mobile") {
      const trimmedMobile = value.trim();
      if (!/^\d*$/.test(trimmedMobile)) {
        message = "Only numbers allowed";
      } else if (trimmedMobile.length !== 10) {
        message = "Mobile must be 10 digits";
      }
    }

    if (name === "password") {
      if (value.length < 6) {
        message = "Password must be at least 6 characters";
      }
    }

    if (name === "confirmPassword") {
      if (value !== currentForm.password) {
        message = "Passwords do not match";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: message
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextForm = {
      ...form,
      [name]: value
    };

    setForm(nextForm);
    validate(name, value, nextForm);

    if (name === "password" && nextForm.confirmPassword) {
      validate("confirmPassword", nextForm.confirmPassword, nextForm);
    }
  };

  const getPasswordStrength = () => {
    const password = form.password;

    if (password.length < 6) return "Weak";
    if (password.match(/[A-Z]/) && password.match(/[0-9]/)) return "Strong";

    return "Medium";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setShowSuccess(false);

    if (Object.values(errors).some((error) => error !== "")) {
      setStatus({ type: "error", message: "Please fix the errors." });
      return;
    }

    if (!form.name || !form.email || !form.mobile || !form.password || !form.confirmPassword) {
      setStatus({ type: "error", message: "Please fill all fields." });
      return;
    }

    if (form.password !== form.confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        mobile: form.mobile.trim(),
        password: form.password
      };

      const data = await registerUser(payload);
      setAuthSession(data.token, data.user);
      const userId = data.user?.id || data.user?._id || data.user?.uid || null;
      void logRegisterEvent({
        name: payload.name,
        email: payload.email,
        mobile: payload.mobile,
        userId
      });
      setStatus({ type: "success", message: "Successfully registered!" });
      setShowSuccess(true);
      redirectTimer.current = setTimeout(() => {
        navigate("/dashboard");
      }, 1600);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-backdrop" aria-hidden="true">
        <div className="register-grid" />
        <div className="register-orb" />
        <div className="register-ring" />
      </div>

      {showSuccess && (
        <div className="success-overlay" role="status" aria-live="polite">
          <div className="success-card">
            <div className="success-check">✓</div>
            <h3>Successfully registered</h3>
            <p>Redirecting you to the dashboard...</p>
          </div>
        </div>
      )}

      <h2>Create Account</h2>
      <p className="register-subtitle">Join our platform today</p>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? "error-input" : form.name ? "success-input" : ""}
          />
          {form.name && !errors.name && <span className="check">OK</span>}
          {errors.name && <small>{errors.name}</small>}
        </div>

        <div className="input-group">
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "error-input" : form.email ? "success-input" : ""}
          />
          {form.email && !errors.email && <span className="check">OK</span>}
          {errors.email && <small>{errors.email}</small>}
        </div>

        <div className="input-group">
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            maxLength="10"
            onChange={handleChange}
            className={errors.mobile ? "error-input" : form.mobile ? "success-input" : ""}
          />
          {form.mobile && !errors.mobile && <span className="check">OK</span>}
          {errors.mobile && <small>{errors.mobile}</small>}
        </div>

        <div className="input-group password-box">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create Password"
            value={form.password}
            onChange={handleChange}
            className={errors.password ? "error-input" : form.password ? "success-input" : ""}
          />

          <span className="toggle" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </span>

          {errors.password && <small>{errors.password}</small>}

          {form.password && (
            <div className={`strength ${getPasswordStrength()}`}>
              {getPasswordStrength()}
            </div>
          )}
        </div>

        <div className="input-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "error-input" : form.confirmPassword ? "success-input" : ""}
          />
          {form.confirmPassword && !errors.confirmPassword && <span className="check">OK</span>}
          {errors.confirmPassword && <small>{errors.confirmPassword}</small>}
        </div>

        {status.message && (
          <p className={`form-status ${status.type}`}>{status.message}</p>
        )}

        <button className="register-btn" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
