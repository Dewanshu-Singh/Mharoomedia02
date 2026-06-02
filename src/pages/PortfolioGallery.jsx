import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './PortfolioGallery.css';

const portfolioImages = [
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

const PortfolioGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedImage]);

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="portfolio-title"
        >
          Our Visual <span className="highlight">Stories</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="portfolio-subtitle"
        >
          A comprehensive collection of moments, events, and masterpieces we've captured and brought to life.
        </motion.p>
      </div>

      <div className="portfolio-masonry-grid">
        {portfolioImages.map((item, index) => (
          <motion.div 
            key={item.id} 
            className="masonry-item"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
            onClick={() => setSelectedImage(item.image)}
          >
            <div className="masonry-item-inner">
              <img src={item.image} alt={`Portfolio ${item.id}`} loading="lazy" onError={(e) => {
                e.target.style.display = 'none';
              }}/>
              <div className="masonry-overlay">
                <span className="view-text">View Image</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
              <X size={32} />
            </button>
            <motion.img 
              src={selectedImage} 
              alt="Fullscreen view" 
              className="lightbox-image"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioGallery;
