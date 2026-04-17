import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">

      {/* ── HERO ── */}
      <section className="contact-hero">
        <div className="container">
          <AnimatedSection animation="fadeUp" className="text-center">
            <p className="section-kicker">Connect With Us</p>
            <h1 className="newsletter-title">Contact<em>.</em></h1>
            <p className="contact-hero-desc">
              Visit our flagship at Chelari, Malappuram or reach our digital concierge team.
              We're here to help you find your perfect fit.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid-10">
            
            {/* ── LEFT: Info ── */}
            <AnimatedSection animation="slideInRight" className="contact-details-glass">
              <div className="contact-card">
                <span className="card-subtitle">Flagship HQ</span>
                <h2 className="card-title">Chelari</h2>
                <div className="card-address">
                  <p>Yoxi Premium Essentials</p>
                  <p>Chelari, Malappuram District</p>
                  <p>Kerala, India — 673635</p>
                </div>
                
                <div className="card-contact-info">
                  <div className="c-info-item">
                    <span className="c-label">Email</span>
                    <a href="mailto:hello@yoxi.in" className="c-value">hello@yoxi.in</a>
                  </div>
                  <div className="c-info-item">
                    <span className="c-label">WhatsApp</span>
                    <a href="https://wa.me/919000000000" className="c-value">+91 9000 000 000</a>
                  </div>
                </div>

                <div className="card-hours">
                  <span className="c-label">Store Hours</span>
                  <p className="c-value">Mon – Sat: 09:30 — 22:00</p>
                  <p className="c-value">Sun: 10:00 — 21:00</p>
                </div>
              </div>
            </AnimatedSection>

            {/* ── RIGHT: Form ── */}
            <AnimatedSection animation="fadeUp" delay={0.2} className="contact-form-glass">
              <div className="form-inner">
                <h3 className="form-head">Send a Message</h3>
                <form className="unified-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="u-form-row">
                    <input type="text" placeholder="Full Name" required />
                    <input type="email" placeholder="Email Address" required />
                  </div>
                  <input type="text" placeholder="Subject" />
                  <textarea rows="5" placeholder="Tell us how we can help..." required></textarea>
                  <button type="submit" className="newsletter-submit-full">
                    Send Message
                  </button>
                </form>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ── MAP / CTA ── */}
      <section className="virtual-concierge section-padding">
        <div className="container">
          <AnimatedSection animation="fadeUp" className="concierge-box">
             <div className="concierge-content">
                <h2 className="newsletter-title" style={{ fontSize: '2.5rem' }}>Virtual Concierge</h2>
                <p>Can't visit Chelari? Book a private video consultation with our stylists.</p>
                <Button to="/services" variant="primary">Book Virtual Session</Button>
             </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Contact;
