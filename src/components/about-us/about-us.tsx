import React from "react";
import "../../about.scss";

const AboutUs: React.FC = () => {
  return (
    <div className="MagentaA11y--hero-container-wrapper">
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
    </div>
  );
};

export default AboutUs;
