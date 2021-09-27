---
layout: page
title: How to test
permalink: /how-to/
---

Manual testing is not difficult or time consuming once a team understands keyboard interactions.

## 1. Test with the keyboard only

It is crucial to test with the keyboard first, without the screenreader activated.

### Why keyboard is so important

- Keyboard accessibility is prerequisite to screen reader accessibility. 
- Screenreader applications will sometimes cover missing functionality that the sighted keyboard user won't be able to use.

### Devices
- Test with a mobile device and a bluetooth keyboard
- Test with a desktop device and a keyboard

### Browsers
- Any major browser (Chrome, Safari, Firefox) is acceptable for keyboard testing.
- Note: In Safari, you'll have to activate tab in Preferences » Advanced » Press Tab

## 2. Test with the mobile screenreader

Many websites have crossed the threshold to a majority of visits being from mobile devices.

## 3. Test with the desktop screenreader

- Not having all three screen readers available doesn't mean you can't test for accessibility.
- Most of the major accessibility defects you're likely to encounter will show up in any screen reader.
  
{::nomarkdown}
{% include /examples/table-screen-reader-browser-pairing.html %}
{:/}

## Functional differences

Screen readers all offer a slightly different experience.

### NVDA 

- NVDA has 2 modes with different keyboard shortcuts.
  - Browse (Red focus indicator)
    - Arrow keys will browse from element to element
  - Focus (Blue focus indicator)
    - Arrow keys will only interact with the interactive element in focus
- Only reads ~120 characters at at time
- Read "clickable" when it detects a click event listener on an element, even when it's not clickable
- Will read a button with `aria-haspopup="true"` as "menu submenu"

### VoiceOver

- Voiceover will say "dimmed" instead of "disabled"

### JAWS

- JAWS has 2 modes with different keyboard shortcuts
  - Browse 
    - Arrow keys will browse from element to element
  - Forms 
    - Arrow keys will only interact with the interactive element in focus
- Can fake click events on elements, meaning it may work with the screen reader but not just the keyboard