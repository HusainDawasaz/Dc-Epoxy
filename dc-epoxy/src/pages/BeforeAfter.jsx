import React, { useState } from 'react';
import Layout from '../components/Layout';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { useContent } from '../hooks/useContent';

const DEFAULT_COMPARISONS = [
  {
    id: 1,
    title: 'Luxury Villa Garage',
    location: 'Dubai Hills Estate',
    service: 'Metallic Epoxy',
    before: null,
    after: null,
    beforeLabel: 'Bare Concrete',
    afterLabel: 'Metallic Epoxy',
  },
  {
    id: 2,
    title: 'Commercial Showroom',
    location: 'Business Bay, Dubai',
    service: 'Flake Flooring',
    before: null,
    after: null,
    beforeLabel: 'Old Tiles',
    afterLabel: 'Flake Epoxy',
  },
  {
    id: 3,
    title: 'Industrial Warehouse',
    location: 'Al Quoz, Dubai',
    service: 'Industrial Coating',
    before: null,
    after: null,
    beforeLabel: 'Damaged Floor',
    afterLabel: 'Industrial Coat',
  },
];

export default function BeforeAfter() {
  const { projects } = useContent();
  const [active, setActive] = useState(0);

  const comparisons = DEFAULT_COMPARISONS;
  const current = comparisons[active];

  return (
    <Layout darkHeader={false}>
      {/* ── Dark hero ── */}
      <section style={{
        background: '#0d0d0d', color: 'white',
        paddingTop: '140px', paddingBottom: '80px',
        textAlign: 'center',
      }}>
        <div className="container">
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--rose)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '1.5rem'
          }}>
            <span style={{ width: 36, height: 1, background: 'var(--rose)', display: 'inline-block' }} />
            Real Results · Real Projects
          </span>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 900,
            lineHeight: 0.88, letterSpacing: '-0.065em', textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            Before &<br /><em style={{ color: 'var(--rose)', fontStyle: 'normal' }}>After</em>
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', maxWidth: '440px', margin: '0 auto', lineHeight: 1.8 }}>
            Drag the handle to reveal the transformation. Every project is a DC-EPOXY signature.
          </p>
        </div>
      </section>

      {/* ── Project selector tabs ── */}
      <div style={{ background: '#111', borderBottom: '1px solid #1f1f1f' }}>
        <div className="container" style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
          {comparisons.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '1.2rem 1.5rem',
                fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: active === i ? 'white' : 'rgba(255,255,255,0.3)',
                borderBottom: active === i ? '2px solid var(--copper)' : '2px solid transparent',
                transition: 'all 0.25s ease', whiteSpace: 'nowrap',
              }}
            >
              {String(i + 1).padStart(2, '0')} — {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Slider ── */}
      <section style={{ background: '#0d0d0d', padding: '3rem 0' }}>
        <div className="container">
          <BeforeAfterSlider
            beforeImage={current.before}
            afterImage={current.after}
            beforeLabel={current.beforeLabel}
            afterLabel={current.afterLabel}
            height="520px"
          />

          {/* Project details below slider */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem',
            paddingTop: '1.5rem', borderTop: '1px solid #1f1f1f',
          }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--rose)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                {current.service}
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.04em', color: 'white', margin: 0 }}>
                {current.title}
              </h2>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginTop: '6px' }}>
                📍 {current.location}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'white', letterSpacing: '-0.05em' }}>—</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Before</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--rose)', letterSpacing: '-0.05em' }}>✦</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>After</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Thumbnail strip ── */}
      <section style={{ background: '#111', padding: '2rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {comparisons.map((c, i) => (
              <div
                key={c.id}
                onClick={() => setActive(i)}
                style={{
                  height: '120px',
                  background: i === 0 ? 'linear-gradient(135deg, #2a1f15, #4a3020)'
                    : i === 1 ? 'linear-gradient(135deg, #1a2a1a, #2a4020)'
                    : 'linear-gradient(135deg, #1a1a2a, #202040)',
                  cursor: 'pointer', position: 'relative', overflow: 'hidden',
                  border: active === i ? '2px solid var(--copper)' : '2px solid transparent',
                  transition: 'border-color 0.3s ease',
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex',
                  flexDirection: 'column', justifyContent: 'flex-end', padding: '0.75rem',
                  background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7))',
                }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--rose)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{c.service}</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>{c.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#0d0d0d', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <p style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--rose)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Want This For Your Space?
          </p>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.065em', textTransform: 'uppercase', color: 'white', marginBottom: '1.5rem' }}>
            Get a Free<br /><em style={{ color: 'var(--rose)', fontStyle: 'normal' }}>Site Survey</em>
          </h2>
          <a href="/contact" className="cin-btn cin-btn--copper cin-btn--lg" style={{ display: 'inline-flex' }}>
            Book Now →
          </a>
        </div>
      </section>
    </Layout>
  );
}
