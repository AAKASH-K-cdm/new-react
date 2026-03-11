import { Link } from "react-router-dom";
import "./Page.css";

function Solutions() {
  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <h1>Solutions by Industry</h1>
          <p>
            We build tailored solutions for industries that demand speed,
            security, and reliability.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="page-button">Request a Demo</Link>
            <Link to="/services" className="page-button secondary">View Services</Link>
          </div>
        </div>
        <div className="card">
          <h3>Industry Coverage</h3>
          <ul className="highlight-list">
            <li>SaaS and B2B platforms</li>
            <li>FinTech and payments</li>
            <li>Healthcare and wellness</li>
            <li>Retail and eCommerce</li>
          </ul>
        </div>
      </section>

      <section className="page-section">
        <h2 className="section-title">Case Highlights</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Growth Analytics Suite</h3>
            <p>Scaled to 1M+ monthly sessions with real-time insights.</p>
          </div>
          <div className="card">
            <h3>FinTech Onboarding</h3>
            <p>Reduced KYC time from days to minutes with automation.</p>
          </div>
          <div className="card">
            <h3>Healthcare Scheduling</h3>
            <p>Unified patient journeys across mobile and web channels.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Solutions;
