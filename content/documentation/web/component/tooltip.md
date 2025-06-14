## General Notes

How to test a tooltip

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a header

1. Test keyboard only, then screen reader + keyboard actions

   - Skip-links: Focus moves directly to the header or navigation

   - Tab: Nothing, headings are not focusable unless they are actionable

   - Arrow-keys: Headings are browsed

2. Test mobile screenreader gestures

   - Swipe: Focus moves directly to the header or navigation

   - Doubletap: This typically activates most elements

3. Listen to screenreader output on all devices

   - It is discoverable with screenreader shortcuts as header/banner landmark

   - Group: It typically contains the name and primary navigation of the website

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/tooltip](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/tooltip)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a header

GIVEN THAT I am on a page with a header landmark

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to enter the web browser window I SEE focus is strongly visually indicated on interactive components

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND

   - I use the tab key to enter the web browser window

   - I HEAR It is discoverable with screenreader shortcuts as header/banner landmark

   - I HEAR It typically contains the name and primary navigation of the website

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND

   - I swipe to focusable elements in the header

   - I HEAR It is discoverable with screenreader shortcuts as header/banner landmark

   - I HEAR It typically contains the name and primary navigation of the website


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/tooltip](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/tooltip)

## Developer Notes

### Name

- Typically doesn’t have a name or description since there must be only one instance per page.

## Videos

- Videos go here
<video controls>
  <source src="media/video/native/button/buttonIosVoiceover.webm" type="video/webm">
  Your browser does not support the video tag.
</video>
