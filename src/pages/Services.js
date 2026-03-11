import { Link } from "react-router-dom";
import "./Page.css";

function Services() {
  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <h1>Services Built for Modern Teams</h1>
          <p>
            From product strategy to delivery, we help you design, build, and
            scale software that your customers love.
          </p>
          <div className="hero-actions">
            <Link to="/pricing" className="page-button">See Pricing</Link>
            <Link to="/contact" className="page-button secondary">Book a Call</Link>
          </div>
        </div>
        <div className="card">
          <h3>Service Lines</h3>
          <ul className="highlight-list">
            <li>Product discovery and UX sprints</li>
            <li>Full-stack web development</li>
            <li>Mobile app engineering</li>
            <li>Cloud and DevOps enablement</li>
          </ul>
        </div>
      </section>

      <section className="page-section">
        <h2 className="section-title">What We Deliver</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Design Systems</h3>
            <p>Reusable UI kits and components that scale across products.</p>
          </div>
          <div className="card">
            <h3>API Platforms</h3>
            <p>Secure, documented APIs that power multi-channel experiences.</p>
          </div>
          <div className="card">
            <h3>Data Products</h3>
            <p>Dashboards, analytics, and decision support tools.</p>
          </div>
          <div className="card">
            <h3>Automation</h3>
            <p>Workflow automation that saves time and reduces errors.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
