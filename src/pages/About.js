import { Link } from "react-router-dom";
import "./Page.css";

function About() {
  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <h1>About TechLaunch</h1>
          <p>
            We are a software studio focused on building reliable digital products
            for startups and enterprises. Our teams blend strategy, design, and
            engineering to launch products that scale.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="page-button">Start a Project</Link>
            <Link to="/services" className="page-button secondary">Explore Services</Link>
          </div>
        </div>
        <div className="card">
          <h3>Company Snapshot</h3>
          <ul className="highlight-list">
            <li>10+ years building web and mobile platforms</li>
            <li>120+ successful product launches</li>
            <li>Global delivery teams in 3 time zones</li>
          </ul>
        </div>
      </section>

      <section className="page-section">
        <h2 className="section-title">Our Values</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Speed with Stability</h3>
            <p>We move fast without sacrificing reliability or security.</p>
          </div>
          <div className="card">
            <h3>Outcome Focused</h3>
            <p>We track outcomes, not just output, to grow your business.</p>
          </div>
          <div className="card">
            <h3>Human-Centered</h3>
            <p>We design experiences that feel intuitive and delightful.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
