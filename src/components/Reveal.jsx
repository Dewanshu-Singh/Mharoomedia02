import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// A reusable component that fades and slides its children up when they enter the viewport
const Reveal = ({ children, delay = 0, y = 50 }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      { y: y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%', // Trigger when top of element hits 85% of screen
          toggleActions: 'play none none reverse', // play on scroll down, reverse on scroll up
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ willChange: 'transform, opacity' }}>
      {children}
    </div>
  );
};

export default Reveal;
