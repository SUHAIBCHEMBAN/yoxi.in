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

      {/* ── PRODUCT GRID OVERHAUL ── */}
      <section className="arrivals-section section-padding">
        <div className="container">
          <AnimatedSection animation="fadeUp" className="arrivals-header">
            <div>
              <span className="section-kicker">Drop 01</span>
              <h2 className="section-heading">Featured Pieces</h2>
            </div>
            <Link to="/shop" className="view-all-link">View All Gallery</Link>
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
                Curating masterpieces...
              </div>
            )}
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
              <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80" alt="Look 1" />
              <div className="lk-label">Look 01</div>
            </AnimatedSection>
            <div className="lk-col-right">
              <AnimatedSection animation="fadeUp" delay={0.1} className="lk-cell">
                <img src="https://images.unsplash.com/photo-1594938298603-c8148c4b4084?w=1200&auto=format&fit=crop&q=80" alt="Look 2" />
                <div className="lk-label">Look 02</div>
              </AnimatedSection>
              <div className="lk-row-bottom">
                <AnimatedSection animation="fadeUp" delay={0.2} className="lk-cell">
                  <img src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&auto=format&fit=crop&q=80" alt="Look 3" />
                  <div className="lk-label">Look 03</div>
                </AnimatedSection>
                <AnimatedSection animation="fadeUp" delay={0.3} className="lk-cell">
                  <img src="https://images.unsplash.com/photo-1536766820879-059fec98ec0a?w=800&auto=format&fit=crop&q=80" alt="Look 4" />
                  <div className="lk-label">Look 04</div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="newsletter-section section-padding">
        <div className="container">
          <AnimatedSection animation="fadeUp" className="newsletter-inner">
            <span className="section-kicker">Join the Inner Circle</span>
            <h2 className="newsletter-title">Get Early Access.</h2>
            <p className="hero-desc" style={{ margin: '0 auto 2rem', color: 'var(--text-secondary)' }}>
              Priority access to imported drops and limited runs.
            </p>
            {subscribed ? (
               <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255,255,255,0.1)' }}>
                 Verified. Welcome to YOXI.
               </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input type="email" className="newsletter-input" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} required />
                <button type="submit" className="newsletter-submit">Join</button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Home;