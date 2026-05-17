import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg-container">
        {/* Placeholder for the line art background */}
        <img src="/hero-bg.png" alt="" className="hero-bg-image" onError={(e) => {
          e.target.style.display = 'none';
        }} />
      </div>
      
      <div className="container">
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Turning <span className="highlight-box">Ideas</span> Into<br />
            Digital Reality
          </motion.h1>
          
          <motion.p 
            className="hero-desc"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            Trusted by businesses across India, we combine creativity, innovation, and smart targeting to build impactful digital experiences that connect brands with the right audience.
          </motion.p>
          
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <button className="btn-primary">Start a Project</button>
            <button className="btn-text">
              See Our Work <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
