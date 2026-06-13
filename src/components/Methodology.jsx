import React from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import './Methodology.css';

const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "Every successful campaign starts with understanding your business. We analyze your brand, audience, competitors, and market opportunities to uncover the strongest path for growth."
  },
  {
    num: "02",
    title: "Strategize",
    desc: "Using insights and data, we build a customized marketing roadmap designed around your business goals, ensuring every action contributes to measurable results."
  },
  {
    num: "03",
    title: "Create",
    desc: "Our team crafts high-performing digital experiences, compelling content, and conversion-focused assets that connect with your audience and strengthen your brand presence."
  },
  {
    num: "04",
    title: "Execute",
    desc: "We launch campaigns across the most effective channels, implementing advanced tracking systems to ensure every interaction can be measured and optimized."
  },
  {
    num: "05",
    title: "Optimize",
    desc: "Growth is never static. We continuously analyze performance, test new ideas, refine strategies, and improve conversion rates to maximize return on investment."
  },
  {
    num: "06",
    title: "Scale",
    desc: "Once proven results are achieved, we focus on expanding reach, increasing efficiency, and building sustainable systems that support long-term business growth."
  }
];

function Methodology() {
  return (
    <section className="methodology-section">
      <div className="container">
        <Reveal>
          <div className="methodology-header">
            <h2 className="section-title">Our Methodology</h2>
            <p className="methodology-subtitle">
              A proven process to turn your vision into <span className="text-gradient">measurable success</span>.
            </p>
          </div>
        </Reveal>

        <div className="methodology-grid">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="methodology-card glass"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -10 }}
            >
              <div className="card-number">{step.num}</div>
              <h3 className="card-title">{step.title}</h3>
              <p className="card-desc">{step.desc}</p>
              <div className="card-glow"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Methodology;
