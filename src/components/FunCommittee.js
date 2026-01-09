import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './FunCommittee.css';

const FunCommittee = () => {
  const { t } = useTranslation();
  const [hoveredPerson, setHoveredPerson] = useState(null);

  const nasi = [
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/resources/fun-committee/nasi/nasii.png`,
      name: "Iulia si Andrei"
    }
  ];

  const groomsmen = [
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/resources/fun-committee/groomsmen/Ovidiu.png`,
      name: "Ovi"
    },
    {
      id: 2,
      image: `${process.env.PUBLIC_URL}/resources/fun-committee/groomsmen/Eugen.png`,
      name: "Eugen"
    },
    {
      id: 3,
      image: `${process.env.PUBLIC_URL}/resources/fun-committee/groomsmen/Mihai.png`,
      name: "Mihai"
    },
    {
      id: 4,
      image: `${process.env.PUBLIC_URL}/resources/fun-committee/groomsmen/Tiberiu.png`,
      name: "Tiberiu"
    }
  ];

  const bridesmaids = [
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/resources/fun-committee/bridesmaids/Raluca.png`,
      name: "Raluca"
    },
    {
      id: 2,
      image: `${process.env.PUBLIC_URL}/resources/fun-committee/bridesmaids/Andreea.png`,
      name: "Andreea"
    },
    {
      id: 3,
      image: `${process.env.PUBLIC_URL}/resources/fun-committee/bridesmaids/Andra.png`,
      name: "Andra"
    },
    {
      id: 4,
      image: `${process.env.PUBLIC_URL}/resources/fun-committee/bridesmaids/Bianca.png`,
      name: "Bianca"
    },
    {
      id: 5,
      image: `${process.env.PUBLIC_URL}/resources/fun-committee/bridesmaids/Raluca-2.png`,
      name: "Raluca"
    },
    {
      id: 6,
      image: `${process.env.PUBLIC_URL}/resources/fun-committee/bridesmaids/Andra-2.png`,
      name: "Andra"
    }
  ];

  const handleMouseEnter = (personId, personType) => {
    setHoveredPerson({ id: personId, type: personType });
  };

  const handleMouseLeave = () => {
    setHoveredPerson(null);
  };

  return (
    <section className="fun-committee-section">
      <div className="fun-committee-container">
        {/* Floral accents - desktop only */}
        <div 
          className="floral-accent-top-left"
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/resources/landing/flower.png)` }}
        ></div>
        <div 
          className="floral-accent-right"
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/resources/landing/flower.png)` }}
        ></div>
        
        <h2 className="section-title">{t('funCommittee.title')}</h2>

        <div className="committee-row">
          <h3 className="row-title">{t('funCommittee.nasi')}</h3>
          <div className="committee-images">
            {nasi.map((person) => (
              <div
                key={person.id}
                className="committee-member"
                onMouseEnter={() => handleMouseEnter(person.id, 'nasi')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="image-container">
                  <img src={person.image} alt={person.name} className="committee-image" />
                </div>
                {hoveredPerson && hoveredPerson.id === person.id && hoveredPerson.type === 'nasi' && (
                  <div className="person-tooltip">{person.name}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="committee-row">
          <h3 className="row-title">{t('funCommittee.groomsmen')}</h3>
          <div className="committee-images">
            {groomsmen.map((person) => (
              <div
                key={person.id}
                className="committee-member"
                onMouseEnter={() => handleMouseEnter(person.id, 'groomsmen')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="image-container">
                  <img src={person.image} alt={person.name} className="committee-image" />
                </div>
                {hoveredPerson && hoveredPerson.id === person.id && hoveredPerson.type === 'groomsmen' && (
                  <div className="person-tooltip">{person.name}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="committee-row">
          <h3 className="row-title">{t('funCommittee.bridesmaids')}</h3>
          <div className="committee-images">
            {bridesmaids.map((person) => (
              <div
                key={person.id}
                className="committee-member"
                onMouseEnter={() => handleMouseEnter(person.id, 'bridesmaids')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="image-container">
                  <img src={person.image} alt={person.name} className="committee-image" />
                </div>
                {hoveredPerson && hoveredPerson.id === person.id && hoveredPerson.type === 'bridesmaids' && (
                  <div className="person-tooltip">{person.name}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunCommittee;
