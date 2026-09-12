import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Journey.css';

gsap.registerPlugin(ScrollTrigger);

const journeyData = [
  {
    title: "The Inception",
    desc: "Where the idea started. A small group of passionate creators with a big vision to revolutionize digital experiences.",
    year: "2023"
  },
  {
    title: "Assembling the Team",
    desc: "Gathering the creative minds. We expanded our talent pool, bringing in top-tier designers, developers, and strategists.",
    year: "2024"
  },
  {
    title: "First Major Success",
    desc: "Landing our first big campaign that put us on the map and proved our data-driven strategies work.",
    year: "2025"
  },
  {
    title: "Scaling & Innovation",
    desc: "Expanding our services globally and pushing the boundaries of what is possible in the digital space.",
    year: "2026"
  },
  {
    title: "The Future",
    desc: "Continuously evolving. We are looking ahead, adopting new technologies, and shaping the future of digital media.",
    year: "Present"
  }
];

const Journey = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  
  // Ref to track the current index without triggering re-renders during smooth scroll calculation
  const currentIndexRef = useRef(0); 

  useGSAP(() => {
    // Pin the section and map scroll progress to the active index
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "center center", // Pin when the section is centered on screen
      end: "+=2500", // The user has to scroll 2500px to get through the 5 points
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        // Map progress (0 to 1) to an index (0 to 4)
        // Using 4.99 ensures we never hit exactly 5 which would be out of bounds
        const newIndex = Math.floor(self.progress * 4.99);
        
        // Only update state if the index actually changes
        if (newIndex !== currentIndexRef.current) {
          currentIndexRef.current = newIndex;
          setActiveIndex(newIndex);
          
          // Trigger the card entry animation
          if (cardRef.current) {
            gsap.fromTo(cardRef.current,
              { opacity: 0, y: 20, scale: 0.98 },
              { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out", overwrite: true }
            );
          }
        }
      }
    });

  }, { scope: containerRef });

  return (
    <section className="journey-section" id="journey" ref={containerRef}>
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Our <span className="highlight">Journey</span></h2>
          <p className="section-subtitle">The milestones that shaped Mharoo Media</p>
        </div>

        <div className="journey-compact-container">
          
          {/* Horizontal Stepper Timeline */}
          <div className="journey-stepper">
            <div className="stepper-line-bg"></div>
            <div 
              className="stepper-line-progress" 
              style={{ width: `${(activeIndex / (journeyData.length - 1)) * 100}%` }}
            ></div>
            
            <div className="stepper-nodes">
              {journeyData.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`stepper-node ${index === activeIndex ? 'active' : ''} ${index < activeIndex ? 'completed' : ''}`}
                  onClick={() => {
                    // Manual clicks are tricky with pinned scrub scroll, but we can leave it or just let scroll control it
                    // ScrollTrigger will override it anyway if user scrolls, so it's fine.
                    setActiveIndex(index);
                  }}
                >
                  <span className="node-year">{milestone.year}</span>
                  <div className="node-dot"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Content Card */}
          <div className="journey-active-card glass-card" ref={cardRef}>
            <span className="card-year-badge">{journeyData[activeIndex].year}</span>
            <h3 className="card-title">{journeyData[activeIndex].title}</h3>
            <p className="card-desc">{journeyData[activeIndex].desc}</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Journey;
