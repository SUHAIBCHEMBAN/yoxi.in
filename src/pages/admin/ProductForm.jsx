import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebase/config';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';
import AnimatedSection from '../../components/AnimatedSection';
import Button from '../../components/Button';
import { Upload, X, Check, Trash2 } from 'lucide-react';
import './Admin.css';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Shirts',
    tag: '',
    description: '',
    details: ''
  });

  const [variants, setVariants] = useState([]);
  const [newVariant, setNewVariant] = useState({ size: '', color: '', stock: '' });

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({ 
            name: data.name || '',
            price: data.price || '',
            category: data.category || 'Shirts',
            tag: data.tag || '',
            description: data.description || '',
            details: Array.isArray(data.details) ? data.details.join('\n') : (data.details || '')
          });
          setVariants(data.variants || []);
          const imgs = data.images || (data.image ? [data.image] : []);
          setExistingImages(imgs);
          setPreviews(imgs);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const addVariant = () => {
    if (!newVariant.size || !newVariant.color || !newVariant.stock) {
      alert("Please fill all variant fields (Size, Color, Stock)");
      return;
    }
    setVariants([...variants, { ...newVariant, stock: parseInt(newVariant.stock) }]);
    setNewVariant({ size: '', color: '', stock: '' });
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setNewImageFiles(prev => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
    
    // If it's an existing image
    if (index < existingImages.length) {
      setExistingImages(prev => prev.filter((_, i) => i !== index));
    } else {
      // If it's a new file
      const newFileIndex = index - existingImages.length;
      setNewImageFiles(prev => prev.filter((_, i) => i !== newFileIndex));
    }
  };

  const uploadImages = async () => {
    const uploadPromises = newImageFiles.map(file => {
      return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          null,
          (error) => reject(error),
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          }
        );
      });
    });

    const newUrls = await Promise.all(uploadPromises);
    return [...existingImages, ...newUrls];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Auto-add URL if something is in the box but not "Added"
    let updatedExistingImages = [...existingImages];
    if (imgUrl && imgUrl.startsWith('http')) {
      updatedExistingImages = [...updatedExistingImages, imgUrl];
    }

    if (previews.length === 0 && !imgUrl) {
      alert("Please upload or add at least one image URL.");
      return;
    }
    
    setLoading(true);
    try {
      const uploadPromises = newImageFiles.map(file => {
        return new Promise((resolve, reject) => {
          const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on('state_changed', null, (error) => reject(error), async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          });
        });
      });

      const newUrls = await Promise.all(uploadPromises);
      const allImageUrls = [...updatedExistingImages, ...newUrls];
      
      const processedData = {
        ...formData,
        images: allImageUrls,
        image: allImageUrls[0], // Main thumbnail
        variants: variants,
        details: formData.details ? formData.details.split('\n').filter(line => line.trim() !== '') : []
      };

      if (id) {
        await updateDoc(doc(db, "products", id), processedData);
      } else {
        await addDoc(collection(db, "products"), processedData);
      }
      navigate('/admin/dashboard');
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Error saving record. Check your console for details.");
    } finally {
      setLoading(false);
    }
  };

  const [imgUrl, setImgUrl] = useState('');

  const addImageUrl = () => {
    if(!imgUrl) return;
    
    // Simple validation
    if (!imgUrl.startsWith('http')) {
      alert("Please paste a valid image address starting with http or https");
      return;
    }

    setPreviews(prev => [...prev, imgUrl]);
    setExistingImages(prev => [...prev, imgUrl]);
    setImgUrl('');
    console.log("Added Image URL:", imgUrl);
  };

  return (
    <div className="dashboard-page">
      <div className="container" style={{ maxWidth: '900px' }}>
        <AnimatedSection animation="fadeUp">
          <h1 className="admin-title">{id ? 'Edit Product' : 'Add New Product'}</h1>
          <p className="admin-subtitle" style={{ marginBottom: '3rem' }}>
            Populate your curated inventory with high-resolution imagery and detailed specifications.
          </p>
          
          <form className="form-card admin-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Product Name</label>
              <input name="name" value={formData.name} onChange={handleChange} required placeholder="Oversized Boxy Tee" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div className="form-group">
                <label>Price</label>
                <input name="price" value={formData.price} onChange={handleChange} required placeholder="₹2,499" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="Shirts">Shirts</option>
                  <option value="Trousers">Trousers</option>
                  <option value="Imported">Imported</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Inventory Gallery</label>
              
              <div className="image-url-adder" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                <input 
                  type="text" 
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addImageUrl();
                    }
                  }}
                  placeholder="Paste external image URL (Unsplash, Pinterest, etc.)" 
                  style={{ flex: 1 }}
                />
                <button 
                  type="button" 
                  className="add-v-btn" 
                  style={{ height: 'auto' }}
                  onClick={addImageUrl}
                >
                  Add URL
                </button>
              </div>

              <div className="multi-upload-container">
                <div className="previews-grid">
                  {previews.map((src, idx) => (
                    <div key={idx} className="preview-item">
                      <img src={src} alt="Preview" />
                      <button type="button" className="remove-preview" onClick={() => removeImage(idx)}>
                        <X size={14} />
                      </button>
                      {idx === 0 && <span className="main-label">Main Image</span>}
                    </div>
                  ))}
                  <label className="add-more-btn">
                    <input type="file" multiple onChange={handleFileChange} hidden accept="image/*" />
                    <Upload size={20} />
                    <span>Upload File</span>
                  </label>
                </div>
              </div>
            </div>

            {/* VARIANTS SECTION */}
            <div className="form-group variant-section">
              <label>Product Variants & Stock</label>
              <div className="variant-adder">
                <input 
                  placeholder="Size (S, M, L, etc)" 
                  value={newVariant.size} 
                  onChange={(e) => setNewVariant({...newVariant, size: e.target.value})}
                />
                <input 
                  placeholder="Color (Black, White, etc)" 
                  value={newVariant.color} 
                  onChange={(e) => setNewVariant({...newVariant, color: e.target.value})}
                />
                <input 
                  type="number" 
                  placeholder="Stock" 
                  value={newVariant.stock} 
                  onChange={(e) => setNewVariant({...newVariant, stock: e.target.value})}
                />
                <button type="button" onClick={addVariant} className="add-v-btn">Add Variant</button>
              </div>

              {variants.length > 0 && (
                <div className="variants-list">
                  {variants.map((v, i) => (
                    <div key={i} className="variant-tag">
                      <span>{v.size} - {v.color} ({v.stock})</span>
                      <button type="button" onClick={() => removeVariant(i)}><X size={12}/></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Badge/Tag (Optional)</label>
              <input name="tag" value={formData.tag} onChange={handleChange} placeholder="New Season, Limited, etc." />
            </div>

            <div className="form-group">
              <label>Broad Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Crafted for the modern Kerala silhouette..." />
            </div>

            <div className="form-group">
              <label>Details & Specs (One per line)</label>
              <textarea name="details" value={formData.details} onChange={handleChange} rows="6" placeholder="Natural Linen\nReinforced seams\nDropped shoulder" />
            </div>

            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
              <Button type="submit" variant="primary" style={{ flex: 1 }} disabled={loading}>
                {loading ? 'Publishing Changes...' : id ? 'Update Product' : 'Add to Collection'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/admin/dashboard')}>
                Discard
              </Button>
            </div>
          </form>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ProductForm;
