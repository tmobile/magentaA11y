## General Notes

How to test a modal dialog

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a modal dialog

1. Test keyboard only, then screen reader + keyboard actions

   - Launch button: Focus visibly moves to the open dialog itself.
   - Arrow keys: Content within the dialog is browsed in logical order.
   - Tab: Focus visibly moves to interactive controls in the dialog, starting with the first interactive control (typically close button).
   - Escape: The dialog closes and returns focus to the button that launched it.
   - Space: Any buttons are activated.
   - Enter: Any buttons or links are activated.

2. Test mobile screenreader gestures

   - Swipe: Focus moves within the dialog and doesn't enter the rest of the page.
   - Doubletap: This typically activates most elements.

3. Listen to screenreader output on all devices

   - Name: The dialog describes its purpose or title on launch.
   - Role: It identifies itself as a modal or dialog.
   - Group: When closed, focus returns to the launch button.
   - State: When open, content behind the modal remains inert.

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/modal-dialog](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/modal-dialog)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a modal dialog

GIVEN THAT I am on a page with a modal dialog

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to the launch button and use spacebar and/or enter key to activate the button I SEE the dialog opens and is in focus
   - THEN when I use the arrow keys I SEE content in the dialog is browsed in logical order and does not leave the dialog
   - THEN when I use the tab key I SEE focus moves to interactive controls in the modal dialog
   - THEN when I use the escape key I SEE focus returns to the launch button
   - OR when I use the tab key to move focus to the dismiss/close button AND THEN use the spacebar or enter key to activate the dismiss/close button I SEE focus returns to the launch button

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use the tab key to move focus to the launch button and use spacebar and/or enter key to activate the button
      - I HEAR the dialog describes its purpose or title on launch
      - I HEAR it identifies itself as a modal or dialog
      - I HEAR when closed, focus returns to the launch button
      - I HEAR when open, content behind the modal remains inert
   - THEN when I use the arrow keys I HEAR content in the dialog is browsed in logical order and does not leave the dialog
   - THEN when I use the tab key I HEAR focus moves to interactive controls in the modal dialog
   - THEN when I use the escape key I HEAR focus returns to the launch button
   - OR when I use the tab key to move focus to the dismiss/close button AND THEN use the spacebar or enter key to activate the dismiss/close button I HEAR focus returns to the launch button

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to focus to the launch button
      - I HEAR the dialog describes its purpose or title on launch
      - I HEAR it identifies itself as a modal or dialog
      - I HEAR when closed, focus returns to the launch button
      - I HEAR when open, content behind the modal remains inert
   - THEN when I doubletap with the button in focus I HEAR the dialog opens
   - THEN when I swipe within the modal dialog I HEAR focus stays trapped in the modal dialog
   - THEN when I swipe to move focus to the dismiss/close button AND THEN double tap on the close button I HEAR focus returns to the launch button


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/modal-dialog](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/modal-dialog)

## Required attributes

### Launch button
   - Should be a `<button>`, not a `<a>` link.
   - Upon closing, focus must return to the button that launched the dialog.
   - **Do not** use `aria-haspopup`. This attribute has very low and support and unpredictable output across screen readers. 

## Name
   - The modal window has a logical descriptive name from either:
      - `aria-label="Modal title"` or
      - `aria-labelledby="heading-id"` pointing to an `<h2>` as a title

### Role
   - Use `role="dialog"` so the screen reader can identify this as a dialog or modal.

### Group
   - Upon closing, focus must return to the button that launched the dialog.

### State
   - Use `aria-modal="true"` to indicate content beneath the modal is inert and that the screen reader must not browse outside the dialog.

### Focus
   - Use `tabindex="-1"` to make the modal itself targetable for focus.
   - Upon closing, focus must return to the button that launched the dialog.

### Documentation
   - [Browser Support](https://caniuse.com/?search=dialog)

## Screenreader differences

### NVDA
   - By default, NVDA may read the entire modal upon launch. This is expected behavior.

## Code examples

### Use semantic HTML where possible

Since browser support for `<dialog>` is incomplete, if you plan to use the `<dialog>` element we recommend that you include the `role="dialog"` attribute because the element alone is not fully compatible. 

Some browsers require additional scripting. This simple example works in Chrome, but [may not work correctly in all browsers](https://caniuse.com/?search=dialog) such as Safari and Firefox.

```html
   <button id="showModal">
   Things you should know
   </button>

   <dialog role="dialog"
         id="modal"
         tabindex="-1"
         aria-modal="true"
         aria-labelledby="dialog-title">
   <button type="button"
            id="closeModal"
            class="close">
      <span class="hidden">Close</span>
   </button>
   <div class="dialog-content">
      <h2 id="dialog-title" class="h-bravo">
         Things you should know
      </h2>
      <h3>Keyboard</h3>
      <ul>
         <li>Focus must not enter the rest of the page.</li>
         <li>The escape key must close the modal.</li>
      </ul>
      <h3>Screenreader</h3>
      <ul>
         <li>The modal's title is announced on launch.</li>
         <li>The screen reader cannot read content behind the dialog.</li>
      </ul>
      <button type="submit">
         Continue
      </button>
   </section>
   </dialog>
```
<!-- TODO: The code sample example is not currently functional - fix needed.

<example>
   <button id="showModal">
   Things you should know
   </button>

   <dialog role="dialog"
         id="modal"
         tabindex="-1"
         aria-modal="true"
         aria-labelledby="dialog-title">
   <button type="button"
            id="closeModal"
            class="close">
      <span class="hidden">Close</span>
   </button>
   <div class="dialog-content">
      <h2 id="dialog-title" class="h-bravo">
         Things you should know
      </h2>
      <h3>Keyboard</h3>
      <ul>
         <li>Focus must not enter the rest of the page.</li>
         <li>The escape key must close the modal.</li>
      </ul>
      <h3>Screenreader</h3>
      <ul>
         <li>The modal's title is announced on launch.</li>
         <li>The screen reader cannot read content behind the dialog.</li>
      </ul>
      <button type="submit">
         Continue
      </button>
   </section>
   </dialog>
</example> -->

## Further Reading
- [WCAG 1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html)
- [WCAG 2.1.1 Keyboard (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard)
- [WCAG 2.4.3 Focus Order (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html)
- [WCAG 4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)

## Videos

### Android Talkback

<video controls>
  <source src="media/video/web/modal-dialog/modalDialog_AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### iOS VoiceOver

<video controls>
  <source src="media/video/web/modal-dialog/modalDialog_IosVoiceOver.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Windows JAWS Chrome

<video controls>
  <source src="media/video/web/modal-dialog/modalDialog_WindowsJawsChrome.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Windows NVDA Chrome

<video controls>
  <source src="media/video/web/modal-dialog/modalDialog_WindowsNvdaChrome.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### MacOS VoiceOver Safari

<video controls>
  <source src="media/video/web/modal-dialog/modalDialog_MacOsVoiceOverSafari.webm" type="video/webm">
  Your browser does not support the video tag.
</video>
