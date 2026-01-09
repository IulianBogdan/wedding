import React from 'react';
import { useTranslation } from 'react-i18next';
import './LandingPage.css';

const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <section className="landing-page" id="home">
      <div 
        className="landing-background"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/resources/landing/background.jpg)` }}
      >
        <div className="landing-overlay"></div>
      </div>
      <div className="landing-content">
        <h1 className="landing-title">{t('landing.title')}</h1>
      </div>
    </section>
  );
};

export default LandingPage;
