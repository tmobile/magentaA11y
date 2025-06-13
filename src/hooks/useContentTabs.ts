import { ContentTab } from 'components/content-display/markdown-content/markdown-content.types';
import { SideNavItem } from 'components/navigation/nav.types';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { DocumentationCategory } from 'shared/types/shared-types';
import { findItemByPath } from 'utils/navigation-helpers';

export const useContentTabs = (
  items: SideNavItem[],
  documentation: DocumentationCategory
) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  const currentItem = findItemByPath(
    items,
    location.pathname,
    `/${documentation}-criteria`
  );

  const tabs: ContentTab[] = useMemo(() => {
    if (!currentItem) return [];
    const {
      condensed,
      gherkin,
      criteria,
      videos,
      developerNotes,
      androidDeveloperNotes,
      iosDeveloperNotes,
    } = currentItem;

    return [
      { content: condensed ?? '', label: 'Condensed', tab: 'Condensed' },
      { content: gherkin ?? '', label: 'Gherkin', tab: 'Gherkin' },
      { content: criteria ?? '', label: 'Criteria', tab: 'Criteria' },
      {
        content: developerNotes ?? '',
        label: 'Developer Notes',
        tab: 'Developer Notes',
      },
      {
        content: androidDeveloperNotes ?? '',
        label: 'Android Developer Notes',
        tab: 'Android Developer Notes',
      },
      {
        content: iosDeveloperNotes ?? '',
        label: 'iOS Developer Notes',
        tab: 'iOS Developer Notes',
      },
      { content: videos ?? '', label: 'Videos', tab: 'Videos' },
    ].filter((tab) => tab.content.trim() !== '');
  }, [currentItem]);

  useEffect(() => {
    if (!tabs.length) return;
    const tabFromURL = searchParams.get('tab');
    if (tabFromURL) {
      const tabIndex = parseInt(tabFromURL, 10);
      if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex < tabs.length) {
        setActiveTab(tabIndex);
      }
    } else {
      setActiveTab(0);
    }
  }, [searchParams, tabs.length]);

  return { tabs, activeTab, setActiveTab, currentItem };
};
