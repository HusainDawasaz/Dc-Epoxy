import React from 'react';

export default function SectionIntro({ kicker, title, body, dark = false }) {
  return (
    <div className={`section-intro mb-12 ${dark ? 'section-intro--dark text-white' : 'text-gray-900'}`}>
      {kicker && <span className="eyebrow block text-copper-500 font-semibold uppercase tracking-wider text-sm mb-2">{kicker}</span>}
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {body && <p className={`max-w-2xl text-lg ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{body}</p>}
    </div>
  );
}
