import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="auth-page" style={{ backgroundColor: 'var(--charcoal)', color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="auth-container" style={{ maxWidth: '400px', width: '100%', padding: '2rem', backgroundColor: '#2a2a2a', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div className="brand-lockup" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2>DC EPOXY</h2>
          <p>Admin Login</p>
        </div>
        {error && <div className="error-message" style={{ color: '#ff4d4f', marginBottom: '1rem', textAlign: 'center', backgroundColor: 'rgba(255, 77, 79, 0.1)', padding: '0.5rem', borderRadius: '4px' }}>{error}</div>}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#333', color: 'white' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#333', color: 'white' }}
          />
          <button type="submit" disabled={loading} style={{ padding: '0.75rem', borderRadius: '4px', border: 'none', backgroundColor: '#f97316', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
