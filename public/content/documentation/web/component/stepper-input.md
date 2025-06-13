## General Notes

How to test a stepper input

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a stepper input

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Focus moves to either the select field or buttons.
   - Enter or spacebar: 
      - If select is focused, expands the select and places focus on the currently selected option in the list. 
      - If focus is in the options, collapses the select and keeps the currently selected option.
      - If focus is on one of the buttons, it will either increment or decrement the value.
   - Arrow-keys: If select is focused, moves focus to and selects the next option.
   - Escape: If the select is displayed, collapses the select and moves focus to the button.
   - Home: If the select is displayed, moves focus to and selects the first option.
   - End: If the select is displayed, moves focus to and selects the last option.

2. Test mobile screenreader gestures

   - Swipe: Moves focus to each form control in the pattern.
   - Double-tap: If select is focused, opens select, selects option. Note: If a button is focused, it will either increment or decrement the value.

3. Listen to screenreader output on all devices

   - Name: Button labels are clear and include context. The select field's visual label is announced.
   - Role: For the select field it identifies itself as a select, popup button, menu/submenu or listbox. For the buttons they are identified as button.
   - Group: Its label is read with the input.
   - State: It indicates when the select is expanded/collapsed, indicates which option is selected.

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/stepper-input](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/stepper-input)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a stepper input

GIVEN THAT I am on a page with a stepper input

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to the first interactive item I SEE focus is strongly visually indicated
   - THEN when I use the arrow keys to select an option I SEE the selected option is changed
   - THEN when I use the escape key when the select is open I SEE it collapses and focus moves to the select
   - WHEN when I use the enter key is pressed on buttons I SEE the value is incremented or decremented

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND I use the tab key to move focus to the first interactive item AND 
      - I HEAR button labels are clear and include contextThe select field's visual label is announced
      - I HEAR for the select field it identifies itself as a select, popup button, menu/submenu or listboxFor the buttons they are identified as button
      - I HEAR its label is read with the input
      - I HEAR it indicates when the select is expanded/collapsed, indicates which option is selected
   - THEN when I use the arrow keys to select an option, I HEAR the selected option is changed
   - THEN when I use the escape key when the select is open, I HEAR it collapses and focus moves to the select
   - WHEN when I use the enter key is pressed on buttons I HEAR the value is incremented or decremented

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to focus on the form fields
      - I HEAR button labels are clear and include contextThe select field's visual label is announced
      - I HEAR for the select field it identifies itself as a select, popup button, menu/submenu or listboxFor the buttons they are identified as button
      - I HEAR its label is read with the input
      - I HEAR it indicates when the select is expanded/collapsed, indicates which option is selected
   - THEN when I doubletap with the select in focus I HEAR the picker/spinner opens
   - THEN when I doubletap with the button in focus I HEAR the value is incremented or decremented

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/stepper-input](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/stepper-input)

## Code examples

### Speciality stepper integer input
Before using this pattern, consider if using a plain [select dropdown](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/select/) might be more clear and simple for all users. A `<select>` does everything that the stepper input does, and with less code. Additionally, a `<select>` is a native HTML component and inherently accessible.

The stepper input component is useful for *small range increments*. If the max character count is more than 20, consider use of a [text Input](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/text-input/) field as this component will be cumbersome for people using a mouse.

```html
<div>
  <label for="stepper">
    Quantity
  </label>
  <div class="stepper">
      <button class="button minus" aria-label="Decrease Quantity" aria-disabled="true"></button>
      <select id="stepper"
               name="stepper-input"
               min="1"
               max="11"
               data-selected="1">
         <option value="1" selected>1</option>
         <option value="2">2</option>
         <option value="3">3</option>
         <option value="4">4</option>
         <option value="5">5</option>
         <option value="6">6</option>
         <option value="7">7</option>
         <option value="8">8</option>
         <option value="9">9</option>
         <option value="10">10</option>
         <option value="11">11</option>
      </select>
      <button class="button plus" aria-label="Increase Quantity"></button>
   </div>
  <!-- live container where "Quantity updated, [number]" will be dynamically updated -->
  <div aria-live="polite" class="hidden" id="stepper-status-target"></div>
</div>
```

<!-- TODO disabling buttons -->
<example>
   <div>
      <label for="stepper">
         Quantity
      </label>
      <div class="stepper">
            <button data-fn="decreaseSelectStepper" data-icon="minus" class="button minus" aria-label="Decrease Quantity" aria-disabled="true"></button>
            <select id="stepper"
                     name="stepper-input"
                     min="1"
                     max="11"
                     data-selected="1">
               <option value="1" selected>1</option>
               <option value="2">2</option>
               <option value="3">3</option>
               <option value="4">4</option>
               <option value="5">5</option>
               <option value="6">6</option>
               <option value="7">7</option>
               <option value="8">8</option>
               <option value="9">9</option>
               <option value="10">10</option>
               <option value="11">11</option>
            </select>
            <button data-fn="increaseSelectStepper" data-icon="plus" class="button plus" aria-label="Increase Quantity"></button>
         </div>
      <!-- live container where "Quantity updated, [number]" will be dynamically updated -->
      <div aria-live="polite" class="hidden" id="stepper-status-target-1"></div>
   </div>
</example>

### No-select stepper

   - Uses buttons to increment/decrement
   - Has an updating `aria-live` region to provide updates
   - Buttons should be disabled when the stepper hits its minimum or maximum value.

```html
<div class="stepper">
   <button id="decrement-button" data-fn="decreaseNumber" data-icon="minus" class="button minus" aria-label="Decrease Quantity" aria-disabled="true"></button>
   <span id="step-number">0</span>
   <button data-icon="plus"  data-fn="increaseNumber" class="button plus" aria-label="Increase Quantity"></button>
   <!-- live container where "Quantity updated, [number]" will be dynamically updated -->
   <div aria-live="polite" class="hidden" id="stepper-status-target"></div>
</div>
```

<!-- TODO disabling buttons -->
<example>
   <div class="stepper">
      <button id="decrement-button" data-fn="decreaseNumber" data-icon="minus" class="button minus" aria-label="Decrease Quantity" aria-disabled="true"></button>
      <span id="step-number">0</span>
      <button data-icon="plus"  data-fn="increaseNumber" class="button plus" aria-label="Increase Quantity"></button>
      <!-- live container where "Quantity updated, [number]" will be dynamically updated -->
      <div aria-live="polite" class="hidden" id="stepper-status-target"></div>
   </div>
</example>

## Developer notes

   - This stepper example provides both `button` and `select` elements for users to change a value.

   - A non-visual live container with `aria-live="polite"` is present in the DOM on page load. When the `button` element is activated, this non-visual live container is updated with dynamic content that screen reader users will hear announced as they increment or decrement the value. This dynamic text is then removed from the DOM after a few seconds (but not the actual container with `aria-live="polite"`) so the message is not discovered by screen reader users after interaction. The content of this message dynamically created based on the `label` for the `select` and the current value of the `select`, e.g. "Quantity updated, 4".

   - The value of the `select` element naturally communicates the updated value to screen reader users so the live container is not updated when interacting with that form element.

   - The `button` and `aria-label` values should be plain text and should include context of what they affect when activated (typically the label for the `select`), e.g. "Increase Quantity" or "Add Quantity".

   - The buttons will need `aria-disabled="true"` applied when either end of the range is reached.

   - Related alternative patterns: [Select dropdown](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/select/) or an [WAI-ARIA Spin Button](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/examples/datepicker-spinbuttons/).
