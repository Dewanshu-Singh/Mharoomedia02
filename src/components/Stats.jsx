import React, { useRef, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import './Stats.css';

const AnimatedCounter = ({ to, prefix = "", suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const springValue = useSpring(0, {
    duration: 2000, // 2 seconds
    bounce: 0
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(to);
    }
  }, [isInView, springValue, to]);

  const displayValue = useTransform(springValue, (current) => {
    return `${prefix}${Math.round(current)}${suffix}`;
  });

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

const Stats = () => {
  const statsData = [
    { to: 3, suffix: "x", label: "Average engagement lift in 90 days" },
    { to: 50, suffix: "+", label: "Brand campaigns launched" },
    { to: 0, prefix: "₹", label: "Wasted on vanity metrics" },
    { to: 100, suffix: "%", label: "Dedicated to your growth" }
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="stats-section">
      <div className="container">
        <motion.div 
          className="stats-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {statsData.map((stat, index) => (
            <motion.div className="stat-item" variants={itemVariants} key={index}>
              <div className="stat-line"></div>
              <div className="stat-number">
                <AnimatedCounter to={stat.to} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
