import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ChevronDown } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Layout from '../components/Layout';
import CommonNinjaWidget from '../components/CommonNinjaWidget';
import SectionIntro from '../components/SectionIntro';

export default function Home() {
  const { settings, services, projects, testimonials, processSteps } = useContent();
  useScrollAnimation();


  const displayServices = services && services.length > 0 ? services : [
    { id: 1, title: 'Garage Epoxy', description: 'Durable, stain-resistant coatings for residential garages.', image_url: '/images/services/garage.jpg' },
    { id: 2, title: 'Metallic Epoxy', description: 'High-end, striking floors with a reflective metallic finish.', image_url: '/images/services/metallic.jpg' },
    { id: 3, title: 'Flake Flooring', description: 'Textured, slip-resistant flooring perfect for high-traffic areas.', image_url: '/images/services/flake.jpg' },
    { id: 4, title: 'Commercial Coating', description: 'Hard-wearing epoxy for retail and commercial spaces.', image_url: '/images/services/commercial.jpg' },
    { id: 5, title: 'Industrial Flooring', description: 'Heavy-duty coatings for warehouses and factories.', image_url: '/images/services/industrial.jpg' },
    { id: 6, title: 'Healthcare Flooring', description: 'Seamless, hygienic floors for clinics and hospitals.', image_url: '/images/services/healthcare.jpg' }
  ];

  const displayProjects = projects && projects.length > 0 ? projects.slice(0, 3) : [
    { id: 1, title: 'Luxury Villa Garage', location: 'Dubai', image_url: '/images/projects/project1.jpg', service_type: 'Garage Epoxy' },
    { id: 2, title: 'Commercial Showroom', location: 'Abu Dhabi', image_url: '/images/projects/project2.jpg', service_type: 'Metallic Epoxy' },
    { id: 3, title: 'Industrial Warehouse', location: 'Sharjah', image_url: '/images/projects/project3.jpg', service_type: 'Industrial Flooring' }
  ];

  const displayProcess = processSteps && processSteps.length > 0 ? processSteps : [
    { id: 1, title: 'Initial Enquiry & Site Assessment', description: 'We start with a consultation to understand your needs and assess the site.' },
    { id: 2, title: 'Surface Preparation', description: 'Crucial for a lasting finish, we rigorously prepare the concrete substrate.' },
    { id: 3, title: 'Epoxy Application', description: 'Our certified applicators install the epoxy system with precision.' },
    { id: 4, title: 'Curing & Quality Check', description: 'We ensure a perfect finish through detailed inspections during the curing process.' }
  ];

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : [
    { id: 1, author_name: 'Ahmed K.', location: 'Dubai', content: 'Incredible transformation of my garage. The team was highly professional.' },
    { id: 2, author_name: 'Sarah M.', location: 'Abu Dhabi', content: 'Our showroom floor looks stunning. Highly recommend DC-EPOXY.' },
    { id: 3, author_name: 'Omar R.', location: 'Ajman', content: 'Fast, efficient, and top-quality work for our industrial facility.' }
  ];

  return (
    <Layout>
      {/* 1. Hero Section */}
      <section 
        className="hero" 
        style={{ backgroundImage: `url(${settings?.hero_image_url || '/images/dc-epoxy-hero.jpg'})` }}
      >
        <div className="hero-overlay" style={{ background: 'linear-gradient(90deg, rgba(17,17,17,.84) 0%, rgba(17,17,17,.46) 52%, rgba(17,17,17,.08) 100%)', position: 'absolute', inset: 0 }}></div>
        <div className="hero-content" style={{ position: 'relative', zIndex: 1, textAlign: settings?.hero_alignment === 'center' ? 'center' : 'left', alignItems: settings?.hero_alignment === 'center' ? 'center' : 'flex-start' }}>
          <div className="eyebrow">Epoxy flooring · UAE</div>
          <h1>
            {settings?.hero_heading || 'Transform Your Floor. Elevate Your Space.'}
            <span className="hero-keyword" style={{ display: 'block', fontSize: '0.4em', fontWeight: 'normal', marginTop: '1rem', opacity: 0.9 }}>
              Premium epoxy flooring in Dubai & the UAE
            </span>
          </h1>
          <p>{settings?.hero_description || 'DC-EPOXY delivers precision-applied epoxy and resin floor systems for garages, showrooms, villas and industrial spaces across the UAE.'}</p>
          <div className="hero-actions">
            <Link to="/contact" className="button button--copper">Get a quote</Link>
            <a href="https://instagram.com" className="button button--ghost">Talk to an expert</a>
          </div>
        </div>
        <div className="hero-side-note" style={{ position: 'absolute', right: '2rem', bottom: '4rem', display: 'flex', alignItems: 'center', gap: '1rem', color: 'white', transform: 'rotate(90deg)', transformOrigin: 'right bottom' }}>
          <span>01</span>
          <div style={{ width: '40px', height: '1px', backgroundColor: 'white' }}></div>
          <span>Dubai · Abu Dhabi</span>
        </div>
        <div className="scroll-cue" style={{ position: 'absolute', bottom: '2rem', left: '2rem', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span>Scroll</span>
          <ChevronDown size={20} />
        </div>
      </section>

      {/* 2. Credibility Strip */}
      <section className="credibility-strip">
        <div className="credibility-items" style={{ display: 'flex', justifyContent: 'space-around', padding: '2rem', backgroundColor: '#171716', color: '#f7f5f1' }}>
          <span>5+ Years in UAE</span>
          <span>Dubai · Abu Dhabi · Ajman</span>
          <span>Residential & Commercial</span>
          <span>Free Site Survey</span>
        </div>
      </section>

      {/* 3. Services Section */}
      <section className="section services-section">
        <SectionIntro 
          kicker="Our Systems" 
          title="Epoxy flooring for every space" 
          body="From garage floors to industrial warehouses, DC-EPOXY brings precision and durability to every project." 
        />
        <div className="service-grid">
          {displayServices.map((service, index) => (
            <div key={service.id || index} className="service-card">
              <div className="service-image">
                <img src={service.image_url} alt={service.title} loading="lazy" />
              </div>
              <div className="service-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="service-copy">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/services" className="button button--copper">View all services</Link>
        </div>
      </section>

      {/* 4. Before/After Section */}
      <section className="before-after-section animate-on-scroll" style={{ backgroundColor: '#171716', color: '#f7f5f1', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <SectionIntro 
            className="section-intro--dark"
            kicker="Results" 
            title="See the transformation" 
            body="Real projects, real results. Our before and after gallery shows the DC-EPOXY difference." 
          />
          <div style={{ marginTop: '3rem', minHeight: '500px' }}>
            <CommonNinjaWidget pid="101850d9-1bce-4025-9860-de67f43456b1" />
          </div>
        </div>
      </section>

      {/* 5. Why Section */}
      <section className="section why-section" style={{ display: 'flex', padding: '6rem 2rem', gap: '4rem' }}>
        <div style={{ flex: 1 }}>
          <SectionIntro kicker="Why DC-EPOXY" title="Built on precision. Delivered with care." />
        </div>
        <div className="principles-list" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {['Certified Applicators', 'Premium-Grade Resins', 'Surface Preparation First', 'On-Time Delivery', 'Post-Install Support'].map((principle, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.2rem' }}>
              <span style={{ color: '#b87333', fontWeight: 'bold' }}>{String(idx + 1).padStart(2, '0')}</span>
              <strong>{principle}</strong>
              <CheckCircle size={20} color="#b87333" style={{ marginLeft: 'auto' }} />
            </div>
          ))}
        </div>
      </section>

      {/* 6. Projects Mosaic Section */}
      <section className="section animate-on-scroll">
        <SectionIntro kicker="Recent Work" title="Projects that speak for themselves" />
        <div className="project-mosaic" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '3rem' }}>
          {displayProjects.map((project, index) => (
            <div key={project.id || index} className={`tile tile-${index + 1}`} style={{ position: 'relative', height: index === 0 ? '600px' : '290px', gridRow: index === 0 ? 'span 2' : 'auto' }}>
              <img src={project.image_url} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="project-overlay" style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2rem' }}>
                <span className="project-label" style={{ color: '#b87333', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>{project.service_type}</span>
                <h3 style={{ margin: '0.5rem 0' }}>{project.title}</h3>
                <span className="location">{project.location}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/projects" className="button button--outline">View all projects</Link>
        </div>
      </section>

      {/* 7. Local SEO Section */}
      <section className="local-seo-section section" style={{ display: 'flex', padding: '6rem 2rem', gap: '4rem', backgroundColor: '#f7f5f1' }}>
        <div style={{ flex: 1 }}>
          <div className="eyebrow" style={{ color: '#c58361', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem', marginBottom: '1rem' }}>Coverage</div>
          <h2>Epoxy Flooring Across the UAE</h2>
        </div>
        <div className="local-seo-copy" style={{ flex: 1 }}>
          <p>DC-EPOXY provides premium resin and epoxy flooring solutions tailored to residential, commercial, and industrial spaces across the entire UAE.</p>
          <p>Whether you're in Dubai, Abu Dhabi, Sharjah, Ajman, or Ras Al Khaimah (RAK), our expert applicators deliver seamless, durable finishes designed to withstand the region's tough climate.</p>
          <Link to="/contact" className="button button--copper" style={{ marginTop: '2rem', display: 'inline-block' }}>Get a free quote</Link>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="section faq-section">
        <div className="faq-layout" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <SectionIntro kicker="FAQ" title="Common questions" />
          <div className="faq-list" style={{ marginTop: '3rem' }}>
            <details style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #ccc' }}>
              <summary style={{ fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', padding: '1rem 0' }}>Where does DC-EPOXY provide epoxy flooring?</summary>
              <div style={{ padding: '1rem 0', lineHeight: 1.6 }}>DC-EPOXY accepts epoxy flooring enquiries in Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain, with UAE and GCC enquiries welcome.</div>
            </details>
            <details style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #ccc' }}>
              <summary style={{ fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', padding: '1rem 0' }}>What types of epoxy flooring are available?</summary>
              <div style={{ padding: '1rem 0', lineHeight: 1.6 }}>DC-EPOXY provides garage epoxy, metallic epoxy, flake flooring, commercial floor coatings, industrial flooring, healthcare flooring and resin flooring applications.</div>
            </details>
            <details style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #ccc' }}>
              <summary style={{ fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', padding: '1rem 0' }}>How long does epoxy flooring take to install?</summary>
              <div style={{ padding: '1rem 0', lineHeight: 1.6 }}>Most residential projects are completed in 1–2 days. Commercial and industrial projects vary by area size. We always confirm the timeline before starting.</div>
            </details>
            <details style={{ paddingBottom: '1rem', borderBottom: '1px solid #ccc' }}>
              <summary style={{ fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', padding: '1rem 0' }}>How do I request an epoxy flooring quote?</summary>
              <div style={{ padding: '1rem 0', lineHeight: 1.6 }}>Share your project location, approximate area and intended use through the DC-EPOXY quote form or Instagram.</div>
            </details>
          </div>
        </div>
      </section>

      {/* 9. Process Section */}
      <section className="section process-section">
        <SectionIntro kicker="Our Process" title="From enquiry to finished floor" />
        <div className="process-list" style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {displayProcess.map((step, index) => (
            <div key={step.id || index} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', paddingBottom: '2rem', borderBottom: index < displayProcess.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
              <div className="process-index" style={{ fontSize: '2rem', color: '#b87333', fontWeight: 'bold', minWidth: '60px' }}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{step.title}</h3>
                <p style={{ margin: 0, color: '#666' }}>{step.description}</p>
              </div>
              <ArrowRight color="#b87333" />
            </div>
          ))}
        </div>
      </section>

      {/* 10. Story Band */}
      <section className="story-band animate-on-scroll" style={{ backgroundColor: '#c58361', color: 'white', padding: '6rem 2rem' }}>
        <div className="story-layout" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '4rem', alignItems: 'center' }}>
          <div className="story-stamp" style={{ flexShrink: 0, width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.6)', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/images/dc-epoxy-logo.jpg" alt="DC-EPOXY Logo" style={{ width: '140px', height: '140px', objectFit: 'contain' }} />
          </div>
          <div className="text-column" style={{ flex: 1 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>The craftsmanship <em style={{ color: "white", opacity: 0.8, fontStyle: "italic" }}>behind</em> the floor</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '1rem' }}>At DC-EPOXY, we don't just pour resin; we engineer floors that last. Our commitment to premium materials and exact application ensures your space isn't just transformed visually, but structurally enhanced.</p>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2rem' }}>Quality without compromise, from the first layer to the final topcoat.</p>
            <Link to="/about" className="button button--outline" style={{ borderColor: 'white', color: 'white' }}>Learn about us</Link>
          </div>
        </div>
      </section>

      {/* 11. Areas Section */}
      <section className="section areas-section">
        <div className="areas-layout" style={{ display: 'flex', gap: '4rem' }}>
          <div style={{ flex: 1 }}>
            <SectionIntro kicker="Service Areas" title="We come to you" />
          </div>
          <div className="areas-list" style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'GCC Enquiries'].map((area, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <b style={{ color: '#b87333' }}>{String(idx + 1).padStart(2, '0')}</b>
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Testimonials Section */}
      <section className="section testimonials-section" style={{ backgroundColor: '#f7f5f1', padding: '6rem 2rem' }}>
        <SectionIntro kicker="Client Reviews" title="What our clients say" />
        <div className="testimonial-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
          {displayTestimonials.map((testimonial, idx) => (
            <div key={testimonial.id || idx} className="testimonial-card" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <div className="eyebrow" style={{ color: '#c58361', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>Verified client</div>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '2rem' }}>"{testimonial.quote}"</p>
              <div>
                <strong style={{ display: 'block' }}>{testimonial.author_name}</strong>
                <span style={{ color: '#666', fontSize: '0.9rem' }}>{testimonial.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 13. CTA Band */}
      <section className="cta-band animate-on-scroll" style={{ backgroundColor: '#171716', color: 'white', padding: '8rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Ready to <em>transform</em> your floor?</h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem auto', color: '#ccc' }}>Get a free site survey and quote. No obligation. We cover all of Dubai, Abu Dhabi and the wider UAE.</p>
        <Link to="/contact" className="button button--copper" style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }}>Book a free quote</Link>
      </section>

    </Layout>
  );
}
