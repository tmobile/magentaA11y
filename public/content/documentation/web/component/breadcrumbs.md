## General Notes

How to test breadcrumbs

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

1. Keyboard & screen reader actions
   - Tab: Focus visibly moves to the link
   - Enter: Activates the link

2. Mobile screenreader gestures
   - Swipe: Focus moves to the link
   - Doubletap: Activates the link

3. Screenreader output for all devices
   - Name: The link names correspond to their destination page titles
   - Role: Links identify as a links in a breadcrumb navigation landmark
   - State: The current page link is indicated when focused
   - Group: Is discoverable with screenreader shortcuts as a navigation landmark

Full information: [https://www.magentaa11y.com/checklist-web/breadcrumbs/](https://www.magentaa11y.com/checklist-web/breadcrumbs/)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test breadcrumbs

GIVEN THAT I am on a page with breadcrumbs

1. Keyboard for mobile & desktop
   - WHEN I use the tab key to move focus to a link
   - I SEE focus is strongly visually indicated
   - THEN when I use the enter key to activate the link
   - I SEE my browser goes somewhere

2. Desktop screenreader
   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND I use the tab key to move focus to a link
     - I HEAR The link names correspond to their destination page titles
     - I HEAR Links identify as a links in a breadcrumb navigation landmark
     - I HEAR The current page link is indicated when focused
     - I HEAR Is discoverable with screenreader shortcuts as a navigation landmark
   - THEN when I use the enter key to activate the link
   - I HEAR my browser goes somewhere

3. Mobile screenreader
   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND I swipe to focus on a link
     - I HEAR The link names correspond to their destination page titles
     - I HEAR Links identify as a links in a breadcrumb navigation landmark
     - I HEAR The current page link is indicated when focused
     - I HEAR Is discoverable with screenreader shortcuts as a navigation landmark
   - THEN when I doubletap with the link in focus
   - I HEAR my browser goes somewhere

Full information: [https://www.magentaa11y.com/checklist-web/breadcrumbs/](https://www.magentaa11y.com/checklist-web/breadcrumbs/)

## Code examples

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol>
    <li>
      <a href="/">
        Home
      </a>
    </li>
    <li>
      <a href="/web/">
        Web
      </a>
    </li>
    <li>
      <a href="/checklist-web/breadcrumbs/" 
         aria-current="page">
        Breadcrumbs
      </a>
    </li>
  </ol>
</nav>

```html
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol>
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/web/">Web</a>
    </li>
    <li>
      <a href="/checklist-web/breadcrumbs/" aria-current="page">Breadcrumbs</a>
    </li>
  </ol>
</nav>
```

## Developer notes

- Breadcrumb link names must correspond to their destination page titles.
   - In the example here, the “Web” link uses an `aria-label` that corresponds to the full title of the destination page.
- Use a `<nav>` with a unique name like `aria-label="breadcrumbs"`.
- Placing the links inside `<ol>` and `<li>` provides context to users about a given breadcrumb’s position in a list and the total number of breadcrumbs.
- Add `aria-current="page"` to the last link in the breadcrumb. This represents the current item within a container or set of related elements.
- <a href="https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/examples/breadcrumb/">ARIA Authoring Practices Guide (APG) Breadcrumb Example</a>
