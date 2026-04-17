import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, limit, getDocs } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import ProductCard from '../components/ProductCard';
import './Home.css';

const HERO_SLIDES = [
  {
    id: 1,
    kicker: 'The Casual Edit',
    title1: 'Relaxed',
    title2: 'Silhouettes.',
    desc: 'Redefining ease with oversized cuts and premium heavyweight cotton. The new standard for everyday narrative.',
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=2000&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    kicker: 'The Modern Minimal',
    title1: 'Sharp',
    title2: 'Linens.',
    desc: 'Breathable imported fabrics crafted for the modern Kerala climate. Effortless sophistication in every thread.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=2000&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    kicker: 'The Street Vision',
    title1: 'Bold',
    title2: 'Tactical.',
    desc: 'Functional wide-leg cargos and technical layers. Building the uniform for those who move differently.',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=2000&auto=format&fit=crop&q=80'
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail]         = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const q = query(collection(db, "products"), limit(6));
        const querySnapshot = await getDocs(q);
        const pData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeaturedProducts(pData);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      }
    };
    fetchFeatured();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault(); if (email) setSubscribed(true);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="home-page">

      {/* ── CINEMATIC MULTI-SLIDE HERO ── */}
      <section className="hero-section">
        <AnimatePresence mode="wait">
          <motion.div 
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="hero-slide"
          >
            <div className="hero-bg-noise" />
            <div className="hero-video-wrap">
              <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: "linear" }}
                src={slide.image} 
                alt={slide.kicker} 
              />
            </div>
            <div className="hero-overlay" />
            
            <div className="hero-content-inner">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="hero-eyebrow"
              >
                <span className="hero-season-pill">{slide.kicker}</span>
                <span className="hero-pipe" />
                <span className="hero-tag">SS 2026 Collection</span>
              </motion.div>
              
              <motion.h1 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="hero-title"
              >
                <span className="hero-line-1">{slide.title1}</span>
                <span className="hero-line-amp">&amp;</span>
                <span className="hero-line-2">{slide.title2}</span>
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="hero-desc"
              >
                {slide.desc}
              </motion.p>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="hero-actions"
              >
                <Link to="/shop" className="hero-cta-primary">
                  Explore Collection
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── HIGH SPEED MARQUEE ── */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {[...Array(3)].map((_, i) => (
            <div className="marquee-group" key={i} aria-hidden={i > 0}>
              {['OVERSIZED SILHOUETTES', 'JAPANESE DENIM', 'HEAVYWEIGHT COTTON', 'DROP SHOULDER', 'WIDE LEG CUTS', 'RELAXED FIT'].map((t, ti) => (
                <span key={ti} style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <span className="mq-text">{t}</span>
                  <span className="mq-dot">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── BOLD STATEMENT ── */}
      <section className="statement-section section-padding">
        <div className="container">
          <AnimatedSection animation="fadeUp">
            <p className="statement-kicker">The Philosophy</p>
            <h2 className="statement-text">
              We stopped looking at what everyone else was wearing, and started building what we <em>actually</em> wanted to wear.
            </h2>
            <div className="statement-rule" />
          </AnimatedSection>
        </div>
      </section>

      {/* ── FLAGSHIP STORY ── */}
      <section className="flagship-section section-padding">
        <div className="container">
          <div className="flagship-grid">
            <AnimatedSection animation="slideInRight" className="flagship-content">
              <span className="section-kicker">Experience</span>
              <h2 className="section-heading">The Chelari <br />Flagship<em>.</em></h2>
              <p className="flagship-text">
                More than a store, our Chelari flagship is a dedicated menswear hub. 
                Experience our full collection of wide-leg trousers, oversized linens, 
                and premium imports in an architectural space designed for the modern man.
              </p>
              <div className="flagship-details">
                <div className="f-detail-item">
                  <span className="f-val">Malappuram</span>
                  <span className="f-label">Location</span>
                </div>
                <div className="f-detail-item">
                  <span className="f-val">10:00 - 22:00</span>
                  <span className="f-label">Daily Hours</span>
                </div>
              </div>
              <Link to="/contact" className="hero-cta-primary outline">Visit Flagship</Link>
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" delay={0.2} className="flagship-image-wrap">
              <img src="https://images.unsplash.com/photo-1544441893-675973e31985?w=1200&auto=format&fit=crop&q=80" alt="Flagship Interior" className="flagship-img" />
              <div className="img-caption">Chelari HQ — Kerala</div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── PRODUCT GRID OVERHAUL ── */}
      <section className="arrivals-section section-padding">
        <div className="container">
          <AnimatedSection animation="fadeUp" className="arrivals-header">
            <div>
              <span className="section-kicker">Latest Selection</span>
              <h2 className="section-heading">Menswear Essentials</h2>
            </div>
            <Link to="/shop" className="view-all-link">Shop Collection</Link>
          </AnimatedSection>
          
          <div className="product-grid">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product, index) => (
                <AnimatedSection key={product.id} animation="fadeUp" delay={index * 0.1}>
                  <ProductCard product={product} />
                </AnimatedSection>
              ))
            ) : (
              <div style={{ color: 'var(--text-tertiary)', textAlign: 'center', gridColumn: '1/-1', padding: '40px' }}>
                Loading silhouettes...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── THE PROCESS / CRAFTSMANSHIP ── */}
      <section className="process-section section-padding">
        <div className="container">
          <AnimatedSection animation="fadeUp" className="text-center" style={{ marginBottom: '5rem' }}>
            <span className="section-kicker">Our Method</span>
            <h2 className="section-heading">How We Build.</h2>
          </AnimatedSection>
          
          <div className="process-grid">
            {[
              { num: '01', title: 'Source', desc: 'We select premium heavyweight cottons and breathable linens from across India and selected imports.' },
              { num: '02', title: 'Draft', desc: 'Every silhouette is drafted to provide maximum airflow and a modern, relaxed oversized fit.' },
              { num: '03', title: 'Refine', desc: 'In-house tailoring ensures every hem and seam meets our architectural standards.' }
            ].map((step, idx) => (
              <AnimatedSection key={idx} animation="fadeUp" delay={idx * 0.15} className="process-card">
                <span className="p-num">{step.num}</span>
                <h3 className="p-title">{step.title}</h3>
                <p className="p-desc">{step.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CINEMATIC LOOKBOOK ── */}
      <section className="lookbook-section section-padding">
        <div className="container">
          <AnimatedSection animation="fadeUp" className="arrivals-header" style={{ marginBottom: '3rem' }}>
            <div>
              <span className="section-kicker">Campaign</span>
              <h2 className="section-heading">The Lookbook</h2>
            </div>
          </AnimatedSection>
          
          <div className="lookbook-mosaic">
            <AnimatedSection animation="fadeUp" className="lk-cell">
              <img src="https://images.unsplash.com/photo-1675668363014-e1251e6fadc5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1hbiUyMG5hdnklMjBzdWl0JTIwdGllJTIwbHV4dXJ5JTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D" alt="Look 1" />
              <div className="lk-label">Look 01</div>
            </AnimatedSection>
            <div className="lk-col-right">
              <AnimatedSection animation="fadeUp" delay={0.1} className="lk-cell">
                <img src="https://images.unsplash.com/photo-1545959308-3f4b859ad821?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RyZWV0JTIwc3R5bGUlMjBtZW4lMjBvdXRmaXQlMjBqYWNrZXQlMjBzbmVha2VycyUyMHVyYmFufGVufDB8fDB8fHww" alt="Look 2" />
                <div className="lk-label">Look 02</div>
              </AnimatedSection>
              <div className="lk-row-bottom">
                <AnimatedSection animation="fadeUp" delay={0.2} className="lk-cell">
                  <img src="https://images.unsplash.com/photo-1627138601165-49eaa13bc035?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwcHJpbnRlZCUyMHNoaXJ0JTIwb3V0Zml0JTIwZmFzaGlvbiUyMGVkaXRvcmlhbCUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDB8fDB8fDA%3D" alt="Look 3" />
                  <div className="lk-label">Look 03</div>
                </AnimatedSection>
                <AnimatedSection animation="fadeUp" delay={0.3} className="lk-cell">
                  <img src="https://images.unsplash.com/photo-1689396959193-5c1f9dece9e1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVuJTIwY2FzdWFsJTIwb3V0Zml0JTIwd2hpdGUlMjB0c2hpcnQlMjBiYWdneSUyMGplYW5zJTIwY2xlYW4lMjBhZXN0aGV0aWN8ZW58MHx8MHx8fDA%3D" alt="Look 4" />
                  <div className="lk-label">Look 04</div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL JOURNAL ── */}
      <section className="editorial-section">
        <div className="editorial-grid">
          <AnimatedSection animation="fadeUp" className="editorial-main">
            <div className="editorial-img-wrap">
              <img src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=1600&auto=format&fit=crop&q=80" alt="Editorial Look" />
              <div className="editorial-overlay" />
              <div className="editorial-content">
                <span className="e-kicker">Editorial 01</span>
                <h2 className="e-title">The Art of <br />Wide Leg.</h2>
                <Link to="/shop" className="hero-cta-primary">Explore Cut</Link>
              </div>
            </div>
          </AnimatedSection>
          <div className="editorial-side">
            <AnimatedSection animation="slideInRight" delay={0.2} className="editorial-card">
              <img src="https://images.unsplash.com/photo-1516826957135-7117364ece41?w=800&auto=format&fit=crop&q=80" alt="Detail 1" />
              <div className="e-card-label">Fabric Detail — Heavyweight Cotton</div>
            </AnimatedSection>
            <AnimatedSection animation="slideInRight" delay={0.3} className="editorial-card">
              <img src="https://images.unsplash.com/photo-1550246140-5119ae4790b8?w=800&auto=format&fit=crop&q=80" alt="Detail 2" />
              <div className="e-card-label">Styling — The Modular Standard</div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="newsletter-section section-padding">
        <div className="container">
          <AnimatedSection animation="fadeUp" className="newsletter-inner">
            <span className="section-kicker">Join the Inner Circle</span>
            <h2 className="newsletter-title">Get Early Access.</h2>
            <p className="newsletter-desc">
              Priority access to menswear drops and limited runs for our Chelari hub members.
            </p>
            {subscribed ? (
               <div className="subscription-success">
                 Verified. Welcome to YOXI.
               </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input type="email" className="newsletter-input" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} required />
                <button type="submit" className="newsletter-submit" aria-label="Join">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Home;