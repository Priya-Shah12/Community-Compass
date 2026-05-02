/* eslint-disable */
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', age: '', mobile: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/register', formData);
      login(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="page-wrapper container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="heading-lg" style={{ textAlign: 'center' }}>Create Account</h2>
        {error && <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', color: 'var(--danger)', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" required className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Age</label>
              <input type="number" required className="form-input" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} placeholder="25" />
            </div>
            <div className="form-group" style={{ flex: 2 }}>
              <label className="form-label">Mobile Number</label>
              <input type="text" required className="form-input" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} placeholder="+1 234 567 8900" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" required className="form-input" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" required className="form-input" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="Create a password" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>Sign Up</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
