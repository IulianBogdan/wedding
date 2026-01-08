import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Schedule.css';

const TimelineItem = ({ event, index, isVisible, t }) => {
  return (
    <div 
      className={`timeline-item ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="timeline-icon-wrapper">
        <div className="timeline-icon-placeholder">
          <img src={event.image} alt={t(event.titleKey)} />
        </div>
      </div>
      <div className="timeline-dot"></div>
      <div className="timeline-content">
        <span className="timeline-time">{event.time}</span>
        <h4 className="timeline-title">{t(event.titleKey)}</h4>
      </div>
    </div>
  );
};

const Schedule = () => {
  const { t } = useTranslation();
  const [visibleCeremony, setVisibleCeremony] = useState(new Set());
  const [visibleParty, setVisibleParty] = useState(new Set());
  const ceremonyRefs = useRef([]);
  const partyRefs = useRef([]);

  const ceremonyEvents = [
    {
      time: '17:00',
      titleKey: 'schedule.events.civilCeremony',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/civil-ceremony.png`
    },
    {
      time: '17:15',
      titleKey: 'schedule.events.religiousCeremony',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/religious-ceremony.png`
    },
    {
      time: '18:00',
      titleKey: 'schedule.events.picturesSnacks',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/pictures-snacks.png`
    }
  ];

  const partyEvents = [
    {
      time: '19:00',
      titleKey: 'schedule.events.welcomeDrinks',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/welcome-drinks.png`
    },
    {
      time: '20:00',
      titleKey: 'schedule.events.firstDance',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/first-dance.png`
    },
    {
      time: '21:00',
      titleKey: 'schedule.events.entree',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/entree.png`
    },
    {
      time: '23:00',
      titleKey: 'schedule.events.firstCourse',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/first-course.png`
    },
    {
      time: '00:00',
      titleKey: 'schedule.events.cakeFireworks',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/cake-fireworks.png`
    },
    {
      time: '01:00',
      titleKey: 'schedule.events.secondCourse',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/second-course.png`
    },
    {
      time: '01:30 - 05:00',
      titleKey: 'schedule.events.danceTillDawn',
      image: `${process.env.PUBLIC_URL}/resources/schedule/icons/dance-till-dawn.png`
    }
  ];

  useEffect(() => {
    const observeItems = (refs, setVisible) => {
      return refs.current.map((ref, index) => {
        if (!ref) return null;
        
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisible((prev) => new Set([...prev, index]));
              }
            });
          },
          { threshold: 0.2, rootMargin: '0px -50px 0px 0px' }
        );
        
        observer.observe(ref);
        return observer;
      });
    };

    const ceremonyObservers = observeItems(ceremonyRefs, setVisibleCeremony);
    const partyObservers = observeItems(partyRefs, setVisibleParty);

    return () => {
      ceremonyObservers.forEach((observer) => observer?.disconnect());
      partyObservers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section className="schedule-section" id="schedule">
      <div className="schedule-container">
        <h2 className="section-title">{t('schedule.title')}</h2>
        
        <div className="schedule-content">
          {/* Wedding Ceremony Timeline */}
          <div className="schedule-row">
            <h3 className="schedule-subtitle">{t('schedule.ceremony')}</h3>
            <div className="timeline-horizontal">
              <div className="timeline-line-horizontal"></div>
              <div className="timeline-items">
                {ceremonyEvents.map((event, index) => (
                  <div
                    key={index}
                    ref={(el) => (ceremonyRefs.current[index] = el)}
                    className="timeline-item-wrapper"
                  >
                    <TimelineItem
                      event={event}
                      index={index}
                      isVisible={visibleCeremony.has(index)}
                      t={t}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Party Timeline */}
          <div className="schedule-row">
            <h3 className="schedule-subtitle">{t('schedule.party')}</h3>
            <div className="timeline-horizontal">
              <div className="timeline-line-horizontal"></div>
              <div className="timeline-items">
                {partyEvents.map((event, index) => (
                  <div
                    key={index}
                    ref={(el) => (partyRefs.current[index] = el)}
                    className="timeline-item-wrapper"
                  >
                    <TimelineItem
                      event={event}
                      index={index}
                      isVisible={visibleParty.has(index)}
                      t={t}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
