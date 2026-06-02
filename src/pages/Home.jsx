import React from 'react';

import Hero from '../components/Hero';
import TrustSection from '../components/TrustSection';
import Journey from '../components/Journey';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Works from '../components/Works';
import FeaturedVideos from '../components/FeaturedVideos';
import ReelsSection from '../components/ReelsSection';
import Clients from '../components/Clients';
import Contact from '../components/Contact';
import Reveal from '../components/Reveal';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content-wrapper">
        <Hero />
        <Reveal><TrustSection /></Reveal>
        <Journey />
        <Reveal><Services /></Reveal>
        <Reveal><WhyChooseUs /></Reveal>
        <Reveal><Clients /></Reveal>
        <Reveal><Works /></Reveal>
        <Reveal><FeaturedVideos /></Reveal>
        <Reveal><ReelsSection /></Reveal>
        <Reveal><Contact /></Reveal>
      </div>
    </div>
  );
}

export default Home;
