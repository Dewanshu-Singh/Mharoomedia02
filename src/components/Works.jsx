import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Works.css';
import SplitTextReveal from './SplitTextReveal';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

const worksData = [
  { id: 1, image: "/Screenshot 2026-05-17 234206.png" },
  { id: 2, image: "/Screenshot 2026-05-17 234217.png" },
  { id: 3, image: "/Screenshot 2026-05-17 234225.png" },
  { id: 4, image: "/Screenshot 2026-05-17 234243.png" },
  { id: 5, image: "/Screenshot 2026-05-17 234313.png" },
  { id: 6, image: "/Screenshot 2026-05-17 234339.png" },
  { id: 7, image: "/_DSC3426.jpg" },
  { id: 8, image: "/_DSC3551.jpg" },
  { id: 9, image: "/_DSC3589.jpg" },
  { id: 10, image: "/_MG_0967.jpg" },
  { id: 11, image: "/_MG_1126.jpg" },
  { id: 12, image: "/_MG_1395.jpg" },
  { id: 13, image: "/_MG_1475.jpg" },
  { id: 14, image: "/DSC02305.jpg" },
  { id: 15, image: "/DSC02486.jpg" },
  { id: 16, image: "/DSC02537.jpg" },
  { id: 17, image: "/DSC07477.jpg" },
  { id: 18, image: "/IMG_0556.jpg" }
];

const Works = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Entrance Animations
    gsap.fromTo('.works-carousel', 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.2, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
    );

    // Subtle Image Parallax on Scroll
    gsap.to('.works-card img', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }, { scope: sectionRef });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % worksData.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, []);

  const getPosition = (index) => {
    const diff = (index - activeIndex + worksData.length) % worksData.length;
    
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === worksData.length - 1) return 'left';
    return 'hidden';
  };

  return (
    <section className="works-section" id="portfolio" ref={sectionRef}>
      <div className="container text-center">
        <h2 className="section-title">Events <span className="highlight">Covered</span></h2>
        <p className="works-subtitle" style={{ color: 'var(--text-secondary)' }}>A glimpse into the stories we've brought to life</p>
        
        <div className="works-carousel">
          <AnimatePresence>
            {worksData.map((work, index) => {
              const position = getPosition(index);
              
              if (position === 'hidden') return null;

              const variants = {
                center: { x: '0%', scale: 1, zIndex: 10, filter: 'blur(0px)', opacity: 1 },
                left: { x: '-110%', scale: 0.8, zIndex: 5, filter: 'blur(4px)', opacity: 0.6 },
                right: { x: '110%', scale: 0.8, zIndex: 5, filter: 'blur(4px)', opacity: 0.6 },
              };

              return (
                <motion.div
                  key={work.id}
                  className="works-card magnetic-target"
                  initial={false}
                  animate={variants[position]}
                  transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                >
                  <img src={work.image} alt={`Work ${work.id}`} onError={(e) => {
                    e.target.style.display = 'none';
                  }} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <Magnetic>
          <Link to="/portfolio" style={{ display: 'inline-block', marginTop: '60px' }}>
            <button className="btn-primary magnetic-target">Show More</button>
          </Link>
        </Magnetic>
      </div>
    </section>
  );
};

export default Works;
