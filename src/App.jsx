import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import AllServices from './components/AllServices';
import PortfolioGallery from './pages/PortfolioGallery';
import CustomCursor from './components/CustomCursor';

// ScrollToTop helper for react-router with Lenis
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <ReactLenis root>
      <CustomCursor />
      <Router>
        <ScrollToTop />
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<AllServices />} />
            <Route path="/portfolio" element={<PortfolioGallery />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ReactLenis>
  );
}

export default App;

