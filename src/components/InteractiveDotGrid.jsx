import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import './InteractiveDotGrid.css';

const InteractiveDotGrid = () => {
  const containerRef = useRef(null);
  const [gridSize, setGridSize] = useState({ cols: 0, rows: 0 });
  const DOT_SPACING = 40; 
  const EFFECT_RADIUS = 150; 

  useEffect(() => {
    const calculateGrid = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const cols = Math.floor(width / DOT_SPACING) + 2;
        const rows = Math.floor(height / DOT_SPACING) + 2;
        setGridSize({ cols, rows });
      }
    };

    calculateGrid();
    window.addEventListener('resize', calculateGrid);
    return () => window.removeEventListener('resize', calculateGrid);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const dots = containerRef.current.querySelectorAll('.dot');
      
      dots.forEach((dot, index) => {
        const colIndex = index % gridSize.cols;
        const rowIndex = Math.floor(index / gridSize.cols);
        
        const dotX = colIndex * DOT_SPACING + DOT_SPACING / 2;
        const dotY = rowIndex * DOT_SPACING + DOT_SPACING / 2;
        
        const distance = Math.sqrt(Math.pow(mouseX - dotX, 2) + Math.pow(mouseY - dotY, 2));
        
        if (distance < EFFECT_RADIUS) {
          // Max scale when close
          const scale = 1 + (3.5 * (1 - distance / EFFECT_RADIUS));
          gsap.to(dot, {
            scale: scale,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        } else {
          gsap.to(dot, {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });
    };

    const handleMouseLeave = () => {
      if (!containerRef.current) return;
      const dots = containerRef.current.querySelectorAll('.dot');
      gsap.to(dots, {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const parent = containerRef.current.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [gridSize]);

  return (
    <div className="interactive-dot-grid" ref={containerRef}>
      {Array.from({ length: gridSize.rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="dot-row">
          {Array.from({ length: gridSize.cols }).map((_, colIndex) => (
            <div key={`dot-${rowIndex}-${colIndex}`} className="dot-wrapper">
              <div className="dot"></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default InteractiveDotGrid;
