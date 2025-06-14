## General Notes

How to test a separator / horizontal rule

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a separator / horizontal rule

1. Test keyboard only, then screen reader + keyboard actions

   - Any key: Nothing happens. It is completely inert.

2. Test mobile screenreader gestures

   - Swipe: The element is skipped entirely. It is completely inert.

3. Listen to screenreader output on all devices

   - Name: The element is skipped entirely. It is completely inert.

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/separator-horizontal-rule](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/separator-horizontal-rule)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a separator / horizontal rule

GIVEN THAT I am on a page with a separator / horizontal rule

1. Keyboard for mobile & desktop

   - WHEN I use arrow keys to browse to the separator I SEE the element is skipped entirely. It is completely inert.

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use arrow keys to browse to the separator
      - I HEAR the element is skipped entirely. It is completely inert.

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to the separator
      - I HEAR the element is skipped entirely. It is completely inert.

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/separator-horizontal-rule](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/separator-horizontal-rule)

## Developer notes

Separators must be ignored by the screenreader.

It is preferred to create these lines with CSS rather than using a DOM element.

## Code examples

If you are unable to use CSS styles, add `aria-hidden="true"` to ensure it doesn't distract from the experience.

### Semantic HTML

```html
<hr aria-hidden="true">
```

### Custom elements

Angular Material uses a DOM element to create separators.

```html
<div role="separator" aria-hidden="true"></div>
```
