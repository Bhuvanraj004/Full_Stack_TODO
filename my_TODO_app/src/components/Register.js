import React, { useState } from 'react';
import API_BASE from '../api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      alert('Registered! Please log in.');
      window.location.href = '/login';
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="app">
      <h2>Register</h2>
      <form onSubmit={submit} style={{ display:'grid', gap:12, justifyItems:'center' }}>
        <input placeholder="Username" value={username}
               onChange={e => setUsername(e.target.value)} style={{ padding:12, width:'80%' }} />
        <input placeholder="Email" value={email}
               onChange={e => setEmail(e.target.value)} style={{ padding:12, width:'80%' }} />
        <input type="password" placeholder="Password" value={password}
               onChange={e => setPassword(e.target.value)} style={{ padding:12, width:'80%' }} />
        <button type="submit" disabled={busy}>{busy ? 'Please wait…' : 'Create account'}</button>
      </form>
      <p style={{ marginTop: 12 }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
