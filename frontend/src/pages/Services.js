import React from 'react';

function Services() {
  return (
    <div>
      <h1>Our Services</h1>
      <div className="card">
        <h2>Internet Cable Installation</h2>
        <p>We offer professional installation of high-speed internet cables for homes and businesses. Our technicians ensure a seamless and quick setup, so you can get online without hassle.</p>
      </div>
      <div className="card">
        <h2>Maintenance & Support</h2>
        <p>Our support team is available 24/7 to assist with any issues. We provide on-site maintenance and remote troubleshooting to keep your connection stable.</p>
      </div>
      <div className="card">
        <h2>Benefits of Choosing Us</h2>
        <ul>
          <li>Fast installation and activation</li>
          <li>Reliable, high-speed connections</li>
          <li>Affordable plans for every need</li>
          <li>Excellent customer support</li>
        </ul>
      </div>
      <div className="card">
        <h2>FAQs</h2>
        <ul>
          <li><strong>How long does installation take?</strong> Usually within 24-48 hours of signup.</li>
          <li><strong>Is there a contract?</strong> No long-term contracts required for most plans.</li>
          <li><strong>What payment methods are accepted?</strong> Mobile money, credit/debit cards, and bank transfer.</li>
        </ul>
      </div>
    </div>
  );
}

export default Services;
