import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import './AllServices.css';
import Reveal from './Reveal';

const servicesList = [
  { 
    id: 4, 
    title: "Performance Marketing", 
    image: "/ELEMENT4.svg", 
    description: "Unlock explosive growth with hyper-targeted, conversion-obsessed ad campaigns. We leverage advanced pixel tracking, rigorous A/B testing, and AI-driven bidding across platforms to ensure every dollar spent translates directly into measurable, high-margin ROI.",
    features: ["Ad Copywriting", "A/B Testing", "Conversion Tracking"],
    color: "rgba(138, 43, 226, 0.15)"
  },
  { 
    id: 1, 
    title: "Social Media Management", 
    image: "/ELEMENT1.svg", 
    description: "Transform your digital presence into a powerhouse of engagement. We meticulously curate your brand’s voice, turning casual scrollers into loyal advocates through culturally relevant content, data-driven posting schedules, and proactive community building that sparks real conversations.",
    features: ["Content Strategy", "Community Management", "Analytics & Reporting"],
    color: "rgba(184, 0, 21, 0.15)"
  },
  { 
    id: 2, 
    title: "Search Engine Optimization", 
    image: "/ELEMENT2.svg", 
    description: "Dominate search rankings and capture high-intent traffic with precision. Our technical and content-driven SEO strategies dissect algorithm updates, outsmart competitors, and secure your position at the top of Google, transforming organic clicks into predictable, long-term revenue.",
    features: ["Keyword Research", "On-Page SEO", "Link Building"],
    color: "rgba(0, 120, 255, 0.15)"
  },
  { 
    id: 3, 
    title: "Reels and Video Contents", 
    image: "/ELEMENT3.svg", 
    description: "Capture attention in milliseconds with thumb-stopping, viral-ready video content. From dynamic scripting and cinematic shooting to trendy transitions, we craft high-retention Reels and Shorts designed to break the algorithm and make your brand unforgettable.",
    features: ["Scriptwriting", "Professional Editing", "Trend Analysis"],
    color: "rgba(255, 165, 0, 0.15)"
  },
  { 
    id: 5, 
    title: "Branding & Identity", 
    image: "/ELEMENT5.svg", 
    description: "Forge a magnetic brand identity that commands respect and emotional connection. We build comprehensive visual ecosystems—from striking logos and typography to distinct brand voices—ensuring you don't just blend into the market, but actively define it.",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity"],
    color: "rgba(255, 20, 147, 0.15)"
  },
  { 
    id: 6, 
    title: "Influencer Collaborations", 
    image: "/ELEMENT6.svg", 
    description: "Amplify your credibility by tapping into the power of authentic voices. We strategically identify and partner with high-converting creators whose audiences perfectly align with your target demographic, executing seamless campaigns that drive mass awareness and immediate trust.",
    features: ["Creator Outreach", "Campaign Management", "ROI Analysis"],
    color: "rgba(0, 206, 209, 0.15)"
  }
];

const Card = ({ service, index, progress, totalCards }) => {
  // Start shrinking when this card reaches the top and the next card starts covering it.
  const shrinkStart = index / totalCards;
  // We want the scale to decrease as the user scrolls to the bottom
  const targetScale = 1 - (totalCards - index) * 0.05;
  
  const scale = useTransform(progress, [shrinkStart, 1], [1, targetScale]);
  
  // Also push it slightly up/back to enhance the 3D stack effect
  const yOffset = useTransform(progress, [shrinkStart, 1], ["0%", `-${(totalCards - index) * 2}%`]);
  
  // Opacity can slightly fade for deeper cards
  const opacity = useTransform(progress, [shrinkStart, 1], [1, 0.3 + (index * 0.1)]);

  return (
    <div className="card-sticky-container">
      <motion.div 
        className="stack-service-card"
        style={{ 
          scale, 
          y: yOffset,
          opacity,
          "--card-index": index
        }}
      >
        <div className="stack-card-bg" style={{ background: `radial-gradient(circle at 80% 20%, ${service.color}, transparent 60%)` }}></div>
        
        <div className="stack-card-content">
          <div className="stack-card-left">
            <h3 className="stack-service-title">{service.title}</h3>
            <p className="stack-service-desc">{service.description}</p>
            
            <ul className="stack-features-list">
              {service.features.map((feat, idx) => (
                <li key={idx}>
                  <CheckCircle size={18} className="feature-check" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="stack-card-right">
            <div className="stack-image-wrapper">
              <motion.img 
                className="stack-service-img" 
                src={service.image} 
                alt={service.title} 
                onError={(e) => { e.target.style.display = 'none'; }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <div className="stack-icon-backdrop" style={{ background: service.color }}></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const AllServices = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="all-services-page">
      <div className="all-services-header">
        <Reveal>
          <h1 className="page-title">Elevate Your <span className="text-gradient">Brand</span></h1>
          <p className="page-subtitle">Premium solutions designed to scale your business and dominate your market.</p>
        </Reveal>
      </div>

      <div ref={containerRef} className="cards-scroll-wrapper">
        {servicesList.map((service, index) => (
          <Card 
            key={service.id} 
            index={index} 
            service={service} 
            progress={scrollYProgress} 
            totalCards={servicesList.length} 
          />
        ))}
      </div>
    </div>
  );
};

export default AllServices;
