import React from 'react';
// import TmoLogo from '../../assets/svgs/t-digit-logo.svg';
import Cards from "../custom-components/cards/cards";
import Awards from "../custom-components/awards/awards";
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
      <div className="MagentaA11y--home-page__content MagentaA11y--home-page__content--white">
        <div className="MagentaA11y--home-page__text--wrapper">
          <h2 className="MagentaA11y--home-page__content--header text-center">AI Enablement Tools</h2>
          <p className="MagentaA11y--home-page__content--description">We're bringing MagentaA11y's accessibility criteria straight into your AI workflow, starting with our Model Context Protocol (MCP) server. It connects coding agents and AI assistants directly to our testing criteria, right from your terminal or AI environment. We're actively building more AI enablement tools and will add them here as they go live.</p>
          <ul className="MagentaA11y--home-page__ai-tools-list">
            <li>
              <a href="https://www.npmjs.com/package/magentaa11y-mcp" target="_blank" rel="noopener noreferrer" className="MagentaA11y--home-page__content--external-link">
                magentaa11y-mcp
                <svg className="Magenta-icon" aria-label=" - opens in a new tab" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" focusable="false"><path d="M3.5 20.5V3.5H11.6153V4.99998H4.99997V19H19V12.3846H20.5V20.5H3.5ZM9.7192 15.3346L8.66538 14.2808L17.9461 4.99998H14V3.5H20.5V9.99998H19V6.0538L9.7192 15.3346Z"></path>
                </svg>
              </a> — MCP server that surfaces MagentaA11y's accessibility criteria for AI agents
            </li>
          </ul>
        </div>
      </div>
      <div className="MagentaA11y--home-page__content MagentaA11y--home-page__content--white">
        <div className="MagentaA11y--home-page__text--wrapper">
          <h2 className="MagentaA11y--home-page__content--header text-center">Awards</h2>
        </div>
        <Awards />
      </div>
    </div>
  );
};

export default Home;
