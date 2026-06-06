import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Services.css';
import Magnetic from './Magnetic';

import TiltCard from './TiltCard';

const servicesData = [
  { id: 1, title: "Social Media Management", image: "/ELEMENT1.svg", desc: "Build audience and engagement with tailored social media strategies." },
  { id: 2, title: "Search Engine Optimization", image: "/ELEMENT2.svg", desc: "Drive organic traffic and improve visibility on search engines." },
  { id: 3, title: "Reels & Video Content", image: "/ELEMENT3.svg", desc: "Engaging short-form videos optimized for maximum reach." },
  { id: 4, title: "Performance Marketing", image: "/ELEMENT4.svg", desc: "Data-driven campaigns focusing on measurable results and ROI." },
  { id: 5, title: "Branding & Identity", image: "/ELEMENT5.svg", desc: "Crafting a unique and memorable brand identity." },
  { id: 6, title: "Influencer Collabs", image: "/ELEMENT6.svg", desc: "Partnering with influencers to amplify your brand message." }
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="services-showcase-container">
          
          <div className="services-left">
            <h2 className="section-title showcase-title">Our Expertise</h2>
            <p className="showcase-subtitle">Six Ways We Scale Your Brand.</p>
            
            <div className="services-list">
              {servicesData.map((service, index) => (
                <div 
                  key={service.id} 
                  className={`service-list-item ${activeIndex === index ? 'active' : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="service-list-item-content">
                    <span className="service-number">0{index + 1}</span>
                    <h3 className="service-list-title">{service.title}</h3>
                  </div>
                  
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="service-list-desc"
                      >
                        <p>{service.desc}</p>
                        <Link to="/services" className="service-explore-link">
                           Explore <ArrowUpRight size={16} />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
          
          <div className="services-right">
            <div className="sticky-image-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -30 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="showcase-image-wrapper"
                  style={{ perspective: 1000 }}
                >
                   <TiltCard style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                     <img 
                       src={servicesData[activeIndex].image} 
                       alt={servicesData[activeIndex].title} 
                       className="showcase-image" 
                       onError={(e) => { e.target.style.display = 'none'; }}
                     />
                   </TiltCard>
                </motion.div>
              </AnimatePresence>
              
              <div className="showcase-blob"></div>
            </div>
          </div>

        </div>
        
        <div className="text-center mt-20">
           <Magnetic>
             <Link to="/services" className="btn-primary magnetic-target" style={{ display: 'inline-block' }}>View All Services</Link>
           </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default Services;
