import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    quote: '',
    author_name: '',
    author_location: '',
    sort_order: 0
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true });
      
    if (error) console.error("Error fetching testimonials:", error);
    else setTestimonials(data || []);
    setLoading(false);
  };

  const handleEdit = (testimonial) => {
    setFormData({
      quote: testimonial.quote || '',
      author_name: testimonial.author_name || '',
      author_location: testimonial.author_location || '',
      sort_order: testimonial.sort_order || 0
    });
    setEditingId(testimonial.id);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setFormData({
      quote: '',
      author_name: '',
      author_location: '',
      sort_order: testimonials.length * 10
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
      const { error } = await supabase.from('testimonials').insert([formData]);
      if (error) console.error("Error inserting:", error);
    } else {
      const { error } = await supabase.from('testimonials').update(formData).eq('id', editingId);
      if (error) console.error("Error updating:", error);
    }
    handleCancel();
    fetchTestimonials();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) console.error("Error deleting:", error);
      else fetchTestimonials();
    }
  };

  if (loading) return <div>Loading testimonials...</div>;

  return (
    <div className="admin-testimonials">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, color: '#333' }}>Testimonials</h1>
        {!isAdding && !editingId && (
          <button onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#f97316', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            <Plus size={16} /> Add Testimonial
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <form onSubmit={handleSave} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
          <h3 style={{ marginTop: 0 }}>{isAdding ? 'Add New Testimonial' : 'Edit Testimonial'}</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <textarea name="quote" value={formData.quote} onChange={handleChange} placeholder="Quote" rows={4} required style={inputStyle} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input type="text" name="author_name" value={formData.author_name} onChange={handleChange} placeholder="Author Name" required style={inputStyle} />
              <input type="text" name="author_location" value={formData.author_location} onChange={handleChange} placeholder="Author Location" style={inputStyle} />
            </div>
            
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
              <th style={thStyle}>Author</th>
              <th style={thStyle}>Location</th>
              <th style={thStyle}>Quote</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map(testimonial => (
              <tr key={testimonial.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={tdStyle}>{testimonial.sort_order}</td>
                <td style={tdStyle}>{testimonial.author_name}</td>
                <td style={tdStyle}>{testimonial.author_location}</td>
                <td style={tdStyle}><div style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{testimonial.quote}</div></td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleEdit(testimonial)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', padding: '0.25rem' }}>
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(testimonial.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>No testimonials found.</td>
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
