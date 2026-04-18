import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { doc } from 'firebase/firestore';
import AnimatedSection from '../components/AnimatedSection';
import './Checkout.css';

const Checkout = () => {
  const { cart, cartTotal, removeSelectedFromCart } = useShop();
  const navigate = useNavigate();

  const selectedItems = cart.filter(item => item.selected);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  if (selectedItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Construct WhatsApp Message
    const whatsappNumber = '919207806956';
    let message = `*NEW ORDER - YOXI*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${formData.fullName}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Address: ${formData.address}, ${formData.city} - ${formData.pincode}\n\n`;
    
    message += `*Order Items:*\n`;
    selectedItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (Size: ${item.size || 'M'}) x ${item.quantity} - ₹${item.price}\n`;
    });
    
    message += `\n*Total Amount: ₹${cartTotal.toLocaleString()}*`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // ── FIREBASE STOCK DEDUCTION ──
    try {
      const { runTransaction } = await import('firebase/firestore');
      const { db } = await import('../firebase/config');
      
      await runTransaction(db, async (transaction) => {
        for (const item of selectedItems) {
          const productRef = doc(db, "products", item.id);
          const productDoc = await transaction.get(productRef);
          
          if (productDoc.exists()) {
            const data = productDoc.data();
            if (data.variants && data.variants.length > 0) {
              const updatedVariants = data.variants.map(v => {
                if (v.size === item.size && v.color === item.color) {
                  return { ...v, stock: Math.max(0, v.stock - item.quantity) };
                }
                return v;
              });
              transaction.update(productRef, { variants: updatedVariants });
            }
          }
        }
      });
    } catch (err) {
      console.error("Stock update failed:", err);
      // We still proceed with the WhatsApp message even if stock logic fails
    }

    // Clear selected items and redirect to WhatsApp
    window.open(whatsappURL, '_blank');
    removeSelectedFromCart();
    navigate('/');
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <AnimatedSection animation="fadeUp">
          <h1 className="checkout-title">Checkout Details</h1>
        </AnimatedSection>

        <div className="checkout-layout">
          {/* Shipping Form */}
          <div className="checkout-form-container">
            <AnimatedSection animation="fadeUp" delay={0.1}>
              <form className="checkout-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    placeholder="Enter your full name" 
                    required 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="Enter mobile number" 
                    required 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="form-group">
                  <label>Delivery Address</label>
                  <textarea 
                    name="address" 
                    placeholder="Enter full address" 
                    required 
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input 
                      type="text" 
                      name="city" 
                      placeholder="City" 
                      required 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <input 
                      type="text" 
                      name="pincode" 
                      placeholder="Pincode" 
                      required 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
                <button type="submit" className="confirm-order-btn">
                  Confirm Order & WhatsApp
                </button>
              </form>
            </AnimatedSection>
          </div>

          {/* Order Summary Sidebar */}
          <div className="checkout-summary-container">
            <AnimatedSection animation="slideInRight" delay={0.2} className="checkout-summary">
              <h3>Order Summary</h3>
              <div className="checkout-items">
                {selectedItems.map((item, idx) => (
                  <div key={idx} className="summary-item">
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{(parseInt(item.price.replace(/[^\d]/g, '')) * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="summary-total-bar">
                <span>Total Amount</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <p className="payment-note">
                Note: You will be redirected to WhatsApp to share your order details and confirm payment method.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
