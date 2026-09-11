import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LayoutDashboard, Settings, Database, Image, Star, List, Mail, LogOut, Paintbrush } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin');
      }
      setLoading(false);
    };
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/admin');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) return <div className="loading-screen" style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading...</div>;

  return (
    <div className="admin-shell" style={{ display: 'grid', gridTemplateColumns: '230px 1fr', minHeight: '100vh' }}>
      <aside className="admin-sidebar" style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        <div className="brand-lockup" style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#f97316', margin: 0 }}>DC EPOXY</h2>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#888' }}>Admin Panel</p>
        </div>
        <nav className="admin-nav" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={navLinkStyle}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/admin/settings" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={navLinkStyle}>
            <Settings size={18} /> Settings
          </NavLink>
          <NavLink to="/admin/appearance" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={navLinkStyle}>
            <Paintbrush size={18} /> Appearance
          </NavLink>
          <NavLink to="/admin/services" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={navLinkStyle}>
            <Database size={18} /> Services
          </NavLink>
          <NavLink to="/admin/projects" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={navLinkStyle}>
            <Image size={18} /> Projects
          </NavLink>
          <NavLink to="/admin/testimonials" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={navLinkStyle}>
            <Star size={18} /> Testimonials
          </NavLink>
          <NavLink to="/admin/process-steps" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={navLinkStyle}>
            <List size={18} /> Process Steps
          </NavLink>
          <NavLink to="/admin/enquiries" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={navLinkStyle}>
            <Mail size={18} /> Enquiries
          </NavLink>
        </nav>
        <button className="logout-btn" onClick={handleLogout} style={{ ...navLinkStyle, marginTop: 'auto', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', color: '#ff4d4f' }}>
          <LogOut size={18} /> Logout
        </button>
      </aside>
      <main className="admin-main" style={{ padding: '2rem', backgroundColor: '#f5f5f5', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}

const navLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.75rem 1rem',
  color: '#ddd',
  textDecoration: 'none',
  borderRadius: '4px',
  transition: 'background-color 0.2s',
  fontSize: '0.95rem'
};
