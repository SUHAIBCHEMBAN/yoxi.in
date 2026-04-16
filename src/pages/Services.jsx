import { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';
import './Services.css';

const Services = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const servicesList = [
    {
      id: 1,
      title: 'Personal Style Consultation',
      desc: 'Unsure about what fits your body type or lifestyle? Book a 1-on-1 session with our Kerala-based stylists. We help you identify the right silhouette — oversized, relaxed or slim — and build a wardrobe of shirts and trousers that actually work together.',
      image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      title: 'Fit & Alteration Service',
      desc: 'Found a shirt you love but the sleeves are slightly long? Our in-store tailor team at our Kochi flagship handles minor alterations — cuffs, hem length, trouser break — so every YOXI piece fits perfectly on you.',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      title: 'Wardrobe Curation Package',
      desc: 'Let us build your wardrobe from scratch. We select 12–20 shirts and trousers that work as a cohesive system — colours, fabrics and fits that mix easily. Delivered to your door with a full styling note.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const processSteps = [
    { num: '01', title: 'Book a Session',  desc: 'Schedule online or visit us in-store at our Kochi, Thiruvananthapuram or Kozhikode locations.' },
    { num: '02', title: 'Style Discovery', desc: 'Our stylist walks through your lifestyle, body type and preferences to understand what you actually need.' },
    { num: '03', title: 'We Curate',       desc: 'We pull together a selection of shirts and trousers from our current stock and imports — tailored to you.' },
    { num: '04', title: 'Try & Confirm',   desc: "Try everything on in-store or at home. Keep only what you love. Return what you don't — no questions." },
    { num: '05', title: 'Styled & Shipped',desc: 'Your confirmed pieces are pressed, packaged beautifully and delivered within 24 hours.' },
  ];

  const faqs = [
    { q: 'How much does a style consultation cost?', a: 'Consultations are free for in-store visits. Virtual sessions are ₹499 for 30 minutes, fully redeemable on your first purchase.' },
    { q: 'Do you offer alterations on imports?', a: 'Yes — we offer standard alterations (sleeve length, hem, trouser break) for ₹199–₹499 per piece at our Kochi store.' },
    { q: 'Can I return pieces from the wardrobe curation package?', a: "Yes. The wardrobe curation package includes a 10-day return window on any pieces that don't work for you." },
    { q: 'Do you ship the wardrobe package outside Kerala?', a: 'Yes — we ship pan India and to the UAE, UK, USA and 40+ countries. International packaging is available on request.' },
    { q: 'What sizes do you stock?', a: "S to 3XL across most styles. Oversized pieces are labelled with a secondary \"true size\" guide so you know exactly what to expect." },
  ];

  return (
    <div className="services-page">

      {/* ── HERO ── */}
      <section className="services-hero section-padding">
        <div className="container">
          <AnimatedSection animation="fadeUp" className="text-center">
            <p className="subtitle">Beyond the Purchase</p>
            <h1 className="display-title">Our Services</h1>
            <p className="services-hero-desc">
              We don't just sell shirts and trousers — we help you wear them right.
              From personal consultations to door-step styling, YOXI has you covered.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services-list section-padding" style={{ paddingTop: '0' }}>
        <div className="container">
          {servicesList.map((service, index) => (
            <div className={`service-row ${index % 2 !== 0 ? 'reverse' : ''}`} key={service.id}>
              <AnimatedSection animation={index % 2 === 0 ? 'slideInRight' : 'fadeUp'} className="service-img-container">
                <img src={service.image} alt={service.title} className="service-img" />
                <div className="service-img-num">0{service.id}</div>
              </AnimatedSection>
              <AnimatedSection animation="fadeUp" delay={0.2} className="service-content">
                <span className="service-number">0{service.id}</span>
                <h2 className="section-title">{service.title}</h2>
                <p className="service-desc">{service.desc}</p>
                <Button variant="text">Book Now →</Button>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="process-section section-padding">
        <div className="container">
          <AnimatedSection className="text-center" style={{ marginBottom: '4rem' }}>
            <span className="subtitle" style={{ color: 'rgba(255,255,255,0.5)' }}>How It Works</span>
            <h2 className="section-title">The YOXI Process</h2>
          </AnimatedSection>
          <div className="process-grid">
            {processSteps.map((step, idx) => (
              <AnimatedSection key={idx} animation="fadeUp" delay={idx * 0.1} className="process-step">
                <div className="process-num">{step.num}</div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section section-padding">
        <div className="container">
          <div className="faq-layout">
            <AnimatedSection className="faq-left">
              <span className="subtitle">Questions</span>
              <h2 className="section-title">Frequently Asked</h2>
              <p className="faq-sub">
                Our team is available 10am–7pm IST Monday to Saturday. Reach us anytime via chat or email.
              </p>
              <Button to="/contact" variant="outline">Contact Us</Button>
            </AnimatedSection>
            <AnimatedSection delay={0.2} className="faq-list">
              {faqs.map((faq, idx) => (
                <div className={`faq-item ${activeFaq === idx ? 'active' : ''}`} key={idx}>
                  <button className="faq-question" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                    <span>{faq.q}</span>
                    <span className="faq-icon">{activeFaq === idx ? '−' : '+'}</span>
                  </button>
                  {activeFaq === idx && (
                    <div className="faq-answer"><p>{faq.a}</p></div>
                  )}
                </div>
              ))}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="booking-cta section-padding">
        <div className="container text-center">
          <AnimatedSection animation="fadeUp">
            <h2 className="section-title">Ready to Dress Better?</h2>
            <p className="booking-desc">
              Whether you're starting fresh or just looking to sharpen your wardrobe —
              YOXI's styling team is here to make it effortless.
            </p>
            <Button to="/contact" variant="primary">Book a Session</Button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Services;
