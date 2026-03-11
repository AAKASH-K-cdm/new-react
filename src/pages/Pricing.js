import { Link } from "react-router-dom";
import "./Page.css";

function Pricing() {
  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <h1>Flexible Engagement Models</h1>
          <p>
            Choose the engagement that fits your roadmap. All plans include
            dedicated product leadership and weekly progress reviews.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="page-button">Build a Proposal</Link>
            <Link to="/register" className="page-button secondary">Create Account</Link>
          </div>
        </div>
        <div className="card">
          <h3>Included in Every Plan</h3>
          <ul className="highlight-list">
            <li>Strategy and roadmap alignment</li>
            <li>Design + engineering delivery</li>
            <li>Dedicated account manager</li>
          </ul>
        </div>
      </section>

      <section className="page-section">
        <h2 className="section-title">Plan Options</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Launch</h3>
            <p>Best for MVPs and proof of concept builds.</p>
          </div>
          <div className="card">
            <h3>Scale</h3>
            <p>For growing teams that need continuous delivery.</p>
          </div>
          <div className="card">
            <h3>Enterprise</h3>
            <p>Custom engagement with security and compliance focus.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
