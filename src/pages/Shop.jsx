import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import AnimatedSection from '../components/AnimatedSection';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import './Shop.css';

const Shop = () => {
  const { searchQuery } = useShop();
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const pData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(pData);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', 'Shirts', 'Trousers', 'Imported'];

  const filtered = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="shop-page">
      {/* ── HERO ── */}
      <section className="shop-hero">
        <div className="shop-hero-bg" />
        <div className="container shop-hero-inner">
          <AnimatedSection animation="fadeUp">
            <p className="shop-hero-kicker">SS 2026 · New Season</p>
            <h1 className="shop-hero-title">The Collection</h1>
            <p className="shop-hero-sub">
              Explore our latest silhouettes, from oversized linen staples to imported tactical trousers.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── TOOLBAR ── */}
      <section className="shop-content section-padding" style={{ paddingTop: '3rem' }}>
        <div className="container">
          <div className="shop-toolbar">
            <div className="shop-categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="shop-filters">
              <span className="shop-count">{filtered.length} styles</span>
              <button className="filter-btn">Filter &amp; Sort</button>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-tertiary)' }}>
              Curating your collection...
            </div>
          ) : (
            <>
              {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-tertiary)' }}>
                  No styles matches your search.
                </div>
              ) : (
                <div className="product-grid grid-4">
                  {filtered.map((product, index) => (
                    <AnimatedSection key={product.id} animation="fadeUp" delay={(index % 4) * 0.08}>
                      <ProductCard product={product} />
                    </AnimatedSection>
                  ))}
                </div>
              )}
            </>
          )}

          <div className="load-more-wrap">
            <button className="load-more-btn">Load More Styles</button>
          </div>
        </div>
      </section>

      {/* ── VIP BANNER ── */}
      <section className="vip-promo">
        <div className="container">
          <AnimatedSection animation="fadeUp" className="vip-content">
            <p className="vip-kicker">Early Access</p>
            <h2 className="vip-title">Get New Drops First</h2>
            <p className="vip-desc">
              Sign up for early access to imported arrivals, oversized edits and trending styles.
            </p>
            <form className="vip-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your Email Address" required />
              <button type="submit">Join Now</button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Shop;
