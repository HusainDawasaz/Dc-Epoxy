import React from 'react';

export default function SectionIntro({ kicker, title, body, dark = false }) {
  return (
    <div className={`section-intro ${dark ? 'section-intro--dark' : ''}`}>
      {kicker && (
        <span className={`eyebrow ${dark ? 'eyebrow--copper' : ''}`}>
          {kicker}
        </span>
      )}
      <div className="section-divider" />
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {body && <p>{body}</p>}
    </div>
  );
}
