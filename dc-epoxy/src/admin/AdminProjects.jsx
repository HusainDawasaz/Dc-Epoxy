import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import ImageUpload from './components/ImageUpload';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    image_url: '',
    featured: false,
    sort_order: 0
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });
      
    if (error) console.error("Error fetching projects:", error);
    else setProjects(data || []);
    setLoading(false);
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title || '',
      location: project.location || '',
      description: project.description || '',
      image_url: project.image_url || '',
      featured: project.featured || false,
      sort_order: project.sort_order || 0
    });
    setEditingId(project.id);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setFormData({
      title: '',
      location: '',
      description: '',
      image_url: '',
      featured: false,
      sort_order: projects.length * 10
    });
    setIsAdding(true);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (isAdding) {
      const { error } = await supabase.from('projects').insert([formData]);
      if (error) console.error("Error inserting:", error);
    } else {
      const { error } = await supabase.from('projects').update(formData).eq('id', editingId);
      if (error) console.error("Error updating:", error);
    }
    handleCancel();
    fetchProjects();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) console.error("Error deleting:", error);
      else fetchProjects();
    }
  };

  if (loading) return <div>Loading projects...</div>;

  return (
    <div className="admin-projects">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, color: '#333' }}>Projects</h1>
        {!isAdding && !editingId && (
          <button onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#f97316', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            <Plus size={16} /> Add Project
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <form onSubmit={handleSave} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
          <h3 style={{ marginTop: 0 }}>{isAdding ? 'Add New Project' : 'Edit Project'}</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Project Title" required style={inputStyle} />
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" style={inputStyle} />
            </div>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows={3} style={inputStyle} />
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '13px' }}>Project Image</label>
              <ImageUpload url={formData.image_url} onUpload={(url) => setFormData({ ...formData, image_url: url })} />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" name="featured" id="featured" checked={formData.featured} onChange={handleChange} />
                <label htmlFor="featured">Featured Project</label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label>Sort Order:</label>
                <input type="number" name="sort_order" value={formData.sort_order} onChange={handleChange} style={{...inputStyle, width: '100px'}} />
              </div>
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
              <th style={thStyle}>Location</th>
              <th style={thStyle}>Featured</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={tdStyle}>{project.sort_order}</td>
                <td style={tdStyle}>
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}></div>
                  )}
                </td>
                <td style={tdStyle}>{project.title}</td>
                <td style={tdStyle}>{project.location}</td>
                <td style={tdStyle}>{project.featured ? 'Yes' : 'No'}</td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleEdit(project)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', padding: '0.25rem' }}>
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(project.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>No projects found.</td>
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
