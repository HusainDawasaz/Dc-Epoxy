import React from 'react';
import Layout from '../components/Layout';
import CommonNinjaWidget from '../components/CommonNinjaWidget';

export default function BeforeAfter() {
  return (
    <Layout darkHeader={true}>
      <section className="section bg-paper">
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
          
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <span className="eyebrow">TRANSFORMATIONS</span>
            <h1 className="h1" style={{ marginBottom: '1.5rem' }}>Before & After</h1>
            <p className="lead text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Slide to see the dramatic difference a premium epoxy floor can make to your space.
            </p>
          </div>

          <div style={{ minHeight: '600px' }}>
            <CommonNinjaWidget pid="101850d9-1bce-4025-9860-de67f43456b1" />
          </div>
          
        </div>
      </section>
    </Layout>
  );
}
