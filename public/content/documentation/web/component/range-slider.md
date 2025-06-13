## General Notes

How to test a range slider input

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a range slider input

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Focus moves visibly to the input
   - Arrow-keys: Increase / decrease value one step

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the input
   - Swipe up/down: Increase/decrease slider value one step on iOS
   - Volume: Increase/decrease slider value one step on Android

3. Listen to screenreader output on all devices

   - Name: Its purpose is clear
   - Role: It identifies itself as a range
   - Group: Its label is read with the input
   - State: Its current value

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/range-slider](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/range-slider)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a range slider input

GIVEN THAT I am on a page with a range slider input

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to a range slider I SEE focus is strongly visually indicated
   - THEN when I use the up/down/left/right arrow keys I SEE the value is changed one step

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use the tab key to move focus to a range slider
      - I HEAR its purpose is clear
      - I HEAR it identifies itself as a range
      - I HEAR its label is read with the input
      - I HEAR its current value
   - THEN when I use the up/down/left/right arrow keys I HEAR the value is changed one step

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to move focus to a range slider
      - I HEAR its purpose is clear
      - I HEAR it identifies itself as a range
      - I HEAR its label is read with the input
      - I HEAR its current value
   - THEN when I swipe up/down in iOS or use the volume buttons in Android I HEAR the value is changed one step

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/range-slider](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/range-slider)

## Code examples

This is one of the exceedingly rare instances where a custom element makes a lot of sense.

### Use a custom element

   - Custom elements are **easier to style reliably** across browsers.
   - [Working slider pattern examples](https://www.w3.org/WAI/ARIA/apg/patterns/slider/)

```html
<div id="range-label">
  How much cowbell?
</div>
<div class="track">
  <div id="thumb"
       role="slider"
       tabindex="0"
       aria-valuemin="0"
       aria-valuenow="10"
       aria-valuemax="11"
       aria-labelledby="range-label">
  </div>
</div>
```

### Semantic HTML

While there is a native HTML range input, it is **difficult to style reliably** across browsers.

```html
<div class="range-group">
  <!-- Input hidden from the screen reader 
    and keyboard to avoid repetition -->
  <input tabindex="-1" 
          value="10" 
          aria-hidden="true"
          class="range-value" 
          id="cowbell-range-value">
  <div>
    <label for="cowbell-range">
      How much cowbell?
    </label>
    <input type="range"
      id="cowbell-range"
      name="cowbell"
      min="0"
      max="11"
      value="10"
      step="1">
  </div>
</div>
```

<!-- TODO: styling and js? need to be added to help this demo function! 

<example>
<div class="range-group">
  Input hidden from the screen reader (comment out later)
    and keyboard to avoid repetition (comment out later)
  <input tabindex="-1" 
          value="10" 
          aria-hidden="true"
          class="range-value" 
          id="cowbell-range-value">
  <div>
    <label for="cowbell-range">
      How much cowbell?
    </label>
    <input type="range"
      id="cowbell-range"
      name="cowbell"
      min="0"
      max="11"
      value="10"
      step="1">
  </div>
</div>
</example> -->
