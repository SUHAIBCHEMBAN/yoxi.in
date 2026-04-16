import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FaInstagram, FaXTwitter, FaYoutube, FaPinterest } from 'react-icons/fa6';
import './Footer.css';

const Footer = () => {
  const [email, setEmail]         = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="footer">

      {/* ── TOP MARQUEE ── */}
      <div className="footer-marquee" aria-hidden="true">
        <div className="fm-track">
          {Array(8).fill(null).map((_, i) => (
            <span key={i} className="fm-item">
              SHIRTS &amp; PANTS · YOXI · OVERSIZED FITS · IMPORTED STYLES · KERALA FASHION · NEW ARRIVALS ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="footer-body container">
        <div className="footer-grid">
          {/* ── BRAND ── */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">YOXI</Link>
            <p className="footer-tagline">
              Shirts and trousers for the modern Kerala man — curated from
              India and around the world, delivered to your door.
            </p>
            <div className="social-row">
              <a href="#" aria-label="Instagram" className="social-link"><FaInstagram size={16} /></a>
              <a href="#" aria-label="YouTube"   className="social-link"><FaYoutube size={16} /></a>
              <a href="#" aria-label="Pinterest" className="social-link"><FaPinterest size={16} /></a>
              <a href="#" aria-label="X Twitter" className="social-link"><FaXTwitter size={16} /></a>
            </div>
          </div>

          {/* ── SHOP ── */}
          <div className="footer-col">
            <p className="footer-col-heading">Shop</p>
            <ul className="footer-col-links">
              <li><Link to="/shop">New Arrivals</Link></li>
              <li><Link to="/shop">Shirts</Link></li>
              <li><Link to="/shop">Trousers</Link></li>
              <li><Link to="/shop">Imported Picks</Link></li>
            </ul>
          </div>

          {/* ── COMPANY ── */}
          <div className="footer-col">
            <p className="footer-col-heading">Company</p>
            <ul className="footer-col-links">
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/about">The Team</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* ── NEWSLETTER ── */}
          <div className="footer-col footer-newsletter">
            <p className="footer-col-heading">Join the List</p>
            <p className="newsletter-sub">
              Access limited drops and early releases.
            </p>
            {subscribed ? (
              <p className="subscribed-msg">You're on the list.</p>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} YOXI. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link to="/">Privacy</Link>
            <Link to="/">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;