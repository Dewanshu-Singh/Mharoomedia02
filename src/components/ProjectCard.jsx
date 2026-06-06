import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';
import './ProjectCard.css';

const ProjectCard = ({ title, category, image, delay }) => {
  return (
    <motion.div 
      className="project-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: delay || 0 }}
      style={{ perspective: 1000 }} // Add perspective for 3D effect
    >
      <TiltCard className="project-card-tilt-wrapper" style={{ width: '100%', height: '100%' }}>
        <div className="project-image-wrapper">
          <img src={image} alt={title} className="project-image" onError={(e) => {
             // Provide a cool gradient placeholder if image fails
             e.target.style.display = 'none';
             e.target.parentElement.style.background = 'linear-gradient(135deg, #1f1c2c 0%, #928DAB 100%)';
          }} />
        </div>
        <div className="project-info">
          <h3 className="project-title">{title}</h3>
          <span className="project-category">{category}</span>
        </div>
      </TiltCard>
    </motion.div>
  );
};

export default ProjectCard;
