import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Navigation.css';

const Navigation = ({ scrollToSection }) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Hamburger Menu Icon */}
      <button 
        className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
        onClick={handleMenuClick}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Dropdown Menu */}
      <nav className={`navigation-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-overlay" onClick={handleMenuClick}></div>
        <div className="menu-content">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="menu-item"
              onClick={() => handleMenuItemClick(item.id)}
            >
              {t(item.labelKey)}
            </button>
          ))}
          <button className="menu-item lang-toggle" onClick={toggleLanguage}>
            {i18n.language === 'en' ? 'RO' : 'EN'}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
