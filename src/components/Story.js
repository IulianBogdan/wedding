import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Story.css';

const storyImages = [
  `${process.env.PUBLIC_URL}/resources/story/step-1.jpg`,
  `${process.env.PUBLIC_URL}/resources/story/step-2.jpg`,
  `${process.env.PUBLIC_URL}/resources/story/step-3.jpg`,
  `${process.env.PUBLIC_URL}/resources/story/step-4.jpg`,
  `${process.env.PUBLIC_URL}/resources/story/step-5.jpg`,
  `${process.env.PUBLIC_URL}/resources/story/step-6.jpg`,
  `${process.env.PUBLIC_URL}/resources/story/step-7.jpg`
];

const Story = () => {
  const { t } = useTranslation();
  const [visibleSteps, setVisibleSteps] = useState(new Set());
  const [pathProgress, setPathProgress] = useState(0);
  const [imageColorProgress, setImageColorProgress] = useState({});
  const stepRefs = useRef([]);
  const imageRefs = useRef([]);

  // Map step numbers to custom labels
  const getStepLabel = (stepId) => {
    const labels = {
      1: '2015',
      2: '2016',
      3: '2018',
      4: '2019',
      5: 'forever',
      6: '2024',
      7: '2026'
    };
    return labels[stepId] || stepId;
  };
  const sectionRef = useRef(null);

  const storySteps = [
    { id: 1, image: storyImages[0], titleKey: 'story.steps.step1.title', textKey: 'story.steps.step1.text' },
    { id: 2, image: storyImages[1], titleKey: 'story.steps.step2.title', textKey: 'story.steps.step2.text' },
    { id: 3, image: storyImages[2], titleKey: 'story.steps.step3.title', textKey: 'story.steps.step3.text' },
    { id: 4, image: storyImages[3], titleKey: 'story.steps.step4.title', textKey: 'story.steps.step4.text' },
    { id: 5, image: storyImages[4], titleKey: 'story.steps.step5.title', textKey: 'story.steps.step5.text' },
    { id: 6, image: storyImages[5], titleKey: 'story.steps.step6.title', textKey: 'story.steps.step6.text' },
    { id: 7, image: storyImages[6], titleKey: 'story.steps.step7.title', textKey: 'story.steps.step7.text' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate path progress based on scroll position
      const scrolledIntoSection = windowHeight - sectionTop;
      const totalScrollable = sectionHeight + windowHeight;
      const progress = Math.max(0, Math.min(1, scrolledIntoSection / totalScrollable));
      setPathProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers = stepRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSteps((prev) => new Set([...prev, index]));
            }
          });
        },
        { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      imageRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const rect = ref.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const elementBottom = elementTop + elementHeight;
        
        // Calculate how much of the image is visible
        const visibleTop = Math.max(0, windowHeight - elementTop);
        const visibleBottom = Math.max(0, elementBottom);
        const visibleHeight = Math.min(visibleTop, visibleBottom, elementHeight, windowHeight);
        
        // Only start transition when 50% of image height is visible
        const halfHeight = elementHeight * 0.5;
        const progress = visibleHeight >= halfHeight 
          ? Math.max(0, Math.min(1, (visibleHeight - halfHeight) / halfHeight))
          : 0;
        
        setImageColorProgress((prev) => ({
          ...prev,
          [index]: progress
        }));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="story-section" id="story" ref={sectionRef}>
      <div className="story-container">
        {/* Floral accents - desktop only */}
        <div 
          className="floral-accent-top-left"
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/resources/landing/flower.png)` }}
        ></div>
        <div 
          className="floral-accent-right"
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/resources/landing/flower.png)` }}
        ></div>
        
        <h2 className="section-title">{t('story.title')}</h2>
        <p className="story-subtitle">{t('story.subtitle')}</p>
        
        <div className="story-roadmap">
          {/* Animated Path SVG */}
          <svg className="story-path" viewBox="0 0 100 1400" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#b0b0b0" />
                <stop offset="50%" stopColor="#b0b0b0" />
                <stop offset="100%" stopColor="#b0b0b0" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Background path */}
            <path
              className="path-bg"
              d="M50 0 
                 Q80 100 50 200 
                 Q20 300 50 400 
                 Q80 500 50 600 
                 Q20 700 50 800 
                 Q80 900 50 1000 
                 Q20 1100 50 1200
                 Q80 1300 50 1400"
              fill="none"
              stroke="#b0b0b0"
              strokeWidth="3"
            />
            
            {/* Animated progress path */}
            <path
              className="path-progress"
              d="M50 0 
                 Q80 100 50 200 
                 Q20 300 50 400 
                 Q80 500 50 600 
                 Q20 700 50 800 
                 Q80 900 50 1000 
                 Q20 1100 50 1200
                 Q80 1300 50 1400"
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#glow)"
              style={{
                strokeDasharray: 2000,
                strokeDashoffset: 2000 - (2000 * pathProgress)
              }}
            />
            
            {/* Dashed center line */}
            <path
              className="path-dashed"
              d="M50 0 
                 Q80 100 50 200 
                 Q20 300 50 400 
                 Q80 500 50 600 
                 Q20 700 50 800 
                 Q80 900 50 1000 
                 Q20 1100 50 1200
                 Q80 1300 50 1400"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              strokeDasharray="8 12"
              style={{
                strokeDashoffset: 2000 - (2000 * pathProgress)
              }}
            />
          </svg>

          {/* Story Steps */}
          <div className="story-steps">
            {storySteps.map((step, index) => (
              <div
                key={step.id}
                className={`story-step ${index % 2 === 0 ? 'step-left' : 'step-right'} ${visibleSteps.has(index) ? 'visible' : ''}`}
                ref={(el) => (stepRefs.current[index] = el)}
              >
                <div className="step-marker">
                  <span className="marker-number">{getStepLabel(step.id)}</span>
                  <div className="marker-pulse"></div>
                </div>
                
                <div className="step-content">
                  <div className="step-image-container">
                    <img 
                      src={step.image} 
                      alt={t(step.titleKey)} 
                      className="step-image"
                      ref={(el) => (imageRefs.current[index] = el)}
                      style={{
                        filter: `grayscale(${100 - (imageColorProgress[index] || 0) * 100}%)`
                      }}
                    />
                    <div className="image-overlay"></div>
                  </div>
                  <div className="step-text">
                    <h3 className="step-title">{t(step.titleKey)}</h3>
                    <p className="step-description">{t(step.textKey)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
