import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import './WavyBackground.css';

const WavyBackground = () => {
  const pathRef = useRef(null);
  const [dimensions, setDimensions] = useState({ 
    w: typeof window !== 'undefined' ? window.innerWidth : 1000, 
    h: typeof window !== 'undefined' ? window.innerHeight : 1000 
  });
  
  // Track the current cursor values using GSAP quickTo for smoothness
  const pos = useRef({ 
    cx: typeof window !== 'undefined' ? window.innerWidth / 2 : 500, 
    cy: typeof window !== 'undefined' ? window.innerHeight / 2 : 500 
  });

  useEffect(() => {
    const handleResize = () => setDimensions({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const { w, h } = dimensions;
    const baseY = h / 2; // Baseline of the fluid
    
    const xTo = gsap.quickTo(pos.current, "cx", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(pos.current, "cy", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseLeave = () => {
      xTo(w / 2);
      yTo(baseY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;
    // Render loop to draw the waves mathematically
    const render = () => {
      if (pathRef.current) {
        time += 0.03; // Speed of the ambient waves
        let d = `M 0,${baseY}`;
        const points = 200; // High resolution for smooth rendering
        const step = w / points;
        
        for (let i = 0; i <= points; i++) {
          const x = i * step;
          
          // 1. Ambient waves: 10-11 continuous ripples
          const numWaves = 10.5;
          const freq = (Math.PI * 2 * numWaves) / w;
          const ambientY = Math.sin(time + x * freq) * 15; // 15px height for ambient waves
          
          // 2. Cursor pull effect
          const dx = x - pos.current.cx;
          const radius = 200; // How wide the cursor's magnetic pull is
          
          let targetY = pos.current.cy - baseY; 
          
          // CLAMP THE TARGET Y so the wave never reaches the very top or bottom
          const maxPull = 120; // Maximum pixels the wave can be pulled up or down
          if (targetY < -maxPull) targetY = -maxPull;
          if (targetY > maxPull) targetY = maxPull;
          
          // Gaussian bell curve to smoothly pull points near the cursor
          const weight = Math.exp(-(dx * dx) / (2 * radius * radius));
          const pullY = targetY * weight;
          
          const y = baseY + ambientY + pullY;
          d += ` L ${x},${y}`;
        }
        
        d += ` L ${w},${h} L 0,${h} Z`;
        pathRef.current.setAttribute("d", d);
      }
      requestAnimationFrame(render);
    };
    
    const animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [dimensions]);

  const handleClick = () => {
    const { h } = dimensions;
    const baseY = h / 2;
    // Small splash effect on click
    gsap.to(pos.current, {
      cy: pos.current.cy > baseY ? pos.current.cy - 150 : pos.current.cy + 150,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
      yoyo: true,
      repeat: 1
    });
  };

  return (
    <div className="wavy-bg-container" onClick={handleClick}>
      <svg 
        width={dimensions.w} 
        height={dimensions.h} 
        className="wavy-svg"
      >
        <path 
          ref={pathRef}
          fill="#8e010e" 
        />
      </svg>
    </div>
  );
};

export default WavyBackground;
