## General Notes

How to test a number input

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a number input

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Focus moves visibly to the input
   - Number keys: Numbers are entered
   - Non-number keys: Nothing is entered

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the input, numeric keypad is revealed

3. Listen to screenreader output on all devices

   - Name: Its purpose is clear
   - Role: It identifies itself as an editable input
   - Group: Hints or errors are read after the label, related inputs include a group name (Ex: Enter your personal information)
   - State: If applicable, it expresses its state (required, disabled / dimmed / unavailable)

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/number-input](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/number-input)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a number input

GIVEN THAT I am on a page with a number input field

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to a number input I SEE focus is strongly visually indicated
   - THEN when I use the number keys I SEE numbers are entered
   - THEN when I use non-number keys I SEE nothing is entered

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) 
      - AND I use the tab key to move focus to a number input
      - I HEAR its purpose is clear
      - I HEAR it identifies itself as an editable input
      - I HEAR hints or errors are read after the label, related inputs include a group name (Ex: Enter your personal information)
      - I HEAR if applicable, it expresses its state (required, disabled / dimmed / unavailable)
   - THEN when I use the number keys I HEAR numbers are entered
   - THEN when I use non-number keys I HEAR nothing is entered

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver)
      - AND I swipe to focus on a number input
      - I HEAR its purpose is clear
      - I HEAR it identifies itself as an editable input
      - I HEAR hints or errors are read after the label, related inputs include a group name (Ex: Enter your personal information)
      - I HEAR if applicable, it expresses its state (required, disabled / dimmed / unavailable)
   - THEN when I enter a number I HEAR the numeric keypad is revealed

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/number-input](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/number-input)

## Code examples

### Don't use `type="number"`

The `type="number"` input is intended for **integers** and includes features we _don't_ want (like stepper/scroll functionality) that is a nuisance to everyone 

- Phone, credit card, pin etc. are not integers
- NVDA doesn't fully support `type="number"` inputs at this time

### Use `type="text"` for number inputs

Use `type=text` with `inputmode="numeric"` with an input pattern and JavaScript to filter out non-numeric characters.

```html
<label for="pin">
  Pin number
</label>
<input type="text"
       id="pin"
       aria-describedby="hint"
       inputmode="numeric"
       pattern="[0-9]*">
<div id="hint" class="hint">
  The pin number will expire after 1 hour
</div>
```
<!-- TODO for all examples, this is allowing letters AND numbers despite pattern -->
<example>
   <label for="pin">
   Pin number
   </label>
   <input type="text"
         id="pin"
         aria-describedby="hint"
         inputmode="numeric"
         pattern="[0-9]*">
   <div id="hint" class="hint">
   The pin number will expire after 1 hour
   </div>
</example>

### Disabled and focusable number input (preferred)

- Using the `aria-disabled` attribute will allow the input to be focusable and more discoverable

```html
<label for="security-id">
  Security ID number
</label>
<input type="text"
       id="security-id"
       aria-describedby="security-id-hint"
       inputmode="numeric"
       pattern="[0-9]*"
       aria-disabled="true">
<div id="security-id-hint" class="hint">
  The Security ID number will expire after 1 hour
</div>
```

<!-- TODO need to preventDefault / make it appear disabled, also this is allowing letters AND numbers despite pattern -->
<!-- <example>
   <label for="security-id">
   Security ID number
   </label>
   <input type="text"
         id="security-id"
         aria-describedby="security-id-hint"
         inputmode="numeric"
         pattern="[0-9]*"
         aria-disabled="true">
   <div id="security-id-hint" class="hint">
   The Security ID number will expire after 1 hour
   </div>
</example> -->

### Fully disabled number input (avoid)

- Fully `disabled` inputs are not focusable so may not be as discoverable in a form

```html
<label for="pin-disabled">
  Pin number
</label>
<input type="text"
       id="pin-disabled"
       inputmode="numeric"
       pattern="[0-9]*"
       disabled>
```

<example>
   <label for="pin-disabled">
   Pin number
   </label>
   <input type="text"
         id="pin-disabled"
         inputmode="numeric"
         pattern="[0-9]*"
         disabled>
</example>

### Telephone number input

- Setting type="tel" changes the keyboard for mobile app users

```html
<label for="phone">
  Phone number
</label>
<input type="tel"
       id="phone"
       inputmode="numeric"
       autocomplete="tel"
       aria-describedby="hint-phone">
<div class="hint" id="hint-phone">
  We’ll never sell or share your information
</div>
```

<!-- TODO this is allowing letters -->
<example>
   <label for="phone">
   Phone number
   </label>
   <input type="tel"
         id="phone"
         inputmode="numeric"
         autocomplete="tel"
         aria-describedby="hint-phone">
   <div class="hint" id="hint-phone">
   We’ll never sell or share your information
   </div>
</example>

## Developer notes

- [Why the GOV.UK Design System team changed the input type for numbers](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/)
- [Stepper/counter input example](/web-criteria/component/stepper-input)

### Name
- Include `for="input-id` in each `<label>` label to associate it with the input
- Use `aria-label="Input name"` as a last resort if a `<label>` can't be used
- Don't hide the label on focus

### Role
- Identifies as a text input


### Group
- Include `for="input-id` in each `<label>` label to associate it with the input
- Use `<fieldset>` and `<legend>` to name a group of inputs.

### Focus
- Focus must be visible