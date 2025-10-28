import React from "react";
import "./about.scss";
import TeamImage from '../../assets/arc-team-2024.jpeg';

function AboutUs() {
  return (
    <div className="MagentaA11y-about">
      <div className="MagentaA11y-about__hero-container">
        <h1 className="MagentaA11y-about__highlight">
          We Are <span className="MagentaA11y-about__title-highlight">MagentaA11y</span>
        </h1>
        <h2 className="MagentaA11y-about__tagline">Unlock the Power of Accessibility.</h2>

        <img src={TeamImage} alt="Accessibility Resource Center (ARC) team stands together as 13 people on the concrete stairs outside the Bellevue, WA T-Mobile headquarters. They are all wearing shirts that say 'the future is accessible'" className="MagentaA11y-about__hero-image" />

        <p className="MagentaA11y-about__description">
          The <span>Accessibility Resource Center at T-Mobile</span> brings universal design and accessibility (a11y) to all aspects of T-Mobile digital products.
        </p>
      </div>
      <div className="MagentaA11y-about__info-section">
        <div className="MagentaA11y-about__info-container">
          <div className="MagentaA11y-about__info-item">
            <h2 className="MagentaA11y-about__info-title">Who we are</h2>
            <p className="MagentaA11y-about__info-text">
              We are a passionate, multi-disciplinary team of accessibility professionals with deep expertise in universal design, inclusive development, and digital equity. Our mission is to empower teams across T-Mobile and beyond to create accessible solutions that work for everyone, helping remove barriers and opening opportunities through technology.
            </p>
          </div>
          <div className="MagentaA11y-about__info-item">
            <h2 className="MagentaA11y-about__info-title">Why Magenta A11y</h2>
            <p className="MagentaA11y-about__info-text">
              We created MagentaA11y as a way to scale our digital accessibility program and bridge the gap between WCAG standards and everyday product development. This open-source toolkit makes it easier for teams to embed accessibility into their workflows by translating complex guidelines into clear, testable criteria that can be added directly in development. With practical resources like real-world code examples, testing instructions, developer notes, and instructional videos, MagentaA11y empowers teams to deliver accessible experiences with speed, confidence, and consistency.
            </p>
            <p>Today, MagentaA11y is being used by thousands of product teams around the world and embraced by non-profits and accessibility advocates as a powerful, practical resource for creating inclusive digital experiences from the start. Together, we are building a digitally accessible future for all.</p>
          </div>
        </div>
      </div>
      <div className="MagentaA11y-about__contact-section">
        <h2 className="MagentaA11y-about__contribute-title">Contribute:</h2>
        <p className="MagentaA11y-about__contribute-message">As an open source tool, we encourage everyone to participate in contributing to MagentaA11y. Whether you're a content designer, product manager, developer, or anyone passionate about accessibility, your contributions can make a difference. You can contribute to <a href={"https://github.com/tmobile/magentaA11y"}>MagentaA11y on GitHub</a>.</p>
        <h3 className="MagentaA11y-about__contact-title">Get in touch with us!</h3>
        <p>If you have any questions or comments about MagentaA11y, you can reach us at <a href="mailto:magentaa11y@t-mobile.com" className="MagentaA11y-about__contact-email">magentaa11y@t-mobile.com</a>.</p>
      </div>
    </div>
  );
}

export default AboutUs;
