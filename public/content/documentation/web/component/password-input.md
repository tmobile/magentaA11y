## General Notes

How to test a password input

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

1. Test keyboard only, then screen reader + keyboard actions
   - Tab: Focus moves visibly to the input or show password checkbox
   - Spacebar: Toggles the show password checkbox

2. Test mobile screenreader gestures
   - Swipe: Focus moves to the input
   - Keyboard: Keyboard appears

3. Listen to screenreader output on all devices
   - Name: Its purpose is clear
   - Role: It identifies itself as a text input
   - Group: Hints or errors are read after the label (Ex: Password formatting)
   - State: It expresses if the password is being shown and if applicable: required, disabled / dimmed / unavailable

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/password-input](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/password-input)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a password input

GIVEN THAT I am on a page with a password input

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to the password input I SEE focus is strongly visually indicated
   - THEN when I use the tab key to move focus to the show/hide password feature I SEE its name, role and state
   - THEN when I use the show/hide password feature I SEE the state of the password visibility (with or without characters entered)

2. Desktop screenreader
   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND I use the tab key to move focus to the password input
     - I HEAR its purpose is clear
     - I HEAR it identifies itself as a text input
     - I HEAR hints or errors are read after the label (Ex: Password formatting)
     - I HEAR it expresses if the password is being shown and if applicable: required, disabled / dimmed / unavailable
   - THEN when I use the tab key to move focus to the show/hide password feature I HEAR its name, role and state
   - THEN when I use the show/hide password feature I HEAR the state of the password visibility (with or without characters entered)

3. Mobile screenreader
   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND I swipe to focus on a password input
     - I HEAR its purpose is clear
     - I HEAR it identifies itself as a text input
     - I HEAR hints or errors are read after the label (Ex: Password formatting)
     - I HEAR it expresses if the password is being shown and if applicable: required, disabled / dimmed / unavailable


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/password-input](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/password-input)

## Code Examples

### Checkbox variant
   - This semantic HTML contains all accessibility features by default.
   - Placing the show password checkbox ahead of the password input increases discoverability for screen reader users.
     - CSS pseudo elements are used in the checkbox label to express its state on focus of the password input.

```html
<form class="password-container">
  <label for="password">
    Password
    <span class="helper" aria-hidden="true">
      Required
    </span>
  </label>
  <div id="password-toggle" class="password-toggle">
    <input type="checkbox" id="show-password">
    <label for="show-password">
      Show Password
    </label>
  </div>
  <input type="password"
         id="password"
         aria-describedby="password-toggle password-hint"
         aria-required="true"
         required>
  <div id="password-hint" class="hint">
    Use any length of characters including emojis.
  </div>
</form>
```

[\\]: # (TODO The show/hide button does not hide the password.)
<example>
<form class="password-container">
  <label for="password">
    Password
    <span class="helper" aria-hidden="true">
      Required
    </span>
  </label>
  <div id="password-toggle" class="password-toggle">
    <input type="checkbox" id="show-password">
    <label for="show-password">
      Show Password
    </label>
  </div>
  <input type="password"
         id="password"
         aria-describedby="password-toggle password-hint"
         aria-required="true"
         required>
  <div id="password-hint" class="hint">
    Use any length of characters including emojis.
  </div>
</form>
</example>

### Button variant
   - The show/hide button recieves focus before the input so screen reader and keyboard-only users can change the state before interacting with the field.
   - The `password` field type toggles between type of `password` and `text`.
   - A live region `role="status"` is used to automatically announce to screen reader users the current visibility of the password value. For example, “Password is currently visible”.
     - Avoid adding `aria-hidden="true"` or CSS `display: none;` to the live region container that receives the dynamic update as this may impact screen reader support.
     - Ensure the dynamic text, that is added to the live region, is removed from the DOM after a short amount of time so screen reader users do not encounter this text while navigating beyond the form field.

```html
<form class="password-container button-variant" data-show-password="false" onsubmit="return false;">
    <label for="password-b">
      Password
      <span class="helper" aria-hidden="true">
        Required
      </span>
    </label>
    <div class="password-wrapper">
        <div id="password-toggle" class="password-toggle">
            <button class="tertiary" type="button">
                <span class="show-pass">
                    show <span class="hidden">password</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1.3rem" role="img" aria-hidden="true" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                </span>
                <span class="hide-pass">
                    hide <span class="hidden">password</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1.3rem" role="img" aria-hidden="true" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>
                </span>
            </button>
          </div>
          <input type="password"
                 id="password-b"
                 aria-describedby="password-hint"
                 aria-required="true"
                 value="passwordhere"
                 required>
    </div>
    <div id="password-hint" class="hint">
      Use any length of characters including emojis.
    </div>
    <!-- this is dynamically announced by the screen reader when updated but content is removed after a pause so it can't be discovered -->
    <div class="password-live-region hidden" role="status">
        <div id="password-state-status"></div>
    </div>
  </form>
```

<!-- <example>
<form class="password-container button-variant" data-show-password="false" onsubmit="return false;">
    <label for="password-b">
      Password
      <span class="helper" aria-hidden="true">
        Required
      </span>
    </label>
    <div class="password-wrapper">
        <div id="password-toggle" class="password-toggle">
            <button class="tertiary" type="button">
                <span class="show-pass">
                    show <span class="hidden">password</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1.3rem" role="img" aria-hidden="true" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                </span>
                <span class="hide-pass">
                    hide <span class="hidden">password</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1.3rem" role="img" aria-hidden="true" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>
                </span>
            </button>
          </div>
          <input type="password"
                 id="password-b"
                 aria-describedby="password-hint"
                 aria-required="true"
                 value="passwordhere"
                 required>
    </div>
    <div id="password-hint" class="hint">
      Use any length of characters including emojis.
    </div>
    
TODO: Below is a comment. Remember to include this when unhiding the component.
this is dynamically announced by the screen reader when updated but content is removed after a pause so it can't be discovered 

    <div class="password-live-region hidden" role="status">
        <div id="password-state-status"></div>
    </div>
  </form>
</example> --->

## Developer Notes

### Name
   - Include `for="input-id"` in each `<label>` label to associate it with the input
   - Use `aria-label="Input name"` as a last resort if a `<label>` can’t be used

### Role
   - Identifies as some kind of secure input [or text when toggled to text]

### State
-  The show password checkbox must indicate its state on focus

### Group
   - Include `for="input-id"` in each `<label>` label to associate it with the input
   - Use `<fieldset>` and `<legend>` to name a group of inputs

### Focus
   - Focus must be visible

