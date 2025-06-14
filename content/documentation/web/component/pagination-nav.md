## General Notes

How to test a pagination nav

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a pagination nav

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Focus moves to links and buttons within the nav

2. Test mobile screenreader gestures

   - Swipe: Focus moves within the nav
   - Doubletap: Activates links

3. Listen to screenreader output on all devices

   - Name: The pagination nav has a logical name ("pagination")
   - Role: The nav landmark is discoverable with screenreader shortcuts

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/pagination-nav](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/pagination-nav)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a pagination nav

GIVEN THAT I am on a page with a pagination nav

1. Keyboard for mobile & desktop

   - WHEN I use the arrow keys to browse to a pagination navigation I SEE the nav comes into view
   - THEN when I use the tab key to move focus to a link in the nav and use the enter key I SEE my browser goes to the intended location

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use the arrow keys to browse to a pagination navigation
      - I HEAR The pagination nav has a logical name ("pagination")
      - I HEAR The nav landmark is discoverable with screenreader shortcuts
   - THEN when I use the tab key to move focus to a link in the nav and use the enter key I HEAR my browser goes to the intended location

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to elements in the nav
      - I HEAR The pagination nav has a logical name ("pagination")
      - I HEAR The nav landmark is discoverable with screenreader shortcuts
   - THEN when I doubletap with the link in focus I HEAR my browser goes to the intended location


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/pagination-nav](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/pagination-nav)

## Code examples

### Use semantic HTML
This semantic HTML contains all accessibility features by default.

```html
   <nav class="pagination" aria-label="Pagination">
      <ul>
         <li>
            <a href="/1/"
            aria-label="Page 1"
            aria-current="page">
            1
            </a>
         </li>
         <li><a href="/2/" aria-label="Page 2">2</a></li>
         <li><a href="/3/" aria-label="Page 3">3</a></li>
         <li><a href="/4/" aria-label="Page 4">4</a></li>
         <li><a href="/5/" aria-label="Page 5">5</a></li>
         <li><a href="/2/">Next</a></li>
      </ul>
   </nav>
```

<!-- TODO: code example needs updated stylings to remove bullets from list items and display horizontally instead of vertically. -->

<example>
   <nav class="pagination" aria-label="Pagination">
      <ul>
         <li>
            <a href="/1/"
               aria-label="Page 1"
               aria-current="page">
               1
            </a>
         </li>
         <li><a href="/2/" aria-label="Page 2">2</a></li>
         <li><a href="/3/" aria-label="Page 3">3</a></li>
         <li><a href="/4/" aria-label="Page 4">4</a></li>
         <li><a href="/5/" aria-label="Page 5">5</a></li>
         <li><a href="/2/">Next</a></li>
      </ul>
   </nav>
</example>

## Developer Notes

### Name

   - Use `aria-label="Pagination"` when there is not a visible nav title.
      - `aria-labelledby="title-id"` can be used when the nav title is a visible heading.
   - Use `aria-label="Page X"` for each entry link.

### Role

   - Identifies itself as navigation.
   - Use `role="navigation"` when it's not possible to use `<nav>`. 
   - **DO NOT** add menu or option roles with arrow key event listeners unless you're building an actual application like Gmail.

### State

   - Use `aria-current="page"` on the current page item.

## Further Reading
   - [WCAG 2.1.1 Keyboard (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard)
   - [WCAG 2.4.4 Link Purpose (In Context) (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html)
   - [WCAG 2.5.3 Label in Name (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html)
   - [WCAG 2.5.8 Target Size (Minimum) (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
   - [WCAG 3.2.3 Consistent Navigation (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation)
   - [WCAG 4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)
