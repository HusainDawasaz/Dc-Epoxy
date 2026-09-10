import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Trash2, Eye, Check } from 'lucide-react';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' or 'unread'
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, [filter]);

  const fetchEnquiries = async () => {
    setLoading(true);
    let query = supabase.from('enquiries').select('*').order('created_at', { ascending: false });
    
    if (filter === 'unread') {
      query = query.eq('read', false);
    }
    
    const { data, error } = await query;
      
    if (error) console.error("Error fetching enquiries:", error);
    else setEnquiries(data || []);
    setLoading(false);
  };

  const markAsRead = async (id, currentStatus) => {
    if (currentStatus) return; // Already read
    
    const { error } = await supabase.from('enquiries').update({ read: true }).eq('id', id);
    if (error) console.error("Error updating read status:", error);
    else fetchEnquiries();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      const { error } = await supabase.from('enquiries').delete().eq('id', id);
      if (error) console.error("Error deleting:", error);
      else {
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry(null);
        }
        fetchEnquiries();
      }
    }
  };

  const viewEnquiry = (enquiry) => {
    setSelectedEnquiry(enquiry);
    markAsRead(enquiry.id, enquiry.read);
  };

  if (loading && enquiries.length === 0) return <div>Loading enquiries...</div>;

  return (
    <div className="admin-enquiries">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, color: '#333' }}>Enquiries</h1>
        
        <div className="filters" style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => setFilter('all')} 
            style={{ ...filterBtnStyle, backgroundColor: filter === 'all' ? '#e5e7eb' : 'transparent' }}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('unread')} 
            style={{ ...filterBtnStyle, backgroundColor: filter === 'unread' ? '#e5e7eb' : 'transparent' }}
          >
            Unread
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedEnquiry ? '1fr 1fr' : '1fr', gap: '2rem', alignItems: 'start' }}>
        
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <tr>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Service</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map(enquiry => (
                <tr key={enquiry.id} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: selectedEnquiry?.id === enquiry.id ? '#f3f4f6' : (!enquiry.read ? '#f0fdf4' : 'transparent') }}>
                  <td style={tdStyle}>
                    {!enquiry.read ? (
                      <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
                    ) : (
                      <Check size={16} color="#9ca3af" />
                    )}
                  </td>
                  <td style={tdStyle}>{enquiry.name}</td>
                  <td style={tdStyle}>{enquiry.service_type || '-'}</td>
                  <td style={tdStyle}>{new Date(enquiry.created_at).toLocaleDateString()}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => viewEnquiry(enquiry)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', padding: '0.25rem' }}>
                        <Eye size={18} />
                      </button>
                      <button onClick={() => handleDelete(enquiry.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {enquiries.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>No enquiries found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedEnquiry && (
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', position: 'sticky', top: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: 0 }}>Enquiry Details</h3>
              <button onClick={() => setSelectedEnquiry(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>Close</button>
            </div>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <span style={detailLabelStyle}>Name:</span>
                <p style={detailTextStyle}>{selectedEnquiry.name}</p>
              </div>
              <div>
                <span style={detailLabelStyle}>Email:</span>
                <p style={detailTextStyle}><a href={`mailto:${selectedEnquiry.email}`}>{selectedEnquiry.email}</a></p>
              </div>
              <div>
                <span style={detailLabelStyle}>Phone:</span>
                <p style={detailTextStyle}>{selectedEnquiry.phone || 'N/A'}</p>
              </div>
              <div>
                <span style={detailLabelStyle}>Location:</span>
                <p style={detailTextStyle}>{selectedEnquiry.location || 'N/A'}</p>
              </div>
              <div>
                <span style={detailLabelStyle}>Service Interest:</span>
                <p style={detailTextStyle}>{selectedEnquiry.service_type || 'N/A'}</p>
              </div>
              <div>
                <span style={detailLabelStyle}>Date Submitted:</span>
                <p style={detailTextStyle}>{new Date(selectedEnquiry.created_at).toLocaleString()}</p>
              </div>
              <div>
                <span style={detailLabelStyle}>Message:</span>
                <div style={{ ...detailTextStyle, backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '4px', marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
                  {selectedEnquiry.message || 'No message provided.'}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

const filterBtnStyle = {
  padding: '0.5rem 1rem',
  border: '1px solid #d1d5db',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.875rem',
  color: '#374151'
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

const detailLabelStyle = {
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '#6b7280',
  fontWeight: '600'
};

const detailTextStyle = {
  margin: '0.25rem 0 0 0',
  color: '#111827'
};
