"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Save } from 'lucide-react';

export default function AppearanceAdminPage() {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    theme_mode: 'light',
    primary_color: '#b87333',
    secondary_color: '#c58361',
    heading_font: 'Manrope',
    body_font: 'Manrope',
    hero_overlay_opacity: 84,
    button_style: 'sharp',
    show_before_after: true,
    show_testimonials: true,
    show_faq: true,
    show_process: true,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase.from('settings').select('*').eq('id', 1).single();
      if (error) {
        if (error.code !== 'PGRST116') console.error('Error fetching settings:', error);
      }
      if (data) {
        setFormData({
          theme_mode: data.theme_mode ?? 'light',
          primary_color: data.primary_color ?? '#b87333',
          secondary_color: data.secondary_color ?? '#c58361',
          heading_font: data.heading_font ?? 'Manrope',
          body_font: data.body_font ?? 'Manrope',
          hero_overlay_opacity: data.hero_overlay_opacity ?? 84,
          button_style: data.button_style ?? 'sharp',
          show_before_after: data.show_before_after ?? true,
          show_testimonials: data.show_testimonials ?? true,
          show_faq: data.show_faq ?? true,
          show_process: data.show_process ?? true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const { error } = await supabase.from('settings').upsert({ id: 1, ...formData });
      if (error) throw error;
      setMessage('Appearance settings saved successfully!');
    } catch (error) {
      console.error('Error saving appearance settings:', error);
      setMessage('Error saving. Check console for details.');
    } finally {
      setSaving(false);
    }
  };

  const fonts = ['Manrope', 'Playfair Display', 'Inter', 'Poppins'];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#111' }}>Appearance Settings</h1>
      
      {message && (
        <div style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: '4px', background: message.includes('Error') ? '#fee2e2' : '#dcfce7', color: message.includes('Error') ? '#991b1b' : '#166534' }}>
          {message}
        </div>
      )}

      <div style={{ display: 'grid', gap: '2rem' }}>
        {/* Theme Mode */}
        <section>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Theme Mode</h2>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input type="checkbox" name="theme_mode" checked={formData.theme_mode === 'dark'} onChange={(e) => setFormData(prev => ({...prev, theme_mode: e.target.checked ? 'dark' : 'light'}))} style={{ width: '1.2rem', height: '1.2rem' }} />
            Dark Theme
          </label>
        </section>

        {/* Colors */}
        <section>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Colors</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#444' }}>Primary Color</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="color" name="primary_color" value={formData.primary_color} onChange={handleChange} style={{ width: '40px', height: '40px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
                <input type="text" name="primary_color" value={formData.primary_color} onChange={handleChange} style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', flex: 1 }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#444' }}>Secondary Color</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="color" name="secondary_color" value={formData.secondary_color} onChange={handleChange} style={{ width: '40px', height: '40px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
                <input type="text" name="secondary_color" value={formData.secondary_color} onChange={handleChange} style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', flex: 1 }} />
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Typography</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#444' }}>Heading Font</label>
              <select name="heading_font" value={formData.heading_font} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                {fonts.map(font => <option key={font} value={font}>{font}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#444' }}>Body Font</label>
              <select name="body_font" value={formData.body_font} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                {fonts.map(font => <option key={font} value={font}>{font}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Hero */}
        <section>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Hero Overlay Opacity: {formData.hero_overlay_opacity}%</h2>
          <input type="range" name="hero_overlay_opacity" min="0" max="100" value={formData.hero_overlay_opacity} onChange={handleChange} style={{ width: '100%' }} />
        </section>

        {/* Buttons */}
        <section>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Button Style</h2>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['sharp', 'rounded', 'pill'].map(style => (
              <label key={style} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textTransform: 'capitalize' }}>
                <input type="radio" name="button_style" value={style} checked={formData.button_style === style} onChange={handleChange} />
                {style}
              </label>
            ))}
          </div>
        </section>

        {/* Sections Visibility */}
        <section>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Sections Visibility</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {['show_before_after', 'show_testimonials', 'show_faq', 'show_process'].map(section => (
              <label key={section} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" name={section} checked={formData[section]} onChange={handleChange} style={{ width: '1.2rem', height: '1.2rem' }} />
                {section.replace('show_', '').replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </label>
            ))}
          </div>
        </section>

        {/* Save Button */}
        <div style={{ marginTop: '1rem' }}>
          <button onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f97316', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>
            <Save size={18} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
