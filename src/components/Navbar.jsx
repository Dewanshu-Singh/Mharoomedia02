import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Navbar.css';
import { Menu, X } from 'lucide-react';
import Magnetic from './Magnetic';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll background state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking logic
  useEffect(() => {
    // If we are on the /about page, set active and skip scroll tracking
    if (location.pathname === '/about') {
      setActiveSection('about');
      return;
    }

    // If we are not on the homepage, clear the active section (so Home isn't highlighted)
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    // Otherwise we are on the homepage, track sections
    const sections = ['home', 'services', 'journey', 'contact']; // removed about since it's a separate page now
    
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Triggers when section enters the middle 20% of the screen
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveSection(targetId); // Optimistically set active
    
    if (location.pathname !== '/') {
      // If we are on another page, navigate to home first
      navigate('/');
      setTimeout(() => {
        if (targetId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(targetId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // We are already on home page, just scroll
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-content">
        <Link to="/" className="nav-brand magnetic-target" onClick={(e) => {
          if (location.pathname === '/') handleNavClick(e, 'home');
        }}>
          <img src="/logo-removebg-preview.png" alt="MharooMedia Logo" className="nav-logo" onError={(e) => {
            e.target.onerror = null; 
            e.target.style.display = 'none';
          }} />
          <span style={{ color: 'var(--accent-red)', fontWeight: 700 }}>MharooMedia</span>
        </Link>

        <ul className={`nav-links ${isOpen ? 'mobile-active' : ''}`}>
          <li><a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''} magnetic-target`} onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
          <li><Link to="/services" className={`nav-link ${activeSection === 'services' ? 'active' : ''} magnetic-target`} onClick={() => { setIsOpen(false); setActiveSection('services'); }}>Services</Link></li>
          <li><a href="#journey" className={`nav-link ${activeSection === 'journey' ? 'active' : ''} magnetic-target`} onClick={(e) => handleNavClick(e, 'journey')}>Our Journey</a></li>
          <li><Link to="/about" className={`nav-link ${activeSection === 'about' ? 'active' : ''} magnetic-target`} onClick={() => { setIsOpen(false); setActiveSection('about'); }}>About</Link></li>
          <li><a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''} magnetic-target`} onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
        </ul>

        <Magnetic>
          <button className="btn-primary magnetic-target" onClick={(e) => handleNavClick(e, 'contact')}>Get in Touch</button>
        </Magnetic>
        <button className="mobile-menu-btn magnetic-target" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
