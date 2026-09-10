import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    sort_order: 0
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true });
      
    if (error) console.error("Error fetching services:", error);
    else setServices(data || []);
    setLoading(false);
  };

  const handleEdit = (service) => {
    setFormData({
      title: service.title,
      description: service.description,
      image_url: service.image_url,
      sort_order: service.sort_order
    });
    setEditingId(service.id);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      sort_order: services.length * 10
    });
    setIsAdding(true);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (isAdding) {
      const { error } = await supabase.from('services').insert([formData]);
      if (error) console.error("Error inserting:", error);
    } else {
      const { error } = await supabase.from('services').update(formData).eq('id', editingId);
      if (error) console.error("Error updating:", error);
    }
    handleCancel();
    fetchServices();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) console.error("Error deleting:", error);
      else fetchServices();
    }
  };

  if (loading) return <div>Loading services...</div>;

  return (
    <div className="admin-services">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, color: '#333' }}>Services</h1>
        {!isAdding && !editingId && (
          <button onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#f97316', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            <Plus size={16} /> Add Service
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <form onSubmit={handleSave} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
          <h3 style={{ marginTop: 0 }}>{isAdding ? 'Add New Service' : 'Edit Service'}</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Service Title" required style={inputStyle} />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows={3} required style={inputStyle} />
            <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="Image URL" style={inputStyle} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label>Sort Order:</label>
              <input type="number" name="sort_order" value={formData.sort_order} onChange={handleChange} style={{...inputStyle, width: '100px'}} />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                <Save size={16} /> Save
              </button>
              <button type="button" onClick={handleCancel} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            <tr>
              <th style={thStyle}>Order</th>
              <th style={thStyle}>Image</th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={tdStyle}>{service.sort_order}</td>
                <td style={tdStyle}>
                  {service.image_url ? (
                    <img src={service.image_url} alt={service.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}></div>
                  )}
                </td>
                <td style={tdStyle}>{service.title}</td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleEdit(service)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', padding: '0.25rem' }}>
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(service.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>No services found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '0.75rem',
  border: '1px solid #d1d5db',
  borderRadius: '4px',
  fontFamily: 'inherit',
  width: '100%',
  boxSizing: 'border-box'
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
