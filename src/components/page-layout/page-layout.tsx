import AppRoutes from 'components/navigation/app-routes/app-routes';
import Divider from 'components/custom-components/divider/divider';
import {
  DividerModifiers,
  OrientationEnum,
} from 'components/custom-components/divider/divider.types';
import Footer from 'components/navigation/footer/footer';
import { NavItem } from 'components/navigation/nav.types';
import TopNav from 'components/navigation/top-nav/top-nav';
import SkipLink from 'components/skip-link/SkipLink';
import { usePageTitle } from 'hooks/usePageTitle';
import { useRef } from 'react';
import { useCriteria } from 'shared/contexts/criteria-context';
import { ReactComponent as BookmarkIconOutlined } from '../../assets/svgs/bookmark-outlined.svg';

const PageLayout: React.FC = () => {
  const { savedCriteria } = useCriteria();
  const savedCriteriaCount = savedCriteria.length;
  const mainContentRef = useRef<HTMLDivElement | null>(null);

  const badgeString = savedCriteriaCount
    ? savedCriteriaCount > 99
      ? '99+'
      : `${savedCriteriaCount}`
    : '';

  const navItems: NavItem[] = [
    { label: 'Web Criteria', href: '/web-criteria' },
    { label: 'Native App Criteria', href: '/native-criteria' },
    { label: 'How to test', href: '/how-to-test' },
    { label: 'About us', href: '/about-us' },
    {
      label: 'My criteria',
      href: '/my-criteria',
      icon: <BookmarkIconOutlined />,
      withBadge: badgeString,
      ariaLabel: badgeString ? `My Criteria, ${badgeString} criteria has been saved` : '',
    },
  ];

  usePageTitle();

  return (
    <div className="MagentaA11y">
      <header className="MagentaA11y-header">
        <SkipLink mainContentRef={mainContentRef} />
        <TopNav navItems={navItems} />
      </header>
      <main className="MagentaA11y--content" ref={mainContentRef} tabIndex={-1} id="main-content">
        <AppRoutes />
      </main>
      <Divider orientation={OrientationEnum.HORIZONTAL} className={DividerModifiers.STRONG} />
      <Footer />
    </div>
  );
};

export default PageLayout;
