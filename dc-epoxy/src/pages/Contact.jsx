import React, { useState } from 'react';
import { Mail, Phone, Instagram, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Layout from '../components/Layout';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    area: '',
    service_type: 'Garage Epoxy',
    message: '',
    consent: false
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setStatus('loading');
    
    // Simulating API or Supabase insert
    try {
      if (supabase) {
        const { error } = await supabase.from('enquiries').insert([
          {
            name: formData.name,
            email: formData.email,
            location: formData.location,
            area: formData.area,
            service_type: formData.service_type,
            message: formData.message
          }
        ]);
        if (error) throw error;
      } else {
        // Fallback fake delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <Layout darkHeader={false}>
      <div className="contact-page" style={{ backgroundColor: '#171716', color: 'white', minHeight: '100vh', paddingTop: '8rem', paddingBottom: '6rem' }}>
        <div className="contact-layout" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '4rem', padding: '0 2rem' }}>
          
          <div style={{ flex: 1 }}>
            <h1 className="contact-intro" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Let's discuss your floor.</h1>
            <p style={{ fontSize: '1.2rem', color: '#ccc', marginBottom: '2rem', lineHeight: 1.6 }}>Ready for a premium epoxy installation? Provide your details, and our technical team will get back to you to arrange a free site survey and quotation.</p>
            
            <div className="contact-links" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '3rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Phone color="#b87333" />
                <a href="tel:+971501234567" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1rem' }}>+971 50 123 4567</a>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Mail color="#b87333" />
                <a href="mailto:info@dcepoxy.ae" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1rem' }}>info@dcepoxy.ae</a>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Instagram color="#b87333" />
                <a href="https://instagram.com/dcepoxy" target="_blank" rel="noreferrer" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1rem' }}>@dcepoxy</a>
              </div>
            </div>
          </div>

          <div className="form-wrap" style={{ flex: 1, backgroundColor: 'white', color: '#171716', padding: '3rem', borderRadius: '8px' }}>
            {status === 'success' ? (
              <div className="form-success" style={{ textAlign: 'center', padding: '4rem 0' }}>
                <CheckCircle size={64} color="#b87333" style={{ margin: '0 auto 1rem auto' }} />
                <h2 style={{ marginBottom: '1rem' }}>Enquiry Received</h2>
                <p style={{ color: '#666' }}>Thank you for reaching out. A member of our team will contact you shortly.</p>
              </div>
            ) : (
              <form className="enquiry-form" onSubmit={handleSubmit}>
                <div className="form-heading" style={{ marginBottom: '2rem' }}>
                  <div className="eyebrow" style={{ color: '#b87333', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>We respond within 24 hours</div>
                  <h2 style={{ fontSize: '2rem', margin: 0 }}>Request a Quote</h2>
                </div>

                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Dubai Marina, Abu Dhabi" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>

                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Approximate Area (sqm/sqft)</label>
                    <input type="text" name="area" value={formData.area} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Service Type</label>
                    <select name="service_type" value={formData.service_type} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                      <option value="Garage Epoxy">Garage Epoxy</option>
                      <option value="Metallic Epoxy">Metallic Epoxy</option>
                      <option value="Flake Flooring">Flake Flooring</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="4" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
                </div>

                <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} style={{ marginTop: '0.3rem' }} />
                  <label style={{ fontSize: '0.85rem', color: '#666' }}>I consent to DC-EPOXY collecting my details to respond to my enquiry.</label>
                </div>

                <button type="submit" disabled={status === 'loading'} className="button button--copper" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', border: 'none', cursor: 'pointer' }}>
                  {status === 'loading' ? 'Sending...' : 'Send Enquiry'}
                </button>
                {status === 'error' && <p style={{ color: 'red', marginTop: '1rem' }}>There was an error sending your enquiry. Please try again.</p>}
              </form>
            )}
          </div>
          
        </div>
      </div>
    </Layout>
  );
}
