## General Notes

How to test a navigation landmark

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a navigation landmark


1. Test keyboard only, then screen reader + keyboard actions  
   - Skip-links: Focus moves directly to the nav element
   - Tab: Focus moves to Links and buttons within the nav
2. Test mobile screenreader gestures
   - Swipe: Focus moves within the nav
   - Doubletap: This typically activates most elements
3. Listen to screenreader output on all devices
   - **Name**: It indicates its role AND IF multiple navigations are present (ex: Main navigation, Site map, Breadcrumbs), the name of the navigation
   - **Role**: It is discoverable with screenreader shortcuts as a navigation landmark

Full information: https://www.magentaa11y.com/#/web-criteria/page-level/navigation-landmark

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a navigation landmark

GIVEN THAT I am on a page with a navigation landmark

1. Keyboard for mobile & desktop
   - WHEN I use the arrow keys to browse the navigation menu, I SEE the screen scrolls through the page.
  
2. Desktop screenreader
   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND
   - I use the arrow keys to browse the navigation menu
     - I HEAR It indicates its role AND IF multiple navigations are present (ex: Main navigation, Site map, Breadcrumbs), the name of the navigation
     - I HEAR It is discoverable with screenreader shortcuts as a navigation landmark.

3. Mobile screenreader
   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to focusable elements in the navigation
     - I HEAR It indicates its role AND IF multiple navigations are present (ex: Main navigation, Site map, Breadcrumbs), the name of the navigation
     - I HEAR It is discoverable with screenreader shortcuts as a navigation landmark.

Full information: https://www.magentaa11y.com/#/web-criteria/page-level/navigation-landmark

## Code Examples

### Use Semantic HTML

This semantic HTML contains all accessibility features by default.

```html
<a href="#nav-example">Skip to example navigation</a>
<a href="#">Not the navigation</a>
<nav tabindex="-1" class="nav-example" id="nav-example">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about/">About</a></li>
    <li><a href="/contact/">Contact</a></li>
    <li><button aria-haspopup="true">Sign in</button></li>
  </ul>
</nav>
```

<example>
  <a href="#destination" data-fn="scrollToHref">Skip to example navigation</a>
  <a href="#">Not the navigation</a>
  <nav tabindex="-1" class="nav-example" id="destination">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about/">About</a></li>
      <li><a href="/contact/">Contact</a></li>
      <li><button class="Magentaa11y-button Magentaa11y-button--primary" aria-haspopup="true">Sign in</button></li>
    </ul>
  </nav>
</example>

### Keep custom menus as simple as possible
Use semantic elements where possible.

```html
<nav id="example-expanding-nav" class="menu">
  <ul>
    <li>
      <a class="home" href="/">
        Home
      </a>
    </li>
    <li class="expander-group MagentaA11y-accordion">
      <h3 className="MagentaA11y-accordion__heading">
        <button className="MagentaA11y-accordion__headline" data-fn="toggleAccordionState" type="button" class="menu expander-toggle" aria-expanded="false" aria-haspopup="true">
        Menu
        </button>
      </h3>
      <ul className="MagentaA11y-accordion__body">
        <li>
          <a href="/about/">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </li>
  </ul>
</nav>
```

<example>
  <nav id="example-expanding-nav" class="menu">
    <ul>
      <li>
        <a class="home" href="/">
          Home
        </a>
      </li>
      <li class="expander-group MagentaA11y-accordion">
        <h3 className="MagentaA11y-accordion__heading">
          <button className="MagentaA11y-accordion__headline" data-fn="toggleAccordionState" type="button" class="menu expander-toggle" aria-expanded="false" aria-haspopup="true">
          Menu
          </button>
        </h3>
        <ul className="MagentaA11y-accordion__body">
          <li>
            <a href="/about/">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</example>

### When you can’t use semantic HTML

This custom navigation requires extra attributes.

```html
<div role="navigation" tabindex="-1" id="example-navigation">
  <ul>
    <li><a href="/">Website name</a></li>
    <li><a href="/about/">About</a></li>
    <li><a href="/contact/">Contact</a></li>
  </ul>
</div>
```

### Multiple navigation elements
When there is more than one navigation element, they must have a name.

```html
<nav tabindex="-1" id="nav" aria-label="Main">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about/">About</a></li>
    <li><a href="/contact/">Contact</a></li>
  </ul>
</nav>

<h2 id="cat-heading">Categories</h2>
<nav id="cat-nav" aria-labelledby="#cat-heading">
  <ul>
    <li><a href="/alpha/">Alpha</a></li>
    <li><a href="/bravo/">Bravo</a></li>
    <li><a href="/charlie/">Charlie</a></li>
  </ul>
</nav>

<footer>
  <nav aria-label="Site map">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about/">About</a></li>
      <li><a href="/contact/">Contact</a></li>
    </ul>
  </nav>
</footer>
```

## Developer Notes

### Name

- If there are multiple `<nav>` elements (e.g., site menu, pagination, categories), it may be helpful to name them.
  - Use `aria-label="Menu name"` when there is no visible navigation title.
  - Use `aria-describedby="menu-name-id"` when the navigation title is a visible heading.

### Role

- Identifies itself as a navigation landmark.
- Avoid adding ‘menu’ or ‘option’ roles with arrow key event listeners unless building an actual application like Gmail.

### Focus

- When skip links are used, add `tabindex="-1"` so focus can move to the `nav` element, not just bring it into view.

## Further Reading
- [WCAG 3.2.3 Consistent Navigation (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation)
- [WCAG 4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)