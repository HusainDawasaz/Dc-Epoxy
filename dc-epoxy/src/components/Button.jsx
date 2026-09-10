import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Button({ href, children, variant = 'copper', onClick, external }) {
  const baseClasses = 'inline-flex items-center gap-2 px-6 py-3 font-medium transition-colors rounded';
  
  const variants = {
    copper: 'bg-copper-500 text-white hover:bg-copper-600',
    outline: 'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
    text: 'text-copper-500 hover:text-copper-600 p-0'
  };
  
  const className = `btn btn--${variant} ${baseClasses} ${variants[variant] || variants.copper}`;

  const content = (
    <>
      {children}
      <ArrowRight size={18} />
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
          {content}
        </a>
      );
    }
    return (
      <Link to={href} className={className} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      {content}
    </button>
  );
}
