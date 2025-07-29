import React from "react";
import "../../about.scss";

const AboutUs: React.FC = () => {
  return (
    <div className="MagentaA11y--about-container-wrapper">
      <div className="MagentaA11y--hero-container">
        <h1 className="MagentaA11y--home-page__header--title MagentaA11y--color">
          We Are <span>MagentaA11y</span>
        </h1>
        <p>Some catchy tagline for ARC</p>

        <img src="https://placehold.co/800x400" alt="placeholder" />

        <p>
          The <b>Accessibility Resource Center at T&#8209;Mobile</b> brings
          universal design and accessibility (a11y) to all aspects of
          T&#8209;Mobile digital products.
        </p>
      </div>
      <div className="MagentaA11y--about-container">
        <div>
          <div>
            <h2>Who we are</h2>
            <p>
              We're a small multi-talented team of Accessibility Coaches at
              T-Mobile,...
            </p>
          </div>
          <div>
            <h2>What we do</h2>
            <p>
              From products and services to physical spaces and policies, we are
              driving a culture shift that is making accessibilty part of
              T-Mobile's DNA.
            </p>
          </div>
        </div>
      </div>
      <div className="MagentaA11y--contact-container">
        <h3>Contact Us</h3>
        <p>Here will be a nice contact us message.</p>
        <a href="mailto:arc-team@T-Mobile.com">arc-team@T-Mobile.com</a>
      </div>
    </div>
  );
};

export default AboutUs;
