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

  // Start splash sequence immediately - HTML splash is already showing
  useEffect(() => {
    // Text fades in shortly after React mounts
    const textFadeInTimer = setTimeout(() => {
      setTextVisible(true);
    }, 100);

    // After 3 seconds of text being visible, start splash fade out
    const fadeOutTimer = setTimeout(() => {
      setSplashFadeOut(true);
      // Also fade out the HTML splash
      document.getElementById('html-splash')?.classList.add('fade-out');
    }, 3300);

    // Remove splash and hide HTML splash after fade out completes
    const removeSplashTimer = setTimeout(() => {
      setShowSplash(false);
      // Hide the HTML splash screen
      document.getElementById('html-splash')?.classList.add('hidden');
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
      {/* Main content rendered behind splash */}
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
            src="https://res.cloudinary.com/df01ppdtc/image/upload/v1768551384/splash-background-1_zftggz.jpg"
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

