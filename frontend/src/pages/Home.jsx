/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, MapPin, HeartHandshake } from 'lucide-react';

const Home = () => {
  return (
    <div className="page-wrapper container">
      <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '60px' }} className="animate-fade-in">
        <h1 className="heading-xl">
          Empowering Your <br /> Local Community
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 32px' }}>
          Connect with neighbors, report lost items, and organize community help requests all in one place.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/register" className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '1.1rem' }}>
            Join Now
          </Link>
          <Link to="/help" className="btn btn-secondary" style={{ padding: '12px 28px', fontSize: '1.1rem' }}>
            Explore Requests
          </Link>
        </div>
      </div>

      <div className="grid grid-3 animate-fade-in delay-200">
        <div className="glass-card">
          <div style={{ background: 'rgba(99, 102, 241, 0.2)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <MapPin color="var(--primary)" size={24} />
          </div>
          <h3 className="heading-md">Find & Lost Items</h3>
          <p style={{ color: 'var(--text-muted)' }}>Lost something valuable? Or found an item? Easily post and connect with the owner through our secure platform.</p>
        </div>
        
        <div className="glass-card">
          <div style={{ background: 'rgba(236, 72, 153, 0.2)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <HeartHandshake color="var(--secondary)" size={24} />
          </div>
          <h3 className="heading-md">Community Help</h3>
          <p style={{ color: 'var(--text-muted)' }}>Request assistance for local events, emergencies, or daily chores, and let your neighbors lend a helping hand.</p>
        </div>

        <div className="glass-card">
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <Shield color="var(--success)" size={24} />
          </div>
          <h3 className="heading-md">Secure & Trusted</h3>
          <p style={{ color: 'var(--text-muted)' }}>A safe environment for all community members. Verified accounts and secure communication built-in.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
