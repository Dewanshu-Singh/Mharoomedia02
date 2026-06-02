import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ReelsSection.css';

const reelsData = [
  {
    id: 1,
    title: "Reel 1",
    embedUrl: "https://www.instagram.com/p/DXd1paNDZje/embed/", 
    views: "New"
  },
  {
    id: 2,
    title: "Reel 2",
    embedUrl: "https://www.instagram.com/p/DWyYAoijRr1/embed/", 
    views: "New"
  },
  {
    id: 3,
    title: "Reel 3",
    embedUrl: "https://www.instagram.com/p/DWqS32mkRQ6/embed/", 
    views: "New"
  },
  {
    id: 4,
    title: "Reel 4",
    embedUrl: "https://www.instagram.com/p/DWoL529EeUa/embed/", 
    views: "New"
  },
  {
    id: 5,
    title: "Reel 5",
    embedUrl: "https://www.instagram.com/p/DWJQEyJkYpa/embed/", 
    views: "New"
  },
  {
    id: 6,
    title: "Reel 6",
    embedUrl: "https://www.instagram.com/p/DYmj_gvRkBl/embed/", 
    views: "New"
  }
];

const ReelsSection = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Start in the middle

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reelsData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reelsData.length) % reelsData.length);
  };

  // Helper to determine position relative to active index
  const getCardStyles = (index) => {
    const diff = index - activeIndex;
    
    // Handle wrap-around for infinite carousel feel
    let offset = diff;
    if (diff < -2) offset += reelsData.length;
    if (diff > 2) offset -= reelsData.length;

    let scale = 1;
    let x = 0;
    let zIndex = 5;
    let opacity = 1;

    if (offset === 0) {
      // Center (Active)
      scale = 1;
      x = 0;
      zIndex = 10;
      opacity = 1;
    } else if (offset === -1) {
      // Left 1
      scale = 0.8;
      x = "-65%";
      zIndex = 5;
      opacity = 0.6;
    } else if (offset === 1) {
      // Right 1
      scale = 0.8;
      x = "65%";
      zIndex = 5;
      opacity = 0.6;
    } else if (offset === -2) {
      // Left 2
      scale = 0.6;
      x = "-110%";
      zIndex = 2;
      opacity = 0.3;
    } else if (offset === 2) {
      // Right 2
      scale = 0.6;
      x = "110%";
      zIndex = 2;
      opacity = 0.3;
    } else {
      // Hidden
      scale = 0;
      x = "0%";
      zIndex = 0;
      opacity = 0;
    }

    return { scale, x, zIndex, opacity };
  };

  return (
    <section className="reels-section" id="reels">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Trending <span className="highlight">Reels</span></h2>
          <p className="section-subtitle">Catch up with our latest short-form viral content</p>
        </div>

        <div className="reels-carousel-wrapper">
          
          <button className="reel-nav-btn prev" onClick={handlePrev}>
            <ChevronLeft size={30} />
          </button>

          <div className="reels-track">
            <AnimatePresence>
              {reelsData.map((reel, index) => {
                const { scale, x, zIndex, opacity } = getCardStyles(index);
                const isActive = opacity === 1;

                return (
                  <motion.div
                    key={reel.id}
                    className={`reel-card ${isActive ? 'active' : ''}`}
                    initial={false}
                    animate={{
                      scale,
                      x,
                      zIndex,
                      opacity
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                    onClick={() => {
                      if (!isActive) setActiveIndex(index);
                    }}
                  >
                    <div className="reel-video-container">
                      <iframe 
                        src={reel.embedUrl} 
                        title={reel.title}
                        className="reel-iframe"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                      {!isActive && (
                        <div className="reel-inactive-overlay"></div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button className="reel-nav-btn next" onClick={handleNext}>
            <ChevronRight size={30} />
          </button>
          
        </div>
      </div>
    </section>
  );
};

export default ReelsSection;
