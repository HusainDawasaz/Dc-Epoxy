"use client";
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Instagram, MessageCircle } from 'lucide-react';
import { useContent } from '../hooks/useContent';

export default function Layout({ children, email, instagram }) {
  const { settings } = useContent();

  const customStyles = `
    :root {
      --copper: ${settings?.primary_color || '#b87333'};
      --paper: ${settings?.bg_color || '#f7f5f1'};
      --ink: ${settings?.text_color || '#171716'};
    }
  `;

  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <style>{customStyles}</style>
      <Header />
      
      <main style={{ flexGrow: 1 }}>
        {children}
      </main>
      
      <Footer email={email || settings?.contact_email} instagram={instagram || settings?.instagram_url} />
      
      <a 
        href="https://wa.me/971501234567?text=Hi%20DC-EPOXY!%20I%20would%20like%20to%20get%20a%20quote%20for%20my%20floor." 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-cta"
        style={{ backgroundColor: '#25D366' }}
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
