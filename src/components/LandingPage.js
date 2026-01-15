import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './LandingPage.css';

const padZero = (num) => String(num).padStart(2, '0');

const LandingPage = () => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const backgroundImage = isMobile 
    ? `${process.env.PUBLIC_URL}/resources/landing/background-small.jpg`
    : `${process.env.PUBLIC_URL}/resources/landing/background-scaled.jpg`;

  return (
    <section className="landing-page" id="home">
      {/* Hero Section */}
      <div className="landing-hero">
        <div 
          className="landing-background"
          style={{ backgroundImage: `url(${backgroundImage})` }}
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
        <div className="landing-info-content">
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
