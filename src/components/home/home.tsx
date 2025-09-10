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
    "link": "/how-to-test-criteria/type/overview"
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
            <span>MagentaA11y</span>
            <span>T-Mobile's accessibility toolkit, empowering developers, designers, and testers to build for everyone.</span>
          </h1>
        </div>
      </div>
      <div className="MagentaA11y--home-page__content MagentaA11y--home-page__content--beige">
        <div className='text-center'>
          <h2 className="MagentaA11y--home-page__content--header">Get Started</h2>
          <p>Select the tech stack you’re working with, choose your component, and copy and paste accessibility criteria into your user stories. </p>
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
