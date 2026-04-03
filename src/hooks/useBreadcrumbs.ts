import { SideNavItem } from 'components/navigation/nav.types';
import { getFirstOverviewLink } from 'components/navigation/top-nav/top-nav';
import { useLocation } from 'react-router-dom';
import { DocumentationCategory } from 'shared/types/shared-types';
import { findItemByPath } from 'utils/navigation-helpers';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

const SECTION_LABELS: Record<DocumentationCategory, string> = {
  [DocumentationCategory.WEB]: 'Web Criteria',
  [DocumentationCategory.NATIVE]: 'Native App Criteria',
  [DocumentationCategory.HOW_TO_TEST]: 'How to Test',
};

export const useBreadcrumbs = (
  documentation: DocumentationCategory,
  items: SideNavItem[]
): BreadcrumbItem[] => {
  const location = useLocation();
  const { pathname } = location;

  // pathname: /web-criteria/component/alert-notification
  // segments: ["web-criteria", "component", "alert-notification"]
  const segments = pathname.split('/').filter(Boolean);

  // Need at least /{doc}-criteria/{category}/...
  if (segments.length < 2) return [];

  const categorySegment = segments[1]; // e.g. "component"
  const isOverview = segments[2] === 'overview' || segments.length === 2;
  const isItemPage = segments.length >= 3 && segments[2] !== 'overview';

  // Resolve category label from content.json
  const categoryItem = items.find((item) => item.name === categorySegment);
  if (!categoryItem) return [];

  const basePath = `/${documentation}-criteria`;
  const categoryHref = `${basePath}/${categorySegment}/overview`;
  const sectionHref = getFirstOverviewLink(documentation);

  const crumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    {
      label: SECTION_LABELS[documentation],
      href: sectionHref === categoryHref ? undefined : sectionHref,
    },
  ];

  if (isItemPage) {
    // Add category crumb with link
    crumbs.push({
      label: categoryItem.label,
      href: `${basePath}/${categorySegment}/overview`,
    });

    // Add current item crumb (no link)
    const currentItem = findItemByPath(items, pathname, basePath);
    if (!currentItem) return [];
    crumbs.push({ label: currentItem.label, href: undefined });
  } else if (isOverview) {
    // Category is the current page — no link
    crumbs.push({ label: categoryItem.label, href: undefined });
  }

  return crumbs;
};
