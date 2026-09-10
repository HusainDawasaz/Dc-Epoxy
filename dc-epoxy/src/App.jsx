import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabase';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import BeforeAfter from './pages/BeforeAfter';
import Process from './pages/Process';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

// Admin
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminSettings from './admin/AdminSettings';
import AdminServices from './admin/AdminServices';
import AdminProjects from './admin/AdminProjects';
import AdminTestimonials from './admin/AdminTestimonials';
import AdminProcessSteps from './admin/AdminProcessSteps';
import AdminEnquiries from './admin/AdminEnquiries';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected Route — redirects to /admin if not logged in
function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a', color: 'white' }}>
      Loading…
    </div>
  );

  if (!session) return <Navigate to="/admin" replace />;

  return children;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/before-after" element={<BeforeAfter />} />
        <Route path="/process" element={<Process />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Admin login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Admin protected routes */}
        <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/testimonials" element={<AdminTestimonials />} />
          <Route path="/admin/process-steps" element={<AdminProcessSteps />} />
          <Route path="/admin/enquiries" element={<AdminEnquiries />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
