/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle, Search, PlusCircle } from 'lucide-react';

const FindLost = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    type: 'lost',
    title: '',
    description: '',
    location: '',
    contactInfo: '',
    image: ''
  });

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/items');
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please login to post an item');
    
    try {
      await axios.post('http://localhost:5000/api/items', formData);
      setShowForm(false);
      setFormData({ type: 'lost', title: '', description: '', location: '', contactInfo: '', image: '' });
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleResolve = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/items/${id}/resolve`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <div className="page-wrapper container"><div style={{ textAlign: 'center', marginTop: '40px' }}>Loading...</div></div>;

  return (
    <div className="page-wrapper container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 className="heading-lg" style={{ marginBottom: 0 }}>Find & Lost Items</h2>
        {user && (
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            <PlusCircle size={20} /> {showForm ? 'Cancel' : 'Report Item'}
          </button>
        )}
      </div>

      {showForm && (
        <div className="glass-card animate-fade-in" style={{ marginBottom: '40px' }}>
          <h3 className="heading-md">Report an Item</h3>
          <form onSubmit={handleSubmit} className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Type</label>
              <select className="form-select" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input type="text" required className="form-input" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g., Blue Wallet" />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Description</label>
              <textarea required className="form-input" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Provide details..."></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input type="text" required className="form-input" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="Where was it lost/found?" />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Info</label>
              <input type="text" required className="form-input" value={formData.contactInfo} onChange={(e) => setFormData({...formData, contactInfo: e.target.value})} placeholder="Phone or Email" />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Image (Optional)</label>
              <input type="file" accept="image/*" className="form-input" onChange={handleImageChange} />
              {formData.image && <img src={formData.image} alt="Preview" style={{ marginTop: '10px', maxHeight: '100px', borderRadius: '8px' }} />}
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>Submit Report</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-3">
        {items.map(item => (
          <div key={item.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className={`badge ${item.type === 'lost' ? 'badge-urgent' : 'badge-active'}`}>
                {item.type.toUpperCase()}
              </span>
              <span className={`badge ${item.status === 'resolved' ? 'badge-resolved' : 'badge-active'}`}>
                {item.status.toUpperCase()}
              </span>
            </div>
            
            {item.image && (
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }} />
            )}
            
            <h3 className="heading-md" style={{ marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '16px', flex: 1 }}>{item.description}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={16} color="var(--primary)" /> <span>{item.location}</span>
              </div>
            </div>

            {user && item.status !== 'resolved' && (
              <button onClick={() => handleResolve(item.id)} className="btn btn-success" style={{ width: '100%' }}>
                <CheckCircle size={18} /> Mark as Resolved
              </button>
            )}
          </div>
        ))}
        {items.length === 0 && <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1', textAlign: 'center' }}>No items reported yet.</p>}
      </div>
    </div>
  );
};

export default FindLost;
