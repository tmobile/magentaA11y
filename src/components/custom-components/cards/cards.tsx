/* eslint-disable jsx-a11y/no-redundant-roles */
import React from 'react';
import { NavLink } from 'react-router-dom';
import './cards.scss';

interface Card {
  title: string;
  description?: string;
  link: string;
}

interface CardsProps {
  items: Card[];
}

const Cards: React.FC<CardsProps> = ({ items }) => {
  return (
    <ul className="MagentaA11y__card" role="list">
      {items.map((item) => (
        <li key={item.link} className="MagentaA11y__card__item" role="listitem">
          <NavLink to={item.link} className="MagentaA11y__card__link">
            <h2 className="MagentaA11y__card__title">{item.title}</h2>
            {item.description && (
              <span className="MagentaA11y__card__description">
                {item.description}
              </span>
            )}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 19.6155L10.9308 18.5616L16.7424 12.7501H4.38465V11.2501H16.7424L10.9308 5.43859L12 4.38477L19.6154 12.0001L12 19.6155Z"
                fill="#121212"
              />
            </svg>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Cards;
