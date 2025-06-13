## General Notes

How to test an iframe

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test an iframe

1. Test keyboard only, then screen reader + keyboard actions

   - Arrow keys: Content within the iframe is browsed
   - Tab: Interactive content in the iframe comes into view

2. Test mobile screenreader gestures

   - Swipe: Content within the iframe is browsed

3. Listen to screenreader output on all devices

   - Name: The title of the iframe is read if the iframe contains content 
   - Group: If the iframe does not contain content, the iframe is ignored

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/iframe](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/iframe)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test an iframe

GIVEN THAT I am on a page with an iframe

1. Keyboard for mobile & desktop

   - WHEN I use the arrow keys or tab key I SEE the content of the iframe is browsed

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND I use the arrow keys or tab key
      - I HEAR the title of the iframe is read if the iframe contains content 
      - I HEAR if the iframe does not contain content, the iframe is ignored

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND I swipe to content in the iframe
      - I HEAR the title of the iframe is read if the iframe contains content 
      - I HEAR if the iframe does not contain content, the iframe is ignored


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/iframe](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/iframe)

## Code examples

### When an iframe contains content

```html
<iframe title="Coffee maker demonstration" 
        src="coffee-maker-demo.html">
</iframe>
```

### When an iframe does not contain content

```html
<iframe title="Hidden intentionally"
        aria-hidden="true" 
        src="script-injection.net">
</iframe>
```
