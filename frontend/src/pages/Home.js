import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Main Banner */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
        <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80" alt="Internet Service" style={{ width: '100%', maxHeight: 320, objectFit: 'cover', borderRadius: 8 }} />
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Fast, Reliable Internet for Kenya</h1>
        <p style={{ fontSize: '1.2rem', color: '#8b949e' }}>Connecting you to the world with affordable, high-speed internet solutions.</p>
        <Link to="/services" className="btn">Learn More</Link>
      </section>

      {/* Services Overview */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Our Services</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div className="card" style={{ flex: 1 }}>
            <h3>Internet Cable Installation</h3>
            <p>Professional and fast installation for homes and businesses.</p>
          </div>
          <div className="card" style={{ flex: 1 }}>
            <h3>Maintenance & Support</h3>
            <p>24/7 customer support and on-site maintenance.</p>
          </div>
        </div>
      </section>

      {/* Pricing Plans Overview */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Pricing Plans</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div className="card" style={{ flex: 1 }}>
            <h4>Weekly</h4>
            <p>From KES 500/week<br />Up to 10 Mbps</p>
          </div>
          <div className="card" style={{ flex: 1 }}>
            <h4>Monthly</h4>
            <p>From KES 1,800/month<br />Up to 25 Mbps</p>
          </div>
          <div className="card" style={{ flex: 1 }}>
            <h4>Yearly</h4>
            <p>From KES 20,000/year<br />Up to 50 Mbps</p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Contact Us</h2>
        <div className="card">
          <p>Phone: +254 700 000000</p>
          <p>Email: info@nexuskenya.co.ke</p>
          <p>Address: 123 Nairobi Ave, Nairobi, Kenya</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
