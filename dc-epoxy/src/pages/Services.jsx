import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import Layout from '../components/Layout';

export default function Services() {
  const { services } = useContent();

  const displayServices = services && services.length > 0 ? services : [
    { id: 1, title: 'Garage Epoxy', description: 'Durable, stain-resistant coatings for residential garages.', image_url: '/images/services/garage.jpg' },
    { id: 2, title: 'Metallic Epoxy', description: 'High-end, striking floors with a reflective metallic finish.', image_url: '/images/services/metallic.jpg' },
    { id: 3, title: 'Flake Flooring', description: 'Textured, slip-resistant flooring perfect for high-traffic areas.', image_url: '/images/services/flake.jpg' },
    { id: 4, title: 'Commercial Coating', description: 'Hard-wearing epoxy for retail and commercial spaces.', image_url: '/images/services/commercial.jpg' },
    { id: 5, title: 'Industrial Flooring', description: 'Heavy-duty coatings for warehouses and factories.', image_url: '/images/services/industrial.jpg' },
    { id: 6, title: 'Healthcare Flooring', description: 'Seamless, hygienic floors for clinics and hospitals.', image_url: '/images/services/healthcare.jpg' }
  ];

  return (
    <Layout darkHeader={true}>
      <div className="inner-page">
        <section className="inner-hero" style={{ backgroundColor: '#171716', color: 'white', padding: '8rem 2rem 4rem 2rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Epoxy Flooring Systems</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', color: '#ccc' }}>We offer a range of premium resin and epoxy systems tailored for different environments, from residential garages to heavy-duty industrial warehouses.</p>
        </section>

        <section className="service-directory" style={{ padding: '6rem 2rem', backgroundColor: '#f7f5f1' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {displayServices.map((service, index) => (
              <div key={service.id || index} className="directory-row" style={{ display: 'flex', gap: '3rem', alignItems: 'center', borderBottom: '1px solid #ddd', paddingBottom: '3rem' }}>
                <div className="directory-number" style={{ fontSize: '2.5rem', color: '#b87333', fontWeight: 'bold' }}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div style={{ width: '400px', height: '250px', flexShrink: 0 }}>
                  <img src={service.image_url} alt={service.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{service.title}</h2>
                  <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: 1.6 }}>{service.description}</p>
                </div>
                <ArrowRight size={32} color="#b87333" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
