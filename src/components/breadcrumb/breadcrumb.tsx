import React from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbItem } from 'hooks/useBreadcrumbs';
import './breadcrumb.scss';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="MagentaA11y__breadcrumb">
      <ol className="MagentaA11y__breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={item.label}
              className="MagentaA11y__breadcrumb__item"
              {...(isLast ? { 'aria-current': 'page' } : {})}>
              {item.href && !isLast ? (
                <Link to={item.href} className="MagentaA11y__breadcrumb__link">
                  {item.label}
                </Link>
              ) : (
                <span className="MagentaA11y__breadcrumb__item">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
