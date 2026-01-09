import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './EventDate.css';

const padZero = (num) => String(num).padStart(2, '0');

const EventDate = () => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date('2026-06-06T20:00:00');
      const now = new Date();
      const difference = eventDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft({ days, hours, minutes });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000 * 60); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="event-date-section" id="event-date">
      <div className="event-date-container">
        <h2 className="event-date-title">{t('eventDate.title')}</h2>
        <p className="event-date-text">{t('eventDate.date')}</p>
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
        </div>
      </div>
    </section>
  );
};

export default EventDate;

