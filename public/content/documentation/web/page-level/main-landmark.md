## General Notes

How to test a main landmark

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a main landmark

1. Test keyboard only, then screen reader + keyboard actions

   - Skip-links: Focus moves directly to the main content area
   - Tab: Links and buttons within the main area are focusable

2. Test mobile screenreader gestures

   - Swipe: Focus moves within main area

3. Listen to screenreader output on all devices

   - Role: It is discoverable with screenreader shortcuts as main landmark
   - Group: It contains the content portion of the page starting with the H1

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/page-level/main-landmark](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/page-level/main-landmark)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a main landmark

GIVEN THAT I am on a page with a main landmark

1. Keyboard for mobile & desktop

   - WHEN I use the arrow keys to browse the main content I SEE the screen scroll through the page

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use the arrow keys to browse the main content
      - I HEAR It is discoverable with screenreader shortcuts as main landmark
      - I HEAR It contains the content portion of the page starting with the H1


3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to elements in the header
      - I HEAR It is discoverable with screenreader shortcuts as main landmark
      - I HEAR It contains the content portion of the page starting with the H1


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/page-level/main-landmark](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/page-level/main-landmark)

## Code examples

### Use semantic HTML

This semantic HTML contains all accessibility features by default.

```html
<a href="#example-main">Skip to main content</a>
<a href="#">Not main content</a>
<main tabindex="-1" id="example-main" aria-label="example">
  <h1>About main content</h1>
  <p>The main content of the page belongs here.</p>
  <p><a href="#">Focus moves here next</a></p>
</main>
```
<example>
   <a href="#destination" data-fn="scrollToHref">Skip to main content</a>
   <a href="#">Not main content</a>
   <main tabindex="-1" id="destination" aria-label="example">
      <h1>About main content</h1>
      <p>The main content of the page belongs here.</p>
      <p><a href="#">Focus moves here next</a></p>
   </main>
</example>

### When you can't use semantic HTML

This custom main element requires extra attributes.

```html
<div role="main" tabindex="-1" id="example-main"> 
  <h1>About our company</h1>
  <p>The main content of the page belongs here.</p>
</div>
```

<example>
   <div role="main" tabindex="-1" id="example-main"> 
      <h1>About our company</h1>
      <p>The main content of the page belongs here.</p>
   </div>
</example>

## Developer notes

### Name
   - Typically doesn't have a name other than its role.
   - If a page has multiple `<main>` landmarks, then each should have a unique programmatic label.
      - Use `aria-label="Content name"` when there is not a visible content label.
      - Use `aria-labelledby="content-id"` when the content label is a visible heading or existing page text.

### Role

   - Identifies itself as a main landmark
   - If a non-semantic element must be used (like a `<div>`) use `role="main"`.

### Group

   - Must contain the main content of the page.
   - Ideally appears only once per Web page.

### Focus

   - Can be targeted with a skip link, but isn't focusable with the tab key
   - Use `tabindex="-1"` to make the main targetable with a skip link.

## Further Reading
   - [WCAG 1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html)
