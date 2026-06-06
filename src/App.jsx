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

import RajasthanTour from './pages/RajasthanTour';

import PageTransition from './components/PageTransition';
import { AnimatePresence } from 'framer-motion';

// ScrollToTop helper for react-router with Lenis
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/services" element={<PageTransition><AllServices /></PageTransition>} />
        <Route path="/portfolio" element={<PageTransition><PortfolioGallery /></PageTransition>} />
        <Route path="/rajasthan-tour" element={<PageTransition><RajasthanTour /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ReactLenis root>
      <CustomCursor />
      <Router>
        <ScrollToTop />
        <div className="app-container">
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </div>
      </Router>
    </ReactLenis>
  );
}

export default App;

