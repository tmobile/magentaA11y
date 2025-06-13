## General Notes

How to test a text input

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a text input

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Focus moves visibly to the input unless it's disabled

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the input
   - Keyboard: Keyboard appears

3. Listen to screenreader output on all devices

   - Name: Its purpose is clear
   - Role: It identifies itself as a text input
   - Group: Hints or errors are read after the label, related inputs include a group name (Ex: Enter your personal information)
   - State: If applicable, it expresses its state (required, disabled / dimmed / unavailable)

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/text-input](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/text-input)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a text input

GIVEN THAT I am on a page with a text input

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to a text input I SEE focus is strongly visually indicated

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use the tab key to move focus to a text input
      - I HEAR its purpose is clear
      - I HEAR it identifies itself as a text input
      - I HEAR hints or errors are read after the label, related inputs include a group name (Ex: Enter your personal information)
      - I HEAR if applicable, it expresses its state (required, disabled / dimmed / unavailable)

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to focus on a text input
      - I HEAR its purpose is clear
      - I HEAR it identifies itself as a text input
      - I HEAR hints or errors are read after the label, related inputs include a group name (Ex: Enter your personal information)
      - I HEAR if applicable, it expresses its state (required, disabled / dimmed / unavailable)

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/text-input](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/text-input)

## Code examples

### Use semantic HTML
This semantic HTML contains all accessibility features by default. 

```html
<label for="best-character-letter">
  The best Sesame Street character is:
</label>
<input type="text" 
       id="best-character-letter" 
       aria-describedby="best-character-letter-hint">

<div class="hint" id="best-character-letter-hint">
  Example: Elmo, Big Bird, Cookie Monster
</div>
```

<example>
<label for="best-character-letter">
  The best Sesame Street character is:
</label>
<input type="text" 
       id="best-character-letter" 
       aria-describedby="best-character-letter-hint">

<div class="hint" id="best-character-letter-hint">
  Example: Elmo, Big Bird, Cookie Monster
</div>
</example>

### Required input

```html
<label for="second-nato-letter">
 The second NATO letter is: <span>Required</span>
</label>
<input type="text"
       id="second-nato-letter"
       aria-required="true"
       required
       value="Bravo">
```

<!-- TODO: The code examples will need styling updates to make look pretty  -->

<example>
<label for="second-nato-letter">
 The second NATO letter is: <span>Required</span>
</label>
<input type="text"
       id="second-nato-letter"
       aria-required="true"
       required
       value="Bravo">
</example>

### Disabled but focusable input

   - There may be times that it is advantageous for the input to be disabled but still focusable
   - Fully disabled inputs are not focusable and may not be as discoverable in a form
   - Use `readonly` to prevent editing

```html
<label for="first-nato-letter">
  The first NATO letter is:
</label>
<input type="text" 
       id="first-nato-letter" 
       aria-disabled="true"
       value="Alpha"
       readonly>
```

<!-- TODO: The code examples will need styling updates to make look pretty  -->

<example>
<label for="first-nato-letter">
  The first NATO letter is:
</label>
<input type="text" 
       id="first-nato-letter" 
       aria-disabled="true"
       value="Alpha"
       readonly>
</example>

### Fully disabled input

   - Fully `disabled` inputs are not focusable so may not be as discoverable in a form

```html
<label for="last-nato-letter">
  The last NATO letter is:
</label>
<input type="text" 
       id="last-nato-letter"
       value="Zulu"
       disabled>
```

<!-- TODO: The code examples will need styling updates to make look pretty  -->

<example>
<label for="last-nato-letter">
  The last NATO letter is:
</label>
<input type="text" 
       id="last-nato-letter"
       value="Zulu"
       disabled>
</example>

### `readonly` input

   - Only use readonly when presenting **already submitted** information.
   - `readonly` inputs are focusable but not editable.
   - VoiceOver does not describe `readonly` attribute, so `aria-disabled` was added to reinforce that it's not editable.

```html
<label for="fourth-nato-letter">
  The fourth NATO letter is:
</label>
<input type="text"
       id="fourth-nato-letter"
       aria-readonly="true"
       aria-disabled="true"
       readonly
       value="Delta">
```

<!-- TODO: The code examples will need styling updates to make look pretty  -->

<example>
<label for="fourth-nato-letter">
  The fourth NATO letter is:
</label>
<input type="text"
       id="fourth-nato-letter"
       aria-readonly="true"
       aria-disabled="true"
       readonly
       value="Delta">
</example>

### Email input

   - Setting `type="email"` changes the keyboard for mobile app users

```html
<label for="email">
  Email address
</label>
<input id="email"
       type="email"
       autocomplete="email"
       spellcheck="false"
       aria-describedby="hint-email">
<div class="hint" id="hint-email">
  We’ll never sell or share your information
</div>
```

<!-- TODO: The code examples will need styling updates to make look pretty  -->

<example>
<label for="email">
  Email address
</label>
<input id="email"
       type="email"
       autocomplete="email"
       spellcheck="false"
       aria-describedby="hint-email">
<div class="hint" id="hint-email">
  We’ll never sell or share your information
</div>
</example>

### Group of inputs

After the screenreader focuses on each input, it will read the group name "Enter your personal information" after the input.

```html
<fieldset>
  <legend>
    Enter your personal information
  </legend>

  <label for="first-name">
    First name
  </label>
  <input type="text" id="first-name">

  <label for="last-name">
    Last name
  </label>
  <input type="text" id="last-name">

  <label for="username">
    Username
  </label>
  <input type="text" id="username">
</fieldset>
```

<!-- TODO: The code examples will need styling updates to make look pretty  -->

<example>
<fieldset>
  <legend>
    Enter your personal information
  </legend>

  <label for="first-name">
    First name
  </label>
  <input type="text" id="first-name">

  <label for="last-name">
    Last name
  </label>
  <input type="text" id="last-name">

  <label for="username">
    Username
  </label>
  <input type="text" id="username">
</fieldset>
</example>

## Developer notes

### Name
   - Include `for="input-id"` in each `<label>` label to associate it with the input
   - Use `aria-label="Input name"` as a last resort if a `<label>` can't be used
   - Don't hide the label on focus

### Role
   - Identifies as a text input

### Group
   - Include `for="input-id"` in each `<label>` label to associate it with the input
   - Use `<fieldset>` and `<legend>` to name a group of inputs

### Focus
   - Focus must be visible

## Further Reading
   - [WCAG 1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)
   - [WCAG 1.3.5 Identify Input Purpose (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose)
   - [WCAG 2.1.1 Keyboard (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard)
   - [WCAG SC 2.4.6 Headings and Labels (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html)
   - [WCAG 3.3.1 Error Identification (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/error-identification)
   - [WCAG 3.3.3 Error Suggestion (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion)
   - [WCAG 3.3.2 Labels or Instructions (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions) 
   - [WCAG 4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)

## Videos

### iOS VoiceOver

<video controls>
  <source src="media/video/web/text-input/text-input_IosVoiceOver.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback

<video controls>
  <source src="media/video/web/text-input/text-input_AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Windows JAWS Chrome

<video controls>
  <source src="media/video/web/text-input/text-input_WindowsJawsChrome.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Windows NVDA Chrome

<video controls>
  <source src="media/video/web/text-input/text-input_WindowsNvdaChrome.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### MacOS VoiceOver Safari

<video controls>
  <source src="media/video/web/text-input/text-input_MacOSVoiceOverSafari.webm" type="video/webm">
  Your browser does not support the video tag.
</video>
