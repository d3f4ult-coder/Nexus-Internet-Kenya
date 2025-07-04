import React from 'react';

function Footer() {
  return (
    <footer style={{ padding: '2rem 0', borderTop: '1px solid #30363d', marginTop: '2rem' }}>
      <div className="main-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div>
          &copy; {new Date().getFullYear()} Nexus Internet Kenya. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="/legal/privacy" style={{ color: '#58a6ff' }}>Privacy Policy</a>
          <a href="/legal/terms" style={{ color: '#58a6ff' }}>Terms of Service</a>
          <a href="/legal/refund" style={{ color: '#58a6ff' }}>Refund Policy</a>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="#" aria-label="Twitter" style={{ color: '#58a6ff' }}>Twitter</a>
          <a href="#" aria-label="Facebook" style={{ color: '#58a6ff' }}>Facebook</a>
          <a href="#" aria-label="Instagram" style={{ color: '#58a6ff' }}>Instagram</a>
        </div>
        <div>
          Contact: <a href="mailto:info@nexuskenya.co.ke" style={{ color: '#58a6ff' }}>info@nexuskenya.co.ke</a> | +254 700 000000
        </div>
      </div>
    </footer>
  );
}

export default Footer;
