import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SplitTextReveal = ({ text, as: Component = 'h2', className = '', delay = 0 }) => {
  const containerRef = useRef(null);

  // Split text into words, preserving spaces visually
  const words = text.split(' ');

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current.querySelectorAll('.word-inner'),
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.03,
        ease: 'power4.out',
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <Component ref={containerRef} className={className}>
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <span className="word-outer" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
            <span className="word-inner" style={{ display: 'inline-block', transform: 'translateY(120%)', opacity: 0, willChange: 'transform, opacity' }}>
              {word}
            </span>
          </span>
          {index < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </Component>
  );
};

export default SplitTextReveal;
