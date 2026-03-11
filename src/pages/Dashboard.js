import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProfile } from "../lib/api";
import { clearAuthSession, getAuthUser } from "../lib/auth";
import "./Page.css";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getAuthUser());
  const popLetters = "Dashboard".split("");
  const pulseCards = [
    {
      title: "Priority Focus",
      text: "Lock the scope for your next sprint and align on impact."
    },
    {
      title: "Momentum Check",
      text: "Share progress notes with the TechLaunch team."
    },
    {
      title: "Launch Window",
      text: "Confirm the rollout timeline and stakeholder updates."
    }
  ];

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile();
        setUser(data.user);
      } catch (error) {
        clearAuthSession();
        navigate("/login");
      }
    };

    loadProfile();
  }, [navigate]);

  const handleLogout = () => {
    clearAuthSession();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="page dashboard-page">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="page dashboard-page">
      <div className="dashboard-backdrop" aria-hidden="true">
        <div className="dashboard-orb" />
        <div className="dashboard-grid" />
        <div className="dashboard-ring" />
      </div>

      <section className="page-hero dashboard-hero">
        <div className="dashboard-hero-copy">
          <div className="pop-title" aria-label="Dashboard">
            {popLetters.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className="pop-letter"
                style={{ "--i": index }}
              >
                {letter}
              </span>
            ))}
          </div>
          <h1 className="dashboard-headline">
            Welcome back, <span>{user.name}</span>
          </h1>
          <p>
            Your TechLaunch command center is glowing. Track priorities, explore
            new solutions, and ship with confidence.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="page-button">Start New Project</Link>
            <Link to="/services" className="page-button secondary">View Services</Link>
          </div>
          <div className="dashboard-badges">
            <div className="badge-card">
              <p className="badge-label">Focus Mode</p>
              <h3>High</h3>
            </div>
            <div className="badge-card">
              <p className="badge-label">Pipeline</p>
              <h3>Ready</h3>
            </div>
            <div className="badge-card">
              <p className="badge-label">Signal</p>
              <h3>99%</h3>
            </div>
          </div>
        </div>

        <div className="dashboard-cockpit">
          <div className="cockpit-card">
            <div className="cockpit-header">
              <h3>Your Account</h3>
              <span className="cockpit-chip">Live</span>
            </div>
            <ul className="highlight-list">
              <li>Email: {user.email}</li>
              <li>Mobile: {user.mobile}</li>
              <li>Member since: {new Date(user.createdAt).toLocaleDateString()}</li>
            </ul>
            <div className="cockpit-meta">
              <span>Workspace: TechLaunch</span>
              <span>Tier: Launchpad</span>
            </div>
          </div>
          <div className="cockpit-glow" aria-hidden="true" />
        </div>
      </section>

      <section className="page-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="card-grid">
          <Link to="/solutions" className="dashboard-card">
            <h3>Explore Solutions</h3>
            <p>See industry playbooks and success stories.</p>
          </Link>
          <Link to="/pricing" className="dashboard-card">
            <h3>Review Pricing</h3>
            <p>Pick the engagement model that fits your roadmap.</p>
          </Link>
          <Link to="/contact" className="dashboard-card">
            <h3>Talk to a Specialist</h3>
            <p>Get expert guidance on your next release.</p>
          </Link>
        </div>
      </section>

      <section className="page-section">
        <h2 className="section-title">Pulse Board</h2>
        <div className="pulse-grid">
          {pulseCards.map((card) => (
            <div key={card.title} className="pulse-card">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section">
        <button type="button" className="page-button secondary" onClick={handleLogout}>
          Logout
        </button>
      </section>
    </div>
  );
}

export default Dashboard;
