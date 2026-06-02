import React from 'react';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import './About.css';

function About() {
  return (
    <div className="about-page">
      {/* Hero Section of About Page */}
      <section className="about-hero">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="about-hero-content text-center"
          >
            <h1 className="about-title highlight">
              About Us
            </h1>
            <p className="about-subtitle">
              Turning simple concepts into meaningful experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section - Staggered Layout */}
      <section className="about-content-section">
        <div className="container">
          
          {/* Block 1: Intro */}
          <div className="about-block">
            <Reveal>
              <div className="about-text-box">
                <h2>Every idea deserves to be <span className="text-gradient">seen, heard, and remembered</span>.</h2>
                <p>
                  At Mharoo Media, we are a creative media company passionate about helping brands, businesses, and creators tell their stories in a way that feels authentic and impactful.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="about-image-box">
                <img 
                  src="/20462.jpg" 
                  alt="Creative Team" 
                  className="about-img parallax-img"
                />
              </div>
            </Reveal>
          </div>

          {/* Block 2: What we do */}
          <div className="about-block reverse">
            <Reveal>
              <div className="about-text-box">
                <h2>Creating <span className="text-gradient">Connections</span></h2>
                <p>
                  From creating engaging videos and digital content to building strong brand identities, we focus on turning simple concepts into meaningful experiences. Our goal is not just to create content, but to create connections that inspire, engage, and leave a lasting impression.
                </p>
                <p className="mt-4">
                  We work closely with our clients to understand their vision, challenges, and ambitions. By blending creativity, strategy, and attention to detail, we craft content that reflects who they are and what they stand for.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="about-image-box">
                <img 
                  src="/20557.jpg" 
                  alt="Creating Connections" 
                  className="about-img"
                />
              </div>
            </Reveal>
          </div>

          {/* Block 3: Belief */}
          <div className="about-block center-block">
            <Reveal>
              <div className="about-text-box full-width text-center">
                <h2>Bringing your vision to <span className="highlight">life</span>.</h2>
                <p className="large-text">
                  At the heart of everything we do is a simple belief: <strong>great stories have the power to move people.</strong> Whether you’re building a brand, launching a product, or sharing a message with the world, Mharoo Media is here to help bring your vision to life.
                </p>
              </div>
            </Reveal>
          </div>

        </div>
      </section>
    </div>
  );
}

export default About;
