## General Notes

How to test a hint, help, or error

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a hint, help, or error

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: The input comes into focus

2. Test mobile screenreader gestures

   - Swipe: The input's name is read. Then the hint, help, or error text is read

3. Listen to screenreader output on all devices

   - Name: After the input name, the role and state is read. Then the hint, help, or error is read
   - Role: When it appears dynamically, an error is read automatically

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/help-hint-error](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/help-hint-error)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a hint, help, or error

GIVEN THAT I am on a page with a hint, help, or error

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to an input I SEE hint, help, or error text meets size and contrast requirements

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use the tab key to move focus to an input
      - I HEAR after the input name, the role and state is read, THEN the hint, help, or error is read
      - I HEAR when it appears dynamically, an error is read automatically

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to focus on an input
      - I HEAR after the input name, the role and state is read, THEN the hint, help, or error is read
      - I HEAR when it appears dynamically, an error is read automatically

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/help-hint-error](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/help-hint-error)

## Code examples

### Adding hint/help text

```html
<label for="best-sesame-street-character">
  The best Sesame Street character is:
</label>
<input type="text" 
       id="best-sesame-street-character" 
       aria-describedby="best-sesame-street-character-hint">

<div class="hint" id="best-sesame-street-character-hint">
  Example: Elmo, Big Bird, Cookie Monster, Grover, Oscar the Grouch
</div>
```

<!-- TODO: needs JS added to ensure it functions well -->

<example>
<label for="best-sesame-street-character">
  The best Sesame Street character is:
</label>
<input type="text" 
       id="best-sesame-street-character" 
       aria-describedby="best-sesame-street-character-hint">

<div class="hint" id="best-sesame-street-character-hint">
  Example: Elmo, Big Bird, Cookie Monster, Grover, Oscar the Grouch
</div>
</example>

### Adding an error

**Note:** The alert must be structured as below to function properly in VoiceOver, with the alert text nested inside the `role="alert"` element.

```html
<label for="favorite-sesame-street-character-letter">
  What is your Sesame Street character?
  <span>Required</span>
</label>

<input type="text"
       id="favorite-sesame-street-character"
       aria-describedby="favorite-sesame-street-character-error favorite-sesame-street-character-hint"
       required>

<div role="alert" 
     id="favorite-sesame-street-character-alert" 
     class="alert inert">
  <!--- Do not reference this alert element
        directly with aria-describedby -->
  <div id="favorite-sesame-street-character-error">
    <!--- Use JS to inject the alert here -->
  </div>     
</div>

<div class="hint" id="favorite-sesame-street-character-hint">
  Example: Elmo, Big Bird, Cookie Monster, Grover, Oscar the Grouch
</div>

<button id="show-error">
  Toggle error
</button>
```

<!-- TODO: needs JS added to ensure it functions well -->

<example>
<label for="favorite-sesame-street-character-letter">
  What is your favorite Sesame Street character?
  <span>Required</span>
</label>

<input type="text"
       id="favorite-sesame-street-character"
       aria-describedby="favorite-sesame-street-character-error favorite-sesame-street-character-hint"
       required>

<div role="alert" 
     id="favorite-sesame-street-character-alert" 
     class="alert inert">
  <!--- Do not reference this alert element
        directly with aria-describedby -->
  <div id="favorite-sesame-street-character-error">
    <!--- Use JS to inject the alert here -->
  </div>     
</div>

<div class="hint" id="favorite-sesame-street-character-hint">
  Example: Elmo, Big Bird, Cookie Monster, Grover, Oscar the Grouch
</div>

<button id="show-error">
  Toggle error
</button>
</example>

### When there is no hint or alert

Using `aria-describedby` with a `"uniqueID"` that doesn't exist on page yet will generate errors in automated syntax checking tools. 

If it's not possible to remove the attribute, there are ways to avoid the error flag.

#### Option 1: Leave `aria-describedby=""` empty until the hint exists (preferred)

This is preferred because the DOM is cleaner.

```html 
<label for="favorite-pickle">
  What is your favorite pickle?
</label>
<input type="text"
       id="favorite-pickle"
       aria-describedby="">
       <!-- Leave aria-describedby attribute empty -->
```

#### Option 2: Leave the empty hint element in the DOM

This technique shouldn't have any significant side effects; however it does leave additional elements in the DOM which is unnecessary.

```html
<label for="favorite-snack">
  What is your favorite snack?
</label>
<input type="text"
       id="favorite-snack"
       aria-describedby="hint-favorite-snack">
<div class="hint" id="hint-favorite-snack">
  <!-- Leave the hint element empty -->
</div>
```

## Developer notes

### Browser + screenreader quirks

   - Screenreaders do not implement alerts uniformly and must be tested.
      - Just because an alert pattern works in one screenreader doesn't mean it will work in all three screenreaders.
   - The element referenced by the `aria-describedby` attribute cannot use the `role="alert"` attribute (see example above for workaround). 
      - [VoiceOver fails to read a referenced `role="alert"` element when the input is in focus](https://a11ysupport.io/tests/tech__aria__aria-describedby-with-role-alert).
   - NVDA will read the alert twice if it appears while the input is in focus: once from the `role="alert"` being injected and again from the `aria-describedby` association.
   - NVDA needs a fraction of a second to catch up with changes in the DOM, use a `setTimeout` to delay displaying the alert.
