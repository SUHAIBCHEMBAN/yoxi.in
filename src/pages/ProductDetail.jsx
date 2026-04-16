import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc, collection, query, where, limit, getDocs } from 'firebase/firestore';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { Heart } from 'lucide-react';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const isWished = isInWishlist(id);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const pData = { id: docSnap.id, ...docSnap.data() };
          setProduct(pData);

          // Fetch related (same category)
          const q = query(
            collection(db, "products"), 
            where("category", "==", pData.category),
            limit(4)
          );
          const relatedSnap = await getDocs(q);
          setRelatedProducts(relatedSnap.docs.filter(d => d.id !== id).map(d => ({ id: d.id, ...d.data() })));
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndRelated();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart({ ...product, size: selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyCenter: 'center', background: 'var(--bg-primary)', color: '#fff' }}>
      <div className="container text-center">Loading silhouettes...</div>
    </div>
  );

  if (!product) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyCenter: 'center', background: 'var(--bg-primary)', color: '#fff' }}>
      <div className="container text-center">Product not found.</div>
    </div>
  );

  // Default images if none provided
  const images = product.images || [product.image];

  return (
    <div className="product-detail-page">
      
      {/* ── BREADCRUMBS ── */}
      <div className="pd-breadcrumbs-section">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link> <span>/</span>
            <Link to="/shop">Shop</Link> <span>/</span>
            <Link to="/shop">{product.category}</Link> <span>/</span>
            <span className="current">{product.name}</span>
          </div>
        </div>
      </div>

      {/* ── MAIN PRODUCT DISPLAY ── */}
      <section className="pd-main section-padding" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="pd-grid">
            
            {/* Gallery Side */}
            <AnimatedSection animation="fadeUp" className="pd-gallery">
              <div className="pd-main-img-wrap">
                <img src={images[activeImage]} alt={product.name} className="pd-main-img" />
              </div>
              <div className="pd-thumbnails">
                {images.map((img, idx) => (
                  <button 
                    key={idx} 
                    className={`pd-thumb-btn ${activeImage === idx ? 'active' : ''}`}
                    onClick={() => setActiveImage(idx)}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} />
                  </button>
                ))}
              </div>
            </AnimatedSection>

            {/* Info Side */}
            <AnimatedSection animation="slideInRight" delay={0.15} className="pd-info">
              <span className="pd-category-label">{product.category}</span>
              <h1 className="pd-title">{product.name}</h1>
              <p className="pd-price">{product.price}</p>
              
              <div className="pd-divider" />
              
              <div className="pd-description">
                <p>{product.description}</p>
              </div>

              {/* Size Selector */}
              <div className="pd-size-selector">
                <div className="pd-size-header">
                  <span className="pd-option-label">Select Size</span>
                  <Link to="/services" className="pd-size-guide-link">Size Guide</Link>
                </div>
                <div className="pd-sizes">
                  {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <button
                      key={size}
                      className={`pd-size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pd-actions">
                <Button 
                  variant="primary" 
                  className={`add-to-cart-btn ${added ? 'added' : ''}`}
                  onClick={handleAddToCart}
                >
                  {added ? 'Added to Bag ✓' : 'Add to Bag'}
                </Button>
                <button 
                  className={`wishlist-btn-large ${isWished ? 'active' : ''}`}
                  onClick={handleWishlist}
                >
                  <Heart size={20} strokeWidth={1.5} fill={isWished ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className="pd-divider" />

              {/* Product Details List */}
              {product.details && product.details.length > 0 && (
                <div className="pd-details-box">
                  <h3 className="pd-details-title">Details &amp; Care</h3>
                  <ul className="pd-details-list">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Shipping Note */}
              <div className="pd-shipping-note">
                <span>Free express delivery across Kerala. Dispatches within 24 hours.</span>
              </div>

            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      {relatedProducts.length > 0 && (
        <section className="pd-related section-padding">
          <div className="container">
            <AnimatedSection animation="fadeUp">
              <h2 className="section-title text-center" style={{ marginBottom: '3rem' }}>Complete the Look</h2>
            </AnimatedSection>
            <div className="product-grid grid-3">
              {relatedProducts.map((p, idx) => (
                <AnimatedSection key={p.id} animation="fadeUp" delay={idx * 0.15}>
                  <ProductCard product={p} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
