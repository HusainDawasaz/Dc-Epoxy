"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, CheckCircle, Play } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import Layout from '../components/Layout';

export default function Home() {
  const { settings, services, projects, testimonials, processSteps } = useContent();

  const displayServices = services && services.length > 0 ? services : [
    { id: 1, title: 'Garage Epoxy', description: 'Durable, stain-resistant coatings for residential garages.', tag: 'Residential' },
    { id: 2, title: 'Metallic Epoxy', description: 'High-end reflective metallic finish for showrooms.', tag: 'Luxury' },
    { id: 3, title: 'Flake Flooring', description: 'Textured, slip-resistant for high-traffic areas.', tag: 'High Traffic' },
    { id: 4, title: 'Commercial Coating', description: 'Hard-wearing epoxy for retail and commercial spaces.', tag: 'Commercial' },
    { id: 5, title: 'Industrial Flooring', description: 'Heavy-duty coatings for warehouses and factories.', tag: 'Heavy Duty' },
    { id: 6, title: 'Healthcare Flooring', description: 'Seamless, hygienic floors for clinics and hospitals.', tag: 'Hygienic' },
  ];

  const displayProjects = projects && projects.length > 0 ? projects.slice(0, 3) : [
    { id: 1, title: 'Luxury Villa Garage', location: 'Dubai', image_url: '/images/projects/project1.jpg' },
    { id: 2, title: 'Commercial Showroom', location: 'Abu Dhabi', image_url: '/images/projects/project2.jpg' },
    { id: 3, title: 'Industrial Warehouse', location: 'Sharjah', image_url: '/images/projects/project3.jpg' },
  ];

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : [
    { id: 1, quote: 'DC-EPOXY transformed our entire showroom floor in 2 days. The metallic finish is absolutely breathtaking.', author_name: 'Ahmed Al-Rashid', author_location: 'Car Showroom Owner · Dubai' },
    { id: 2, quote: 'The most professional flooring team we have worked with. On time, immaculate finish, and the garage looks like a luxury showroom.', author_name: 'Sarah Mitchell', author_location: 'Villa Owner · Abu Dhabi' },
  ];

  const displayProcess = processSteps && processSteps.length > 0 ? processSteps : [
    { id: 1, step_number: '01', title: 'Site Survey & Consultation', description: 'We visit your site, inspect the floor condition, take measurements and understand exactly what you need.' },
    { id: 2, step_number: '02', title: 'Diamond Grinding & Prep', description: 'The substrate is ground, cleaned and moisture-tested. Perfect prep is the foundation of a perfect floor.' },
    { id: 3, step_number: '03', title: 'Precision Epoxy Application', description: 'Our certified applicators apply each coat with precision following manufacturer specifications.' },
    { id: 4, step_number: '04', title: 'Quality Check & Handover', description: 'Full cure, detailed inspection, then handover. Your floor is ready to perform for decades.' },
  ];

  const heroVideoUrl = settings?.hero_video_url || null;
  const heroStyle = heroVideoUrl ? { background: '#0d0d0d' } : {
    backgroundImage: settings?.hero_image_url
      ? `url(${settings.hero_image_url})`
      : 'url(/images/dc-epoxy-hero.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const tickerItems = [
    'Garage Epoxy', 'Metallic Epoxy', 'Flake Flooring',
    'Commercial Coating', 'Industrial Flooring', 'Free Site Survey · Dubai',
    'Garage Epoxy', 'Metallic Epoxy', 'Flake Flooring',
    'Commercial Coating', 'Industrial Flooring', 'Free Site Survey · Dubai',
  ];

  return (
    <Layout>
      {/* ══════════════════════════════════
          HERO — Cinematic Video-Style
      ══════════════════════════════════ */}
      <section className="cin-hero" style={heroStyle}>
        {/* Video background (if set in Admin Settings) */}
        {heroVideoUrl && (
          <video
            autoPlay muted loop playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
            src={heroVideoUrl}
          />
        )}
        <div className="cin-hero__overlay" />
        <div className="cin-hero__overlay-bottom" />


        {/* Live Badge */}
        <div className="cin-hero__badge">
          <span className="cin-hero__badge-dot" />
          Live · Dubai
        </div>

        {/* Main Content */}
        <div className="cin-hero__content">
          <div className="cin-hero__eyebrow">DC-EPOXY · Premium Flooring UAE</div>
          <h1 className="cin-hero__title">
            <span className="cin-hero__line"><span>Transform</span></span>
            <span className="cin-hero__line"><span>Your <em>Floor.</em></span></span>
            <span className="cin-hero__line"><span>Elevate.</span></span>
          </h1>
          <p className="cin-hero__desc">
            {settings?.hero_description || 'Precision-applied epoxy and resin floor systems for garages, showrooms, villas and industrial spaces across Dubai & the UAE.'}
          </p>
          <div className="cin-hero__ctas">
            <Link href="/contact" className="cin-btn cin-btn--copper">
              Get a Free Quote <ArrowRight size={16} strokeWidth={2} />
            </Link>
            <Link href="/before-after" className="cin-btn cin-btn--video">
              <span className="cin-play-circle"><Play size={10} fill="currentColor" /></span>
              Watch Our Work
            </Link>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="cin-hero__stats">
          <div className="cin-stat">
            <div className="cin-stat__num">200+</div>
            <div className="cin-stat__label">Projects Done</div>
          </div>
          <div className="cin-stat">
            <div className="cin-stat__num">5★</div>
            <div className="cin-stat__label">Google Rating</div>
          </div>
          <div className="cin-stat">
            <div className="cin-stat__num">UAE</div>
            <div className="cin-stat__label">Nationwide</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="cin-hero__scroll">
          <div className="cin-scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════
          TICKER
      ══════════════════════════════════ */}
      <div className="cin-ticker">
        <div className="cin-ticker__inner">
          {tickerItems.map((item, i) => (
            <span key={i} className="cin-ticker__item">
              {item}
              <span className="cin-ticker__dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════
          SERVICES — Bold List
      ══════════════════════════════════ */}
      <section className="cin-section cin-section--dark">
        <div className="cin-section__header">
          <div>
            <span className="cin-section-num">02 / SERVICES</span>
            <h2 className="cin-big-heading">What We <em>Do</em></h2>
          </div>
          <Link href="/services" className="cin-btn cin-btn--copper cin-btn--sm">
            All Services <ArrowRight size={14} />
          </Link>
        </div>

        <div className="cin-service-rows">
          {displayServices.map((service, index) => (
            <Link href="/services" key={service.id || index} className="cin-service-row">
              <span className="cin-sr-num">0{index + 1}</span>
              <span className="cin-sr-title">{service.title}</span>
              <span className="cin-sr-tag">{service.tag || service.description?.split(',')[0]}</span>
              <span className="cin-sr-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          PROJECTS MOSAIC
      ══════════════════════════════════ */}
      <section className="cin-section cin-section--paper">
        <span className="cin-section-num cin-section-num--dark">03 / RECENT WORK</span>
        <h2 className="cin-big-heading cin-big-heading--dark">Projects That <em>Speak</em></h2>
        <div className="cin-projects-grid">
          {displayProjects.map((project, i) => (
            <div
              key={project.id || i}
              className={`cin-project-tile ${i === 0 ? 'cin-project-tile--tall' : ''}`}
              style={{ backgroundImage: `url(${project.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="cin-project-overlay">
                <span className="cin-project-label">DC-EPOXY</span>
                <h3>{project.title}</h3>
                <span>{project.location}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/projects" className="cin-btn cin-btn--outline-dark">
            View All Projects <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════
          QUOTE / TESTIMONIAL
      ══════════════════════════════════ */}
      <section className="cin-quote-section">
        <div className="cin-quote-mark">"</div>
        <blockquote className="cin-big-quote">
          "{displayTestimonials[0]?.quote}"
        </blockquote>
        <div className="cin-quote-meta">
          <div className="cin-quote-line" />
          <div>
            <div className="cin-quote-name">{displayTestimonials[0]?.author_name}</div>
            <div className="cin-quote-loc">{displayTestimonials[0]?.author_location}</div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          PROCESS — Grid
      ══════════════════════════════════ */}
      <section className="cin-section cin-section--dark">
        <span className="cin-section-num">04 / PROCESS</span>
        <h2 className="cin-big-heading">From Enquiry<br />to <em>Perfect Floor</em></h2>
        <div className="cin-process-grid">
          {displayProcess.map((step, i) => (
            <div key={step.id || i} className="cin-process-cell">
              <div className="cin-pc-num">
                {String(step.step_number || i + 1).padStart(2, '0')} ── {['ASSESS', 'PREPARE', 'APPLY', 'DELIVER'][i] || 'STEP'}
              </div>
              <div className="cin-pc-title">{step.title}</div>
              <div className="cin-pc-desc">{step.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          SERVICE AREAS
      ══════════════════════════════════ */}
      <section className="cin-section cin-section--paper">
        <span className="cin-section-num cin-section-num--dark">05 / WHERE WE WORK</span>
        <h2 className="cin-big-heading cin-big-heading--dark">We Cover <em>All UAE</em></h2>
        <div className="cin-areas">
          {['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'GCC Enquiries'].map((city, i) => (
            <div key={city} className="cin-area-item">
              <span className="cin-area-num">0{i + 1}</span>
              <span className="cin-area-name">{city}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          CTA — Cinematic
      ══════════════════════════════════ */}
      <section className="cin-cta">
        <div className="cin-cta__glow" />
        <div className="cin-cta__label">Start Your Project Today</div>
        <h2 className="cin-cta__title">
          Ready to<br />
          <span className="cin-cta__underline">Elevate?</span>
        </h2>
        <p className="cin-cta__sub">
          Free site survey. No obligation. We cover all of Dubai, Abu Dhabi & the UAE.
        </p>
        <div className="cin-cta__buttons">
          <Link href="/contact" className="cin-btn cin-btn--copper cin-btn--lg">
            Book Free Survey <ArrowRight size={16} />
          </Link>
          <Link href="/projects" className="cin-btn cin-btn--ghost-white cin-btn--lg">
            View Projects
          </Link>
        </div>
      </section>
    </Layout>
  );
}
