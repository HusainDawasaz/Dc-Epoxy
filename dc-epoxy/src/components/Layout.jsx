import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Instagram } from 'lucide-react';
import { useContent } from '../hooks/useContent';

export default function Layout({ children, email, instagram, darkHeader = false }) {
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
      <Header dark={darkHeader} />
      
      <main style={{ flexGrow: 1 }}>
        {children}
      </main>
      
      <Footer email={email || settings?.contact_email} instagram={instagram || settings?.instagram_url} />
      
      <a 
        href={instagram || settings?.instagram_url || 'https://www.instagram.com/dc_epoxy_/'} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-cta"
      >
        <Instagram size={20} />
      </a>
    </div>
  );
}
