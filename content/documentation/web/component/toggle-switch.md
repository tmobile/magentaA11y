## General Notes

How to test a toggle switch

## Videos

<!-- TODO: We don't have an Android Talkback example and should! -->

### iOS VoiceOver

<video controls>
  <source src="media/video/web/toggle-switch/toggle-switch_IosVoiceOver.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Windows JAWS Chrome

<video controls>
  <source src="media/video/web/toggle-switch/toggle-switch_WindowsJawsChrome.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Windows NVDA Chrome

<video controls>
  <source src="media/video/web/toggle-switch/toggle-switch_WindowsNvdaChrome.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### MacOS VoiceOver Safari

<video controls>
  <source src="media/video/web/toggle-switch/toggle-switch_MacOsVoiceOverSafari.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a toggle switch

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Focus visibly moves to the switch
   - Spacebar: Toggles the switch between states

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the element, expresses its state
   - Doubletap: Element toggles between states

3. Listen to screenreader output on all devices

   - Name: Its label and purpose is clear
   - Role: It identifies its role of switch, toggle button or checkbox
   - Group: Hints or errors are read after the label and related inputs include a group name (Ex: Account settings)
   - State: It expresses its state (on/off, checked/unchecked, disabled/dimmed)

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/toggle-switch](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/toggle-switch)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a toggle switch

GIVEN THAT I am on a page with a toggle switch

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to a switch I SEE focus is strongly visually indicated
   - THEN when I use the spacebar to activate the switch I SEE the state is changed

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use the tab key to move focus to a switch
      - I HEAR its label and purpose is clear
      - I HEAR it identifies its role of switch, toggle button or checkbox
      - I HEAR hints or errors are read after the label and related inputs include a group name (Ex: Account settings)
      - I HEAR it expresses its state (on/off, checked/unchecked, disabled/dimmed)
   - THEN when I use the spacebar to activate the switch I HEAR the state is changed

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to focus on a switch input
      - I HEAR its label and purpose is clear
      - I HEAR it identifies its role of switch, toggle button or checkbox
      - I HEAR Hints or errors are read after the label and related inputs include a group name (Ex: Account settings)
      - I HEAR it expresses its state (on/off, checked/unchecked, disabled/dimmed)
   - THEN when I doubletap with the switch in focus I HEAR the state is changed

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/toggle-switch](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/toggle-switch)

## Code examples

### Use as much semantic HTML as possible

   - This semantic HTML contains all accessibility features by default, and only requires the addition of `role="switch"`. 
   - It uses [CSS pseudo attributes](https://github.com/tmobile/magentaA11y/blob/main/_sass/modules/_input-switch.scss) to create the toggle switch indicator, no Javascript

```html
<fieldset>
  <legend>Privacy settings:</legend>
  <input class="hidden-visually" type="checkbox" role="switch" id="locationSwitch">
  <label for="locationSwitch">Share my location</label>

  <input class="hidden-visually" type="checkbox" role="switch" id="emailSwitch">
  <label for="emailSwitch">Share my email</label>

  <input class="hidden-visually"
         type="checkbox"
         role="switch"
         id="photosSwitch"
         checked>
  <label for="photosSwitch">Share my photos</label>
</fieldset>
```

<example>
   <fieldset class="switch">
      <legend>Privacy settings:</legend>
      <input class="hidden-visually" type="checkbox" role="switch" id="locationSwitch">
      <label for="locationSwitch">Share my location</label>
      <input class="hidden-visually" type="checkbox" role="switch" id="emailSwitch">
      <label for="emailSwitch">Share my email</label>
      <input class="hidden-visually"
               type="checkbox"
               role="switch"
               id="photosSwitch"
               checked>
      <label for="photosSwitch">Share my photos</label>
   </fieldset>
</example>

### Disabled and focusable

If it's helpful for screenreaders to perceive a disabled toggle, use `aria-disabled="true"` and prevent click events with scripting.

```html
<fieldset>
  <legend>Choose your cookies</legend>

  <input class="hidden-visually"
         type="checkbox"
        role="switch" 
        id="mandatoryCookies" 
        aria-disabled="true" 
        checked>
  <label for="mandatoryCookies">Cookies required for the site to function</label>
  
  <input class="hidden-visually" type="checkbox" role="switch" id="raisinCookies" aria-disabled="true" >
  <label for="raisinCookies">Raisin cookies</label>

  <input class="hidden-visually" type="checkbox" role="switch" id="optionalCookies" checked>
  <label for="optionalCookies">Optional marketing cookies</label>

</fieldset>
```
<!-- TODO need to preventDefaut for aria-disabed and figure out why checked state cannot be changed -->
<example>
   <fieldset class="switch">
      <legend>Choose your cookies</legend>
      <input class="hidden-visually"
            type="checkbox"
            role="switch" 
            id="mandatoryCookies" 
            aria-disabled="true" 
            checked>
      <label for="mandatoryCookies">Cookies required for the site to function</label>    
      <input class="hidden-visually" type="checkbox" role="switch" id="raisinCookies" aria-disabled="true">
      <label for="raisinCookies">Raisin cookies</label>
      <input class="hidden-visually" type="checkbox" role="switch" id="optionalCookies" checked>
      <label for="optionalCookies">Optional marketing cookies</label>
   </fieldset>
</example>

### Disabled and not focusable

Using the `disabled` attribute will prevent the input from being clickable, but will also prevent it from being focusable, making it more difficult to discover for screenreaders.

```html
<input type="checkbox"
        role="switch"
        id="deltaSwitch"
        disabled
        checked>
<label for="deltaSwitch">Delta</label>
```

### Using a `<button>` as a switch

This `<button>` toggle has focus and keyboard criteria built in. It requires the addition of `role="switch"` and scripting to toggle `aria-checked="true/false"`.

```html
<button role="switch" aria-checked="true">
  Alpha
</button>
```

### When you can't use semantic HTML

This custom switch requires extra attributes and keyboard event listeners.

```html
<div role="switch" tabindex="0" aria-checked="true">
  Alpha
</div>
```

## Developer notes

### Name

   - `label` text should describe the input purpose
   - Use `aria-describedby="hint-id"` for hints or additional descriptions
   - `aria-label="Switch [purpose]"` can also be used (as a last resort)

### Role

   - Use `role="switch"`

### Group

   - Semantic HTML
      - `<fieldset>` should wrap a switch group
      - `<legend>` should describe the group's purpose
      - Each `<label>` must include `for="input-id"` to be associated with its input
   - Custom elements
      - Use `role="group"` in the place of fieldset
      - Use `aria-labelledby="label-id"` to associate an element as a label
      - `aria-label="Group purpose"` can also be used if there's no label with an `id`

### State

   - Semantic HTML
      - Use `checked` for native HTML
      - Use the `disabled` state for inactive switches
   - Custom element
      - Use `aria-checked="true/false"` to express state
      - Use `aria-disabled="true"` to declare inactive elements
      - Use `aria-readonly="true"` to declare a switch can't be edited

### Focus

   - Focus must be visible
