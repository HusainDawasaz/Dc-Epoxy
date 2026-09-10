import React from 'react';
import { useContent } from '../hooks/useContent';
import Layout from '../components/Layout';

export default function Process() {
  const { processSteps } = useContent();

  const displayProcess = processSteps && processSteps.length > 0 ? processSteps : [
    { id: 1, title: 'Initial Enquiry & Site Assessment', description: 'We start with a consultation to understand your needs and assess the site.' },
    { id: 2, title: 'Surface Preparation', description: 'Crucial for a lasting finish, we rigorously prepare the concrete substrate.' },
    { id: 3, title: 'Epoxy Application', description: 'Our certified applicators install the epoxy system with precision.' },
    { id: 4, title: 'Curing & Quality Check', description: 'We ensure a perfect finish through detailed inspections during the curing process.' }
  ];

  return (
    <Layout darkHeader={true}>
      <div className="process-page">
        <section className="inner-hero" style={{ backgroundColor: '#171716', color: 'white', padding: '8rem 2rem 4rem 2rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Our Process</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', color: '#ccc' }}>Every DC-EPOXY installation follows a disciplined process...</p>
        </section>

        <section className="process-timeline section" style={{ padding: '6rem 2rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {displayProcess.map((step, index) => (
              <div key={step.id || index} className="timeline-step" style={{ display: 'flex', gap: '2rem' }}>
                <div style={{ fontSize: '3rem', color: '#b87333', fontWeight: 'bold', lineHeight: 1 }}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <h2 style={{ fontSize: '1.8rem', margin: '0 0 1rem 0' }}>{step.title}</h2>
                  <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: 1.6 }}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
