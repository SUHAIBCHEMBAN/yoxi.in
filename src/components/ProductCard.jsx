import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  const isWished = isInWishlist(product.id);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id || 1}`} className="product-image-wrapper">
        {product.tag && (
          <span className={`product-badge ${product.tag === 'Limited' ? 'product-badge--gold' : ''}`}>
            {product.tag}
          </span>
        )}
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        <div className="product-overlay">
          <button className="quick-shop-btn" onClick={handleAdd}>
            <ShoppingBag size={14} strokeWidth={1.5} />
            <span>{added ? 'Added!' : 'Add to Bag'}</span>
          </button>
        </div>
        <button
          className={`wishlist-btn ${isWished ? 'wished' : ''}`}
          onClick={handleWishlist}
          aria-label="Wishlist"
        >
          <Heart size={15} strokeWidth={1.5} fill={isWished ? 'currentColor' : 'none'} />
        </button>
      </Link>
      <div className="product-info">
        <h3 className="product-name">
          <Link to={`/product/${product.id || 1}`}>{product.name}</Link>
        </h3>
        <div className="product-price-row">
          <p className="product-price">{product.price}</p>
          {product.category && <span className="product-cat">{product.category}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
