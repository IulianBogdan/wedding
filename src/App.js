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
  const [textVisible, setTextVisible] = useState(false);
  const [splashFadeOut, setSplashFadeOut] = useState(false);

  useEffect(() => {
    // Text fades in immediately with a small delay for the page to load
    const textFadeInTimer = setTimeout(() => {
      setTextVisible(true);
    }, 100);

    // After 3 seconds of text being visible, start splash fade out
    const fadeOutTimer = setTimeout(() => {
      setSplashFadeOut(true);
    }, 3300);

    // Remove splash from DOM after fade out completes (2s fade-out)
    const removeSplashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 5300);

    return () => {
      clearTimeout(textFadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeSplashTimer);
    };
  }, []);

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
      {/* Main content is always rendered behind splash */}
      <div className="App">
        <Navigation scrollToSection={scrollToSection} />
        <LandingPage />
        
        {/* Gypso pair - Landing to Story */}
        <div className="gypso-divider gypso-left">
          <img 
            src={`${process.env.PUBLIC_URL}/resources/common/gypso-left-top.png`}
            alt=""
          />
        </div>
        <div className="gypso-divider gypso-right">
          <img 
            src={`${process.env.PUBLIC_URL}/resources/common/gypso-right-bottom.png`}
            alt=""
          />
        </div>
        
        <Story />
        
        {/* Gypso pair - Story to Schedule */}
        <div className="gypso-divider gypso-right">
          <img 
            src={`${process.env.PUBLIC_URL}/resources/common/gypso-right-top.png`}
            alt=""
          />
        </div>
        <div className="gypso-divider gypso-left">
          <img 
            src={`${process.env.PUBLIC_URL}/resources/common/gypso-left-bottom.png`}
            alt=""
          />
        </div>
        
        <Schedule />
        
        {/* Gypso pair - Schedule to FunCommittee */}
        <div className="gypso-divider gypso-left">
          <img 
            src={`${process.env.PUBLIC_URL}/resources/common/gypso-left-top.png`}
            alt=""
          />
        </div>
        <div className="gypso-divider gypso-right">
          <img 
            src={`${process.env.PUBLIC_URL}/resources/common/gypso-right-bottom.png`}
            alt=""
          />
        </div>
        
        <FunCommittee />
        
        {/* Gypso pair - FunCommittee to RSVP */}
        <div className="gypso-divider gypso-right">
          <img 
            src={`${process.env.PUBLIC_URL}/resources/common/gypso-right-top.png`}
            alt=""
          />
        </div>
        <div className="gypso-divider gypso-left">
          <img 
            src={`${process.env.PUBLIC_URL}/resources/common/gypso-left-bottom.png`}
            alt=""
          />
        </div>
        
        <RSVP />
        
        {/* Gypso pair - RSVP to Location */}
        <div className="gypso-divider gypso-left">
          <img 
            src={`${process.env.PUBLIC_URL}/resources/common/gypso-left-top.png`}
            alt=""
          />
        </div>
        <div className="gypso-divider gypso-right">
          <img 
            src={`${process.env.PUBLIC_URL}/resources/common/gypso-right-bottom.png`}
            alt=""
          />
        </div>
        
        <Location />
        
        {/* Gypso pair - Footer */}
        <div className="gypso-divider gypso-right">
          <img 
            src={`${process.env.PUBLIC_URL}/resources/common/gypso-right-top.png`}
            alt=""
          />
        </div>
        <div className="gypso-divider gypso-left">
          <img 
            src={`${process.env.PUBLIC_URL}/resources/common/gypso-left-bottom.png`}
            alt=""
          />
        </div>
      </div>

      {/* Splash screen overlay */}
      {showSplash && (
        <div className={`splash-screen ${splashFadeOut ? 'fade-out' : ''}`}>
          <img 
            src={`${process.env.PUBLIC_URL}/resources/common/splash-backgound.png`}
            alt="Splash background"
            className="splash-background"
          />
          <p className={`splash-text ${textVisible ? 'visible' : ''}`}>
            Dacă ai ajuns aici, înseamnă că e oficial: ești invitat la nunta noastră!
          </p>
        </div>
      )}
    </>
  );
}

export default App;

