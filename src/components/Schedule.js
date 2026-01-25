import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Schedule.css';

const TimelineItem = ({ event, index, isVisible, t }) => {
  const isLeft = index % 2 === 0;
  
  return (
    <div 
      className={`timeline-item ${isLeft ? 'timeline-item-left' : 'timeline-item-right'} ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className={`timeline-content-wrapper ${isLeft ? 'left' : 'right'}`}>
        {isLeft ? (
          <>
            <div className="timeline-content">
              <span className="timeline-time">{event.time}</span>
              <h4 className="timeline-title">{t(event.titleKey)}</h4>
            </div>
            <div className="timeline-icon">
              <img src={event.image} alt={t(event.titleKey)} />
            </div>
          </>
        ) : (
          <>
            <div className="timeline-icon">
              <img src={event.image} alt={t(event.titleKey)} />
            </div>
            <div className="timeline-content">
              <span className="timeline-time">{event.time}</span>
              <h4 className="timeline-title">{t(event.titleKey)}</h4>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Schedule = () => {
  const { t } = useTranslation();
  const [visibleItems, setVisibleItems] = useState(new Set());
  const itemRefs = useRef([]);

  const allEvents = [
    {
      time: '17:00',
      titleKey: 'schedule.events.civilCeremony',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/1.png`
    },
    {
      time: '17:15',
      titleKey: 'schedule.events.religiousCeremony',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/2.png`
    },
    {
      time: '18:00',
      titleKey: 'schedule.events.picturesSnacks',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/3.png`
    },
    {
      time: '19:00',
      titleKey: 'schedule.events.welcomeDrinks',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/4.png`
    },
    {
      time: '20:00',
      titleKey: 'schedule.events.firstDance',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/5.png`
    },
    {
      time: '20:30',
      titleKey: 'schedule.events.entree',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/6.png`
    },
    {
      time: '22:00',
      titleKey: 'schedule.events.firstCourse',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/6.png`
    },
    {
      time: '23:15',
      titleKey: 'schedule.events.sarmale',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/6.png`
    },
    {
      time: '00:00',
      titleKey: 'schedule.events.cakeFireworks',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/8.png`
    },
    {
      time: '01:30',
      titleKey: 'schedule.events.secondCourse',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/6.png`
    },
    {
      time: '02:30',
      titleKey: 'schedule.events.tort',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/6.png`
    },
    {
      time: '',
      titleKey: 'schedule.events.danceTillDawn',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/10.png`
    }
  ];

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, index]));
            }
          });
        },
        { threshold: 0.2 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section className="schedule-section" id="schedule">
      <div className="schedule-container">
        <h2 className="section-title">{t('schedule.title')}</h2>
        
        <div className="timeline-vertical">
          <div className="timeline-line"></div>
          <div className="timeline-items">
            {allEvents.map((event, index) => (
              <div
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                className="timeline-item-wrapper"
              >
                <TimelineItem
                  event={event}
                  index={index}
                  isVisible={visibleItems.has(index)}
                  t={t}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
