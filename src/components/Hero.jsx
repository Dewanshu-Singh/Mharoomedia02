import React, { useRef } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const navigate = useNavigate();

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

              <div className="rj-inline-live-widget" onClick={() => navigate('/rajasthan-tour')}>
                <div className="rj-floating-content">
                  <img src="/mic.png" alt="Mic" className="rj-floating-mic" />
                  <div className="rj-floating-text-group">
                    <span className="rj-floating-text">The Rajasthan Tour is live</span>
                    <div className="rj-live-indicator">
                      <span className="rj-live-dot"></span>
                      <span className="rj-live-ping"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
