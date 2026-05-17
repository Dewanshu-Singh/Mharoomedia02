import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './Services.css';

const servicesData = [
  { id: 1, title: "Social Media Management", image: "/illustration-of-people-using-social-media-free-vector.webp" },
  { id: 2, title: "Search Engine Optimization", image: "/seo-manager-illustration-concept-on-white-background-vector.jpg" },
  { id: 3, title: "Reels and Video Contents", image: "/social-media-marketing_773186-874.webp" },
  { id: 4, title: "Performance Marketing", image: "/marketing-specialist-with-loudspeaker-influence-businessmen-and-globe-macromarketing-social-influence-global-marketing-strategy-concept-flat-modern-illustration-vector.webp" },
  { id: 5, title: "Branding & Identity", image: "/woman-create-brand-young-girl-with-laptop-developing-brand-for-company-graphic-designer-and.webp" },
  { id: 6, title: "Influencer Collaborations", image: "/influence-marketing-concept.webp" }
];

const Services = () => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % servicesData.length);
    }, 4000); // Change every 4 seconds
    
    return () => clearInterval(timer);
  }, []);

  const visibleServices = [
    servicesData[startIndex],
    servicesData[(startIndex + 1) % servicesData.length]
  ];

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="services-header">
          <h2 className="section-title justify-center">Our Services</h2>
          <p className="services-subtitle">Six Ways We Scale Your Brand.</p>
        </div>

        <div className="services-carousel">
          <AnimatePresence mode="wait">
            <motion.div 
              key={startIndex} // Keying by startIndex ensures the whole row transitions together
              className="services-row"
              style={{ display: 'flex', gap: '40px', width: '100%' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {visibleServices.map((service) => (
                <div
                  key={service.id}
                  className={`service-card ${service.id % 2 === 0 ? 'image-right' : 'image-left'}`}
                >
                  <div className="service-image-container">
                     <img src={service.image} alt={service.title} className="service-image" onError={(e) => {
                       e.target.style.display = 'none';
                     }} />
                  </div>
                  <div className="service-content">
                     <h3 className="service-title">{service.title}</h3>
                     <a href="#" className="service-link">View More <ArrowRight size={18} /></a>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="text-center mt-40">
           <button className="btn-primary">View All Services</button>
        </div>
      </div>
    </section>
  );
};

export default Services;
