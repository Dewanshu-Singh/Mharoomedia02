import React from 'react';
import './Clients.css';

const baseLogos = [
  { id: 1, src: "/LOGO1.png", alt: "Client 1", style: { transform: "scale(2.3)" } },
  { id: 2, src: "/LOGO2.PNG", alt: "Client 2", style: { transform: "scale(1.5)" } },
  { id: 4, src: "/LOGO4.png", alt: "Client 4", style: { transform: "scale(1.5)" } },
  { id: 5, src: "/LOGO5.png", alt: "Client 5", style: { transform: "scale(1.5)" } }
];

// Duplicate base logos to ensure the marquee track is wide enough for large screens
const clientList = [...baseLogos, ...baseLogos, ...baseLogos];

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
              <img src={client.src} alt={client.alt} style={client.style} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
