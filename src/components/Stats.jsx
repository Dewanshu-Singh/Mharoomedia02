import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Stats.css';

gsap.registerPlugin(ScrollTrigger);

const Stats = () => {
  const sectionRef = useRef(null);
  
  const statsData = [
    { to: 3, suffix: "x", label: "Average engagement lift in 90 days" },
    { to: 50, suffix: "+", label: "Brand campaigns launched" },
    { to: 0, prefix: "₹", label: "Wasted on vanity metrics" },
    { to: 100, suffix: "%", label: "Dedicated to your growth" }
  ];

  useGSAP(() => {
    // Staggered reveal of stat items
    gsap.fromTo('.stat-item', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Number Counter Animation
    const counters = document.querySelectorAll('.counter-val');
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      gsap.to(counter, {
        innerHTML: target,
        duration: 2,
        ease: 'power2.out',
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    });

  }, { scope: sectionRef });

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="container">
        <div className="stats-container">
          {statsData.map((stat, index) => (
            <div className="stat-item" key={index}>
              <div className="stat-line"></div>
              <div className="stat-number">
                {stat.prefix}<span className="counter-val" data-target={stat.to}>0</span>{stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
