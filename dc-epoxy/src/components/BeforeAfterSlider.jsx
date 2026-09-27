"use client";
import React, { useState, useRef, useCallback, useEffect } from 'react';

export default function BeforeAfterSlider({
  beforeImage,
  beforeLabel = 'Before',
  afterImage,
  afterLabel = 'After',
  height = '500px',
}) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);

  const getPositionFromEvent = useCallback((e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    return Math.round((x / rect.width) * 100);
  }, []);

  const handleMove = useCallback((e) => {
    if (!dragging) return;
    e.preventDefault();
    const pos = getPositionFromEvent(e);
    if (pos !== undefined) setPosition(pos);
  }, [dragging, getPositionFromEvent]);

  const handleDown = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
    const pos = getPositionFromEvent(e);
    if (pos !== undefined) setPosition(pos);
  }, [getPositionFromEvent]);

  const handleUp = useCallback(() => setDragging(false), []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMove, { passive: false });
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [dragging, handleMove, handleUp]);

  const fallbackBefore = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="800" height="500" fill="%23999"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="28" fill="%23666">Before Photo</text></svg>';
  const fallbackAfter  = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="800" height="500" fill="%23b87333"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="28" fill="%23fff">After Photo</text></svg>';

  return (
    <div
      ref={containerRef}
      onMouseDown={handleDown}
      onTouchStart={handleDown}
      style={{
        position: 'relative',
        width: '100%',
        height,
        overflow: 'hidden',
        cursor: dragging ? 'grabbing' : 'col-resize',
        userSelect: 'none',
        borderRadius: '2px',
        background: '#111',
      }}
      aria-label="Before and After slider"
      role="img"
    >
      {/* AFTER image — full width, underneath */}
      <img
        src={afterImage || fallbackAfter}
        alt="After"
        draggable={false}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
      />

      {/* BEFORE image — clipped on the left */}
      <div style={{ position: 'absolute', inset: 0, width: `${position}%`, overflow: 'hidden' }}>
        <img
          src={beforeImage || fallbackBefore}
          alt="Before"
          draggable={false}
          style={{ position: 'absolute', inset: 0, width: containerRef.current?.offsetWidth + 'px' || '100%', maxWidth: 'none', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
        />
      </div>

      {/* Divider Line */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: `${position}%`,
        width: '2px', background: 'white', transform: 'translateX(-50%)',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)', zIndex: 3,
      }} />

      {/* Drag Handle */}
      <div style={{
        position: 'absolute', top: '50%', left: `${position}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 4,
        width: '50px', height: '50px', borderRadius: '50%',
        background: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
        transition: dragging ? 'none' : 'transform 0.15s ease',
      }}>
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
          <path d="M6 1L1 8L6 15" stroke="#b87333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 1L21 8L16 15" stroke="#b87333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* BEFORE label */}
      <div style={{
        position: 'absolute', top: '1.2rem', left: '1.2rem', zIndex: 5,
        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
        color: 'white', padding: '5px 12px',
        fontFamily: 'monospace', fontSize: '10px', fontWeight: 700,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        opacity: position < 15 ? 0 : 1, transition: 'opacity 0.3s',
      }}>
        {beforeLabel}
      </div>

      {/* AFTER label */}
      <div style={{
        position: 'absolute', top: '1.2rem', right: '1.2rem', zIndex: 5,
        background: 'rgba(184,115,51,0.75)', backdropFilter: 'blur(6px)',
        color: 'white', padding: '5px 12px',
        fontFamily: 'monospace', fontSize: '10px', fontWeight: 700,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        opacity: position > 85 ? 0 : 1, transition: 'opacity 0.3s',
      }}>
        {afterLabel}
      </div>

      {/* Hint text (fades on first drag) */}
      {position === 50 && (
        <div style={{
          position: 'absolute', bottom: '1.5rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 5,
          fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
          padding: '5px 14px', whiteSpace: 'nowrap',
          animation: 'cin-pulse 2s ease infinite',
        }}>
          ← Drag to compare →
        </div>
      )}
    </div>
  );
}
