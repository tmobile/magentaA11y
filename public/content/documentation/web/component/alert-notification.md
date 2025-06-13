## General Notes

How to test an alert notification

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a alert notification

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Focus does not automatically move to the alert, but can move to interactive elements within the alert (example: Dismiss button)
   - Arrow: Browses to the alert like any other content

2. Test mobile screenreader gestures

   - Swipe: Focus does not move to the alert when it appears, but it can be browsed by the screenreader

3. Listen to screenreader output on all devices

   - Name: The alert is read when it appears (BUT focus DOES NOT transfer automatically when the alert appears)
   - Role: It identifies itself as an alert

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/alert-notification](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/alert-notification)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a alert notification

GIVEN THAT I am on a page with a alert notification

1. Keyboard for mobile & desktop

   - WHEN I use use features that trigger the alert I SEE the alert (BUT focus DOES NOT transfer automatically when the alert appears)

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use use features that trigger the alert
      - I HEAR the alert is read when it appears (BUT focus DOES NOT transfer automatically when the alert appears)
      - I HEAR it identifies itself as an alert

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I use features that trigger the alert
      - I HEAR the alert is read when it appears (BUT focus DOES NOT transfer automatically when the alert appears)
      - I HEAR it identifies itself as an alert

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/alert-notification](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/alert-notification)

## Notes

An alert is dynamic content that is injected into the page when it changes and a person using a screenreader needs to know that some state of the page or application has changed.

   - Use alerts sparingly. 
   - If an alert is present on page load, it won't be read automatically.
      - If an element is present on page load, it is not technically an alert.
   - The alert will be read by the screen reader when it becomes visible and or appears new in the DOM.

### Browser + screenreader quirks

   - Screenreaders do not implement alerts uniformly and must be tested.
      - Just because an alert pattern works in one screenreader doesn't mean it will work in all three screenreaders (JAWS, NVDA, and MacOS VoiceOver).
   - The element referenced by the `aria-describedby` attribute cannot use the `role="alert"` attribute (see example below for workaround). 
      - [VoiceOver fails to read a referenced `role="alert"` element when the input is in focus (AccessibilitySupport)](https://a11ysupport.io/tests/tech__aria__aria-describedby-with-role-alert).
   - NVDA will read the alert twice if it appears while the input is in focus: once from the `role="alert"` being injected and a second time from the `aria-describedby` association.
   - NVDA needs a fraction of a second to catch up with changes in the DOM; we suggest using a `setTimeout` to delay displaying the alert.

### Name
   - Inner text describes alert when it appears on screen.

### Role
   - Use `role="alert"` for elements injected into the page.

### Focus
   - Focus does not move to the element when the alert appears.

## Code examples

### Basic notification

<!-- TODO: Needs JS to update error message stylings -->

```html
<div role="alert" 
     id="alert-notification" 
     class="alert notification inert">
    <!--- Use JS to inject the alert here -->
</div>

<button id="show-alert-notification">
  Save my settings
</button>
```

<example>
<div id="alertSuccessExample"
     role="alert" 
     id="alert-notification" 
     class="alert notification inert">
    <!--- Use JS to inject the alert here -->
</div>

<button data-fn="alertSuccess" id="show-alert-notification">
  Save my settings
</button>
</example>

### Error alert from an input field

<!-- TODO: Needs to update warning stylings -->

```html
<label for="favorite-sesame-street-character">
  What is your favorite Sesame Street character?
  <span>Required</span>
</label>

<input type="text"
       id="favorite-sesame-street-character"
       aria-describedby="favorite-character-error-example favorite-character-hint"
       required>

<div role="alert" 
     id="favorite-character-alert" 
     class="alert inert">
  <!--- Do not reference this alert element
        directly with aria-describedby -->
  <div id="favorite-character-error-example">
    <!--- Use JS to inject the alert here -->
  </div>     
</div>

<div class="hint" id="favorite-character-hint">
  Example: Elmo, Big Bird, Cookie Monster
</div>

<button id="show-error">
  Toggle error
</button>
```

<example>
<label for="favorite-sesame-street-character">
  What is your favorite Sesame Street character?
  <span>Required</span>
</label>

<input type="text"
       id="favorite-sesame-street-character"
       aria-describedby="favorite-character-error favorite-character-hint"
       required>

<div role="alert" 
     id="favorite-character-alert" 
     class="alert inert">
  <!--- Do not reference this alert element
        directly with aria-describedby -->
  <div id="favorite-character-error">
    <!--- Use JS to inject the alert here -->
  </div>     
</div>

<div class="hint" id="favorite-character-hint">
  Example: Elmo, Big Bird, Cookie Monster
</div>

<button data-fn="alertWarning" id="show-error">
  Toggle error
</button>
</example>

## Further reading
[WCAG 4.1.3 Status Messages (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)
