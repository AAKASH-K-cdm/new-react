import { Link } from "react-router-dom";
import "./Page.css";

function Blog() {
  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <h1>TechLaunch Insights</h1>
          <p>
            Practical guidance on product strategy, engineering, and the future
            of software.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="page-button">Join the Community</Link>
            <Link to="/contact" className="page-button secondary">Pitch a Topic</Link>
          </div>
        </div>
        <div className="card">
          <h3>Popular Themes</h3>
          <ul className="highlight-list">
            <li>Scaling SaaS architecture</li>
            <li>Designing for enterprise users</li>
            <li>AI readiness checklists</li>
          </ul>
        </div>
      </section>

      <section className="page-section">
        <h2 className="section-title">Latest Articles</h2>
        <div className="card-grid">
          <div className="card">
            <h3>From MVP to Platform</h3>
            <p>How to plan your architecture for growth without overbuilding.</p>
          </div>
          <div className="card">
            <h3>Design Ops that Scale</h3>
            <p>Systems for consistent UX across product lines.</p>
          </div>
          <div className="card">
            <h3>Secure DevOps Playbook</h3>
            <p>Bringing security into every stage of delivery.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blog;
