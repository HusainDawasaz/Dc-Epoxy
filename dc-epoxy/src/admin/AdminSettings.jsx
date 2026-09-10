import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Save } from 'lucide-react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    hero_heading: '',
    hero_description: '',
    hero_image_url: '',
    contact_email: '',
    instagram_url: '',
    seo_title: '',
    seo_description: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('settings').select('*').limit(1).single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({ id: settings.id || 1, ...settings })
        .select();
        
      if (error) throw error;
      
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage({ type: 'error', text: 'Failed to save settings. ' + error.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="admin-settings">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, color: '#333' }}>Global Settings</h1>
        <button onClick={handleSubmit} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#f97316', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>
          <Save size={16} /> {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {message.text && (
        <div style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: '4px', backgroundColor: message.type === 'success' ? '#dcfce7' : '#fee2e2', color: message.type === 'success' ? '#166534' : '#991b1b' }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem', backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        
        <div className="form-group" style={formGroupStyle}>
          <label style={labelStyle}>Hero Heading</label>
          <input type="text" name="hero_heading" value={settings.hero_heading || ''} onChange={handleChange} style={inputStyle} />
        </div>

        <div className="form-group" style={formGroupStyle}>
          <label style={labelStyle}>Hero Description</label>
          <textarea name="hero_description" value={settings.hero_description || ''} onChange={handleChange} rows={3} style={inputStyle} />
        </div>

        <div className="form-group" style={formGroupStyle}>
          <label style={labelStyle}>Hero Image URL</label>
          <input type="text" name="hero_image_url" value={settings.hero_image_url || ''} onChange={handleChange} style={inputStyle} />
        </div>

        <div className="form-group" style={formGroupStyle}>
          <label style={labelStyle}>Contact Email</label>
          <input type="email" name="contact_email" value={settings.contact_email || ''} onChange={handleChange} style={inputStyle} />
        </div>

        <div className="form-group" style={formGroupStyle}>
          <label style={labelStyle}>Instagram URL</label>
          <input type="url" name="instagram_url" value={settings.instagram_url || ''} onChange={handleChange} style={inputStyle} />
        </div>

        <h3 style={{ marginTop: '1rem', marginBottom: '0', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', color: '#444' }}>SEO Data</h3>

        <div className="form-group" style={formGroupStyle}>
          <label style={labelStyle}>SEO Title</label>
          <input type="text" name="seo_title" value={settings.seo_title || ''} onChange={handleChange} style={inputStyle} />
        </div>

        <div className="form-group" style={formGroupStyle}>
          <label style={labelStyle}>SEO Description</label>
          <textarea name="seo_description" value={settings.seo_description || ''} onChange={handleChange} rows={2} style={inputStyle} />
        </div>

      </form>
    </div>
  );
}

const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const labelStyle = {
  fontWeight: '500',
  color: '#374151',
  fontSize: '0.875rem'
};

const inputStyle = {
  padding: '0.75rem',
  border: '1px solid #d1d5db',
  borderRadius: '4px',
  fontSize: '1rem',
  fontFamily: 'inherit'
};
