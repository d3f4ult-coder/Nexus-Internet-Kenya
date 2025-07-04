import React from 'react';

function About() {
  return (
    <div>
      <h1>About Nexus Internet Kenya</h1>
      <div className="card">
        <h2>Our Mission</h2>
        <p>To connect every home and business in Kenya with fast, reliable, and affordable internet.</p>
      </div>
      <div className="card">
        <h2>Our Vision</h2>
        <p>Empowering communities and businesses through seamless digital connectivity.</p>
      </div>
      <div className="card">
        <h2>Our Team</h2>
        <ul>
          <li><strong>Elvis Enos</strong> – CEO & Founder</li>
          <li><strong>Bramuel Kai</strong> – CTO</li>
          <li><strong>Elvis Enos</strong> – Customer Success Lead</li>
        </ul>
      </div>
      <div className="card">
        <h2>Company History</h2>
        <p>Founded in 2020, Nexus Internet Kenya has rapidly grown to serve thousands of customers across Nairobi and beyond.</p>
      </div>
    </div>
  );
}

export default About;
