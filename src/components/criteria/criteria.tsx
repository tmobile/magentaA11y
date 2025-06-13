import SideNav from 'components/navigation/side-nav/side-nav';
import React, { useRef } from 'react';
import contentData from '../../shared/content.json';
import { DocumentationCategory } from '../../shared/types/shared-types';
import ContentDisplay from '../content-display/content-display';
import { SideNavItem } from '../navigation/nav.types';

import './criteria.scss';

interface CriteriaProps {
  documentation: DocumentationCategory;
}

const Criteria: React.FC<CriteriaProps> = ({ documentation }) => {
  const sideNavRef = useRef<{ showModal: () => void } | null>(null);

  // Function to toggle the side nav visibility
  const toggleSideNav = () => {
    sideNavRef.current?.showModal();
  };
  // Retrieve the appropriate content for the documentation
  const platformData = contentData[documentation] as SideNavItem[];

  return (
    <div className="MagentaA11y__criteria-container">
      <SideNav documentation={documentation} ref={sideNavRef} />

      {/* Main Content Section */}
      <div className="MagentaA11y__criteria-content">
        {/* Dynamically display ContentDisplay based on the current route */}
        <ContentDisplay
          documentation={documentation}
          items={platformData}
          onToggleSideNav={toggleSideNav}
        />
      </div>
    </div>
  );
};

export default Criteria;
