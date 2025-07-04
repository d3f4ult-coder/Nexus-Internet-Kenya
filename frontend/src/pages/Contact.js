import React, { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    alert('Message sent! (Demo only)');
    setForm({ name: '', email: '', phone: '', message: '' });
  };
  return (
    <div>
      <h1>Contact Us</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
          <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required rows={4} />
          <button type="submit" className="btn">Send Message</button>
        </form>
        <div style={{ marginTop: '1.5rem' }}>
          <p>Customer Support: +254 711 350657</p>
          <p>Email: info@nexuskenya.co.ke</p>
          <p>Live Chat: <span style={{ color: '#58a6ff' }}>Coming soon</span></p>
          <div style={{ marginTop: '1rem' }}>
            <a href="#" style={{ color: '#58a6ff', marginRight: 10 }}>Twitter</a>
            <a href="#" style={{ color: '#58a6ff', marginRight: 10 }}>Facebook</a>
            <a href="#" style={{ color: '#58a6ff' }}>Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
