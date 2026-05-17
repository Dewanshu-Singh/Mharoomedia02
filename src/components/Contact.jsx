import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-container">
          
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="contact-title">Let's Build Something <span>Great.</span></h2>
            <p className="contact-desc">
              Ready to scale your brand? Drop us a message, and let's discuss how we can help you achieve your goals through data-driven strategies and creative excellence.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={24} />
                </div>
                <div className="contact-item-text">
                  <h4>Email Us</h4>
                  <p>hello@mharoomedia.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={24} />
                </div>
                <div className="contact-item-text">
                  <h4>Call Us</h4>
                  <p>+91 98765 43210</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={24} />
                </div>
                <div className="contact-item-text">
                  <h4>Visit Us</h4>
                  <p>Jaipur, Rajasthan, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input type="text" className="form-control" placeholder="e.g. John Doe" required />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-control" placeholder="e.g. john@example.com" required />
              </div>
              
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-control" placeholder="Tell us about your project or inquiry..." required></textarea>
              </div>
              
              <button type="submit" className="btn-primary submit-btn">
                Send Message <Send size={20} />
              </button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
