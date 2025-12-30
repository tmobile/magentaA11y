import React from 'react';
// import TmoLogo from '../../assets/svgs/t-digit-logo.svg';
import Cards from "../custom-components/cards/cards";
import './home.scss';

const cardContent = [
  {
    "title": "Web accessibility criteria",
    "description": "Choose components to define your accessibility success criteria",
    "link": "/web-criteria/component/overview"
  },
  {
    "title": "Native accessibility criteria",
    "description": "Choose components to define your accessibility success criteria",
    "link": "/native-criteria/controls/overview"
  },
  {
    "title": "How to test components",
    "description": "Learn how to test for accessibility",
    "link": "/how-to-test-criteria/test-type/overview"
  },
  {
    "title": "Start adding criteria",
    "description": "Check out your saved criteria and copy them all together at the same time",
    "link": "/my-criteria"
  }
]

const Home: React.FC = () => {
  return (
    <div className="MagentaA11y--home-page">
      <div className="MagentaA11y--home-page__header">
        <div className="MagentaA11y--home-page__header--wrapper">
          <h1 className="MagentaA11y--home-page__header--title">
            MagentaA11y
          </h1>
          <p className='MagentaA11y--home-page__header--subtitle'>An innovative open-source tool empowering product teams to master the craft of creating accessible digital experiences for all.</p>
        </div>
      </div>
      <div className="MagentaA11y--home-page__content MagentaA11y--home-page__content--beige">
        <div className="MagentaA11y--home-page__text--wrapper">
          <h2 className="MagentaA11y--home-page__content--header text-center ">Get Started</h2>
          <p className="MagentaA11y--home-page__content--description">Choose your tech stack and component to instantly receive tailored accessibility criteria - complete with code samples, testing steps, and practical guidance. Whether you're writing user stories, coding, or auditing, MagentaA11y equips you with the clarity and confidence to build accessible experiences from the start.</p>
        </div>
        <Cards items={cardContent} />
      </div>
      {/* <div className="MagentaA11y--home-page__content MagentaA11y--home-page__content--white">
        <div className='text-center'>
          <h2 className="MagentaA11y--home-page__content--header">ARC Summit 2025</h2>
          <p>Starts May 1, 2025.</p>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
