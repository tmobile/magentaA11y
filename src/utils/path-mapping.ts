/**
 * Path Mapping
 *
 * This file handles URL redirections for legacy paths in the MagentaA11y app.
 *
 * HOW TO ADD A NEW REDIRECT:
 *
 * Simply add a new entry to the explicitPathMappings object below:
 * "/your-old-path": "/your-new-path"
 *
 * Examples:
 * "/web": "/web-criteria/component/overview" - redirects /web to /web-criteria/component/overview
 *
 * After adding your redirect entry, no further code changes are needed - it will work automatically!
 */

type PathMap = {
  [oldPath: string]: string;
};

// TODO - add a lot more mappings
export const explicitPathMappings: PathMap = {
  "/web": "/web-criteria/component/overview",
  "/native": "/native-criteria/controls/overview",
  "/checklist-web/header": "/web-criteria/page-level/header-landmark",
  "/checklist-web/footer": "/web-criteria/page-level/footer-landmark",
  "/checklist-web/form": "/web-criteria/page-level/form",
  "/checklist-web/main": "/web-criteria/page-level/main-landmark",
  "/checklist-web/single-page-application": "/web-criteria/page-level/single-page-application",
  "/checklist-web/skip-link": "/web-criteria/page-level/skip-link",
  "/checklist-web/nav": "/web-criteria/page-level/navigation-landmark",
  "/checklist-web/html": "/web-criteria/page-level/basic-web-page",
  "/checklist-web/alert": "/web-criteria/component/alert-notification",
  "/checklist-web/animation": "/web-criteria/component/animation",
  "/checklist-web/listbox-autocomplete": "/web-criteria/component/autocomplete",
  "/checklist-web/breadcrumbs": "/web-criteria/component/breadcrumbs",
  "/checklist-web/button": "/web-criteria/component/button",
  "/checklist-web/carousel": "/web-criteria/component/carousel-slideshow",
  "/checklist-web/checkbox": "/web-criteria/component/checkbox",
  "/checklist-web/date-picker": "/web-criteria/component/date-picker",
  "/checklist-web/image-decorative": "/web-criteria/component/decorative-image",
  "/checklist-web/expander": "/web-criteria/component/expander-accordion",
  "/checklist-web/figure": "/web-criteria/component/figure",
  "/checklist-native/button": "/native-criteria/controls/button",
};

export function getRedirectPath(path: string): string | null {
  const normalizedPath = path.replace(/\/$/, "");

  if (explicitPathMappings[normalizedPath]) {
    return explicitPathMappings[normalizedPath];
  }

  return null;
}
