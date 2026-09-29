"use client";
import React from 'react';
import { useContent } from '../../hooks/useContent';
import Layout from '../../components/Layout';

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
        <section className="inner-hero">
          <div className="container">
            <h1>Our Process</h1>
            <p>Every DC-EPOXY installation follows a disciplined process...</p>
          </div>
        </section>

        <section className="process-timeline section" style={{ padding: '6rem 2rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {displayProcess.map((step, index) => (
              <div key={step.id || index} className="timeline-step">
                <div className="process-index">{String(index + 1).padStart(2, '0')}</div>
                <div>
                  <h2>{step.title}</h2>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
