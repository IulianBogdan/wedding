import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import Navigation from './components/Navigation';
import EventDate from './components/EventDate';
import Story from './components/Story';
import Schedule from './components/Schedule';
import FunCommittee from './components/FunCommittee';
import Location from './components/Location';
import RSVP from './components/RSVP';

function App() {
  const [showNav, setShowNav] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out animation at 5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 5000);

    // Hide splash screen completely at 6 seconds
    const hideTimer = setTimeout(() => {
      setShowSplash(false);
    }, 6000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (!showSplash) {
      const handleScroll = () => {
        const landingHeight = window.innerHeight;
        setShowNav(window.scrollY > landingHeight * 0.8);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showSplash]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = showNav ? 80 : 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (showSplash) {
    return (
      <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
        <div className="splash-content">
          <p className="splash-text">
            <span>
              Dacă ai ajuns aici, înseamnă că e oficial: ești invitat la nunta noastră!
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <LandingPage />
      <Navigation showNav={showNav} scrollToSection={scrollToSection} />
      <EventDate />
      <Story />
      <Schedule />
      <FunCommittee />
      <Location />
      <RSVP />
    </div>
  );
}

export default App;

