## General Notes

How to test a radio button

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a radio button

1. Test keyboard only, then screen reader + keyboard actions

      - Tab: Focus visibly moves to the checked radio button in the group. If a radio button is not checked, focus moves to the first radio button in the group.

      - Spacebar: If the radio button with focus is not checked, changes the state to checked.  Otherwise, does nothing.

      - Arrow-keys: Moves focus to and checks the previous or next radio button in the group

2. Test mobile screenreader gestures

      - Swipe: Focus moves to the element, expresses its state

      - Doubletap: If the radio button with focus is not checked, changes the state to checked. Otherwise, does nothing.

3. Listen to screenreader output on all devices

      - Name: Its label and purpose is clear

      - Role: It identifies itself as a radio option

      - Group: Hints or errors are read after the label and related inputs include a group name (ex: Shipping options)

      - State: It expresses its state (selected, checked, disabled)

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/form/radio-button](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/form/radio-button)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a radio button

GIVEN THAT I am on a page with a radio button

1. Keyboard for mobile & desktop

      - WHEN I use the tab key to move focus to a radio group I SEE focus is strongly visually indicated on the first unselected option or the selected option

      - THEN when I use the spacebar to activate the radio button I SEE the radio button with focus change state to selected.

      - THEN when I use the arrow keys to focus radio button I SEE the state is changed

2. Desktop screenreader

      - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 

      - I use the tab key to move focus to a radio group
         - I HEAR its label and purpose is clear
         - I HEAR it identifies itself as a radio option
         - I HEAR hints or errors are read after the label and related inputs include a group name (ex: Shipping options)
         - I HEAR it expresses its state (selected, checked, disabled)

      - THEN when I use the spacebar to activate the radio button I HEAR the radio button with focus change state to selected.

      - THEN when I use the arrow keys to focus radio button I HEAR the state is changed

3. Mobile screenreader

      - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND

      - I swipe to focus on a radio button
         - I HEAR its label and purpose is clear
         - I HEAR it identifies itself as a radio option
         - I HEAR hints or errors are read after the label and related inputs include a group name (ex: Shipping options)
         - I HEAR it expresses its state (selected, checked, disabled)

      - THEN when I doubletap with the radio in focus I HEAR the state is changed


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/form/radio-button](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/form/radio-button)

## Code examples

### Use semantic HTML

- This semantic HTML contains all accessibility features by default.
- It uses [CSS pseudo attributes](https://github.com/tmobile/magentaA11y/blob/main/_sass/modules/_input-radio.scss) to create the radio indicator, no Javascript.

```html
<fieldset>
  <legend>
    Choose your favorite NATO letter
  </legend>

  <input type="radio" name="nato" id="alphaRadio">
  <label for="alphaRadio">Alpha</label>

  <input type="radio" name="nato" id="bravoRadio">
  <label for="bravoRadio">Bravo</label>

  <input type="radio" name="nato" id="charlieRadio" aria-describedby="hint-charlie" checked>
  <label for="charlieRadio">Charlie</label>
  <div class="hint" id="hint-charlie">This is the third NATO letter</div>
</fieldset>
```

<!-- TODO: get radio examples styled and working as expected
<example>
<fieldset>
  <legend>
    Choose your favorite NATO letter
  </legend>

  <input type="radio" name="nato" id="alphaRadio">
  <label for="alphaRadio">Alpha</label>

  <input type="radio" name="nato" id="bravoRadio">
  <label for="bravoRadio">Bravo</label>

  <input type="radio" name="nato" id="charlieRadio" aria-describedby="hint-charlie" checked>
  <label for="charlieRadio">Charlie</label>
  <div class="hint" id="hint-charlie">This is the third NATO letter</div>
</fieldset>
</example>
-->

### Disabled and focusable radio inputs (preferred)

- An input using `aria-disabled="true"` will be focusable with the tab key
- Use JS to preventDefault()

```html
<fieldset>
  <legend>
    Choose your favorite dance
  </legend>

  <input type="radio" name="dance" id="carltonRadio" aria-disabled="true">
  <label for="carltonRadio">Carlton</label>

  <input type="radio" name="dance" id="foxtrotRadio">
  <label for="foxtrotRadio">Foxtrot</label>

  <input type="radio" name="dance" id="tangoRadio" checked>
  <label for="tangoRadio">Tango</label>
</fieldset>
```

<!-- TODO: get radio examples styled and working as expected
<example>
<fieldset>
  <legend>
    Choose your favorite dance
  </legend>

  <input type="radio" name="dance" id="carltonRadio" aria-disabled="true">
  <label for="carltonRadio">Carlton</label>

  <input type="radio" name="dance" id="foxtrotRadio">
  <label for="foxtrotRadio">Foxtrot</label>

  <input type="radio" name="dance" id="tangoRadio" checked>
  <label for="tangoRadio">Tango</label>
</fieldset>
</example>
-->

### Required radio inputs

Ensuring all screenreaders indicate radio inputs as being required requires some aria and reinforcement.

- Use `aria-required="true"` to indicate the group is required
- Use `aria-invalid="true/false"` to indicate an error state
- Add `role="radiogroup"` to the `<fieldset>` to make the `aria-required` attribute valid
- Add "Required" as text to the `<legend>` to ensure compliance across all platforms

```html
<fieldset aria-required="true" 
          aria-invalid="true" 
          role="radiogroup">
  <legend>
    Choose your second favorite NATO letter <span>Required</span>
  </legend>

  <input type="radio" name="natoReq" id="deltaRadioReq">
  <label for="deltaRadioReq">Delta</label>

  <input type="radio" name="natoReq" id="echoRadioReq">
  <label for="echoRadioReq">Echo</label>

  <input type="radio" name="natoReq" id="foxtrotRadioReq">
  <label for="foxtrotRadioReq">Foxtrot</label>
</fieldset>
```

<!-- TODO: get radio examples styled and working as expected
<example>
<fieldset aria-required="true" 
          aria-invalid="true" 
          role="radiogroup">
  <legend>
    Choose your second favorite NATO letter <span>Required</span>
  </legend>

  <input type="radio" name="natoReq" id="deltaRadioReq">
  <label for="deltaRadioReq">Delta</label>

  <input type="radio" name="natoReq" id="echoRadioReq">
  <label for="echoRadioReq">Echo</label>

  <input type="radio" name="natoReq" id="foxtrotRadioReq">
  <label for="foxtrotRadioReq">Foxtrot</label>
</fieldset>
</example>
-->

### Radio button cards

```html
<ul class="cards">
  <li class="card interactive">
    <input type="radio"
           name="radioCards"
           id="deltaRadioCard"
           aria-describedby="hint-deltaRadioCard" >
    <label for="deltaRadioCard">
      Delta
    </label>
    <div class="extended-description"
         id="hint-deltaRadioCard">
      Delta (prounounced: <strong>dell</strong>-tah)
      is the fourth letter of the NATO alphabet.
    </div>
  </li>
  <li class="card interactive">
    <input type="radio"
           name="radioCards"
           id="echoRadioCard"
           aria-describedby="hint-echoRadioCard">
    <label for="echoRadioCard">Echo</label>
    <div class="extended-description"
         id="hint-echoRadioCard">
      Echo (prounounced: <strong>eck</strong>-oh)
      is the fifth letter of the NATO alphabet.
    </div>
  </li>
</ul>
```

<!-- TODO: get radio examples styled and working as expected
<example>
<ul class="cards">
  <li class="card interactive">
    <input type="radio"
           name="radioCards"
           id="deltaRadioCard"
           aria-describedby="hint-deltaRadioCard" >
    <label for="deltaRadioCard">
      Delta
    </label>
    <div class="extended-description"
         id="hint-deltaRadioCard">
      Delta (prounounced: <strong>dell</strong>-tah)
      is the fourth letter of the NATO alphabet.
    </div>
  </li>
  <li class="card interactive">
    <input type="radio"
           name="radioCards"
           id="echoRadioCard"
           aria-describedby="hint-echoRadioCard">
    <label for="echoRadioCard">Echo</label>
    <div class="extended-description"
         id="hint-echoRadioCard">
      Echo (prounounced: <strong>eck</strong>-oh)
      is the fifth letter of the NATO alphabet.
    </div>
  </li>
</ul>
</example>
-->


### When you can't use semantic HTML

This custom button requires extra scripting work for roving tabindex and event listeners.

```html
<custom-label id="labelId">
    Which is your favorite NATO letter:
</custom-label>
<div role="radiogroup" aria-labelledby="labelId">
  <custom-element role="radio" tabindex="-1">
    Alpha
  </custom-element>
  <custom-element role="radio" tabindex="-1">
    Bravo
  </custom-element>
  <custom-element role="radio" tabindex="-1">
    Charlie
  </custom-element>  
</div>
```

## Specialty use cases

### Radio mixed with interactive elements

**Avoid** this pattern when possible! Radio groups are not supposed to consist of nested interactive elements. Radio button focus order is not what you may expect.

- By default, it is not expected behavior that each radio button can be tabbed to. This is how radio buttons naturally behave
- As soon as a radio button is selected, the selected radio input receives focus first from the group. As a result screen reader users may not discover a nested control for an option if they start switching between radio buttons alone
- To try to mitigate screen reader users not discovering the nested controls, describe the fieldset / radiogroup with non-visual text. This can be done with <code>aria-describedby</code> on the <code>fieldset</code>. For example, "Edit controls are available which follow each radio button"

- Ensure the nested controls also have additional context defined by <code>aria-describedby</code>. This will help screen reader users understand their purpose. 
- Use of the same <code>name</code> attribute is important to link the radio buttons as a programmatic group
- Keyboard functionality such as arrow up/down/left/right should change the selected radio button.
  
```html
<fieldset class="checkbox-radio-group" aria-describedby="styled-radio-group-helper-text">
  <legend>Choose your payment method:</legend>
  <!-- Visually hidden helper text describing fieldset -->
  <!-- This text should only be present in the DOM if the radio group has nested controls. Hiding it with CSS display: none; is not enough to hide it from screen readers. Ensure aria-describedby on the fieldset does not point to an ID that is not in the DOM -->
  <span class="hidden" id="styled-radio-group-helper-text">
    Edit controls are available which follow each radio button
  </span>
  <input class="radio" type="radio" name="checkboxRadioGroup2" id="checkboxRadioAlpha2" checked>
  <label for="checkboxRadioAlpha2">
    Alpha
  </label>
  <button type="button" class="tertiary" aria-describedby="checkboxRadioAlpha2">
    Edit
  </button>

  <input class="radio" type="radio" name="checkboxRadioGroup2" id="checkboxRadioBravo2">
  <label for="checkboxRadioBravo2">
    Bravo
  </label>
  <button type="button" class="tertiary" aria-describedby="checkboxRadioBravo2">
    Edit
  </button>

  <input class="radio" type="radio" name="checkboxRadioGroup2" id="checkboxRadioCharlie3">
  <label for="checkboxRadioCharlie3">
    Charlie
  </label>
  <button type="button" class="tertiary" aria-describedby="checkboxRadioCharlie3">
    Edit
  </button>
</fieldset>
```
<!-- TODO: get radio examples styled and working as expected
<example>
<fieldset class="checkbox-radio-group" aria-describedby="styled-radio-group-helper-text">
  <legend>Choose your payment method:</legend>
  <!-- Visually hidden helper text describing fieldset -->
  <!-- This text should only be present in the DOM if the radio group has nested controls. Hiding it with CSS display: none; is not enough to hide it from screen readers. Ensure aria-describedby on the fieldset does not point to an ID that is not in the DOM -- ADD CLOSING COMMENT HERE
  <span class="hidden" id="styled-radio-group-helper-text">
    Edit controls are available which follow each radio button
  </span>
  <input class="radio" type="radio" name="checkboxRadioGroup2" id="checkboxRadioAlpha2" checked>
  <label for="checkboxRadioAlpha2">
    Alpha
  </label>
  <button type="button" class="tertiary" aria-describedby="checkboxRadioAlpha2">
    Edit
  </button>

  <input class="radio" type="radio" name="checkboxRadioGroup2" id="checkboxRadioBravo2">
  <label for="checkboxRadioBravo2">
    Bravo
  </label>
  <button type="button" class="tertiary" aria-describedby="checkboxRadioBravo2">
    Edit
  </button>

  <input class="radio" type="radio" name="checkboxRadioGroup2" id="checkboxRadioCharlie3">
  <label for="checkboxRadioCharlie3">
    Charlie
  </label>
  <button type="button" class="tertiary" aria-describedby="checkboxRadioCharlie3">
    Edit
  </button>
</fieldset>
</example>
-->

## Developer notes

### Name
- `label` text must describe the radio input.
- Use `aria-describedby="hint-id"` for hints or additional descriptions
- `aria-label="Radio input purpose"` can also be used (as a last resort)

### Role
- **By default**, semantic HTML radio inputs identify as radio button
- Use `role="radio"` for custom elements

### Group
- Semantic HTML
    - `<fieldset>` must wrap the radio group
    - `<legend>` must describe the group's purpose
    - Each `<label>` must include `for="input-id"` to be associated with its input
- Custom elements
    - Use `role="radiogroup"` to take the place of fieldset
    - Use `aria-labelledby="label-id"` to associate an element as a label
    - `aria-label="Group purpose"` can also be used if there's no label with an ID

### State
- Semantic HTML
    - `checked` (will be read as "selected" by screen reader)
    - Use the `disabled` state for inactive buttons
- Custom element
    - Use `aria-checked="true/false"` to express state
    - Use `aria-disabled="true"` to declare inactive elements

### Focus
- Focus must be visible
- Custom elements will require keyboard event listeners and roving tabindex
- **DO NOT** put interactive elements inbetween radio inputs.
  - Performs its purpose across platforms, devices and viewports


## Thanks

- [Support for Marking Radio Buttons Required, Invalid - Adrian Roselli](https://adrianroselli.com/2022/02/support-for-marking-radio-buttons-required-invalid.html)


## Further Reading
- [WCAG 1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)
- [WCAG 2.1.1 Keyboard (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard)
- [WCAG 3.3.1 Error Identification (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/error-identification)
- [WCAG 3.3.2 Labels or Instructions (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions) 
- [WCAG 3.3.3 Error Suggestion (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion)
- [WCAG 4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)


## Videos

### iOS Voiceover

<video controls>
  <source src="media/video/web/radio/radioiOSVoiceover.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback

<video controls>
  <source src="media/video/web/radio/radioAndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### MacOS Voiceover Safari

<video controls>
  <source src="media/video/web/radio/radioMacOSVoiceoverSafari.webm" type="video/webm">
  Your browser does not support the video tag.
</video>
