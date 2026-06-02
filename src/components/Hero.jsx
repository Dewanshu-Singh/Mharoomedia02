import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Entrance animations
    tl.fromTo('.hero-title', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.hero-desc', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 
      "-=0.6"
    )
    .fromTo('.hero-actions', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 
      "-=0.4"
    );

  }, { scope: heroRef });

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="container">
        <div className="hero-layout">
          <div className="hero-content">
            <h1 className="hero-title">
              Turning <span className="highlight-box">Ideas</span> Into<br />
              Digital Reality
            </h1>
            
            <p className="hero-desc">
              We combine creativity, innovation, and smart targeting to build impactful digital experiences that connect brands with the right audience.
            </p>
            
            <div className="hero-actions">
              <button 
                className="btn-primary" 
                onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
              >
                Start a Project <ArrowRight size={16} style={{marginLeft: '8px'}} />
              </button>
              <button 
                className="btn-secondary"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({behavior: 'smooth'})}
              >
                View Our Work <ArrowRight size={16} style={{marginLeft: '8px'}} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
