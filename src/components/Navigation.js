import React from 'react';
import { useTranslation } from 'react-i18next';
import './Navigation.css';

const Navigation = ({ showNav, scrollToSection }) => {
  const { t, i18n } = useTranslation();

  const menuItems = [
    { id: 'story', labelKey: 'nav.story' },
    { id: 'schedule', labelKey: 'nav.schedule' },
    { id: 'location', labelKey: 'nav.location' },
    { id: 'rsvp', labelKey: 'nav.rsvp' }
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ro' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <nav className={`navigation ${showNav ? 'sticky' : ''}`}>
      <div className="nav-container">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className="nav-item"
            onClick={() => scrollToSection(item.id)}
          >
            {t(item.labelKey)}
          </button>
        ))}
        <button className="nav-item lang-toggle" onClick={toggleLanguage}>
          {i18n.language === 'en' ? 'RO' : 'EN'}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
