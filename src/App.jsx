import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import KeyPoints from './components/KeyPoints';
import Stats from './components/Stats';
import Services from './components/Services';
import Works from './components/Works';
import FeaturedVideos from './components/FeaturedVideos';
import Clients from './components/Clients';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <KeyPoints />
      <Stats />
      <Services />
      <Works />
      <FeaturedVideos />
      <Clients />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
