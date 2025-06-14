## General Notes

How to test a footer landmark

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a footer landmark

1. Test keyboard only, then screen reader + keyboard actions
   - Skip-links: Focus moves directly to the footer
   - Tab: Links and buttons within the footer are focusable

2. Test mobile screenreader gestures
   - Swipe: Focus moves within footer.
   - Doubletap: This typically activates most elements.

3. Listen to screenreader output on all devices
   - Role: It is discoverable with screenreader shortcuts as a footer or contentinfo landmark
   - Group: It typically contains copyright information, navigation links, and privacy statements.

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/page-level/footer](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/page-level/footer)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a footer landmark

GIVEN THAT I am on a page with a footer landmark

1. Keyboard for mobile & desktop
   - WHEN I use the tab key to move focus to a interactive element in the footer I SEE focus is strongly visually indicated

2. Desktop screenreader
   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use the tab key to move focus to a interactive element in the footer
      - I HEAR It is discoverable with screenreader shortcuts as a footer or contentinfo landmark
      - I HEAR It typically contains copyright information, navigation links, and privacy statements.

3. Mobile screenreader
   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to focusable elements in the footer
      - I HEAR It is discoverable with screenreader shortcuts as a footer or contentinfo landmark
      - I HEAR It typically contains copyright information, navigation links, and privacy statements.


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/page-level/footer](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/page-level/footer)

## Code examples

### Use semantic HTML

This semantic HTML contains all accessibility features by default.

```html
<a href="#example-footer">Skip to example footer</a>
<footer tabindex="-1" id="example-footer">
  <nav aria-label="Site map">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about/">About</a></li>
      <li><a href="/contact/">Contact</a></li>
    </ul>
  </nav>
  © 2021
</footer>
```

<example>
    <a href="#destination" data-fn="scrollToHref">Skip to example footer</a>
    <footer tabindex="-1" id="destination">
    <nav aria-label="Site map">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about/">About</a></li>
            <li><a href="/contact/">Contact</a></li>
        </ul>
    </nav>
    © 2025
    </footer>
</example>

### When you can't use semantic HTML

This custom footer requires extra attributes.

```html
<div role="contentinfo" tabindex="-1" id="example-footer">
   &copy; 2025 Site Name
</div>
```

## Developer notes

### Name
- Typically doesn't have a name, unless there are multiple footers.

### Role

- Identifies itself as a footer or contentinfo landmark.
- If a non-semantic element must be used (like a `<div>`) use `role="contentinfo"`.

### Group

- Typically contains copyright information, navigation links, site map, and privacy statements.

### Focus

- Can be targeted with a skip link, but isn't focusable with the tab key
- Use `tabindex="-1"` to make the footer targetable with a skip link.
