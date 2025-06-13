import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
  }, [location]);
};
