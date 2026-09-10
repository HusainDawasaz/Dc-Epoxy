import React from 'react';
import Layout from '../components/Layout';

export default function Terms() {
  return (
    <Layout darkHeader={true}>
      <div className="legal-page">
        <section className="inner-hero" style={{ backgroundColor: '#f7f5f1', color: '#171716', padding: '8rem 2rem 4rem 2rem', borderBottom: '1px solid #e0e0e0' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Terms & Conditions</h1>
          <p style={{ fontSize: '1rem', color: '#666' }}>Last updated: {new Date().toLocaleDateString()}</p>
        </section>

        <section className="legal-copy section" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', color: '#333', lineHeight: 1.8 }}>
          <p>Please read these terms and conditions carefully before using our website or engaging our services.</p>
          
          <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. Services</h2>
          <p>DC-EPOXY provides resin and epoxy flooring application services. All quotations provided are estimates based on initial discussions and may be subject to change upon physical site inspection.</p>

          <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. Site Preparation</h2>
          <p>Unless otherwise agreed, it is the client's responsibility to ensure the area to be treated is clear of furniture and obstacles before our applicators arrive on site.</p>

          <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Warranties</h2>
          <p>We offer warranties on our installations against delamination under normal use. Warranties do not cover damage caused by structural concrete movement, extreme impact, or improper maintenance.</p>
        </section>
      </div>
    </Layout>
  );
}
