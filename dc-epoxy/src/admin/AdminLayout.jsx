import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LayoutDashboard, Settings, Image, Star, List, Mail, LogOut, Paintbrush, Database, Menu, X } from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
  { to: '/admin/appearance', icon: Paintbrush, label: 'Appearance' },
  { to: '/admin/services', icon: Database, label: 'Services' },
  { to: '/admin/projects', icon: Image, label: 'Projects' },
  { to: '/admin/testimonials', icon: Star, label: 'Testimonials' },
  { to: '/admin/process-steps', icon: List, label: 'Process Steps' },
  { to: '/admin/enquiries', icon: Mail, label: 'Enquiries' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) navigate('/admin');
      setLoading(false);
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate('/admin');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a', color: 'white' }}>
      Loading...
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>

      {/* Mobile Top Bar */}
      <div className="admin-topbar">
        <button
          onClick={() => setSidebarOpen(o => !o)}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center' }}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <span style={{ color: '#f97316', fontWeight: 800, fontSize: '1rem' }}>DC-EPOXY Admin</span>
        <div style={{ width: 38 }} />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 199 }}
        />
      )}

      {/* Sidebar */}
      <aside className={'admin-sidebar' + (sidebarOpen ? ' admin-sidebar--open' : '')}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #2a2a2a' }}>
          <h2 style={{ color: '#f97316', margin: 0, fontSize: '1.1rem' }}>DC EPOXY</h2>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>Admin Panel</p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '1rem', flex: 1 }}>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '6px',
                color: isActive ? 'white' : '#bbb',
                backgroundColor: isActive ? '#f97316' : 'transparent',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: isActive ? 700 : 400,
                transition: 'background-color 0.2s, color 0.2s',
              })}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '1rem 1.5rem', background: 'none', border: 'none',
            color: '#ff6b6b', cursor: 'pointer', fontSize: '0.9rem',
            width: '100%', borderTop: '1px solid #2a2a2a',
          }}
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <Outlet />
      </main>

      <style>{`
        .admin-topbar {
          display: none;
          position: sticky;
          top: 0;
          z-index: 100;
          background: #1a1a1a;
          padding: 0.75rem 1rem;
          align-items: center;
          justify-content: space-between;
        }
        .admin-sidebar {
          position: fixed;
          top: 0; left: 0; bottom: 0;
          width: 230px;
          background: #1a1a1a;
          color: white;
          display: flex;
          flex-direction: column;
          z-index: 200;
          overflow-y: auto;
          transition: transform 0.3s ease;
        }
        .admin-main {
          margin-left: 230px;
          padding: 2rem;
          min-height: 100vh;
          background: #f5f5f5;
        }
        @media (max-width: 768px) {
          .admin-topbar { display: flex; }
          .admin-sidebar { transform: translateX(-100%); }
          .admin-sidebar--open { transform: translateX(0); }
          .admin-main { margin-left: 0; padding: 1.25rem; }
        }
      `}</style>
    </div>
  );
}
