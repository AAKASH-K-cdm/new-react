import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>
          <span>W</span><span>E</span><span>L</span><span>L</span>
          <span>C</span><span>O</span><span>M</span><span>E</span> to
          <span className="brand"> TechLaunch</span>
        </h1>

        <div className="alien-scene">
          <div className="alien">
            <div className="head">
              <div className="eye left"></div>
              <div className="eye right"></div>
            </div>
            <div className="body"></div>
          </div>

          <div className="computer">
            <div className="screen"></div>
            <div className="keyboard"></div>
          </div>
        </div>

        <p>
          Build your future with modern web development tools. Join our platform
          and launch secure, scalable products.
        </p>

        <div className="hero-buttons">
          <Link to="/register" className="btn">Register</Link>
          <Link to="/login" className="btn">Login</Link>
        </div>
      </section>

      <section className="about-section">
        <h2>About Our Company</h2>
        <p>
          TechLaunch is a modern software development company focused on
          building innovative digital solutions. Our team specializes in
          creating scalable web applications, mobile applications, and
          enterprise software for businesses across multiple industries.
        </p>

        <p>
          We combine cutting-edge technologies with creative design to deliver
          high-quality products that help companies grow in the digital world.
          Our mission is to empower businesses with reliable, secure, and
          efficient software solutions.
        </p>

        <div className="section-actions">
          <Link to="/about" className="section-button">Learn More</Link>
          <Link to="/contact" className="section-button ghost">Talk to Us</Link>
        </div>
      </section>

      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services-container">
          <div className="service-card">
            <h3>Web Development</h3>
            <p>
              We build modern, responsive, and scalable websites using
              technologies like React, HTML, CSS, and JavaScript.
            </p>
            <Link to="/services" className="card-link">View details</Link>
          </div>

          <div className="service-card">
            <h3>Mobile App Development</h3>
            <p>
              Our team develops high-performance mobile applications for Android
              and iOS using Flutter and modern frameworks.
            </p>
            <Link to="/services" className="card-link">View details</Link>
          </div>

          <div className="service-card">
            <h3>UI / UX Design</h3>
            <p>
              We design user-friendly and attractive interfaces that improve
              customer experience and engagement.
            </p>
            <Link to="/services" className="card-link">View details</Link>
          </div>

          <div className="service-card">
            <h3>Cloud Solutions</h3>
            <p>
              We provide secure cloud infrastructure and deployment services for
              scalable and reliable applications.
            </p>
            <Link to="/solutions" className="card-link">See solutions</Link>
          </div>

          <div className="service-card">
            <h3>Software Consulting</h3>
            <p>
              Our experts help businesses choose the right technology stack and
              build efficient digital solutions.
            </p>
            <Link to="/solutions" className="card-link">See solutions</Link>
          </div>

          <div className="service-card">
            <h3>Maintenance & Support</h3>
            <p>
              We provide continuous support, updates, and maintenance for your
              applications to ensure smooth performance.
            </p>
            <Link to="/contact" className="card-link">Request support</Link>
          </div>
        </div>
      </section>

      <section className="tech-section">
        <h2>Technologies We Use</h2>
        <div className="tech-grid">
          <div className="tech-circle">React.js</div>
          <div className="tech-circle">Java</div>
          <div className="tech-circle">Spring Boot</div>
          <div className="tech-circle">Node.js</div>
          <div className="tech-circle">MySQL</div>
          <div className="tech-circle">MongoDB</div>
          <div className="tech-circle">AWS</div>
          <div className="tech-circle">Docker</div>
        </div>
      </section>

      <section className="why-section">
        <h2>Why Choose Us</h2>
        <div className="why-container">
          <div className="why-card">
            <h3>Experienced Developers</h3>
            <p>Our team has strong experience in building modern applications.</p>
            <Link to="/about" className="card-link">Meet the team</Link>
          </div>
          <div className="why-card">
            <h3>High Quality Solutions</h3>
            <p>We deliver scalable and secure software solutions.</p>
            <Link to="/solutions" className="card-link">See case studies</Link>
          </div>
          <div className="why-card">
            <h3>24/7 Support</h3>
            <p>Our support team is always ready to help clients.</p>
            <Link to="/contact" className="card-link">Contact support</Link>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>
              "TechLaunch delivered our project on time with excellent quality.
              Their team is very professional."
            </p>
            <h4>- John Smith</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "The team helped us scale our SaaS platform and onboard new
              clients quickly."
            </p>
            <h4>- Priya Nair</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "Great communication, clear milestones, and reliable delivery."
            </p>
            <h4>- Daniel Cooper</h4>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div>
          <h2>Ready to build with TechLaunch?</h2>
          <p>
            Tell us about your goals and we will craft a solution that fits your
            roadmap.
          </p>
        </div>
        <div className="cta-buttons">
          <Link to="/contact" className="section-button">Start a Project</Link>
          <Link to="/pricing" className="section-button ghost">View Pricing</Link>
        </div>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-cards">
          <div className="contact-card">
            <h3>Email</h3>
            <p>hello@techlaunch.com</p>
          </div>
          <div className="contact-card">
            <h3>Phone</h3>
            <p>+91 98765 43210</p>
          </div>
          <div className="contact-card">
            <h3>Location</h3>
            <p>Chennai, India</p>
          </div>
        </div>
        <Link to="/contact" className="section-button">Send a Message</Link>
      </section>
    </div>
  );
}

export default Home;
