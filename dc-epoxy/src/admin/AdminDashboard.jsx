import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Database, Image, Star, Mail } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    projects: 0,
    testimonials: 0,
    enquiries: 0
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          { count: servicesCount },
          { count: projectsCount },
          { count: testimonialsCount },
          { count: enquiriesCount }
        ] = await Promise.all([
          supabase.from('services').select('*', { count: 'exact', head: true }),
          supabase.from('projects').select('*', { count: 'exact', head: true }),
          supabase.from('testimonials').select('*', { count: 'exact', head: true }),
          supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('read', false)
        ]);

        setStats({
          services: servicesCount || 0,
          projects: projectsCount || 0,
          testimonials: testimonialsCount || 0,
          enquiries: enquiriesCount || 0
        });

        const { data: recentData } = await supabase
          .from('enquiries')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        setRecentEnquiries(recentData || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <h1 style={{ marginBottom: '2rem', color: '#333' }}>Dashboard</h1>
      
      <div className="admin-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="stat-card" style={statCardStyle}>
          <div className="stat-icon" style={statIconStyle}><Database size={24} color="#3b82f6" /></div>
          <div className="stat-info">
            <h3 style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>Total Services</h3>
            <p className="stat-number" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>{stats.services}</p>
          </div>
        </div>
        <div className="stat-card" style={statCardStyle}>
          <div className="stat-icon" style={statIconStyle}><Image size={24} color="#10b981" /></div>
          <div className="stat-info">
            <h3 style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>Total Projects</h3>
            <p className="stat-number" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>{stats.projects}</p>
          </div>
        </div>
        <div className="stat-card" style={statCardStyle}>
          <div className="stat-icon" style={statIconStyle}><Star size={24} color="#f59e0b" /></div>
          <div className="stat-info">
            <h3 style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>Total Testimonials</h3>
            <p className="stat-number" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>{stats.testimonials}</p>
          </div>
        </div>
        <div className="stat-card" style={statCardStyle}>
          <div className="stat-icon" style={statIconStyle}><Mail size={24} color="#ef4444" /></div>
          <div className="stat-info">
            <h3 style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>New Enquiries</h3>
            <p className="stat-number" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>{stats.enquiries}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: '#333' }}>Recent Enquiries</h2>
          <Link to="/admin/enquiries" style={{ padding: '0.5rem 1rem', backgroundColor: '#e5e7eb', color: '#374151', textDecoration: 'none', borderRadius: '4px', fontSize: '0.875rem' }}>View All</Link>
        </div>
        
        {recentEnquiries.length > 0 ? (
          <div className="table-responsive" style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Service</th>
                  <th style={thStyle}>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map(enq => (
                  <tr key={enq.id} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: !enq.read ? '#f0fdf4' : 'transparent' }}>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {!enq.read && <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>}
                        {enq.name}
                      </div>
                    </td>
                    <td style={tdStyle}>{enq.email}</td>
                    <td style={tdStyle}>{enq.service_type || '-'}</td>
                    <td style={tdStyle}>{new Date(enq.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: '#6b7280' }}>No recent enquiries found.</p>
        )}
      </div>
    </div>
  );
}

const statCardStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
};

const statIconStyle = {
  padding: '1rem',
  backgroundColor: '#f3f4f6',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const thStyle = {
  padding: '0.75rem 1rem',
  fontWeight: '600',
  color: '#374151',
  fontSize: '0.875rem'
};

const tdStyle = {
  padding: '0.75rem 1rem',
  color: '#4b5563',
  fontSize: '0.875rem'
};
