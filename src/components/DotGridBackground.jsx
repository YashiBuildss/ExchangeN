'use client';

import { useEffect, useRef } from 'react';

export default function DotGridBackground({ children }) {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    let mx = -9999, my = -9999;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const render = () => {
      el.style.background = `radial-gradient(700px circle at ${mx}px ${my}px, rgba(245,158,11,0.07), transparent 80%)`;
      raf = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #2d2d2d 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)',
        }}
      />
      {/* Cursor spotlight */}
      <div ref={spotlightRef} className="absolute inset-0 z-0 pointer-events-none" />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
