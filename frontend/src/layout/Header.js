import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
  const navigate = useNavigate();
  return (
    <header style={{ padding: '1rem 0', borderBottom: '1px solid #30363d' }}>
      <div className="main-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 600, fontSize: '1.3rem' }}>
          <img src={logo} alt="Nexus Internet Kenya Logo" style={{ height: 48, width: 'auto', borderRadius: 4, background: '#fff' }} />
          Nexus Internet Kenya
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          <button className="btn" onClick={() => navigate('/login')}>Login</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
