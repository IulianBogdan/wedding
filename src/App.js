import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import Navigation from './components/Navigation';
import Story from './components/Story';
import Schedule from './components/Schedule';
import FunCommittee from './components/FunCommittee';
import Location from './components/Location';
import RSVP from './components/RSVP';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [textFadeOut, setTextFadeOut] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Preload the landing page background image
    const img = new Image();
    img.src = `${process.env.PUBLIC_URL}/resources/landing/background.jpg`;
    img.onload = () => {
      setImageLoaded(true);
    };
    img.onerror = () => {
      // Even if image fails to load, proceed after a short delay
      setTimeout(() => setImageLoaded(true), 100);
    };
  }, []);

  useEffect(() => {
    // Start text fade-out at 3 seconds
    const textFadeTimer = setTimeout(() => {
      setTextFadeOut(true);
    }, 3000);

    // Start splash screen fade-out after text fades out (1.2s later)
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      // Start showing content slightly before splash finishes (overlap transition)
      setShowContent(true);
    }, 4200);

    // Hide splash screen completely after fade-out animation completes (1.5s)
    const hideTimer = setTimeout(() => {
      setShowSplash(false);
    }, 5700);

    return () => {
      clearTimeout(textFadeTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Navigation is now always visible as hamburger menu, no scroll detection needed

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {showSplash && (
        <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
          <div className="splash-content">
            <div className="splash-frame">
              <img 
                src={`${process.env.PUBLIC_URL}/resources/landing/flowers-frame-loading.png`}
                alt="Floral frame"
                className={`splash-frame-image ${textFadeOut ? 'text-fade-out' : ''}`}
              />
              <p className={`splash-text ${textFadeOut ? 'text-fade-out' : ''}`}>
                <span>
                  Dacă ai ajuns aici, înseamnă că e oficial: ești invitat la nunta noastră!
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
      {showContent && (
        <div className={`App ${imageLoaded ? 'fade-in' : ''}`}>
          <Navigation scrollToSection={scrollToSection} />
          <LandingPage />
          <Story />
          <Schedule />
          <FunCommittee />
          <RSVP />
          <Location />
        </div>
      )}
    </>
  );
}

export default App;

