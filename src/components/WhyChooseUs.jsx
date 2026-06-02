import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Palette, ShieldCheck, Zap } from 'lucide-react';
import './WhyChooseUs.css';

const reasons = [
  {
    id: 1,
    title: "Data-Driven Strategy",
    description: "Every campaign we build is backed by deep analytics, ensuring your marketing budget delivers maximum ROI.",
    icon: <BarChart3 size={32} />
  },
  {
    id: 2,
    title: "Creative Excellence",
    description: "From stunning visuals to compelling copy, our creative team crafts stories that captivate and convert.",
    icon: <Palette size={32} />
  },
  {
    id: 3,
    title: "End-to-End Execution",
    description: "We handle everything from ideation to deployment, providing a seamless and hassle-free experience.",
    icon: <Zap size={32} />
  },
  {
    id: 4,
    title: "Proven Results",
    description: "Trusted by top brands, our strategies consistently drive growth, engagement, and lasting impact.",
    icon: <ShieldCheck size={32} />
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us-section">
      <div className="container">
        <div className="wcu-header">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="wcu-title"
          >
            Why Brands Choose Us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="wcu-subtitle"
          >
            We don't just create campaigns; we engineer growth and build lasting impressions.
          </motion.p>
        </div>

        <motion.div 
          className="wcu-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {reasons.map((reason) => (
            <motion.div key={reason.id} variants={itemVariants} className="wcu-card">
              <div className="wcu-card-watermark">0{reason.id}</div>
              <div className="wcu-icon-wrapper">
                {reason.icon}
              </div>
              <h3 className="wcu-card-title">{reason.title}</h3>
              <p className="wcu-card-desc">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
