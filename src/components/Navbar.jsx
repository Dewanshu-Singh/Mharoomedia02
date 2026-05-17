import React, { useState } from 'react';
import './Navbar.css';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <a href="/" className="nav-brand">
          <img src="/logo-removebg-preview.png" alt="MharooMedia Logo" className="nav-logo" onError={(e) => {
            e.target.onerror = null; 
            e.target.style.display = 'none';
          }} />
          <span style={{ color: 'var(--accent-red)', fontWeight: 700 }}>MharooMedia</span>
        </a>

        <ul className={`nav-links ${isOpen ? 'mobile-active' : ''}`}>
          <li><a href="#" className="nav-link active" onClick={() => setIsOpen(false)}>Home</a></li>
          <li><a href="#services" className="nav-link" onClick={() => setIsOpen(false)}>Services</a></li>
          <li><a href="#portfolio" className="nav-link" onClick={() => setIsOpen(false)}>Portfolio</a></li>
          <li><a href="#about" className="nav-link" onClick={() => setIsOpen(false)}>About</a></li>
          <li><a href="#contact" className="nav-link" onClick={() => setIsOpen(false)}>Contact</a></li>
        </ul>

        <button className="btn-primary">Get in Touch</button>
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
