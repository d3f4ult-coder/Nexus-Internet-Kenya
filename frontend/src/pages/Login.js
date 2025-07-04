import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    // Demo: just redirect
    navigate('/dashboard');
  };
  return (
    <div>
      <h1>Login</h1>
      <div className="card" style={{ maxWidth: 400, margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit" className="btn" style={{ width: '100%' }}>Login</button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <span>Don't have an account? </span>
          <a href="/register" style={{ color: '#58a6ff' }}>Register</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
