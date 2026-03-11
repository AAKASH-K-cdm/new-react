import { useState } from "react";
import { Link } from "react-router-dom";
import { submitContact } from "../lib/api";
import "./Page.css";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: "error", message: "Please fill all required fields." });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitContact(form);
      setStatus({ type: "success", message: response.message || "Message sent." });
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <h1>Contact Our Team</h1>
          <p>
            Tell us about your product idea, and we will respond within 24
            hours with a tailored proposal.
          </p>
          <div className="hero-actions">
            <Link to="/services" className="page-button">View Services</Link>
            <Link to="/pricing" className="page-button secondary">Pricing</Link>
          </div>
        </div>
        <div className="card">
          <h3>Reach Us Directly</h3>
          <ul className="highlight-list">
            <li>Email: hello@techlaunch.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>HQ: Chennai, India</li>
          </ul>
        </div>
      </section>

      <section className="page-section">
        <h2 className="section-title">Project Inquiry</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-grid">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Work Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={form.company}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="message"
            placeholder="Tell us about your project"
            value={form.message}
            onChange={handleChange}
            rows="5"
            required
          />

          {status.message && (
            <p className={`form-status ${status.type}`}>{status.message}</p>
          )}

          <button type="submit" className="page-button" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default Contact;
