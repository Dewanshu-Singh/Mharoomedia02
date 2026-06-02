import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [status, setStatus] = React.useState('idle'); // idle, loading, success, error
  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('loading');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://mharoomedia02.onrender.com';
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Reset status after a few seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

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
                  <p>info@mharoomedia.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={24} />
                </div>
                <div className="contact-item-text">
                  <h4>Call Us</h4>
                  <p>+919001103805</p>
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
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="e.g. John Doe" />
                {errors.name && <span style={{ color: '#ff4d4f', fontSize: '0.85rem', marginTop: '6px', display: 'block' }}>{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="e.g. john@example.com" />
                {errors.email && <span style={{ color: '#ff4d4f', fontSize: '0.85rem', marginTop: '6px', display: 'block' }}>{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} className="form-control" placeholder="Tell us about your project or inquiry..."></textarea>
                {errors.message && <span style={{ color: '#ff4d4f', fontSize: '0.85rem', marginTop: '6px', display: 'block' }}>{errors.message}</span>}
              </div>
              
              <button type="submit" className="btn-primary submit-btn" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : (
                  <>Send Message <Send size={20} /></>
                )}
              </button>

              {status === 'success' && (
                <div style={{ marginTop: '15px', color: '#4caf50', fontWeight: 'bold' }}>
                  ✅ Message sent successfully! We'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div style={{ marginTop: '15px', color: '#f44336', fontWeight: 'bold' }}>
                  ❌ Something went wrong. Please try again later.
                </div>
              )}
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
