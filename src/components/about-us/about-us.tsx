import React from "react";
import "./about.scss";

const AboutUs: React.FC = () => {
  return (
    <div className="MagentaA11y-about">
      <div className="MagentaA11y-about__hero-container">
        <h1 className="MagentaA11y-about__title MagentaA11y--color">
          We Are <span className="MagentaA11y-about__title-highlight">MagentaA11y</span>
        </h1>
        <p className="MagentaA11y-about__tagline">Some catchy tagline for ARC</p>

        <img src="https://placehold.co/800x400" alt="placeholder" className="MagentaA11y-about__hero-image" />

        <p className="MagentaA11y-about__description">
          The <span>Accessibility Resource Center at T&#8209;Mobile</span> brings
          universal design and accessibility (a11y) to all aspects of
          T&#8209;Mobile digital products.
        </p>
      </div>
      <div className="MagentaA11y-about__info-section">
        <div className="MagentaA11y-about__info-container">
          <div className="MagentaA11y-about__info-item">
            <h2 className="MagentaA11y-about__info-title">Who we are</h2>
            <p className="MagentaA11y-about__info-text">
              We're a small multi-talented team of Accessibility Coaches at
              T-Mobile,...
            </p>
          </div>
          <div className="MagentaA11y-about__info-item">
            <h2 className="MagentaA11y-about__info-title">What we do</h2>
            <p className="MagentaA11y-about__info-text">
              From products and services to physical spaces and policies, we are
              driving a culture shift that is making accessibilty part of
              T-Mobile's DNA.
            </p>
          </div>
        </div>
      </div>
      <div className="MagentaA11y-about__contact-section">
        <h2 className="MagentaA11y-about__contact-title">Contact Us</h2>
        <p className="MagentaA11y-about__contact-message">Here will be a nice contact us message.</p>
        <a href="mailto:magentaa11y@t-mobile.com" className="MagentaA11y-about__contact-email">magentaa11y@t-mobile.com</a>
      </div>
    </div>
  );
};

export default AboutUs;
