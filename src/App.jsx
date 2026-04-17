import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';

// Admin Imports
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductForm from './pages/admin/ProductForm';

import { ShopProvider } from './context/ShopContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/admin/login" />;
  return children;
};

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Standard Storefront with Layout */}
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  
                  {/* Catch-all to Home */}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Layout>
            } />

            {/* Admin Portal (Isolated from Main Layout) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute><AdminDashboard /></ProtectedRoute>
            } />
            <Route path="/admin/add-product" element={
              <ProtectedRoute><ProductForm /></ProtectedRoute>
            } />
            <Route path="/admin/edit-product/:id" element={
              <ProtectedRoute><ProductForm /></ProtectedRoute>
            } />
          </Routes>
        </Router>
      </ShopProvider>
    </AuthProvider>
  );
}

export default App;
