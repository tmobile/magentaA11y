/* eslint-disable jsx-a11y/no-redundant-roles */
import Divider from 'components/custom-components/divider/divider';
import { OrientationEnum } from 'components/custom-components/divider/divider.types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import contentData from 'shared/content.json';
import { DocumentationCategory } from 'shared/types/shared-types';

import './footer.scss';

const Footer: React.FC = () => {
  return (
    <footer tabIndex={-1} className="MagentaA11y--footer">
      {Object.entries(contentData).map(([category, items]) => (
        <div key={category} className="MagentaA11y--footer__nav-list">
          <h2>
            {category
              .replace(/-/g, ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase())}{' '}
            {category === DocumentationCategory.HOW_TO_TEST ? '' : 'Criteria'}
          </h2>
          <Divider orientation={OrientationEnum.HORIZONTAL} />
          <ul role="list">
            {items.map((item) => (
              <li key={item.name} role="listitem">
                <NavLink to={`${category}-criteria/${item.name}/overview`}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="MagentaA11y--footer__nav-list">
        <h2>About Us</h2>
        <Divider orientation={OrientationEnum.HORIZONTAL} />
        <ul role="list">
          <li role="listitem">
            <NavLink to={`/about`}>Contact Us</NavLink>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
