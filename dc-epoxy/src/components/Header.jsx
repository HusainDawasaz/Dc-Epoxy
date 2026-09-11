import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Header({ dark = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // dark=true means page has dark hero, keep white text
  // scrolled=true means header is now fixed over light content, switch to dark text
  const isDark = dark && !scrolled;
  const isScrolled = scrolled;

  const navLinks = [
    ['/services', 'Services'],
    ['/projects', 'Projects'],
    ['/process', 'Our Process'],
    ['/about', 'About Us'],
    ['/contact', 'Contact'],
  ];

  return (
    <header className={`site-header${isDark ? ' site-header--dark' : ''}${isScrolled ? ' site-header--scrolled' : ''}`}>
      <div className="nav-shell">
        <Link to="/" className="brand-lockup" aria-label="DC-EPOXY home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">DC</span>
          <span className="brand-name">DC<span>-</span>EPOXY</span>
        </Link>

        <nav className={`main-nav${menuOpen ? ' main-nav--open' : ''}`} aria-label="Main navigation">
          {navLinks.map(([href, label]) => (
            <NavLink key={href} to={href} onClick={() => setMenuOpen(false)}>
              {label}
            </NavLink>
          ))}
          <Link to="/contact" className="button button--copper" onClick={() => setMenuOpen(false)}>
            Book a quote <ArrowRight size={15} strokeWidth={1.8} />
          </Link>
        </nav>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
