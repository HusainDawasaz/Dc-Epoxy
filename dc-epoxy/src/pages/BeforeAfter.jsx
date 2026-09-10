import React, { useEffect } from 'react';
import Layout from '../components/Layout';

export default function BeforeAfter() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.commoninja.com/sdk/latest/commonninja.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Layout darkHeader={false}>
      <div className="before-after-page">
        <section className="inner-hero" style={{ backgroundColor: '#171716', color: 'white', padding: '8rem 2rem 4rem 2rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Before & After</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', color: '#ccc' }}>Slide to see the incredible transformations of our recent projects.</p>
        </section>

        <section style={{ backgroundColor: '#f7f5f1', padding: '6rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="commonninja_component" pid="pid-101850d9-1bce-4025-9860-de67f43456b1"></div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
