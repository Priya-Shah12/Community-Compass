/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ShieldAlert, Users, Phone, MapPin, CheckCircle, PlusCircle } from 'lucide-react';

const CommunityHelp = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [volunteerForm, setVolunteerForm] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'general',
    description: '',
    location: '',
    urgency: 'medium',
    contactName: user?.name || '',
    contactPhone: user?.mobile || ''
  });

  const [vData, setVData] = useState({
    name: user?.name || '',
    phone: user?.mobile || '',
    message: ''
  });

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/requests');
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please login to post a request');
    
    try {
      await axios.post('http://localhost:5000/api/requests', formData);
      setShowForm(false);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const handleResolve = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/${id}/resolve`);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const handleVolunteer = async (e, reqId) => {
    e.preventDefault();
    if (!user) return alert('Please login to volunteer');
    
    try {
      await axios.post(`http://localhost:5000/api/requests/${reqId}/volunteer`, vData);
      setVolunteerForm(null);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="page-wrapper container"><div style={{ textAlign: 'center', marginTop: '40px' }}>Loading...</div></div>;

  return (
    <div className="page-wrapper container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 className="heading-lg" style={{ marginBottom: 0 }}>Community Help</h2>
        {user && (
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            <PlusCircle size={20} /> {showForm ? 'Cancel' : 'Request Help'}
          </button>
        )}
      </div>

      {showForm && (
        <div className="glass-card animate-fade-in" style={{ marginBottom: '40px' }}>
          <h3 className="heading-md">Post a Help Request</h3>
          <form onSubmit={handleSubmit} className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Title</label>
              <input type="text" required className="form-input" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g., Need help moving boxes" />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option value="general">General Help</option>
                <option value="emergency">Emergency</option>
                <option value="event">Community Event</option>
                <option value="errand">Errand</option>
              </select>
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Description</label>
              <textarea required className="form-input" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Provide details..."></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Urgency</label>
              <select className="form-select" value={formData.urgency} onChange={(e) => setFormData({...formData, urgency: e.target.value})}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input type="text" required className="form-input" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="Where?" />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Name</label>
              <input type="text" required className="form-input" value={formData.contactName} onChange={(e) => setFormData({...formData, contactName: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Phone</label>
              <input type="text" required className="form-input" value={formData.contactPhone} onChange={(e) => setFormData({...formData, contactPhone: e.target.value})} />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>Submit Request</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-2">
        {requests.map(req => (
          <div key={req.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className={`badge ${req.urgency === 'critical' || req.urgency === 'high' ? 'badge-urgent' : 'badge-active'}`}>
                {req.urgency.toUpperCase()} URGENCY
              </span>
              <span className={`badge ${req.status === 'resolved' ? 'badge-resolved' : 'badge-active'}`}>
                {req.status.toUpperCase()}
              </span>
            </div>
            
            <h3 className="heading-md" style={{ marginBottom: '8px' }}>{req.title}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '16px', flex: 1 }}>{req.description}</p>
            
            <div className="grid grid-2" style={{ gap: '12px', marginBottom: '20px', fontSize: '0.9rem', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} color="var(--primary)"/> {req.location}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldAlert size={16} color="var(--secondary)"/> {req.category}</div>
              {user && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={16} color="var(--success)"/> {req.contactName}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} color="var(--text-main)"/> {req.contactPhone}</div>
                </>
              )}
            </div>

            {req.volunteers && req.volunteers.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--text-muted)' }}>Volunteers ({req.volunteers.length}):</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {req.volunteers.map(v => (
                    <span key={v.id} style={{ background: 'var(--surface-light)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem' }}>
                      {v.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {user && req.status !== 'resolved' && (
              <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                <button onClick={() => setVolunteerForm(req.id)} className="btn btn-primary" style={{ flex: 1 }}>
                  Volunteer to Help
                </button>
                <button onClick={() => handleResolve(req.id)} className="btn btn-success" style={{ flex: 1 }}>
                  <CheckCircle size={18} /> Resolve
                </button>
              </div>
            )}

            {volunteerForm === req.id && (
              <form onSubmit={(e) => handleVolunteer(e, req.id)} style={{ marginTop: '16px', padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                <div className="form-group">
                  <label className="form-label">Message (Optional)</label>
                  <textarea className="form-input" style={{ minHeight: '60px' }} value={vData.message} onChange={e => setVData({...vData, message: e.target.value})} placeholder="I can help with..."></textarea>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Confirm</button>
                  <button type="button" onClick={() => setVolunteerForm(null)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        ))}
        {requests.length === 0 && <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1', textAlign: 'center' }}>No requests at the moment.</p>}
      </div>
    </div>
  );
};

export default CommunityHelp;
