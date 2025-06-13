import { ReactNode } from 'react';

export interface NavItem {
  label: string;
  href: string;
  icon?: ReactNode;
  ariaLabel?: string;
  withBadge?: string;
}

export interface TopNavProps {
  navItems: NavItem[];
}

export interface SideNavItem {
  label: string;
  name: string;
  type?: 'file';
  children?: SideNavItem[];
  generalNotes?: string | null;
  gherkin?: string | null;
  condensed?: string | null;
  criteria?: string | null;
  videos?: string | null;
  developerNotes?: string | null;
  androidDeveloperNotes?: string | null;
  iosDeveloperNotes?: string | null;
}
