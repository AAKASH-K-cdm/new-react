import { Link, NavLink, useNavigate } from "react-router-dom";
import { clearAuthSession, getAuthToken } from "../lib/auth";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const isAuthed = Boolean(getAuthToken());

  const handleLogout = () => {
    clearAuthSession();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link className="logo" to="/">
          <span className="logo-mark" aria-hidden="true">
            <span className="logo-ring" />
            <span className="logo-core" />
          </span>
          <span className="logo-text">TechLaunch</span>
        </Link>
        <span className="nav-tagline">Software that scales with you</span>
      </div>

      <ul className="nav-links">
        <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : undefined}>Home</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? "active" : undefined}>About</NavLink></li>
        <li><NavLink to="/services" className={({ isActive }) => isActive ? "active" : undefined}>Services</NavLink></li>
        <li><NavLink to="/solutions" className={({ isActive }) => isActive ? "active" : undefined}>Solutions</NavLink></li>
        <li><NavLink to="/pricing" className={({ isActive }) => isActive ? "active" : undefined}>Pricing</NavLink></li>
        <li><NavLink to="/careers" className={({ isActive }) => isActive ? "active" : undefined}>Careers</NavLink></li>
        <li><NavLink to="/blog" className={({ isActive }) => isActive ? "active" : undefined}>Blog</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active" : undefined}>Contact</NavLink></li>
      </ul>

      <div className="nav-actions">
        {isAuthed ? (
          <>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}>Dashboard</NavLink>
            <button type="button" className="nav-button ghost" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}>Login</NavLink>
            <NavLink to="/register" className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}>Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
