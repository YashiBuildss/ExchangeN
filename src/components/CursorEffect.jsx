'use client';

import { useEffect, useRef } from 'react';

export default function CursorEffect() {
  const glowRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    const ring = ringRef.current;
    if (!glow || !ring) return;

    let mx = -600, my = -600;
    let rx = -600, ry = -600;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      glow.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };

    const tick = () => {
      rx += (mx - rx) * 0.10;
      ry += (my - ry) * 0.10;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const onEnter = (e) => {
      if (e.target.closest('a, button, input, textarea, [role="button"]')) {
        ring.style.width = '56px';
        ring.style.height = '56px';
        ring.style.borderColor = 'rgba(245, 158, 11, 0.7)';
        ring.style.backgroundColor = 'rgba(245, 158, 11, 0.06)';
      }
    };

    const onLeave = (e) => {
      if (e.target.closest('a, button, input, textarea, [role="button"]')) {
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = 'rgba(245, 158, 11, 0.35)';
        ring.style.backgroundColor = 'transparent';
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onEnter);
    window.addEventListener('mouseout', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onEnter);
      window.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9990] will-change-transform"
        style={{
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.045) 0%, rgba(251,146,60,0.02) 50%, transparent 70%)',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9991] will-change-transform"
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid rgba(245,158,11,0.35)',
          backgroundColor: 'transparent',
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
        }}
      />
    </>
  );
}
