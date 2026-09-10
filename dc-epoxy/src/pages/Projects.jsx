import React from 'react';
import { useContent } from '../hooks/useContent';
import Layout from '../components/Layout';

export default function Projects() {
  const { projects } = useContent();

  const displayProjects = projects && projects.length > 0 ? projects : [
    { id: 1, title: 'Luxury Villa Garage', location: 'Dubai', image_url: '/images/projects/project1.jpg', service_type: 'Garage Epoxy', description: 'Complete floor overhaul with our signature metallic finish.' },
    { id: 2, title: 'Commercial Showroom', location: 'Abu Dhabi', image_url: '/images/projects/project2.jpg', service_type: 'Metallic Epoxy', description: 'A sleek, durable floor designed for high foot traffic.' },
    { id: 3, title: 'Industrial Warehouse', location: 'Sharjah', image_url: '/images/projects/project3.jpg', service_type: 'Industrial Flooring', description: 'Heavy-duty coating built to withstand machinery and spills.' },
    { id: 4, title: 'Retail Store', location: 'Dubai Mall', image_url: '/images/projects/project4.jpg', service_type: 'Flake Flooring', description: 'A seamless, easy-to-clean surface for a busy retail space.' },
    { id: 5, title: 'Private Clinic', location: 'Ajman', image_url: '/images/projects/project5.jpg', service_type: 'Healthcare Flooring', description: 'Hygienic and anti-microbial floor coating for medical use.' },
    { id: 6, title: 'Auto Workshop', location: 'Ras Al Khaimah', image_url: '/images/projects/project6.jpg', service_type: 'Commercial Coating', description: 'Oil and chemical resistant floor for an automotive center.' }
  ];

  return (
    <Layout darkHeader={true}>
      <div className="inner-page">
        <section className="inner-hero" style={{ backgroundColor: '#171716', color: 'white', padding: '8rem 2rem 4rem 2rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Our Projects</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', color: '#ccc' }}>Explore our portfolio of recent epoxy and resin flooring installations across the UAE.</p>
        </section>

        <section className="projects-gallery section" style={{ padding: '6rem 2rem' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
            {displayProjects.map((project, index) => (
              <div key={project.id || index} className="gallery-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <img src={project.image_url} alt={project.title} loading="lazy" style={{ width: '100%', aspectRatio: '1.2', objectFit: 'cover', marginBottom: '1rem' }} />
                <div className="gallery-meta">
                  <span className="project-label" style={{ color: '#b87333', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>{project.service_type}</span>
                  <h2 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>{project.title}</h2>
                  <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>{project.location}</p>
                  {project.description && <small style={{ color: '#888', fontSize: '0.9rem' }}>{project.description}</small>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
