import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Works.css';

const worksData = [
  { id: 1, image: "/Screenshot 2026-05-17 234206.png" },
  { id: 2, image: "/Screenshot 2026-05-17 234217.png" },
  { id: 3, image: "/Screenshot 2026-05-17 234225.png" },
  { id: 4, image: "/Screenshot 2026-05-17 234243.png" },
  { id: 5, image: "/Screenshot 2026-05-17 234313.png" },
  { id: 6, image: "/Screenshot 2026-05-17 234339.png" }
];

const Works = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % worksData.length);
    }, 3000); // Swipe left every 3 seconds
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
    <section className="works-section" id="portfolio">
      <div className="container text-center">
        <h2 className="works-title">Our Works</h2>
        <p className="works-subtitle">A glimpse into the stories we've brought to life</p>
        
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
                  className="works-card"
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

        <button className="btn-primary mt-40">Show More</button>
      </div>
    </section>
  );
};

export default Works;
