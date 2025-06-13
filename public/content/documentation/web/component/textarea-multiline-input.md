## General Notes

How to test a textarea multiline input

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a textarea multiline input

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Focus moves visibly to the textarea unless it's disabled

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the textarea
   - Keyboard: Keyboard appears

3. Listen to screenreader output on all devices

   - Name: Its purpose is clear
   - Role: It identifies itself as a textarea
   - Group: Hints or errors (ex: chars remaining) are read after the label, related inputs include a group name (ex: Contact us)
   - State: If applicable, it expresses its state (required, disabled / dimmed / unavailable)
   - Status: Character counter updates dynamically after keypress and a short delay

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/textarea-multiline-input](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/textarea-multiline-input)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a textarea multiline input

GIVEN THAT I am on a page with a textarea multiline input

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to a textarea I SEE focus is strongly visually indicated

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND I use the tab key to move focus to a textarea
      - I HEAR Its purpose is clear
      - I HEAR It identifies itself as a textarea
      - I HEAR Hints or errors (ex: chars remaining) are read after the label, related inputs include a group name (ex: Contact us)
      - I HEAR If applicable, it expresses its state (required, disabled / dimmed / unavailable)
      - I HEAR Character counter updates dynamically after keypress and a short delay

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND I swipe to focusable elements on a textarea
      - I HEAR Its purpose is clear
      - I HEAR It identifies itself as a textarea
      - I HEAR Hints or errors (ex: chars remaining) are read after the label, related inputs include a group name (ex: Contact us)
      - I HEAR If applicable, it expresses its state (required, disabled / dimmed / unavailable)
      - I HEAR Character counter updates dynamically after keypress and a short delay


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/textarea-multiline-input](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/textarea-multiline-input)



## Code examples

### Use semantic HTML

- There are two containers in the HTML that have the same counter content. One of them is hidden from screen readers by use of `aria-hidden="true"` and the other visually hidden container's content is dynamically updated after a slight pause. This is to ensure the screen reader does not interrupt the announcement of the key pressed with the announcement of the dynamic counter text update.
- While the visible counter text container is hidden with `aria-hidden="true"` it is still programmatically associated with the textarea by use of `aria-describedby`. This will ensure the text will be announced when the textarea receives focus.  
- **Delay the update** for dynamic `role="status"` counter
  - Use `setTimeout`to allow the accessibility tree and screen reader time to update in a logical fashion e.g. 1500ms
- **Do not** reference the `role="status"` element with aria-describedby
  - This causes a bug in VoiceOver 

<!-- TODO - make sure to adjust .hljs-keyword styling -->

```javascript
const textarea = document.getElementById('message');
if(textarea) {
    const chars = document.getElementById('currentChars');
    const srOutputTarget = document.getElementById('sr-counter-target');
    textarea.addEventListener("input", event => {
        const target = event.currentTarget;
        const maxLength = target.getAttribute("maxlength");
        const currentLength = target.value.length;
        // update the visible counter text
        chars.innerHTML = maxLength - currentLength;
        // update the visually hidden counter text
        setTimeout(function() {
            srOutputTarget.innerHTML = maxLength - currentLength;
        },1000);
    });
}
```

```html
<label for="message">
  Your message
</label>

<textarea 
  id="message"
  maxlength="50"
  aria-describedby="charcounter">
</textarea>

<div role="status">
  <!-- Do not reference the status element with aria-describedby 
       Doing so will not work in VoiceOver -->
  <div id="charcounter" class="hint">
    <span id="currentChars">50</span> 
    of 50
    <span class="hidden">
      characters remaining
    </span>
  </div>
</div>
```
<!-- TODO JS for countdown of characters -->
<example>
   <label for="message">
   Your message
   </label>
   <textarea 
   id="message"
   maxlength="50"
   aria-describedby="charcounter">
   </textarea>
   <div role="status">
   <!-- Do not reference the status element with aria-describedby 
         Doing so will not work in VoiceOver -->
   <div id="charcounter" class="hint">
      <span id="currentChars">50</span> 
      of 50
      <span class="hidden">
         characters remaining
      </span>
   </div>
   </div>
</example>
