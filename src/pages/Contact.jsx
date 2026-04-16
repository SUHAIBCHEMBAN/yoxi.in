import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">

      {/* ── HERO ── */}
      <section className="contact-hero section-padding">
        <div className="container">
          <AnimatedSection animation="fadeUp" className="text-center">
            <p className="subtitle">We're here to help</p>
            <h1 className="display-title">Get in Touch</h1>
            <p className="contact-hero-desc">
              Visit us in Kerala, or reach our team online — we're always ready
              to help you find your perfect fit.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── MAIN CONTACT CONTENT ── */}
      <section className="contact-content section-padding" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="contact-grid">

            {/* ── LEFT: Store Locations ── */}
            <AnimatedSection animation="slideInRight" className="contact-info">
              <h2 className="section-title">Our Stores</h2>

              <div className="store-location">
                <div className="store-badge">Flagship</div>
                <h3>Kochi</h3>
                <p>MG Road, Marine Drive<br/>Ernakulam, Kochi — 682 031<br/>Kerala, India</p>
                <p className="contact-detail">
                  T: +91 484 235 6789<br/>
                  E: kochi@yoxi.in
                </p>
                <p className="store-hours">Mon–Sat: 10am – 8pm · Sun: 11am – 6pm</p>
              </div>

              <div className="store-location">
                <h3>Thiruvananthapuram</h3>
                <p>Statue Junction, Palayam<br/>Thiruvananthapuram — 695 001<br/>Kerala, India</p>
                <p className="contact-detail">
                  T: +91 471 234 5678<br/>
                  E: tvm@yoxi.in
                </p>
                <p className="store-hours">Mon–Sat: 10am – 8pm</p>
              </div>

              <div className="store-location">
                <h3>Kozhikode</h3>
                <p>SM Street, Calicut<br/>Kozhikode — 673 001<br/>Kerala, India</p>
                <p className="contact-detail">
                  T: +91 495 276 1234<br/>
                  E: calicut@yoxi.in
                </p>
                <p className="store-hours">Mon–Sat: 10am – 8pm</p>
              </div>

              <div className="corporate-inquiries">
                <h2 className="section-title" style={{ fontSize: '1.4rem' }}>Corporate &amp; Wholesale</h2>
                <p>For bulk orders, press, or corporate gifting enquiries, contact our head office directly.</p>
                <p className="contact-detail">E: business@yoxi.in</p>
              </div>
            </AnimatedSection>

            {/* ── RIGHT: Form + Virtual CTA ── */}
            <div className="contact-right-column">
              <AnimatedSection animation="fadeUp" delay={0.2} className="contact-form-container">
                <h2 className="section-title">Send a Message</h2>
                <p className="form-desc">
                  For bespoke enquiries, styling advice, order tracking, or general questions.
                </p>
                <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="cf-name">Full Name</label>
                      <input type="text" id="cf-name" placeholder="Your name" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cf-phone">Phone</label>
                      <input type="tel" id="cf-phone" placeholder="+91 or your number" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-email">Email Address</label>
                    <input type="email" id="cf-email" placeholder="you@email.com" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-subject">Subject</label>
                    <select id="cf-subject">
                      <option>General Enquiry</option>
                      <option>Bespoke / Custom Order</option>
                      <option>Order Tracking</option>
                      <option>Returns &amp; Exchange</option>
                      <option>Wholesale / Corporate</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-message">Message</label>
                    <textarea id="cf-message" rows="5" placeholder="Tell us how we can help…" required />
                  </div>
                  <Button type="submit" variant="primary">Send Message</Button>
                </form>
              </AnimatedSection>

              <AnimatedSection animation="fadeUp" delay={0.35} className="virtual-cta-box">
                <div className="vcta-icon">📱</div>
                <h3 className="virtual-cta-title">Virtual Style Consultation</h3>
                <p className="virtual-cta-desc">
                  Can't visit our stores? Connect with our Kerala style experts via a private
                  video call — from measurement guidance to full wedding ensemble curation.
                </p>
                <Button variant="outline" style={{ borderColor: 'var(--color-gold,#C4922A)', color: 'var(--color-gold,#C4922A)' }}>
                  Book Virtual Session
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
