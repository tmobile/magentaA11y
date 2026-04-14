import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import Breadcrumb from './breadcrumb';
import { BreadcrumbItem } from 'hooks/useBreadcrumbs';

/* eslint-disable testing-library/no-node-access */

const crumbs: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Web Criteria', href: '/web-criteria/component/overview' },
  { label: 'Page Level', href: '/web-criteria/page-level/overview' },
  { label: 'Basic Web Page', href: undefined },
];

const renderBreadcrumb = (items: BreadcrumbItem[]) =>
  render(
    <MemoryRouter>
      <Breadcrumb items={items} />
    </MemoryRouter>
  );

describe('Breadcrumb', () => {
  it('renders a nav landmark with aria-label="Breadcrumb"', () => {
    renderBreadcrumb(crumbs);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('renders an ordered list', () => {
    renderBreadcrumb(crumbs);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders all crumb labels', () => {
    renderBreadcrumb(crumbs);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Web Criteria')).toBeInTheDocument();
    expect(screen.getByText('Page Level')).toBeInTheDocument();
    expect(screen.getByText('Basic Web Page')).toBeInTheDocument();
  });

  it('renders links for all crumbs with href', () => {
    renderBreadcrumb(crumbs);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Web Criteria' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Page Level' })).toBeInTheDocument();
  });

  it('does not render a link for the last (current) crumb', () => {
    renderBreadcrumb(crumbs);
    expect(screen.queryByRole('link', { name: 'Basic Web Page' })).not.toBeInTheDocument();
  });

  it('marks the last crumb with aria-current="page"', () => {
    renderBreadcrumb(crumbs);
    const currentCrumb = screen.getByText('Basic Web Page').closest('li');
    expect(currentCrumb).toHaveAttribute('aria-current', 'page');
  });

  it('renders nothing when items array is empty', () => {
    const { container } = renderBreadcrumb([]);
    expect(container.firstChild).toBeNull();
  });

  it('does not mark non-last crumbs with aria-current', () => {
    renderBreadcrumb(crumbs);
    const homeItem = screen.getByText('Home').closest('li');
    expect(homeItem).not.toHaveAttribute('aria-current');
  });
});

/* eslint-enable testing-library/no-node-access */
