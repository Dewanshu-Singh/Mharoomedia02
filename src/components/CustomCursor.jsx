import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only run on devices with a mouse
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    // Set up high-performance GSAP quickSetters
    const setDotX = gsap.quickSetter(cursorDot, 'x', 'px');
    const setDotY = gsap.quickSetter(cursorDot, 'y', 'px');
    const setOutlineX = gsap.quickTo(cursorOutline, 'x', { duration: 0.2, ease: 'power3' });
    const setOutlineY = gsap.quickTo(cursorOutline, 'y', { duration: 0.2, ease: 'power3' });

    const onMouseMove = (e) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
      setOutlineX(e.clientX);
      setOutlineY(e.clientY);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    // Add event listeners
    window.addEventListener('mousemove', onMouseMove);

    // Find all interactable elements to trigger hover state
    const addHoverListeners = () => {
      const interactables = document.querySelectorAll('a, button, input, textarea, select, .magnetic-target');
      interactables.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    // Initial run and setup mutation observer to catch dynamically added elements
    addHoverListeners();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          addHoverListeners();
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorDotRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--accent-red)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s, height 0.3s, background-color 0.3s',
          ...(isHovering && {
            width: '0px',
            height: '0px',
          })
        }} 
      />
      <div 
        ref={cursorOutlineRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          border: '1px solid rgba(142, 1, 14, 0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s, background-color 0.3s',
          ...(isHovering && {
            width: '60px',
            height: '60px',
            backgroundColor: 'rgba(142, 1, 14, 0.1)',
            borderColor: 'transparent'
          })
        }} 
      />
    </>
  );
};

export default CustomCursor;
