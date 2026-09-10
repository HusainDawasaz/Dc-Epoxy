import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail } from 'lucide-react';

export default function Footer({ email = 'info@dc-epoxy.com', instagram = 'https://www.instagram.com/dc_epoxy_/' }) {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Link to="/" className="brand-lockup brand-lockup--light" aria-label="DC-EPOXY home">
            <span className="brand-mark">DC</span>
            <span className="brand-name">DC<span>-</span>EPOXY</span>
          </Link>
          <p>Premium epoxy flooring and resin flooring solutions for residential, commercial and industrial spaces across the UAE.</p>
          <div className="footer-socials">
            <a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={17} />
            </a>
            <a href={`mailto:${email}`} aria-label="Email">
              <Mail size={17} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <span className="eyebrow">Explore</span>
          <Link to="/services">Services</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/process">Our process</Link>
          <Link to="/about">About us</Link>
        </div>

        <div className="footer-col">
          <span className="eyebrow">Contact</span>
          <a href={`mailto:${email}`}>{email}</a>
          <a href={instagram} target="_blank" rel="noreferrer">@dc_epoxy_</a>
          <span className="muted">Dubai · Abu Dhabi · UAE</span>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 DC-EPOXY. All rights reserved.</span>
        <span className="footer-legal">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms / Disclaimer</Link>
        </span>
      </div>
    </footer>
  );
}
