import { Link } from "react-router-dom";
import "./Page.css";

function NotFound() {
  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <h1>Page not found</h1>
          <p>The page you requested does not exist. Let us get you back on track.</p>
          <div className="hero-actions">
            <Link to="/" className="page-button">Go Home</Link>
            <Link to="/contact" className="page-button secondary">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFound;
