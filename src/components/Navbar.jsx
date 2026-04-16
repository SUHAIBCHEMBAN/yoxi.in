import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, X, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import './Navbar.css';

const Navbar = () => {
  const { cartCount, wishlistCount, searchQuery, setSearchQuery } = useShop();
  const [isScrolled, setIsScrolled]     = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen]     = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home',       path: '/' },
    { name: 'Shop All',   path: '/shop' },
    { name: 'About',      path: '/about' },
    { name: 'Services',   path: '/services' },
    { name: 'Contact',    path: '/contact' },
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">

          {/* Left links */}
          <ul className="nav-links">
            {navLinks.slice(0, 2).map((link) => (
              <li key={link.name}>
                <Link to={link.path} className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Centre logo */}
          <Link to="/" className="logo">
            <span className="logo-text">YOXI</span>
            <span className="logo-sub">Premiun Essentials</span>
          </Link>

          {/* Right links + actions */}
          <div className="nav-right">
            <ul className="nav-links">
              {navLinks.slice(2).map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="nav-actions">
              <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}>
                <Search size={18} strokeWidth={1.5} />
              </button>
              <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
                <Heart size={18} strokeWidth={1.5} />
                {wishlistCount > 0 && <span className="cart-dot empty" />}
              </Link>
              <Link to="/cart" className="icon-btn" aria-label="Cart">
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && <span className="cart-dot">{cartCount}</span>}
              </Link>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="nav-mobile-controls">
            <button className="icon-btn search-trigger" onClick={() => setSearchOpen(!searchOpen)}>
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link to="/cart" className="icon-btn" aria-label="Cart">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && <span className="cart-dot">{cartCount}</span>}
            </Link>
            <button
              className="hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className={`bar bar-top ${mobileMenuOpen ? 'open' : ''}`} />
              <span className={`bar bar-mid ${mobileMenuOpen ? 'open' : ''}`} />
              <span className={`bar bar-bot ${mobileMenuOpen ? 'open' : ''}`} />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className={`search-bar ${searchOpen ? 'open' : ''}`}>
          <div className="search-inner">
            <Search size={18} strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={searchOpen}
            />
            <button onClick={() => {setSearchOpen(false); setSearchQuery('');}} className="search-close">
              <X size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              to={link.path}
              className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              <span className="mobile-link-num">0{i + 1}</span>
              <span className="mobile-link-label">{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;