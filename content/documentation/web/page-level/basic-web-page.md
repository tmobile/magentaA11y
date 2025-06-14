## General Notes

How to test a basic web page

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a basic web page

GIVEN THAT I am on a page with a basic web page

1. Keyboard for mobile & desktop

   - WHEN I use the keyboard to open a new web page I SEE the page has a unique logical title in the browser tab

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use the keyboard to open a new web page
      - I HEAR The page has a unique logical title in the browser tab
      - I HEAR Major landmarks are discoverable with screenreader shortcuts: header/banner, navigation, main and footer/content info landmarks

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to enter from the web browser tabs
      - I HEAR The page has a unique logical title in the browser tab
      - I HEAR Major landmarks are discoverable with screenreader shortcuts: header/banner, navigation, main and footer/content info landmarks
   - THEN when I change orientations I HEAR content is accessible in landscape or portrait orientation

4. Device OS settings
   - WHEN I use zoom/pinch THEN I see text can resize up to 200% without losing information

Full information: https://www.magentaa11y.com/#/web-criteria/page-level/basic-web-page

## Validate your code
Use [HTML validation](https://validator.w3.org/nu/) as the foundation for ensuring your page works for everyone.

## Code Examples

### Declare a language

This aids a screen reader in reading a content in the proper language.

```html
<html lang="en"></html>
```

### Give your page a unique title

Each page must have unique `<title>` in the `<head>`:

- This includes single-page dynamic apps *if* the URL changes during the user journey.
- Do not use the `|` pipe character as a divider (it is read by screen readers).

```html
<head>
  <title>Page title - Website title</title>
</head>
```

### Ensure users can zoom in

People with low vision need the ability to enlarge the page on mobile and desktop.

```html
<head>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
  />
</head>
```

### Structure your page with landmarks

Landmarks give structure to the page for the screenreader user to be able to navigate the page by major sections.

Each page must include:

- [Header](https://www.magentaa11y.com/#/web-criteria/page-level/header-landmark)
- [Nav](https://www.magentaa11y.com/#/web-criteria/page-level/navigation-landmark) 
- [Main]() TODO
- [Footer]() TODO

```html
<header>
  <!-- Contains the site title -->
</header>
<nav>
  <!-- Primary navigation menu-->
</nav>
<main>
  <!-- Main content -->
</main>
<footer>
  <!-- Site map and legal info -->
</footer>
```

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a basic web page

1. Test keyboard only, then screen reader + keyboard actions

    - Tab: Enters the page and visibly focuses only interactive elements
    - Zoom: Content zooms up to 200%

2. Test mobile screenreader gestures

    - Swipe: Focus moves within page
    - Pinch/stretch: Content zooms up to 200%
    - Orientation: Content is accessible in landscape or portrait orientation

3. Listen to screenreader output on all devices

    - Name: The page has a unique logical title in the browser tab
    - Role: Major landmarks are discoverable with screenreader shortcuts: header/banner, navigation, main and footer/content info landmarks

4. Device OS settings

    - Zoom/pinch: text can resize up to 200% without losing information

Full information: https://www.magentaa11y.com/#/web-criteria/page-level/basic-web-page
