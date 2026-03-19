import { renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import contentData from 'shared/content.json';
import { DocumentationCategory } from 'shared/types/shared-types';
import { SideNavItem } from 'components/navigation/nav.types';
import { useBreadcrumbs } from './useBreadcrumbs';

const wrapper =
  (path: string) =>
  ({ children }: { children: React.ReactNode }) =>
    React.createElement(
      MemoryRouter,
      { initialEntries: [path], future: { v7_relativeSplatPath: true, v7_startTransition: true } },
      children
    );

const webItems = contentData[DocumentationCategory.WEB] as SideNavItem[];
const nativeItems = contentData[DocumentationCategory.NATIVE] as SideNavItem[];
const howToTestItems = contentData[DocumentationCategory.HOW_TO_TEST] as SideNavItem[];

describe('useBreadcrumbs', () => {
  describe('web criteria - item page', () => {
    it('returns Home, section, category, and current item', () => {
      const { result } = renderHook(
        () => useBreadcrumbs(DocumentationCategory.WEB, webItems),
        { wrapper: wrapper('/web-criteria/component/alert-notification') }
      );

      expect(result.current).toHaveLength(4);
      expect(result.current[0]).toEqual({ label: 'Home', href: '/' });
      expect(result.current[1]).toMatchObject({ label: 'Web Criteria' });
      expect(result.current[1].href).toBeTruthy();
      expect(result.current[2]).toEqual({
        label: 'Component',
        href: '/web-criteria/component/overview',
      });
      expect(result.current[3]).toEqual({ label: 'Alert Notification', href: undefined });
    });
  });

  describe('web criteria - category overview page', () => {
    it('returns Home, section, and current category', () => {
      const { result } = renderHook(
        () => useBreadcrumbs(DocumentationCategory.WEB, webItems),
        { wrapper: wrapper('/web-criteria/component/overview') }
      );

      expect(result.current).toHaveLength(3);
      expect(result.current[0]).toEqual({ label: 'Home', href: '/' });
      expect(result.current[1]).toMatchObject({ label: 'Web Criteria' });
      expect(result.current[2]).toEqual({ label: 'Component', href: undefined });
    });
  });

  describe('native criteria - item page', () => {
    it('uses correct section label', () => {
      const { result } = renderHook(
        () => useBreadcrumbs(DocumentationCategory.NATIVE, nativeItems),
        { wrapper: wrapper('/native-criteria/controls/button') }
      );

      const sectionCrumb = result.current[1];
      expect(sectionCrumb.label).toBe('Native App Criteria');
    });
  });

  describe('how-to-test criteria', () => {
    it('uses correct section label', () => {
      const { result } = renderHook(
        () => useBreadcrumbs(DocumentationCategory.HOW_TO_TEST, howToTestItems),
        { wrapper: wrapper('/how-to-test-criteria/test-type/color-contrast') }
      );

      const sectionCrumb = result.current[1];
      expect(sectionCrumb.label).toBe('How to Test');
    });
  });

  describe('unknown route', () => {
    it('returns empty array when no item is found', () => {
      const { result } = renderHook(
        () => useBreadcrumbs(DocumentationCategory.WEB, webItems),
        { wrapper: wrapper('/web-criteria') }
      );

      expect(result.current).toHaveLength(0);
    });
  });
});
