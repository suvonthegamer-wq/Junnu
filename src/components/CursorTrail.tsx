import { useEffect, useRef } from 'react';
import { animate, random } from 'animejs';

export default function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

      createParticle(x, y);
    };

    const createParticle = (x: number, y: number) => {
      const particle = document.createElement('div');
      particle.className = 'sparkle-cursor';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      
      const size = Math.random() * 8 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      if (containerRef.current) {
        containerRef.current.appendChild(particle);
      }

      animate(particle, {
        translateX: () => random(-20, 20),
        translateY: () => random(-20, 20),
        scale: [1, 0],
        opacity: [0.8, 0],
        rotate: () => random(0, 360),
        duration: random(800, 1500),
        ease: 'outExpo',
        onComplete: () => {
          particle.remove();
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleMouseMove);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
}
