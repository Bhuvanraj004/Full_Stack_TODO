import React, { useState } from 'react';
import API_BASE from '../api';

export default function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      window.location.href = '/';
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="app">
      <h2>Login</h2>
      <form onSubmit={submit} style={{ display:'grid', gap:12, justifyItems:'center' }}>
        <input
          placeholder="Email or Username"
          value={emailOrUsername}
          onChange={e => setEmailOrUsername(e.target.value)}
          style={{ padding:12, width:'80%' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding:12, width:'80%' }}
        />
        <button type="submit" disabled={busy}>{busy ? 'Please wait…' : 'Login'}</button>
      </form>
      <p style={{ marginTop: 12 }}>
        No account? <a href="/register">Register</a>
      </p>
    </div>
  );
}
