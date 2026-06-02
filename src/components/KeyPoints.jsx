import React from 'react';
import { motion } from 'framer-motion';
import './KeyPoints.css';

const KeyPoints = () => {
  const collaborations = [
    { 
      name: "Google", 
      icon: "/google-lens-icon-logo-symbol-free-png.webp", 
      text: "Google" 
    },
    { 
      name: "Snapchat", 
      icon: "/snapchat-icon-free-png.webp",
      text: "Snapchat" 
    },
    { 
      name: "JIO IPL", 
      icon: "/82cd765e9cf5a8a22042e9b3c87c7764.jpg",
      text: "JIO IPL" 
    }
  ];

  return (
    <section className="keypoints-section">
      <motion.div 
        className="keypoints-card glass"
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="keypoints-content">
          <motion.h2 
            className="keypoints-headline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            "Biggest <span className="google-text">
              <span style={{color: '#4285F4'}}>G</span>
              <span style={{color: '#EA4335'}}>o</span>
              <span style={{color: '#FBBC05'}}>o</span>
              <span style={{color: '#4285F4'}}>g</span>
              <span style={{color: '#34A853'}}>l</span>
              <span style={{color: '#EA4335'}}>e</span>
            </span> Partner Agency in Rajasthan"
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="keypoints-collab-title">Company Collaborations</h3>
            <div className="collab-badges">
              {collaborations.map((collab, index) => (
                <motion.div 
                  key={index}
                  className="collab-badge"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={collab.icon} alt={`${collab.name} icon`} className="collab-icon" onError={(e) => { e.target.style.display = 'none'; }} />
                  {collab.textImage ? (
                    <img src={collab.textImage} alt={collab.name} className="collab-text-img" onError={(e) => { e.target.style.display = 'none'; }} />
                  ) : (
                    <span>{collab.text}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default KeyPoints;
