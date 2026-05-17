import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './FeaturedVideos.css';

const videosData = [
  {
    id: 1,
    title: "AESTR ALPHA AI Summit",
    description: "Visionary leaders share the roadmap for AI-driven transformation across industries.",
    embedUrl: "https://www.youtube.com/embed/ZiyHOIri4Vo", // Updated with user's link
    location: "New Delhi, India",
    date: "March 2026",
    edition: "Session II",
    tag: "India AI Impact Summit"
  },
  {
    id: 2,
    title: "Startup Spotlight",
    description: "How artificial intelligence is revolutionizing diagnostics and patient outcomes.",
    embedUrl: "https://www.youtube.com/embed/8xt4O76FKjA", // Updated with user's link
    location: "New Delhi, India",
    date: "March 2026",
    edition: "Session V",
    tag: "India AI Impact Summit"
  },
  {
    id: 3,
    title: "Your First Internship",
    description: "Emerging AI startups pitch their boldest ideas to the nation's top investors.",
    embedUrl: "https://www.youtube.com/embed/EnudigrxxdE", // Updated with user's link
    location: "New Delhi, India",
    date: "March 2026",
    edition: "Session III",
    tag: "India AI Impact Summit"
  }
];

const FeaturedVideos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videosData.length);
    }, 6000); // Auto change every 6 seconds
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videosData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + videosData.length) % videosData.length);
  };

  const currentVideo = videosData[currentIndex];

  return (
    <section className="featured-videos-section">
      <div className="container">
        
        <div className="video-header-row">
          <div className="video-header-left">
            <div className="video-badge">
              FEATURED <span>2026</span>
            </div>
            <motion.h2 
              key={currentVideo.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="video-title"
            >
              {currentVideo.title}
            </motion.h2>
          </div>
          <motion.p 
            key={currentVideo.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="video-desc"
          >
            {currentVideo.description}
          </motion.p>
        </div>

        <div className="video-carousel-container">
          <div className="video-counter">
            0{currentIndex + 1} / 0{videosData.length}
          </div>

          <button className="video-nav-btn video-nav-prev" onClick={handlePrev}>
            <ChevronLeft size={24} />
          </button>
          
          <button className="video-nav-btn video-nav-next" onClick={handleNext}>
            <ChevronRight size={24} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="video-wrapper"
            >
              <iframe
                className="video-iframe"
                src={currentVideo.embedUrl}
                title={currentVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="video-indicators">
          {videosData.map((_, idx) => (
            <div 
              key={idx} 
              className={`indicator-line ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            ></div>
          ))}
        </div>

        <motion.div 
          key={currentVideo.id + 'footer'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="video-footer"
        >
          <div className="footer-meta-group">
            <div className="meta-item">
              <span className="meta-label">Location</span>
              <span className="meta-value">{currentVideo.location}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Date</span>
              <span className="meta-value">{currentVideo.date}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Edition</span>
              <span className="meta-value">{currentVideo.edition}</span>
            </div>
          </div>
          
          <div className="footer-tag">
            <span>✦</span> {currentVideo.tag}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturedVideos;
