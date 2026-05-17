import React from 'react';
import './Clients.css';

const clientList = [
  "SKILL HORIZON",
  "Shodh AI",
  "SURESH GYAN VIHAR UNIVERSITY",
  "AESTR ALPHA",
  "Snapchat"
];

const Clients = () => {
  // Double the list for infinite scrolling effect
  const marqueeItems = [...clientList, ...clientList];

  return (
    <section className="clients-section">
      <div className="container">
        <div className="clients-header">
          <h2 className="clients-title">Our Clients</h2>
          <p className="clients-subtitle">Brands that trust us to build, scale, and stand out</p>
        </div>
      </div>

      <div className="clients-marquee-container">
        <div className="clients-marquee-track">
          {marqueeItems.map((client, index) => (
            <div key={index} className="client-logo-box">
              {/* You can replace {client} with an <img src="..." /> tag when you upload actual logos */}
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
