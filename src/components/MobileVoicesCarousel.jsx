import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './MobileVoicesCarousel.css';

const MobileVoicesCarousel = ({ voicesData }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % voicesData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + voicesData.length) % voicesData.length);
  };

  const getCardStyles = (index) => {
    const diff = index - activeIndex;
    let offset = diff;
    if (diff < -2) offset += voicesData.length;
    if (diff > 2) offset -= voicesData.length;

    let scale = 1;
    let x = 0;
    let zIndex = 5;
    let opacity = 1;
    let blur = 0;

    if (offset === 0) {
      scale = 1;
      x = "0%";
      zIndex = 10;
      opacity = 1;
      blur = 0;
    } else if (offset === -1) {
      scale = 0.85;
      x = "-60%";
      zIndex = 5;
      opacity = 0.6;
      blur = 4;
    } else if (offset === 1) {
      scale = 0.85;
      x = "60%";
      zIndex = 5;
      opacity = 0.6;
      blur = 4;
    } else if (offset === -2) {
      scale = 0.7;
      x = "-100%";
      zIndex = 2;
      opacity = 0.3;
      blur = 8;
    } else if (offset === 2) {
      scale = 0.7;
      x = "100%";
      zIndex = 2;
      opacity = 0.3;
      blur = 8;
    } else {
      scale = 0;
      x = "0%";
      zIndex = 0;
      opacity = 0;
      blur = 10;
    }

    return { scale, x, zIndex, opacity, filter: `blur(${blur}px)` };
  };

  return (
    <div className="mobile-voices-carousel-wrapper">
      <div className="mvc-track" style={{ touchAction: 'pan-y' }}>
        <AnimatePresence>
          {voicesData.map((voice, index) => {
            const { scale, x, zIndex, opacity, filter } = getCardStyles(index);
            const isActive = opacity === 1;

            return (
              <motion.div
                key={index}
                className={`mvc-card ${isActive ? 'active' : ''}`}
                initial={false}
                animate={{ scale, x, zIndex, opacity, filter }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -100) {
                    handleNext();
                  } else if (swipe > 100) {
                    handlePrev();
                  }
                }}
                onClick={() => { if (!isActive) setActiveIndex(index); }}
              >
                <div className="rj-voice-card-inner">
                    <div className="rj-voice-image">
                      <img src={voice.image} alt={voice.name} />
                    </div>
                    <div className="rj-voice-content">
                      <h3>{voice.name}</h3>
                      <p className="rj-voice-handle">
                        {voice.handle} • {voice.role}
                      </p>
                    </div>
                </div>
                <div className="rj-voice-details">
                    <h4>{voice.title || "LEADERSHIP AND VISION"}</h4>
                    <p>{voice.description}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <div className="mvc-controls">
        <button className="mvc-nav-btn prev" onClick={handlePrev}>
          <ChevronLeft size={24} />
        </button>
        <button className="mvc-nav-btn next" onClick={handleNext}>
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default MobileVoicesCarousel;
