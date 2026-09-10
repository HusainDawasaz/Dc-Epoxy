import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout darkHeader={true}>
      <div className="about-page">
        <section className="inner-hero" style={{ backgroundColor: '#c58361', color: 'white', padding: '8rem 2rem 4rem 2rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>We are DC-EPOXY</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px' }}>Premium epoxy flooring specialists in Dubai and across the UAE.</p>
        </section>

        <section className="about-detail section" style={{ padding: '6rem 2rem', display: 'flex', gap: '4rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="about-quote" style={{ flex: 1, fontSize: '2rem', color: '#171716', fontWeight: 'bold', lineHeight: 1.3 }}>
            "We believe a floor is more than just a surface. It is the foundation of your space, built to perform and designed to impress."
          </div>
          <div className="about-copy" style={{ flex: 1, fontSize: '1.1rem', color: '#444', lineHeight: 1.8 }}>
            <p style={{ marginBottom: '1.5rem' }}>DC-EPOXY was founded with a singular focus: to elevate the standard of resin and epoxy flooring in the UAE.</p>
            <p style={{ marginBottom: '1.5rem' }}>Operating across Dubai, Abu Dhabi, and the wider Emirates, our team of certified applicators brings technical expertise and an eye for design to every project.</p>
            <p style={{ marginBottom: '2rem' }}>We source only premium-grade materials and adhere strictly to international surface preparation standards. This ensures that every floor we install not only looks stunning but withstands the demands of time and traffic.</p>
            
            <Link to="/contact" className="button button--copper">Work with us</Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
