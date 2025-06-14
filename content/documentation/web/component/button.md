## General Notes

How to test a button

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Focus visibly moves to the button.
   - Spacebar: Activates the button.
   - Enter: Activates the button.

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the element, expresses its state
   - Doubletap: Activates the button

3. Listen to screenreader output on all devices
   - Name: Its purpose is clear
   - Role: It identifies its role of button
   - Group: It indicates if it has popup for listbox or menus
   - State: It expresses its state if applicable (pressed, expanded, disabled/dimmed/unavailable)

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/button](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/button)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

GIVEN THAT I am on a page with a button

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to a button I SEE focus is strongly visually indicated
   - THEN when I use the spacebar and/or enter key to activate the button I SEE the intended action occurs

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND I use the tab key to move focus to a button
      - I HEAR Its purpose is clear
      - I HEAR It identifies its role of button
      - I HEAR It indicates if it has popup for listbox or menus
      - I HEAR It expresses its state if applicable (pressed, expanded, disabled/dimmed/unavailable)
   - THEN when I use the spacebar and/or enter key to activate the button I HEAR the intended action occurs

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND I swipe to focus on a button
      - I HEAR Its purpose is clear
      - I HEAR It identifies its role of button
      - I HEAR It indicates if it has popup for listbox or menus
      - I HEAR It expresses its state if applicable (pressed, expanded, disabled/dimmed/unavailable)
   - THEN when I doubletap with the button in focus I HEAR the intended action occurs


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/button](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/button)

## Videos

### Android Talkback

<video controls>
  <source src="media/video/web/button/buttonTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### iOS VoiceOver

<video controls>
  <source src="media/video/web/button/buttonVoiceover.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Windows NVDA Chrome

<video controls>
  <source src="media/video/web/button/buttonNVDA.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Windows JAWS Chrome

<video controls>
  <source src="media/video/web/button/buttonJaws.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Buttons vs links
### If it goes somewhere, it’s `<a>` link.

* When the user clicks a link, they are taken to a different location in the site.
   * Either another page or even another area of the same page
* A link can look like a big shiny button but it must be coded as `<a>` link

### If it does something, it’s a `<button>`
* Buttons cause an action to occur on the same page
   * Submit a form (even when submission takes you to a new page)
   * Open a menu
   * Launch a modal
   * Expand details
* A button can look like a link, but it must be coded as a `<button>`

## Code examples
### Use semantic HTML

- This semantic HTML contains all accessibility features by default.
- It uses <u>CSS pseudo attributes</u> to create the arrow indicator, no Javascript.

```html
<button>
  Continue
</button>
```

<example>
   <button class="Magentaa11y-button Magentaa11y-button--primary">
   Continue
   </button>
</example>

## Focusable disabled button

The preferred method is to use `aria-disabled="true"` so screen reader users can find the button, click submit and be notified of errors in the form.

```html
<button aria-disabled="true">
  Continue
</button>
```

<example>
   <button class="Magentaa11y-button Magentaa11y-button--primary" aria-disabled="true">
   Continue
   </button>
</example>

## Fully disabled button

A button that uses the disabled attribute will not be focusable, but it is still discoverable by the screen reader while browsing.

```html
<button disabled>
  Continue
</button>
```

<example>
   <button class="Magentaa11y-button Magentaa11y-button--primary" disabled>
   Continue
   </button>
</example>

## When you can’t use semantic HTML
This custom button requires extra attributes and JS event listeners. Adding `tabindex="0"` makes it focusable.

```html
<div role="button" tabindex="0" >
  Continue
</div>
```

## When there’s no inner text that text makes sense
* As a last resort, `aria-label` can be used.
* `aria-label` will (typically) replace the inner text of the button for the screen reader output.
* DO NOT repeat the inner text in the `aria-label` as some screenreaders will read both.

```html
<div role="button" tabindex="0" aria-label="Continue">
  <!-- icon but no text -->
</div>

<div role="button" tabindex="0" aria-label="Buy now, iPhone 17">
  Buy now <!-- Ambiguous text doesn't describe the intent -->
</div>
```

## When there are repeating buttons
Sometimes the design will call for multiple buttons with the same text label. In a case like this, `aria-label` can be used to name each control’s purpose.

```html
<button aria-label="Edit payment date">
  Edit
</div>
<button aria-label="Edit payment amount">
  Edit
</div>
```

## Developer notes

### Name
* Inner text should describe the purpose of the button.
* `aria-label="Button purpose"` can also be used (as a last resort)

### Role
* Native button identifies as button by default
* Use `role="button"` for custom elements

### Group
* Use `aria-haspopup="true"` for menu, listbox or modal
* `aria-controls="popupId"` is not well supported

### State
* Toggle buttons `aria-pressed="true/false"`
* Menus or expanders use `aria-expanded="true/false"`
* Use the `disabled` state for completely inactive buttons that shouldn’t be focusable
* Use `aria-disabled="true/false"` state for inactive custom elements

### Focus
* Focus must be visible
* Custom elements (like `<div>`) need `tabindex="0"` to be focusable