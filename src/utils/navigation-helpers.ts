import { SideNavItem } from 'components/navigation/nav.types';
import { Location } from 'react-router-dom';

/**
 * Checks if the given path is active based on the current location.
 *
 * @param path - The path to check.
 * @param location - The current location object.
 * @returns `true` if the path is active, otherwise `false`.
 */
export const isPathActive = (path: string, location: Location): boolean => {
  const isActive = location.pathname.includes(path);
  return isActive;
};

// Helper function to find the active item
export function findItemByPath(
  items: SideNavItem[],
  path: string,
  parentPath: string
): SideNavItem | null {
  for (const item of items) {
    const fullPath = `${parentPath}/${item.name}`;
    if (path === fullPath || path === `${fullPath}/overview`) return item;

    if (item.children) {
      const found = findItemByPath(item.children, path, fullPath);
      if (found) return found;
    }
  }
  return null;
}
