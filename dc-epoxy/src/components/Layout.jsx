import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Instagram } from 'lucide-react';

export default function Layout({ children, email, instagram, darkHeader = false }) {
  return (
    <div className="app-layout min-h-screen flex flex-col relative">
      <Header dark={darkHeader} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer email={email} instagram={instagram} />
      
      <a 
        href={instagram || 'https://www.instagram.com/dc_epoxy_/'} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed md:hidden bottom-4 right-4 bg-copper-500 text-white p-3 rounded-full shadow-lg flex items-center gap-2 z-50"
      >
        <Instagram size={20} />
        <span className="text-sm font-medium sr-only">Talk to an expert</span>
      </a>
    </div>
  );
}
