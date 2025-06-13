import classNames from 'classnames';
import { ButtonSize } from 'components/custom-components/buttons/button-types';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Icons } from 'shared/Icons';
import { DocumentationCategory } from 'shared/types/shared-types';
import { isPathActive } from 'utils/navigation-helpers';
import contentData from '../../../shared/content.json';
import { useViewport } from '../../../shared/contexts/viewport-context';
import IconButton from '../../custom-components/buttons/icon-button/icon-button';
import { TopNavProps } from '../nav.types';

import './top-nav.scss';

export const getFirstOverviewLink = (documentation: DocumentationCategory) => {
  const items = contentData[documentation];
  for (const item of items) {
    if (item.children?.length) {
      return `/${documentation}-criteria/${item.name}/overview`;
    }
  }
  return `/${documentation}-criteria`;
};

const TopNav: React.FC<TopNavProps> = ({ navItems }) => {
  const viewportContext = useViewport();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const notificationCount = navItems.filter((item) => item.withBadge).length;

  const handleMenuClick = () => {
    setExpanded((expanded) => !expanded);
  };

  useEffect(() => {
    if (!viewportContext.isLargeTablet) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [viewportContext.isLargeTablet]);

  useEffect(() => {
    if (!viewportContext.isLargeTablet) return;

    const handleTabKey = (event: KeyboardEvent) => {
      if (!expanded) return;

      const focusableElements = navRef.current?.querySelectorAll<HTMLElement>(
        'a, button, input, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (
          !event.shiftKey &&
          document.activeElement === lastElement &&
          event.key === 'Tab'
        ) {
          setExpanded(false);
        } else if (
          event.shiftKey &&
          document.activeElement === firstElement &&
          event.key === 'Tab'
        ) {
          setExpanded(false);
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [expanded, viewportContext.isLargeTablet]);

  return (
    <div className="MagentaA11y__navbar" data-theme="dark" ref={navRef}>
      {/* Brand Section */}
      <div className="MagentaA11y__brand">
        <NavLink
          to="/home"
          className="MagentaA11y__brand--name"
          aria-label="Magenta A11y - Home">
          A11y
        </NavLink>
      </div>

      {viewportContext.isLargeTablet && (
        <IconButton
          a11yLabel={
            viewportContext.isLargeTablet && expanded
              ? 'Close'
              : `Menu${
                  notificationCount
                    ? `, ${notificationCount} criteria has been saved`
                    : ''
                }`
          }
          icon={expanded ? Icons.closeOutlined : Icons.menu}
          ariaExpanded={expanded}
          size={ButtonSize.small}
          ariaControls="main"
          onClick={handleMenuClick}
          hasBadge={!expanded && notificationCount > 0}
          badgeNumber={0}></IconButton>
      )}

      <nav className="MagentaA11y__navbar__nav" aria-label="main">
        <ul className="MagentaA11y__nav-items">
          {navItems.map((item, index) => {
            const href =
              item.label === 'Web Criteria'
                ? getFirstOverviewLink(DocumentationCategory.WEB)
                : item.label === 'Native App Criteria'
                ? getFirstOverviewLink(DocumentationCategory.NATIVE)
                : item.label === 'How to test'
                ? getFirstOverviewLink(DocumentationCategory.HOW_TO_TEST)
                : item.href;

            const isActive = isPathActive(item.href, location);

            return (
              <li key={index} className="MagentaA11y__nav-items--item">
                <NavLink
                  onClick={() => setExpanded(false)}
                  to={href}
                  className={classNames('MagentaA11y__nav-items--link', {
                    active: isActive,
                  })}
                  {...(item.ariaLabel && { 'aria-label': item.ariaLabel })}>
                  {item.icon && (
                    <span
                      data-count={item.withBadge ? item.withBadge : ''}
                      className={'MagentaA11y__nav-items--icon'}>
                      {item.icon}
                    </span>
                  )}
                  <span className="MagentaA11y__nav-items--label">
                    {item.label}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default TopNav;
