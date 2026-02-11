import React from 'react';
import { Link } from 'react-router-dom';
import { MarkdownLinkProps } from './markdown-link.types';

/**
 * Checks if a URL is an internal anchor link (starts with #).
 */
const isInternalAnchor = (href: string): boolean => href.startsWith('#');

/**
 * Checks if a URL is external to the current origin.
 */
const isExternalUrl = (href: string): boolean => {
  try {
    const url = new URL(href, window.location.href);
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
};

/**
 * Handles clicks on internal anchor links by scrolling to and focusing the target element.
 */
const handleInternalAnchorClick = (e: React.MouseEvent, href: string) => {
  e.preventDefault();
  const targetId = href.substring(1);
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.focus();
  }
};

/**
 * Component for rendering links within markdown content.
 * Handles:
 * 1. Function-mapped links (via data-fn)
 * 2. Internal anchor links (#anchor)
 * 3. External links (opens in new tab with icon)
 * 4. Internal route links (via react-router-dom)
 */
export const MarkdownLink: React.FC<MarkdownLinkProps> = ({
  href,
  children,
  markdownFunctionMap,
  'data-fn': fnKey,
  'data-event': eventType = 'onClick',
  ...props
}) => {
  const handler = fnKey && markdownFunctionMap[fnKey];

  // Case 1: Function-mapped link
  if (fnKey && handler) {
    const eventProps = {
      onClick: eventType === 'onClick' ? (e: React.MouseEvent) => { e.preventDefault(); handler(e); } : undefined,
      onMouseDown: eventType === 'onMouseDown' ? (e: React.MouseEvent) => { e.preventDefault(); handler(e); } : undefined,
      onMouseUp: eventType === 'onMouseUp' ? (e: React.MouseEvent) => { e.preventDefault(); handler(e); } : undefined,
    };

    return <a {...props} {...eventProps}>{children}</a>;
  }

  // Fallback for missing href
  if (!href) {
    return <a {...props}>{children}</a>;
  }

  // Case 2: Internal anchor link
  if (isInternalAnchor(href)) {
    return (
      <a
        {...props}
        href={href}
        onClick={(e) => handleInternalAnchorClick(e, href)}
      >
        {children}
      </a>
    );
  }

  // Case 3: External link
  if (isExternalUrl(href)) {
    return (
      <a {...props} href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <svg
          className="Magenta-icon"
          aria-label=" - opens in a new tab"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          role="img"
          focusable="false">
          <path d="M3.5 20.5V3.5H11.6153V4.99998H4.99997V19H19V12.3846H20.5V20.5H3.5ZM9.7192 15.3346L8.66538 14.2808L17.9461 4.99998H14V3.5H20.5V9.99998H19V6.0538L9.7192 15.3346Z"></path>
        </svg>
      </a>
    );
  }

  // Case 4: Internal route link
  return <Link to={href}>{children}</Link>;
};
