import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import AnimatedSection from '../components/AnimatedSection';
import ProductCard from '../components/ProductCard';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <AnimatedSection animation="fadeUp" className="wishlist-empty">
            <h2>Your wishlist is empty</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
              Save your favorite pieces here to keep an eye on them.
            </p>
            <Link to="/shop" className="hero-cta-primary" style={{ display: 'inline-flex' }}>
              Go Shopping
            </Link>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <AnimatedSection animation="fadeUp">
          <h1 className="wishlist-title">My Favorites</h1>
        </AnimatedSection>

        <div className="wishlist-grid">
          {wishlist.map((product, idx) => (
            <AnimatedSection key={product.id} animation="fadeUp" delay={idx * 0.1}>
              <ProductCard product={product} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
