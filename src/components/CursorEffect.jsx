'use client';

import { useEffect, useRef } from 'react';

export default function CursorEffect() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring || !glow) return;

    // Hide the native cursor
    document.documentElement.style.cursor = 'none';

    let mx = -600, my = -600;   // mouse
    let rx = -600, ry = -600;   // ring (lagged)
    let vx = 0, vy = 0;         // instantaneous velocity
    let clickScale = 1;
    let clickVel = 0;
    let hovering = false;
    let raf;

    const onMove = (e) => {
      vx = e.clientX - mx;
      vy = e.clientY - my;
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      glow.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    };

    const onOver = (e) => {
      if (e.target.closest('a, button, input, textarea, select, [role="button"]')) {
        hovering = true;
        dot.style.opacity = '0';
        dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%) scale(2)`;
        ring.style.width = '58px';
        ring.style.height = '58px';
        ring.style.borderColor = 'rgba(245,158,11,0.85)';
        ring.style.backgroundColor = 'rgba(245,158,11,0.07)';
        ring.style.boxShadow = '0 0 14px rgba(245,158,11,0.18)';
      }
    };

    const onOut = (e) => {
      if (e.target.closest('a, button, input, textarea, select, [role="button"]')) {
        hovering = false;
        dot.style.opacity = '1';
        dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%) scale(1)`;
        ring.style.width = '38px';
        ring.style.height = '38px';
        ring.style.borderColor = 'rgba(245,158,11,0.38)';
        ring.style.backgroundColor = 'transparent';
        ring.style.boxShadow = 'none';
      }
    };

    const onClick = () => {
      clickScale = 0.65;
    };

    const tick = () => {
      // Lerp ring toward mouse
      rx += (mx - rx) * 0.115;
      ry += (my - ry) * 0.115;

      // Spring click pulse
      clickVel += (1 - clickScale) * 0.35;
      clickVel *= 0.68;
      clickScale += clickVel;

      if (!hovering) {
        // Velocity-based stretch: squash & stretch along movement axis
        const speed = Math.sqrt(vx * vx + vy * vy);
        const stretchX = Math.min(1 + speed * 0.038, 1.55);
        const stretchY = Math.max(1 - speed * 0.018, 0.65);
        const angle = Math.atan2(vy, vx) * (180 / Math.PI);

        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%) rotate(${angle}deg) scaleX(${stretchX * clickScale}) scaleY(${stretchY * clickScale})`;
      } else {
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%) scale(${clickScale})`;
      }

      // Dampen velocity each frame
      vx *= 0.78;
      vy *= 0.78;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout', onOut);
    window.addEventListener('click', onClick);
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Dot — snaps exactly to cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9993] will-change-transform"
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          backgroundColor: 'rgba(245,158,11,0.95)',
          boxShadow: '0 0 8px rgba(245,158,11,0.7), 0 0 2px rgba(255,255,255,0.4)',
          transition: 'opacity 0.18s ease, transform 0.18s ease',
        }}
      />

      {/* Ring — trails behind with stretch */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9992] will-change-transform"
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          border: '1.5px solid rgba(245,158,11,0.38)',
          backgroundColor: 'transparent',
          transition: 'width 0.28s cubic-bezier(0.34,1.56,0.64,1), height 0.28s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
        }}
      />

      {/* Ambient glow blob — very subtle, follows mouse */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9990] will-change-transform"
        style={{
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)',
        }}
      />
    </>
  );
}
