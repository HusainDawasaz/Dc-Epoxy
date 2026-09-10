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
