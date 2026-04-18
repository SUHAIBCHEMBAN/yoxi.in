import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, X, Heart, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import './Navbar.css';

const Navbar = () => {
  const { cartCount, wishlistCount, searchQuery, setSearchQuery, products } = useShop();
  const [isScrolled, setIsScrolled]     = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen]     = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const filteredResults = searchQuery.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8); // Show up to 8 results

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
          
          {/* 1. Desktop Left / Mobile Hamburger */}
          <div className="nav-left">
            <ul className="nav-links desktop-only">
              {navLinks.slice(0, 2).map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              className="hamburger mobile-only"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className={`bar bar-top ${mobileMenuOpen ? 'open' : ''}`} />
              <span className={`bar bar-mid ${mobileMenuOpen ? 'open' : ''}`} />
              <span className={`bar bar-bot ${mobileMenuOpen ? 'open' : ''}`} />
            </button>
          </div>

          {/* 2. Centre logo */}
          <Link to="/" className="logo">
            <span className="logo-text">YOXI</span>
            <span className="logo-sub">Premium Essentials</span>
          </Link>

          {/* 3. Desktop Right Links + Actions / Mobile Actions */}
          <div className="nav-right">
            <ul className="nav-links desktop-only">
              {navLinks.slice(2).map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="nav-actions">
              <button className="icon-btn search-trigger" onClick={() => setSearchOpen(!searchOpen)}>
                <Search size={18} strokeWidth={1.5} />
              </button>
              <Link to="/wishlist" className="icon-btn desktop-only" aria-label="Wishlist">
                <Heart size={18} strokeWidth={1.5} />
                {wishlistCount > 0 && <span className="cart-dot empty" />}
              </Link>
              <Link to="/cart" className="icon-btn" aria-label="Cart">
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && <span className="cart-dot">{cartCount}</span>}
              </Link>
            </div>
          </div>
        </div>

        {/* Search bar overlay */}
        <div className={`search-bar ${searchOpen ? 'open' : ''}`}>
          <div className="search-inner">
            <Search size={18} strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSearchOpen(false);
                  navigate('/shop');
                }
              }}
              autoFocus={searchOpen}
            />
            <button onClick={() => {setSearchOpen(false); setSearchQuery('');}} className="search-close">
              <X size={18} />
            </button>
          </div>

          {searchQuery && (
            <div className="search-results-container">
              {filteredResults.length > 0 ? (
                <div className="search-results">
                  {filteredResults.map(product => (
                    <Link 
                      key={product.id} 
                      to={`/product/${product.id}`} 
                      className="search-result-item"
                      onClick={() => setSearchOpen(false)}
                    >
                      <img src={product.image} alt={product.name} className="search-result-img" />
                      <div className="search-result-info">
                        <span className="search-result-name">{product.name}</span>
                        <span className="search-result-price">{product.price}</span>
                      </div>
                    </Link>
                  ))}
                  <div className="view-all-results">
                    <button 
                      className="view-all-btn"
                      onClick={() => {
                        setSearchOpen(false);
                        navigate('/shop');
                      }}
                    >
                      View All Results <ArrowRight size={14} style={{ marginLeft: '8px' }} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="search-results-empty">
                  No products found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
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