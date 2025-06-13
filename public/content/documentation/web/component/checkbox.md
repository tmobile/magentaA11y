## General Notes

How to test a checkbox

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a checkbox

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Focus visibly moves to the checkbox
   - Spacebar: Toggles the checkbox between states

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the element, expresses its state
   - Doubletap: Checkbox toggles between checked and unchecked states

3. Listen to screenreader output on all devices

   - Name: Its label and purpose is clear
   - Role: It identifies its role of checkbox
   - Group: Hints or errors are read after the label and related inputs include a group name (ex: Account settings)
   - State: It expresses its state (checked/unchecked, disabled)

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/checkbox](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/checkbox)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a checkbox

GIVEN THAT I am on a page with a checkbox

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to a checkbox I SEE focus is strongly visually indicated
   - THEN when I use the spacebar to activate the checkbox I SEE the state is changed

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use the tab key to move focus to a checkbox
      - I HEAR its label and purpose is clear
      - I HEAR it identifies its role of checkbox
      - I HEAR hints or errors are read after the label and related inputs include a group name (ex: Account settings)
      - I HEAR it expresses its state (checked/unchecked, disabled)
   - THEN when I use the spacebar to activate the checkbox I HEAR the state is changed

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to focus on a checkbox input
      - I HEAR its label and purpose is clear
      - I HEAR it identifies its role of checkbox
      - I HEAR hints or errors are read after the label and related inputs include a group name (ex: Account settings)
      - I HEAR it expresses its state (checked/unchecked, disabled)
   - THEN when I doubletap with the checkbox in focus I HEAR the state is changed

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/checkbox](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/checkbox)

## Code examples

### Use semantic HTML

   - This semantic HTML contains all accessibility features by default.
   - It uses [CSS pseudo attributes](https://github.com/tmobile/magentaA11y/blob/main/_sass/modules/_input-checkbox.scss) to create the checkbox indicator, without Javascript.

```html
<fieldset>
  <legend>Choose your favorite Sesame Street characters:</legend>

  <input type="checkbox" id="elmoCheckbox">
  <label for="elmoCheckbox">Elmo</label>

  <input type="checkbox" id="bigBirdCheckbox">
  <label for="bigBirdCheckbox">Big Bird</label>

  <input type="checkbox" id="cookieCheckbox" checked>
  <label for="cookieCheckbox">Cookie Monster</label>
</fieldset>
```

<example>
<fieldset>
  <legend>Choose your favorite Sesame Street characters:</legend>

  <input type="checkbox" id="elmoCheckbox">
  <label for="elmoCheckbox">Elmo</label>

  <input type="checkbox" id="bigBirdCheckbox">
  <label for="bigBirdCheckbox">Big Bird</label>

  <input type="checkbox" id="cookieCheckbox" checked>
  <label for="cookieCheckbox">Cookie Monster</label>
</fieldset>
</example>

### Don't put interactive elements inside the label

Even though this is valid HTML, it creates unpredictable results with screenreaders. A (currently) reliable method is to keep interactive elements outside the label and reference it with `aria-describedby="hint-id"`

```html
<fieldset>
  <legend>Legal disclaimers</legend>
  <div id="hint-tc" class="hint-checkbox">
    <a href="/code-of-conduct/">Read terms and conditions</a>
  </div>
  <input type="checkbox"
         id="tc-agree"
         aria-describedby="hint-tc">
  <label for="tc-agree">
    I agree to the terms and conditions
  </label>
</fieldset>
```

<example>
<fieldset>
  <legend>Legal disclaimers</legend>
  <div id="hint-tc" class="hint-checkbox">
    <a href="/code-of-conduct/">Read terms and conditions</a>
  </div>
  <input type="checkbox"
         id="tc-agree"
         aria-describedby="hint-tc">
  <label for="tc-agree">
    I agree to the terms and conditions
  </label>
</fieldset>
</example>

### Disabled and focusable checkbox (preferred)

   - An input using `aria-disabled="true` will be focusable with the tab key
   - Use JS to `preventDefault()`

```html
<fieldset>
  <legend>Choose your favorite fruit</legend>

  <input type="checkbox" id="lemonsCheckbox" aria-disabled="true" checked>
  <label for="lemonsCheckbox">Lemons</label>

  <input type="checkbox" id="limesCheckbox" aria-disabled="true">
  <label for="limesCheckbox">Limes</label>

</fieldset>
```

<example>
<fieldset>
  <legend>Choose your favorite fruit</legend>

  <input type="checkbox" id="lemonsCheckbox" aria-disabled="true" checked>
  <label for="lemonsCheckbox">Lemons</label>

  <input type="checkbox" id="limesCheckbox" aria-disabled="true">
  <label for="limesCheckbox">Limes</label>

</fieldset>
</example>

### Fully disabled checkbox

   - An input using the `disabled` attribute will not be focusable with the tab key
   - Arrow keys will still be able to browse disabled inputs

```html
<fieldset>
  <legend>Choose your favorite video game</legend>

  <input type="checkbox" id="marioCheckbox" disabled checked>
  <label for="marioCheckbox">MarioKart</label>

  <input type="checkbox" id="zeldaCheckbox" disabled>
  <label for="zeldaCheckbox">Legend of Zelda</label>

</fieldset>
```

<example>
<fieldset>
  <legend>Choose your favorite video game</legend>

  <input type="checkbox" id="marioCheckbox" disabled checked>
  <label for="marioCheckbox">MarioKart</label>

  <input type="checkbox" id="zeldaCheckbox" disabled>
  <label for="zeldaCheckbox">Legend of Zelda</label>

</fieldset>
</example>

### When you can't use semantic HTML

This custom checkbox requires extra attributes and event listeners:

```html
<div role="checkbox" tabindex="0" aria-checked="true">
  Elmo
</div>
```

### Speciality checkboxes

Sometimes a design may call for a card-type checkbox. 
   - Its core should still be a semantic checkbox input
   - Use `aria-describedby` to read extra content _after_ the the name, role, and state

```html
<ul class="cards">
  <li class="card interactive">
    <input type="checkbox"
           id="oscarCheckboxCard"
           aria-describedby="descriptionOscar" >
    <label for="oscarCheckboxCard">
      Oscar the Grouch
    </label>
    <div class="extended-description"
         id="descriptionOscar">
      Oscar has a green body, no visible 
      nose, and lives in a trash can.
    </div>
  </li>
  <li class="card interactive">
    <input type="checkbox"
           id="groverCheckboxCard"
           aria-describedby="descriptionGrover" >
    <label for="groverCheckboxCard">
      Grover
      </label>
    <div class="extended-description"
         id="descriptionGrover">
      Grover is a self-described as lovable, cute, 
      and furry, he is a blue monster who rarely 
      uses contractions when he speaks or sings.
    </div>
  </li>
</ul>
```

<example>
<ul class="cards">
  <li class="card interactive">
    <input type="checkbox"
           id="oscarCheckboxCard"
           aria-describedby="descriptionOscar" >
    <label for="oscarCheckboxCard">
      Oscar the Grouch
    </label>
    <div class="extended-description"
         id="descriptionOscar">
      Oscar has a green body, no visible 
      nose, and lives in a trash can.
    </div>
  </li>
  <li class="card interactive">
    <input type="checkbox"
           id="groverCheckboxCard"
           aria-describedby="descriptionGrover" >
    <label for="groverCheckboxCard">
      Grover
      </label>
    <div class="extended-description"
         id="descriptionGrover">
      Grover is a self-described as lovable, cute, 
      and furry, he is a blue monster who rarely 
      uses contractions when he speaks or sings.
    </div>
  </li>
</ul>
</example>

## Developer notes

### Name
   - The `label` text must describe the checkbox input
   - Use `aria-describedby="hint-id"` for hints or additional descriptions
   - `aria-label="Checkbox input purpose"` can also be used (as a last resort)

### Role
   - **By default**, semantic HTML checkbox inputs identify as a checkbox
   - Use `role="checkbox"` for custom elements

### Group
   - Semantic HTML
      - `<fieldset>` wraps a checkbox group
      - `<legend>` describes the group's purpose
      - Each `<label>` must include `for="input-id"` to be associated with its input
   - Custom elements
      - Use `role="group"` in the place of fieldset
      - Use `aria-labelledby="label-id"` to associate an element as a label
      - `aria-label="Group purpose"` can also be used if there's no label with an `id`

### State
   - Semantic HTML
      - Use `checked` for native HTML
      - Use the `disabled` state for inactive checkboxes
   - Custom element
      - Use `aria-checked="true/false"` to express state
      - Use `aria-disabled="true"` to declare inactive elements

### Focus
   - Focus must be visible
   - Custom elements will require keyboard event listeners

## Videos

### iOS VoiceOver

<video controls>
  <source src="media/video/web/checkbox/checkbox_IosVoiceOver.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback

<video controls>
  <source src="media/video/web/checkbox/checkbox_AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Windows JAWS Chrome

<video controls>
  <source src="media/video/web/checkbox/checkbox_WindowsJawsChrome.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Windows NVDA Chrome

<video controls>
  <source src="media/video/web/checkbox/checkbox_WindowsNvdaChrome.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### MacOS VoiceOver Safari

<video controls>
  <source src="media/video/web/checkbox/checkbox_MacOsVoiceOverSafari.webm" type="video/webm">
  Your browser does not support the video tag.
</video>
