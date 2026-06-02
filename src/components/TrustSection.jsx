import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import './TrustSection.css';
import SplitTextReveal from './SplitTextReveal';

gsap.registerPlugin(ScrollTrigger);

const TrustSection = () => {
  const sectionRef = useRef(null);

  const collaborations = [
    { name: "Google", icon: "/google-lens-icon-logo-symbol-free-png.webp", text: "Google" },
    { name: "Snapchat", icon: "/snapchat-icon-free-png.webp", text: "Snapchat" },
    { name: "Jio HotStar", icon: "/jiohostar.webp", text: "Jio HotStar" },
    { name: "Meta", icon: "/meta1.webp", text: "Meta" }
  ];

  const statsData = [
    { to: 3, suffix: "x", label: "Average engagement lift in 90 days" },
    { to: 50, suffix: "+", label: "Brand campaigns launched" },
    { to: 25, prefix: "₹", suffix: "Cr+", label: "Ad Spend Managed" },
    { to: 100, suffix: "%", label: "Dedicated to your growth" }
  ];

  useGSAP(() => {
    // Reveal stats items
    gsap.fromTo('.trust-stat-card', 
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.trust-stats-grid',
          start: 'top 85%',
        }
      }
    );

    // Number Counter Animation
    const counters = document.querySelectorAll('.trust-counter-val');
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      gsap.fromTo(counter, 
        { innerHTML: 0 },
        {
          innerHTML: target,
          duration: 2.5,
          ease: 'power3.out',
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: '.trust-stats-grid',
            start: 'top 85%',
          }
        }
      );
    });

  }, { scope: sectionRef });

  return (
    <section className="trust-section" id="about" ref={sectionRef}>
      <div className="trust-glow-orb"></div>
      
      <div className="container">
        <div className="trust-header-card">
          <SplitTextReveal 
            text='"Biggest Partner Agency in Rajasthan"' 
            as="h2" 
            className="trust-headline" 
          />
          {/* We place the Google styling explicitly over the word "Partner" or we just keep it raw. The user had specifically colored Google. Let's recreate it beautifully. */}
          <h2 className="trust-headline-google">
            "Biggest <span className="google-text-premium">
              <span style={{color: '#4285F4'}}>G</span>
              <span style={{color: '#EA4335'}}>o</span>
              <span style={{color: '#FBBC05'}}>o</span>
              <span style={{color: '#4285F4'}}>g</span>
              <span style={{color: '#34A853'}}>l</span>
              <span style={{color: '#EA4335'}}>e</span>
            </span> Partner Agency in Rajasthan"
          </h2>

          <div className="trust-collabs-wrapper">
            <h3 className="trust-collab-title">Company Collaborations</h3>
            <div className="trust-collab-badges">
              {collaborations.map((collab, index) => (
                <motion.div 
                  key={index}
                  className="trust-badge magnetic-target"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  whileHover={{ scale: 1.05, borderColor: 'var(--accent-red)' }}
                >
                  <img src={collab.icon} alt={`${collab.name} icon`} className="trust-collab-icon" onError={(e) => { e.target.style.display = 'none'; }} />
                  <span>{collab.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="trust-stats-grid">
          {statsData.map((stat, index) => (
            <div className="trust-stat-card" key={index}>
              <div className="trust-stat-line"></div>
              <div className="trust-stat-content">
                <div className="trust-stat-number">
                  {stat.prefix}<span className="trust-counter-val" data-target={stat.to}>0</span>{stat.suffix}
                </div>
                <div className="trust-stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
