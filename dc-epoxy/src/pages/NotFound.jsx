import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <Layout darkHeader={true}>
      <section className="not-found" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '6rem', color: '#b87333', margin: 0, lineHeight: 1 }}>404</h1>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#171716' }}>Page not found</h2>
        <p style={{ color: '#666', marginBottom: '3rem' }}>The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="button button--copper">Return to Home</Link>
      </section>
    </Layout>
  );
}
