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
  "/demos/basic-accessible-webpage/": "/basic-accessible-webpage",
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
  "/checklist-web/footnote": "/web-criteria/component/footnote",
  "/checklist-web/heading": "/web-criteria/component/heading",
  "/checklist-web/hint-help-error": "/web-criteria/component/help-hint-error",
  "/checklist-web/iframe": "/web-criteria/component/iframe",
  "/checklist-web/image": "/web-criteria/component/informative-image",
  "/checklist-web/link": "/web-criteria/component/link",
  "/checklist-web/list": "/web-criteria/component/list",
  "/checklist-web/modal-dialog": "/web-criteria/component/modal-dialog",
  "/checklist-web/number-input": "/web-criteria/component/number-input",
  "/checklist-web/pagination": "/web-criteria/component/pagination-nav",
  "/checklist-web/password-input": "/web-criteria/component/password-input",
  "/checklist-web/progress": "/web-criteria/component/progress-indicator",
  "/checklist-web/radio": "/web-criteria/component/radio-button",
  "/checklist-web/range-slider": "/web-criteria/component/range-slider",
  "/checklist-web/scrolling-container": "/web-criteria/component/scrolling-container",
  "/checklist-web/search": "/web-criteria/component/search",
  "/checklist-web/select": "/web-criteria/component/select-dropdown",
  "/checklist-web/separator": "/web-criteria/component/separator-horizontal-rule",
  "/checklist-web/star-rating": "/web-criteria/component/star-rating",
  "/checklist-web/stepper-input": "/web-criteria/component/stepper-input",
  "/checklist-web/sticky-content": "/web-criteria/component/sticky-element",
  "/checklist-web/strikethrough": "/web-criteria/component/strikethrough-content",
  "/checklist-web/tab-panel": "/web-criteria/component/tabs",
  "/checklist-web/table": "/web-criteria/component/table",
  "/checklist-web/text-input": "/web-criteria/component/text-input",
  "/checklist-web/textarea": "/web-criteria/component/textarea-multiline-input",
  "/checklist-web/tidbit": "/web-criteria/component/tidbit",
  "/checklist-web/toast-snackbar": "/web-criteria/component/toast-snackbar",
  "/checklist-web/toggle-switch": "/web-criteria/component/toggle-switch",
  "/checklist-web/tooltip": "/web-criteria/component/tooltip",
  "/checklist-web/video-audio": "/web-criteria/component/video-audio-player",
  "/checklist-native/button": "/native-criteria/controls/button",
  "/checklist-native/calendar-date-picker": "/native-criteria/controls/calendar-date-picker",
  "/checklist-native/captcha": "/native-criteria/controls/captcha",
  "/checklist-native/carousel": "/native-criteria/controls/carousel",
  "/checklist-native/checkbox": "/native-criteria/controls/checkbox",
  "/checklist-native/chip": "/native-criteria/controls/chip",
  "/checklist-native/date-time-picker": "/native-criteria/controls/date-time-picker",
  "/checklist-native/dropdown": "/native-criteria/controls/dropdown",
  "/checklist-native/expandable": "/native-criteria/controls/expandable",
  "/checklist-native/link": "/native-criteria/controls/link",
  "/checklist-native/menu": "/native-criteria/controls/menu",
  "/checklist-native/pagination-control": "/native-criteria/controls/pagination-control",
  "/checklist-native/progress-indicator": "/native-criteria/controls/progress-indicator",
  "/checklist-native/radio": "/native-criteria/controls/radio-button",
  "/checklist-native/reorder-data-row": "/native-criteria/controls/reorder-data-row",
  "/checklist-native/search": "/native-criteria/controls/search",
  "/checklist-native/segmented-control": "/native-criteria/controls/segmented-control",
  "/checklist-native/sheet": "/native-criteria/controls/sheet",
  "/checklist-native/sidebar-menu": "/native-criteria/controls/sidebar-menu",
  "/checklist-native/slider": "/native-criteria/controls/slider",
  "/checklist-native/step-indicator": "/native-criteria/controls/step-indicator",
  "/checklist-native/stepper": "/native-criteria/controls/stepper",
  "/checklist-native/table-row-button": "/native-criteria/controls/table-row-button",
  "/checklist-native/text-input": "/native-criteria/controls/text-input",
  "/checklist-native/time-picker": "/native-criteria/controls/time-picker",
  "/checklist-native/timer": "/native-criteria/controls/timer",
  "/checklist-native/toggle-switch": "/native-criteria/controls/toggle-switch",
  "/checklist-native/alert-dialog": "/native-criteria/notifications/alert-dialog",
  "/checklist-native/modal": "/native-criteria/notifications/modal",
  "/checklist-native/snackbar-toast": "/native-criteria/notifications/snackbar-toast",
  "/checklist-native/animation": "/native-criteria/patterns/animation",
  "/checklist-native/field-errors": "/native-criteria/patterns/field-errors",
  "/checklist-native/focus": "/native-criteria/patterns/focus",
  "/checklist-native/graphics-visual-elements": "/native-criteria/patterns/graphics-visual-elements",
  "/checklist-native/headings": "/native-criteria/patterns/headings",
  "/checklist-native/image-decorative": "/native-criteria/patterns/image-decorative",
  "/checklist-native/loading-icon": "/native-criteria/patterns/loading-icon",
  "/checklist-native/loading-spinner": "/native-criteria/patterns/loading-spinner",
  "/checklist-native/strike-through": "/native-criteria/patterns/strike-through",
  "/checklist-native/table": "/native-criteria/patterns/table",
  "/checklist-native/tidbit": "/native-criteria/patterns/tidbit",
  "/checklist-native/webviews": "/native-criteria/patterns/webview",
  "/how-to-test/keyboard-focus": "/how-to-test-criteria/type/keyboard-&-focus",
  "/how-to-test/form": "/how-to-test-criteria/type/keyboard-&-focus",
  "/how-to-test/images": "/how-to-test-criteria/type/images",
  // "/how-to-test/screen-readers": "/how-to-test-criteria/type/screen-readers",
  "/how-to-test/link-button": "/how-to-test-criteria/type/links-&-buttons",
  "/how-to-test/color-contrast": "/how-to-test-criteria/type/color-contrast",
  "/how-to-test/not-sure-if-it-is-an-issue": "/how-to-test-criteria/type/not-sure-if-it-is-an-issue",
};

export function getRedirectPath(path: string): string | null {
  const normalizedPath = path.replace(/\/$/, "");

  if (explicitPathMappings[normalizedPath]) {
    return explicitPathMappings[normalizedPath];
  }

  return null;
}
