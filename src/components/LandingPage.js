import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './LandingPage.css';

const padZero = (num) => String(num).padStart(2, '0');

const LandingPage = () => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date('2026-06-06T20:00:00');
      const now = new Date();
      const difference = eventDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="landing-page" id="home">
      {/* Hero Section */}
      <div className="landing-hero">
        <div 
          className="landing-background"
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/resources/landing/background.jpg)` }}
        >
          <div className="scroll-indicator">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="landing-info-section">
        {/* Floral illustration - top left */}
        <div 
          className="floral-accent-top-left"
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/resources/landing/flower.png)` }}
        ></div>
        
        {/* Floral illustration - right side */}
        <div 
          className="floral-accent-right"
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/resources/landing/flower.png)` }}
        ></div>

        <div className="landing-info-content">
          {/* Couple Names */}
          <div className="couple-names">
            <h1 className="name-first">{t('landing.nameFirst')}</h1>
            <span className="name-connector">&</span>
            <h1 className="name-second">{t('landing.nameSecond')}</h1>
          </div>

          {/* RSVP Button */}
          <button 
            className="landing-rsvp-button"
            onClick={() => {
              const rsvpSection = document.getElementById('rsvp');
              if (rsvpSection) {
                rsvpSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {t('nav.rsvp')}
          </button>

          {/* Countdown Section */}
          <div className="landing-countdown">
            <h2 className="countdown-title">{t('eventDate.title')}</h2>
            <p className="countdown-date">{t('eventDate.date')}</p>
            <div className="countdown">
              <div className="countdown-item">
                <span className="countdown-number">{timeLeft.days}</span>
                <span className="countdown-label">{t('eventDate.days')}</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <span className="countdown-number">{padZero(timeLeft.hours)}</span>
                <span className="countdown-label">{t('eventDate.hours')}</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <span className="countdown-number">{padZero(timeLeft.minutes)}</span>
                <span className="countdown-label">{t('eventDate.minutes')}</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <span className="countdown-number">{padZero(timeLeft.seconds)}</span>
                <span className="countdown-label">{t('eventDate.seconds')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
