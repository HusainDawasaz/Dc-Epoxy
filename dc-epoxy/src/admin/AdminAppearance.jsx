import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Save } from 'lucide-react';

export default function AdminAppearance() {
  const [settings, setSettings] = useState({
    primary_color: '#b87333',
    bg_color: '#f7f5f1',
    text_color: '#171716',
    hero_alignment: 'left'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const { data, error } = await supabase.from('settings').select('*').eq('id', 1).single();
      if (error) throw error;
      if (data) {
        setSettings({
          primary_color: data.primary_color || '#b87333',
          bg_color: data.bg_color || '#f7f5f1',
          text_color: data.text_color || '#171716',
          hero_alignment: data.hero_alignment || 'left'
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('settings')
        .update({
          primary_color: settings.primary_color,
          bg_color: settings.bg_color,
          text_color: settings.text_color,
          hero_alignment: settings.hero_alignment
        })
        .eq('id', 1);

      if (error) throw error;
      setMessage('Appearance settings saved successfully! Changes are live.');
    } catch (error) {
      console.error("Error saving:", error);
      setMessage('Error saving settings. Make sure you ran the SQL update.');
    } finally {
      setSaving(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  }

  if (loading) return <div>Loading appearance settings...</div>;

  return (
    <div className="admin-settings">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, color: '#333' }}>Appearance & Theme</h1>
        <button onClick={handleSave} className="btn btn--primary" disabled={saving}>
          <Save size={18} /> {saving ? 'Saving...' : 'Save Theme'}
        </button>
      </div>

      {message && (
        <div style={{ padding: '1rem', marginBottom: '2rem', backgroundColor: message.includes('Error') ? '#fee2e2' : '#dcfce7', color: message.includes('Error') ? '#991b1b' : '#166534', borderRadius: '4px' }}>
          {message}
        </div>
      )}

      <div className="settings-card" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#333', fontSize: '1.25rem' }}>Brand Colors</h2>
        <p style={{ color: '#666', marginBottom: '2rem', fontSize: '0.9rem' }}>Choose the colors that represent your brand. These will update buttons, backgrounds, and text globally.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
          
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '600', color: '#374151' }}>Primary Color (Buttons & Accents)</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input 
                type="color" 
                name="primary_color" 
                value={settings.primary_color} 
                onChange={handleChange}
                style={{ width: '50px', height: '50px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              />
              <span style={{ fontFamily: 'monospace', color: '#666' }}>{settings.primary_color}</span>
            </div>
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '600', color: '#374151' }}>Background Color</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input 
                type="color" 
                name="bg_color" 
                value={settings.bg_color} 
                onChange={handleChange}
                style={{ width: '50px', height: '50px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              />
              <span style={{ fontFamily: 'monospace', color: '#666' }}>{settings.bg_color}</span>
            </div>
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '600', color: '#374151' }}>Text Color</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input 
                type="color" 
                name="text_color" 
                value={settings.text_color} 
                onChange={handleChange}
                style={{ width: '50px', height: '50px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              />
              <span style={{ fontFamily: 'monospace', color: '#666' }}>{settings.text_color}</span>
            </div>
          </div>

        </div>

        <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #eee' }} />

        <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#333', fontSize: '1.25rem' }}>Layout Settings</h2>
        
        <div className="form-group" style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '600', color: '#374151' }}>Hero Text Alignment</label>
          <select 
            name="hero_alignment" 
            value={settings.hero_alignment} 
            onChange={handleChange}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
          >
            <option value="left">Left Aligned</option>
            <option value="center">Centered</option>
          </select>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>Changes how the main text looks when people first open your website.</p>
        </div>

      </div>
    </div>
  );
}
