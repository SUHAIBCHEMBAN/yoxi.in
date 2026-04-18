import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import AnimatedSection from '../components/AnimatedSection';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, toggleSelection, toggleAllSelection } = useShop();

  const allSelected = cart.length > 0 && cart.every(item => item.selected);
  const selectedCount = cart.filter(item => item.selected).length;

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <AnimatedSection animation="fadeUp" className="cart-empty">
            <h2>Your bag is empty</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
              Looks like you haven't added anything to your collection yet.
            </p>
            <Link to="/shop" className="hero-cta-primary" style={{ display: 'inline-flex' }}>
              Explore Collection
            </Link>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <AnimatedSection animation="fadeUp">
          <h1 className="cart-title">
            Shopping Bag
            {cart.length > 0 && (
              <div className="cart-select-all">
                <button 
                  className={`select-box ${allSelected ? 'active' : ''}`}
                  onClick={() => toggleAllSelection(!allSelected)}
                >
                  {allSelected && <Check size={14} />}
                </button>
                <span>Select All ({cart.length})</span>
              </div>
            )}
          </h1>
        </AnimatedSection>

        <div className="cart-layout">
          {/* Items List */}
          <div className="cart-items">
            {cart.map((item, idx) => {
              const itemImage = item.image || (item.images && item.images[0]) || '/placeholder.jpg';
              const uniqueKey = `${item.id}-${item.size || 'M'}-${item.color || 'default'}-${idx}`;
              
              return (
                <AnimatedSection key={uniqueKey} animation="fadeUp" delay={idx * 0.1} className={`cart-item ${!item.selected ? 'unselected' : ''}`}>
                  <button 
                    className={`select-box ${item.selected ? 'active' : ''}`}
                    onClick={() => toggleSelection(item.id, item.size, item.color)}
                  >
                    {item.selected && <Check size={14} />}
                  </button>
                  <div 
                    className="cart-item-img-wrapper"
                    style={{ 
                      backgroundImage: `url(${itemImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <img 
                      src={itemImage} 
                      alt={item.name} 
                      className="cart-item-img"
                      style={{ 
                        opacity: 0,
                        transition: 'opacity 0.5s ease-in-out'
                      }}
                      onLoad={(e) => {
                        e.target.style.opacity = '1';
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Size: {item.size || 'M'} · {item.category}</p>
                      <div className="qty-controls">
                        <button className="qty-btn" onClick={() => updateQuantity(item.id, -1, item.size, item.color)}><Minus size={14}/></button>
                        <span className="qty-num">{item.quantity}</span>
                        <button 
                          className={`qty-btn ${item.quantity >= (item.maxStock || 99) ? 'disabled' : ''}`} 
                          onClick={() => updateQuantity(item.id, 1, item.size, item.color)}
                          disabled={item.quantity >= (item.maxStock || 99)}
                        >
                          <Plus size={14}/>
                        </button>
                      </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <button className="remove-item-btn" onClick={() => removeFromCart(item.id, item.size, item.color)} style={{ marginBottom: '1.5rem' }}>
                      <Trash2 size={18} strokeWidth={1.5} />
                    </button>
                    <p className="cart-item-price">{item.price}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Summary */}
          <AnimatedSection animation="slideInRight" delay={0.2} className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span style={{ color: '#4ADE80' }}>Free</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <Link 
              to={selectedCount > 0 ? "/checkout" : "#"} 
              className={`checkout-btn ${selectedCount === 0 ? 'disabled' : ''}`} 
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={(e) => selectedCount === 0 && e.preventDefault()}
            >
              {selectedCount === 0 ? 'Select items to checkout' : `Checkout (${selectedCount})`} <ArrowRight size={18} style={{ marginLeft: '1rem' }} />
            </Link>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '1.5rem', textAlign: 'center' }}>
              Secure 256-bit SSL Encrypted Payment
            </p>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Cart;
