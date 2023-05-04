---
layout: two-column-how-to-test
title: How to test
permalink: /how-to/
---
# How to test
Manual testing is not difficult or time consuming once a team understands keyboard interactions.

## <step-number>1</step-number> Test with the keyboard only
{: .divider }

It is crucial to **test with only the keyboard first**, without the screen reader activated.

### Why keyboard testing is so important

- Keyboard accessibility is **prerequisite** to screen reader accessibility. 
  - If it doesn't work with only the keyboard, it won't work with a screen reader.
- screen reader applications will sometimes cover missing functionality that the sighted keyboard user won't be able to use.

### Devices

- Test with a mobile device and a bluetooth keyboard
- Test with a desktop device and a keyboard

### Browsers

- Any major browser (Chrome, Safari, Firefox) is acceptable for keyboard testing.
- Note: In Safari, you'll have to activate tab in Preferences » Advanced » Press Tab

## <step-number>2</step-number> Test with mobile screen readers
{: .divider }

Because many websites have crossed the threshold to a majority of visits being from mobile devices this may be higher priority than desktop testing.

- Follow the mobile gesture test instructions (swipe, tap, doubletap, etc.)
  - **Do not tap** on elements to navigate, you must swipe to browse the content in a linear pattern

### Devices

- Test in both Android and iOS devices
- After testing using mobile gestures, test with a mobile device and a bluetooth keyboard

### Browsers

Follow the [screen reader browser pairings table](#screen-readers-are-all-slightly-different)

## <step-number>3</step-number> Test with desktop screen readers
{: .divider }

### About the tab key

The tab key is not the only key the screen readers use to browse content. Before you test, learn the difference between **interactive elements that should receive focus** with the tab key and **content that should not**.

- Arrow keys browse content for reading
- The tab key focuses interactive controls
- screen readers can also consume content automatically, starting reading at the top with no keyboard interaction

### Do not use a mouse

- **Do not use the mouse** for screen reader testing.

## About screen readers
{: .divider }

### Screen readers are all slightly different

- Screen readers all offer a slightly different experience.
- Not having all 5 screen readers available doesn't mean you can't test for accessibility.
- Most of the major accessibility defects you're likely to encounter will show up in any screen reader.

{::nomarkdown}
{% include /examples/table-screen-reader-browser-pairing.html %}
{:/}

## NVDA + Windows
{: .divider }

<details>
  <summary>
    NVDA screen reader shortcuts
  </summary>
  {% include /examples/table-screen-reader-keyboard-shortcuts-nvda.html %}
  <p>Use the screen reader to list useful elements: headings, links and landmarks.</p>
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

## VoiceOver + MacOS
{: .divider }

<details>
  <summary>
    VoiceOver screen reader shortcuts
  </summary>
  {% include /examples/table-screen-reader-keyboard-shortcuts-voiceover.html %}
  <p>Use the screen reader to list useful elements: headings, links and landmarks.</p>
  {% include /examples/table-screen-reader-keyboard-shortcuts-voiceover-test.html %}
</details>

### VoiceOver differences

- Pairs with Safari
- Does not have multiple modes like NVDA or JAWS
- Voiceover will say "dimmed" instead of "disabled"
- It may say things in a different order than NVDA or JAWS but the core acceptance criteria are the same.

## JAWS + Windows
{: .divider }

<details>
  <summary>
    JAWS screen reader shortcuts
  </summary>
  {% include /examples/table-screen-reader-keyboard-shortcuts-jaws.html %}
  <p>Use the screen reader to list useful elements: headings, links and landmarks.</p>
  {% include /examples/table-screen-reader-keyboard-shortcuts-jaws-test.html %}
</details>

### JAWS differences

- JAWS has 2 modes with different keyboard shortcuts
  - Browse 
    - Arrow keys will browse from element to element
  - Forms 
    - Arrow keys will only interact with the interactive element in focus
- Can fake click events on elements, meaning it may work with the screen reader but not just the keyboard
