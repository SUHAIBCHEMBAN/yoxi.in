import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AnimatedSection from '../../components/AnimatedSection';
import './Admin.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        alert("Error deleting product");
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <AnimatedSection animation="fadeUp" className="dashboard-header">
          <div>
            <h1 className="admin-title">Inventory Control</h1>
            <p className="admin-subtitle">Managing {products.length} live products</p>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link to="/admin/add-product" className="btn btn-primary">Add New Item</Link>
            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.8rem 1.5rem' }}>Logout</button>
          </div>
        </AnimatedSection>

        {loading ? (
          <div className="text-center" style={{ color: '#fff', padding: '100px 0' }}>Syncing with Database...</div>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Tag</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, idx) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <img src={p.image} className="product-row-img" alt={p.name} />
                      <span>{p.name}</span>
                    </div>
                  </td>
                  <td>{p.category}</td>
                  <td>{p.price}</td>
                  <td>{p.tag || '-'}</td>
                  <td>
                    <div className="action-btns">
                      <Link to={`/admin/edit-product/${p.id}`} className="btn-edit">Edit</Link>
                      <button onClick={() => handleDelete(p.id)} className="btn-delete">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
