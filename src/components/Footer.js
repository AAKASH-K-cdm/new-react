import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>TechLaunch</h3>
          <p>
            Building secure, scalable software for teams that move fast.
          </p>
        </div>

        <div className="footer-links">
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/blog">Blog</Link>
        </div>

        <div className="footer-links">
          <h4>Services</h4>
          <Link to="/services">Services</Link>
          <Link to="/solutions">Solutions</Link>
          <Link to="/pricing">Pricing</Link>
        </div>

        <div className="footer-links">
          <h4>Support</h4>
          <Link to="/contact">Contact</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 TechLaunch. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
