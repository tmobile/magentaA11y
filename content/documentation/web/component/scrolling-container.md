## General Notes

How to test a scrolling container

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

1. Test keyboard only, then screen reader + keyboard actions
   - Tab: Focus visibly moves to container
   - Arrow-keys: Browses the container

2. Test mobile screenreader gestures
   - Swipe: The content is browsed in logical order

3. Listen to screenreader output on all devices
   - Name: Its purpose is clear
   - Role: It identifies its role as region

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/scrolling](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/scrolling)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

GIVEN THAT I am on a page with a scrolling container

1. Keyboard for mobile & desktop
   - WHEN I use the tab key to move focus to the container I SEE focus is strongly visually indicated
   - THEN when I use the up/down arrow keys I SEE the content is browsed up/down

2. Desktop screenreader
   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND I use the tab key to move focus to the container
        - I HEAR its purpose is clear
        - I HEAR it identifies its role as region
   - THEN when I use the up/down arrow keys I HEAR the content is browsed up/down

3. Mobile screenreader
   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND I swipe move browse to the container
     - I HEAR its purpose is clear
     - I HEAR it identifies its role as region
   - THEN when I swipe move browse to the content I HEAR the content is read


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/scrolling](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/scrolling)

## Code Examples

<example class="example example--contains-icon">
<div role="region" aria-label="Screenreader browser pairing table" class="scrolling-container" tabindex="0">
     <table class="comparison text-center" style="height: 250px;overflow: auto">
  <caption class="center-text h-charlie">
    Screen reader and browser pairings
  </caption>
  <thead>
  <tr><th scope="col">
    Platform
  </th>
  <th scope="col">
    Screenreader
  </th>
  <th scope="col">
    Browser
  </th>
  </tr></thead>
  <tbody>
  <tr>
    <th scope="row">
      <img src="media/images/icons/logo-apple.svg" role="img" alt="Apple" class="icon">
      iOS
    </th>
    <td>
      <img src="media/images/icons/logo-apple.svg" role="img" alt="Apple" class="icon">
      VoiceOver
    </td>
    <td>
      <img src="media/images/icons/logo-safari.svg" role="img" alt="Apple" class="icon">
      Safari
    </td>
  </tr>
  <tr>
    <th scope="row">
      <img src="media/images/icons/logo-android.svg" role="img" alt="" class="icon">
      Android
    </th>
    <td>
      <img src="media/images/icons/logo-talkback.svg" role="img" alt="" class="icon">
      Talkback
    </td>
    <td>
      <img src="media/images/icons/logo-chrome.svg" role="img" alt="" class="icon">
      Chrome
    </td>
  </tr>
  <tr>
    <th scope="row">
      <img src="media/images/icons/logo-windows.svg" role="img" alt="" class="icon">
      Windows
    </th>
    <td>
      <img src="media/images/icons/logo-jaws.svg" role="img" alt="" class="icon">
      JAWS
    </td>
    <td>
      <img src="media/images/icons/logo-chrome.svg" role="img" alt="" class="icon">
      Chrome
    </td>
  </tr>
  <tr>
    <th scope="row">
      <img src="media/images/icons/logo-windows.svg" role="img" alt="" class="icon">
      Windows
    </th>
    <td>
      <img src="media/images/icons/logo-nvda.svg" role="img" alt="" class="icon">
      NVDA
    </td>
    <td>
      <img src="media/images/icons/logo-chrome.svg" role="img" alt="" class="icon">
      Chrome
    </td>
  </tr>
  <tr>
    <th scope="row">
      <img src="media/images/icons/logo-apple.svg" role="img" alt="Apple" class="icon">
      MacOS
    </th>
    <td>
      <img src="media/images/icons/logo-apple.svg" role="img" alt="Apple" class="icon">
      VoiceOver
    </td>
    <td>
      <img src="media/images/icons/logo-safari.svg" role="img" alt="Apple" class="icon">
      Safari
    </td>
  </tr>
  </tbody>
</table>
</div>     
</example>

```html
<div role="region" 
     aria-label="Screenreader browser pairing table"  
     class="scrolling-container" 
     tabindex="0">
     
     <!-- Content goes here -->

</div>     
```

## Developer Notes

### Name
- Use `aria-label="Container purpose"` to give the container a name and purpose.

### Role
- Use `role="region"` to set apart the div as a landmark.

### Focus
- Use `tabindex="0"` to make the container element focusable 
- Focus must be visible

