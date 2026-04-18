import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('yoxi_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('yoxi_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const pData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(pData);

        // Sync cart stock after products are loaded
        setCart(prevCart => prevCart.map(item => {
          const match = pData.find(p => p.id === item.id);
          if (match && match.variants) {
            const variant = match.variants.find(v => v.size === item.size && v.color === item.color);
            return { ...item, maxStock: variant ? variant.stock : 99 };
          }
          return item;
        }));
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('yoxi_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('yoxi_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => 
        item.id === product.id && 
        item.size === product.size && 
        item.color === product.color
      );
      if (exists) {
        return prev.map(item => 
          (item.id === product.id && item.size === product.size && item.color === product.color)
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selected: true }];
    });
  };

  const updateQuantity = (productId, delta, size, color) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId && item.size === size && item.color === color) {
        const max = item.maxStock || 99;
        const newQty = Math.max(1, Math.min(max, item.quantity + delta));
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (productId, size, color) => {
    setCart(prev => prev.filter(item => 
      !(item.id === productId && item.size === size && item.color === color)
    ));
  };

  const clearCart = () => setCart([]);

  const removeSelectedFromCart = () => {
    setCart(prev => prev.filter(item => !item.selected));
  };

  const toggleSelection = (productId, size, color) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId && item.size === size && item.color === color) {
        return { ...item, selected: !item.selected };
      }
      return item;
    }));
  };

  const toggleAllSelection = (isSelected) => {
    setCart(prev => prev.map(item => ({ ...item, selected: isSelected })));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const cartTotal = cart
    .filter(item => item.selected)
    .reduce((acc, item) => {
      const priceNum = parseInt(item.price.replace(/[^\d]/g, ''));
      return acc + (priceNum * item.quantity);
    }, 0);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <ShopContext.Provider value={{
      cart,
      wishlist,
      searchQuery,
      setSearchQuery,
      products,
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleSelection,
      toggleAllSelection,
      clearCart,
      removeSelectedFromCart,
      toggleWishlist,
      isInWishlist,
      cartCount,
      wishlistCount,
      cartTotal
    }}>
      {children}
    </ShopContext.Provider>
  );
};
