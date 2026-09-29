import React from 'react';
import gaadAwardLogo from '../../../assets/awards/gaad-award.webp';
import helenKellerAwardLogo from '../../../assets/awards/helen-keller-award.png';
import './awards.scss';

interface Award {
  title: string;
  year?: string;
  description?: string;
  imageAlt: string;
  imageSrc: string;
  link: string;
  linkLabel: string;
}

const awardsContent: Award[] = [
  {
    title: 'GAADY Award',
    year: '2025',
    description: 'Recognized by Global Accessibility Awareness Day (GAAD) for outstanding contribution to accessibility.',
    imageAlt: 'View the GAADY 2025 winners',
    imageSrc: gaadAwardLogo,
    link: 'https://gaad.foundation/what-we-do/gaadys/winners',
    linkLabel: 'GAADY 2025 Winners',
  },
  {
    title: 'Helen Keller Achievement Award',
    year: '2026',
    description: 'Awarded by the American Foundation for the Blind (AFB) for advancing accessibility.',
    imageAlt: 'View the AFB 2026 Helen Keller Achievement Awardees announcement',
    imageSrc: helenKellerAwardLogo,
    link: 'https://afb.org/news-publications/press-room/press-release-archive/press-release-2026/afb-celebrates-2026-hkaa-awardees',
    linkLabel: '2026 HKAA Announcement',
  },
];

const Awards: React.FC = () => {
  return (
    <ul className="MagentaA11y__awards">
      {awardsContent.map((award) => (
        <li key={award.title} className="MagentaA11y__awards__item">
          <a
            className="MagentaA11y__awards__link"
            href={award.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="MagentaA11y__awards__image-wrapper">
              <img
                className="MagentaA11y__awards__image"
                src={award.imageSrc}
                alt={award.imageAlt}
              />
            </span>
          </a>
          <h3 className="MagentaA11y__awards__title">
            {award.title}{award.year && ` (${award.year})`}
          </h3>
          {award.description && (
            <p className="MagentaA11y__awards__description">{award.description}</p>
          )}
          <a
            className="MagentaA11y__awards__text-link"
            href={award.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {award.linkLabel}
            <svg
              className="Magenta-icon"
              aria-label=" - opens in a new tab"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              role="img"
              focusable="false">
              <path d="M3.5 20.5V3.5H11.6153V4.99998H4.99997V19H19V12.3846H20.5V20.5H3.5ZM9.7192 15.3346L8.66538 14.2808L17.9461 4.99998H14V3.5H20.5V9.99998H19V6.0538L9.7192 15.3346Z"></path>
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Awards;
