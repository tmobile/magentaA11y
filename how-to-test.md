---
layout: page
title: How to test
permalink: /how-to/
---

Manual testing is not difficult or time consuming once a team understands keyboard interactions.

## 1. Test with the keyboard ONLY
{: .step }

It is crucial to **test with the keyboard first**, without the screenreader activated.

### Why keyboard is so important

- Keyboard accessibility is **prerequisite** to screen reader accessibility. (If it doesn't work here, it won't work with a screen reader).
- Screenreader applications will sometimes cover missing functionality that the sighted keyboard user won't be able to use.

### Devices

- Test with a mobile device and a bluetooth keyboard
- Test with a desktop device and a keyboard

### Browsers

- Any major browser (Chrome, Safari, Firefox) is acceptable for keyboard testing.
- Note: In Safari, you'll have to activate tab in Preferences » Advanced » Press Tab

## 2. Test with the desktop screenreader
{: .step }

### About the tab key

The tab key is not the only key the screenreaders use to browse content. Before you test, learn the difference between **interactive elements that should receive focus** with the tab key and **content that should not**.

- Arrow keys browse content for reading
- The tab key focuses interactive controls

Screenreaders can also consume content automatically, starting reading at the top with no keyboard interaction

### Do NOT use a mouse

- **Do not use the mouse** for screen reader testing.

## 3. Test with the mobile screenreader
{: .step }

Many websites have crossed the threshold to a majority of visits being from mobile devices.

- Follow the mobile gesture test instructions (swipe, tap, doubletap, etc.)
  - **Do NOT just tap** on elements, you must swipe to browse the content

### Devices

- Test in both Android and iOS devices
- After testing using mobile gestures, test with a mobile device and a bluetooth keyboard

### Browsers

Follow the screen reader browser pairings table

## About screen readers
{: .step }


### Screenreaders are all slightly different

- Screen readers all offer a slightly different experience.
- Not having all 5 screen readers available doesn't mean you can't test for accessibility.
- Most of the major accessibility defects you're likely to encounter will show up in any screen reader.

{::nomarkdown}
{% include /examples/table-screen-reader-browser-pairing.html %}
{:/}

## NVDA
{: .step }

<details>
  <summary>
    NVDA screenreader shortcuts
  </summary>
  {% include /examples/table-screen-reader-keyboard-shortcuts-nvda.html %}
  <p>Use the screenreader to list useful elements: headings, links and landmarks.</p>
  {% include /examples/table-screen-reader-keyboard-shortcuts-nvda-test.html %}
</details>

### Getting started

- Disable "Automatic Say All on page load" in NVDA Settings: Browse Mode
  - This will increase the conformance of NVDA

### NVDA differences

- NVDA has 2 modes with different keyboard shortcuts.
  - Browse (Red focus indicator)
    - Arrow keys will browse from element to element
  - Focus (Blue focus indicator)
    - Arrow keys will only interact with the interactive element in focus
- Only reads ~120 characters at at time
- Reads "clickable" when it detects a click event listener on an element, even when it's not clickable
  - (Note: If the element is not intended to be clickable, this is a defect to be remediated)
- Will read a button with `aria-haspopup="true"` as "menu submenu"
- Any element in focus like a dialog or section will be read in its entirety

## VoiceOver
{: .step }

<details>
  <summary>
    VoiceOver screenreader shortcuts
  </summary>
  {% include /examples/table-screen-reader-keyboard-shortcuts-voiceover.html %}
  <p>Use the screenreader to list useful elements: headings, links and landmarks.</p>
  {% include /examples/table-screen-reader-keyboard-shortcuts-voiceover-test.html %}
</details>

### VoiceOver differences

- Pairs with Safari
- Does not have multiple modes like NVDA or JAWS
- Voiceover will say "dimmed" instead of "disabled"
- It may say things in a different order than NVDA or JAWS but the core acceptance criteria are the same.

## JAWS
{: .step }

<details>
  <summary>
    JAWS screenreader shortcuts
  </summary>
  {% include /examples/table-screen-reader-keyboard-shortcuts-jaws.html %}
  <p>Use the screenreader to list useful elements: headings, links and landmarks.</p>
  {% include /examples/table-screen-reader-keyboard-shortcuts-jaws-test.html %}
</details>

### JAWS differences

- JAWS has 2 modes with different keyboard shortcuts
  - Browse 
    - Arrow keys will browse from element to element
  - Forms 
    - Arrow keys will only interact with the interactive element in focus
- Can fake click events on elements, meaning it may work with the screen reader but not just the keyboard
