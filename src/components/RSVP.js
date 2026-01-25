import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './RSVP.css';

const RSVP = () => {
  const { t } = useTranslation();
  const [hasPartner, setHasPartner] = useState(false);
  const [vegetarianMenu, setVegetarianMenu] = useState(false);
  const [hasAllergens, setHasAllergens] = useState(false);
  const [partnerVegetarianMenu, setPartnerVegetarianMenu] = useState(false);
  const [partnerHasAllergens, setPartnerHasAllergens] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.target);
    formData.append("access_key", "5a21cb93-52aa-49b1-b442-75de7b0492b1");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({ type: 'success', message: t('rsvp.successMessage') });
        e.target.reset();
        setHasPartner(false);
        setVegetarianMenu(false);
        setHasAllergens(false);
        setPartnerVegetarianMenu(false);
        setPartnerHasAllergens(false);
      } else {
        setSubmitStatus({ type: 'error', message: t('rsvp.errorMessage') });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: t('rsvp.errorMessage') });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rsvp-section" id="rsvp">
      <div className="rsvp-container">
        <form className="rsvp-form" onSubmit={handleSubmit}>
          <div className="rsvp-form-header">
            <h2 className="rsvp-title">{t('rsvp.title')}</h2>
            <p className="rsvp-subtitle">{t('rsvp.subtitle')}</p>
          </div>
          
          <div className="rsvp-form-divider"></div>
          
          <div className="rsvp-form-body">
            <div className="form-group">
              <label htmlFor="fullName">{t('rsvp.fullName')} *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                placeholder={t('rsvp.fullNamePlaceholder')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('rsvp.email')} *</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder={t('rsvp.emailPlaceholder')}
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="vegetarianMenu"
                  checked={vegetarianMenu}
                  onChange={(e) => setVegetarianMenu(e.target.checked)}
                />
                <span>Meniu vegetarian</span>
              </label>
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="hasAllergens"
                  checked={hasAllergens}
                  onChange={(e) => setHasAllergens(e.target.checked)}
                />
                <span>Alergeni</span>
              </label>
            </div>

            {hasAllergens && (
              <div className="form-group partner-field">
                <input
                  type="text"
                  name="allergens"
                  placeholder="Specificați alergenii..."
                />
              </div>
            )}

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="hasPartner"
                  checked={hasPartner}
                  onChange={(e) => setHasPartner(e.target.checked)}
                />
                <span>{t('rsvp.hasPartner')}</span>
              </label>
            </div>

            {hasPartner && (
              <div className="form-group partner-field">
                <label htmlFor="partnerName">{t('rsvp.partnerName')} *</label>
                <input
                  type="text"
                  id="partnerName"
                  name="partnerName"
                  required={hasPartner}
                  placeholder={t('rsvp.partnerNamePlaceholder')}
                />
                <div className="nested-checkbox">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="partnerVegetarianMenu"
                      checked={partnerVegetarianMenu}
                      onChange={(e) => setPartnerVegetarianMenu(e.target.checked)}
                    />
                    <span>Meniu vegetarian</span>
                  </label>
                </div>
                <div className="nested-checkbox">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="partnerHasAllergens"
                      checked={partnerHasAllergens}
                      onChange={(e) => setPartnerHasAllergens(e.target.checked)}
                    />
                    <span>Alergeni</span>
                  </label>
                </div>
                {partnerHasAllergens && (
                  <div className="nested-field">
                    <input
                      type="text"
                      name="partnerAllergens"
                      placeholder="Specificați alergenii..."
                    />
                  </div>
                )}
              </div>
            )}

            {submitStatus && (
              <div className={`submit-status ${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}

            <button type="submit" className="submit-button" disabled={submitting}>
              {submitting ? t('rsvp.submitting') : t('rsvp.submit')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RSVP;
