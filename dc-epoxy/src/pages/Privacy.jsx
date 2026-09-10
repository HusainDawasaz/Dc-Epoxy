import React from 'react';
import Layout from '../components/Layout';

export default function Privacy() {
  return (
    <Layout darkHeader={true}>
      <div className="legal-page">
        <section className="inner-hero" style={{ backgroundColor: '#f7f5f1', color: '#171716', padding: '8rem 2rem 4rem 2rem', borderBottom: '1px solid #e0e0e0' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Privacy Policy</h1>
          <p style={{ fontSize: '1rem', color: '#666' }}>Last updated: {new Date().toLocaleDateString()}</p>
        </section>

        <section className="legal-copy section" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', color: '#333', lineHeight: 1.8 }}>
          <p>DC-EPOXY respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
          
          <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. Information we collect</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you, including Identity Data (name) and Contact Data (email, phone number, address) when you submit an enquiry through our forms.</p>

          <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. How we use your data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to respond to your enquiries, provide quotations, and execute our flooring services.</p>

          <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Data security</h2>
          <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.</p>
        </section>
      </div>
    </Layout>
  );
}
