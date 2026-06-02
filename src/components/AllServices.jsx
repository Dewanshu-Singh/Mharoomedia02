import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './AllServices.css';

const servicesList = [
  { id: 1, title: "Social Media Management", image: "/ELEMENT1.svg", description: "Comprehensive management of your social media profiles to build audience and engagement." },
  { id: 2, title: "Search Engine Optimization", image: "/ELEMENT2.svg", description: "Improve your website visibility on search engines and drive organic traffic." },
  { id: 3, title: "Reels and Video Contents", image: "/ELEMENT3.svg", description: "Engaging short-form video content creation optimized for maximum reach and impact." },
  { id: 4, title: "Performance Marketing", image: "/ELEMENT4.svg", description: "Data-driven marketing campaigns focusing on measurable results and high ROI." },
  { id: 5, title: "Branding & Identity", image: "/ELEMENT5.svg", description: "Crafting a unique and memorable brand identity that resonates with your target audience." },
  { id: 6, title: "Influencer Collaborations", image: "/ELEMENT6.svg", description: "Partnering with relevant influencers to amplify your brand message and reach." }
];

const AllServices = () => {
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="all-services-page">
      <div className="container">
        <div className="all-services-header">
          <h1 className="page-title">All Services</h1>
          <p className="page-subtitle">Discover how we can help you scale your brand.</p>
        </div>

        <div className="services-grid">
          {servicesList.map((service) => (
            <motion.div 
              layoutId={`service-container-${service.id}`}
              key={service.id} 
              className="service-detail-card clickable-card"
              onClick={() => setSelectedId(service.id)}
            >
              <div className="service-detail-image-container">
                <motion.img 
                  layoutId={`service-image-${service.id}`}
                  className="service-detail-image" 
                  src={service.image} 
                  alt={service.title} 
                  onError={(e) => { e.target.style.display = 'none'; }} 
                />
              </div>
              <div className="service-detail-content">
                <motion.h3 layoutId={`service-title-${service.id}`} className="service-detail-title">{service.title}</motion.h3>
                <motion.p layoutId={`service-desc-${service.id}`} className="service-detail-desc">{service.description}</motion.p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedId && (
            <div className="expanded-card-overlay" onClick={() => setSelectedId(null)}>
              <motion.div 
                className="expanded-card-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              
              <div className="expanded-card-wrapper">
                {servicesList.filter(s => s.id === selectedId).map(service => (
                  <motion.div 
                    layoutId={`service-container-${service.id}`}
                    key={service.id} 
                    className="service-detail-card expanded-card"
                    onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside card
                  >
                    <div className="service-detail-image-container">
                      <motion.img 
                        layoutId={`service-image-${service.id}`}
                        className="service-detail-image" 
                        src={service.image} 
                        alt={service.title} 
                        onError={(e) => { e.target.style.display = 'none'; }} 
                      />
                    </div>
                    <div className="service-detail-content">
                      <motion.h3 layoutId={`service-title-${service.id}`} className="service-detail-title">{service.title}</motion.h3>
                      <motion.p layoutId={`service-desc-${service.id}`} className="service-detail-desc">{service.description}</motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default AllServices;
