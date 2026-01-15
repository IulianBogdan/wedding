import React from 'react';
import { useTranslation } from 'react-i18next';
import './Location.css';

const Location = () => {
  const { t } = useTranslation();
  const mapPlaceholder = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.567890123456!2d24.7819788!3d44.8952038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2bb004cbdc395%3A0xe82818882e984b2b!2sLa%20Boheme%20Noblesse%20-%20Restaurant%20evenimente%20Pite%C8%99ti!5e0!3m2!1sen!2sro!4v1704067200000!5m2!1sen!2sro";
  const googleMapsUrl = "https://www.google.com/maps/place/La+Boheme+Noblesse+-+Restaurant+evenimente+Pite%C8%99ti/@44.8952076,24.7794039,17z/data=!3m1!4b1!4m6!3m5!1s0x40b2bb004cbdc395:0xe82818882e984b2b!8m2!3d44.8952038!4d24.7819788!16s%2Fg%2F11ngj86n8p?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D";
  const wazeUrl = "https://waze.com/ul?ll=44.8952038,24.7819788&navigate=yes";

  return (
    <section className="location-section" id="location">
      <div className="location-container">
        <h2 className="section-title">{t('location.title')}</h2>
        <div className="location-content">
          <div className="location-text">
            <p>{t('location.venueName')}</p>
            <div className="directions-links">
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="directions-link">
                Google Maps
              </a>
              <span className="link-separator">|</span>
              <a href={wazeUrl} target="_blank" rel="noopener noreferrer" className="directions-link">
                Waze
              </a>
            </div>
          </div>
          <div className="location-map">
            <iframe
              title="Wedding Location"
              src={mapPlaceholder}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
