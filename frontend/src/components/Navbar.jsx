/* eslint-disable */
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Compass, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, padding: '16px 0', borderBottom: '1px solid var(--border)', background: 'var(--glass-bg)', backdropFilter: 'blur(12px)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem', fontWeight: 'bold' }}>
          <Compass className="text-gradient" size={28} />
          <span>Community <span className="text-gradient">Compass</span></span>
        </Link>
        
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link to="/find-lost" style={{ fontWeight: 500, transition: 'color 0.2s' }}>Find/Lost Items</Link>
          <Link to="/help" style={{ fontWeight: 500, transition: 'color 0.2s' }}>Community Help</Link>
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: '16px', paddingLeft: '16px', borderLeft: '1px solid var(--border)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                <User size={18} /> {user.name}
              </span>
              <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '6px 12px' }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '12px', marginLeft: '16px' }}>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
