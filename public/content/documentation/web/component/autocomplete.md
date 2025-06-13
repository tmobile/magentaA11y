## General Notes

How to test an autocomplete input with listbox

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Focus moves visibly to the text input
   - Arrow-keys: Focus moves to and selects the next option. If the textbox is empty and the listbox is not displayed, opens the listbox and moves visual focus to the next option. In both cases DOM focus remains on the textbox.
   - Enter: The textbox value is set to the content of the selected option. The listbox closes.
   - Escape: Clears the textbox. If the listbox is displayed, closes it.

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the input, traverses list
   - Doubletap: Opens select, chooses option

3. Listen to screenreader output on all devices

   - Name: Its purpose is clear
   - Role: It identifies itself as a select, popup, menu/submenu, listbox or combobox
   - Group: Its label is read and selected options are read
   - State: It indicates the value of the text input
     
Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/autocomplete](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/autocomplete)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test an autocomplete input with listbox

GIVEN THAT I am on a page with an autocomplete input with listbox

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to the text input I SEE focus is strongly visually indicated
   - THEN when I use the arrow keys to select an option I SEE the selected option is the new text input value
   - THEN when I use the enter key I SEE the selected option is changed and focus returns to the text input
   - THEN when I use the escape key when the select is open I SEE it collapses and focus moves to the text input

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND I use the tab key to move focus to the text input
      - I HEAR its purpose is clear
      - I HEAR it identifies itself as a select, popup, menu/submenu, listbox or combobox
      - I HEAR its label is read and selected options are read
      - I HEAR it indicates the value of the text input
   - THEN when I use the arrow keys to select an option I HEAR the selected option is the new text input value
   - THEN when I use the enter key I HEAR the selected option is changed and focus returns to the text input
   - THEN when I use the escape key when the select is open I HEAR it collapses and focus moves to the text input

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND I swipe to focus on a select
      - I HEAR its purpose is clear
      - I HEAR it identifies itself as a select, popup, menu/submenu, listbox or combobox
      - I HEAR its label is read and selected options are read
      - I HEAR it indicates the value of the text input
   - THEN when I doubletap with the select in focus I HEAR the selected option is changed


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/autocomplete](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/autocomplete)

## Code Examples

### Custom listbox with autocomplete
Custom listboxes are notoriously difficult to build in an accessible fashion for screenreaders.

- [WCAG Examples](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/)

### Semantic input with datalist autocomplete

- This simple native HTML example illustrates all the functionality of a listbox with inline autocomplete. 
  - Support and functionality on mobile devices varies.

```html
<label for="favorite-nato-text">
  What's your favorite NATO letter?:
</label>
<input id="favorite-nato-text" 
       list="nato-letters" 
       type="text">
       
<datalist id="nato-letters"> 
  <option value="Alpha"> 
  <option value="Bravo"> 
  <option value="Charlie"> 
  <option value="Delta">
  <option value="Echo">
  <option value="Foxtrot">
  <option value="Golf">
  <option value="Hotel">
  <option value="India">
  <option value="Juliet">
  <option value="Kilo">
  <option value="Lima">
  <option value="Mike">
  <option value="November">
  <option value="Oscar">
  <option value="Papa">
  <option value="Quebec">
  <option value="Romeo">
  <option value="Sierra">
  <option value="Tango">
  <option value="Uniform">
  <option value="Victor">
  <option value="Whiskey">
  <option value="X-ray">
  <option value="Yankee">
  <option value="Zulu">
</datalist>
```
<example>
   <label for="favorite-nato-text">
  What's your favorite NATO letter?:
</label>
<input id="favorite-nato-text" 
       list="nato-letters" 
       type="text">
<datalist id="nato-letters"> 
  <option value="Alpha"> 
  <option value="Bravo"> 
  <option value="Charlie"> 
  <option value="Delta">
  <option value="Echo">
  <option value="Foxtrot">
  <option value="Golf">
  <option value="Hotel">
  <option value="India">
  <option value="Juliet">
  <option value="Kilo">
  <option value="Lima">
  <option value="Mike">
  <option value="November">
  <option value="Oscar">
  <option value="Papa">
  <option value="Quebec">
  <option value="Romeo">
  <option value="Sierra">
  <option value="Tango">
  <option value="Uniform">
  <option value="Victor">
  <option value="Whiskey">
  <option value="X-ray">
  <option value="Yankee">
  <option value="Zulu">
</datalist>
</example>

