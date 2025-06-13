## General Notes

How to test a skip link

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a skip link

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Focus moves to the skip link
   - Enter: Activates the link, focus/tabindex moves directly to the targeted element

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the skip link
   - Doubletap: Activates the link, focus/tabindex moves directly to the targeted element

3. Listen to screenreader output on all devices

   - Name: It describes which landmark it's targeting
   - Role: It identifies itself as a link
   - Group: It is typically the first element in the page


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/page-level/skip-link](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/page-level/skip-link)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a skip link

GIVEN THAT I am on a page with a skip link

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to a skip link I SEE focus is strongly visually indicated
   - THEN when I use the enter key to activate the link I SEE my focus moves directly to the targeted element

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use the tab key to move focus to a skip link
      - I HEAR it describes which landmark it's targeting
      - I HEAR it identifies itself as a link
      - I HEAR it is typically the first element in the page
   - THEN when I use the enter key to activate the link I HEAR my focus moves directly to the targeted element


3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to focus on a skip link
      - I HEAR it describes which landmark it's targeting
      - I HEAR it identifies itself as a link
      - I HEAR it is typically the first element in the page
   - THEN when I doubletap with the link in focus I HEAR my focus moves directly to the targeted element


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/page-level/skip-link](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/page-level/skip-link)

## Code examples

```html
   <a href="#example-main">Skip to main content</a>
   <a href="#">Not main content</a>
   <main tabindex="-1" id="example-main">
      <h1>About main content</h1>
      <p>The main content of the page belongs here.</p>
      <p><a href="#">Focus moves here next</a></p>
   </main>
```

<example>
   <a href="#destination" data-fn="scrollToHref">Skip to main content</a>
   <a href="#">Not main content</a>
   <main tabindex="-1" id="destination">
      <h1>About main content</h1>
      <p>The main content of the page belongs here.</p>
      <p><a href="#">Focus moves here next</a></p>
   </main>
</example>

## Developer Notes

### Group

   - Skip links must be the first perceivable elements in the page

### Focus

   - Landmarks and other elements can be targeted with a skip link, but aren't individually focusable with the tab key
   - Use `tabindex="-1"` to make the target focusable with a skip link.
