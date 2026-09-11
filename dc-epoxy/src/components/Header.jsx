import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    ['/services', 'Services'],
    ['/projects', 'Projects'],
    ['/process', 'Our Process'],
    ['/about', 'About Us'],
    ['/contact', 'Contact'],
  ];

  return (
    <header
      style={{
        position: scrolled ? 'fixed' : 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'var(--paper)' : 'transparent',
        boxShadow: scrolled ? '0 1px 0 var(--line)' : 'none',
        color: scrolled ? 'var(--ink)' : 'white',
        transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '92px',
        width: 'min(1340px, 100% - 64px)',
        margin: '0 auto',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid rgba(255,255,255,0.2)',
      }}>
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            color: 'inherit',
            textDecoration: 'none',
            letterSpacing: '-0.04em',
          }}
        >
          <span style={{
            width: '38px',
            height: '38px',
            border: '1px solid currentColor',
            display: 'grid',
            placeItems: 'center',
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '-0.1em',
          }}>DC</span>
          <span style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '0.08em' }}>
            DC<span style={{ color: 'var(--rose)' }}>-</span>EPOXY
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '30px',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.09em',
        }}>
          {navLinks.map(([href, label]) => (
            <NavLink
              key={href}
              to={href}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                color: 'inherit',
                textDecoration: 'none',
                opacity: isActive ? 1 : 0.8,
                transition: 'opacity 0.2s',
              })}
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="button button--copper"
            onClick={() => setMenuOpen(false)}
          >
            Book a quote <ArrowRight size={15} strokeWidth={1.8} />
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'inherit',
            cursor: 'pointer',
          }}
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--black)',
          color: 'white',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          fontSize: '14px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.09em',
        }}>
          {navLinks.map(([href, label]) => (
            <NavLink
              key={href}
              to={href}
              onClick={() => setMenuOpen(false)}
              style={{ color: 'white', textDecoration: 'none', opacity: 0.85 }}
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="button button--copper"
            onClick={() => setMenuOpen(false)}
            style={{ marginTop: '0.5rem', width: 'fit-content' }}
          >
            Book a quote <ArrowRight size={15} strokeWidth={1.8} />
          </Link>
        </div>
      )}
    </header>
  );
}
