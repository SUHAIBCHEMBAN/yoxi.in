import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../../components/AnimatedSection';
import Button from '../../components/Button';
import './Admin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid credentials or network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page login-bg">
      <div className="container">
        <AnimatedSection animation="fadeUp" className="admin-login-card">
          <h1 className="admin-title">Admin Access</h1>
          <p className="admin-subtitle">Secure gateway for YOXI Management</p>
          
          {error && <div className="admin-error">{error}</div>}
          
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="admin@yoxi.in"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="••••••••"
              />
            </div>
            <Button 
              type="submit" 
              variant="primary" 
              className="admin-submit"
              disabled={loading}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default AdminLogin;
