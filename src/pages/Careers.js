import { Link } from "react-router-dom";
import "./Page.css";

function Careers() {
  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <h1>Careers at TechLaunch</h1>
          <p>
            Join a team that ships products with impact. We are always looking
            for engineers, designers, and product leaders who love to build.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="page-button">Introduce Yourself</Link>
            <Link to="/about" className="page-button secondary">Our Culture</Link>
          </div>
        </div>
        <div className="card">
          <h3>Why Work With Us</h3>
          <ul className="highlight-list">
            <li>Remote-friendly teams with flexible schedules</li>
            <li>Learning budgets for certifications and conferences</li>
            <li>Ownership over products and client success</li>
          </ul>
        </div>
      </section>

      <section className="page-section">
        <h2 className="section-title">Open Roles</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Senior Full-Stack Engineer</h3>
            <p>React, Node.js, cloud-native delivery.</p>
          </div>
          <div className="card">
            <h3>Product Designer</h3>
            <p>Design systems, UX research, product storytelling.</p>
          </div>
          <div className="card">
            <h3>DevOps Lead</h3>
            <p>Infrastructure automation and reliability engineering.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Careers;
