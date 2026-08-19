import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Must match public/CNAME exactly, including the www subdomain. A mismatch
// here recreates the duplicate-hostname problem the canonical tag prevents.
const SITE_ORIGIN = 'https://www.magentaa11y.com';

export const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    let pathSegments = location.pathname.split('/').filter(Boolean);
    let pageTitle = '';
    let category = '';

    if (pathSegments.length > 0) {
      let lastSegment = pathSegments[pathSegments.length - 1];

      if (lastSegment.toLowerCase() === 'overview' && pathSegments.length > 1) {
        lastSegment = pathSegments[pathSegments.length - 2];
      }

      let formattedLastSegment = lastSegment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

      if (pathSegments.includes('web-criteria')) {
        category = 'Web Criteria';
      } else if (pathSegments.includes('native-criteria')) {
        category = 'Native App Criteria';
      }

      pageTitle = category
        ? `${category} - ${formattedLastSegment}`
        : formattedLastSegment;
    } else {
      pageTitle = 'Home';
    }

    document.title = `${pageTitle} | Magentaa11y`;

    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', pageTitle);
    }

    // Canonical URL for the current route.
    // pathname only: the query string is deliberately excluded, because
    // ?tab=1 is a view of the same page rather than a separate page. Including
    // it would signal that every tab is its own page and split the ranking.
    const canonicalHref = SITE_ORIGIN + location.pathname;

    let canonicalLink = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );

    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute('href', canonicalHref);

    // Keep og:url in step with the page being viewed
    const ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta) {
      ogUrlMeta.setAttribute('content', canonicalHref);
    }
  }, [location]);
};
