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
        <div className="landing-invitation">
          <p>Iubirea noastră, împărtăşită cu voi!</p>
          <p>Avem deosebita plăcere de a vă invita să fiți alături de noi în ziua în care sufletele noastre se vor uni.</p>
          <p>Vă așteptăm cu drag!</p>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
