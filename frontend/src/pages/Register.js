import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    // Demo: just redirect
    navigate('/dashboard');
  };
  return (
    <div>
      <h1>Register</h1>
      <div className="card" style={{ maxWidth: 400, margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit" className="btn" style={{ width: '100%' }}>Register</button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <span>Already have an account? </span>
          <a href="/login" style={{ color: '#58a6ff' }}>Login</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
