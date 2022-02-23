---
layout: entry
title:  "Date picker dialog"
description: "How to test an accessible date picker for the Web"
categories: form

keyboard:
  tab: |
    Focus visibly moves to the date grid table and calendar navigation buttons
  escape: |
    The dialog closes and focus returns to the launch button
  arrow keys: |
    Date selection visibly moves through next/previous days
  page up/down	: | 
    Changes the grid of dates to the previous/next month.
  shift + page Up/down: |
    Changes the grid of dates to the previous/next year.
  home/end: |
    Moves focus to the first/last day of the current week.   
  spacebar or enter: |
    Activates the date picker buttons and calendar navigation buttons

mobile:
  swipe: |
    Focus moves through elements, expresses its state
  doubletap: |
    Activates the element in focus

screenreader:
  name:  |
    The purpose of each control is clear
  role:  |
    Buttons identify as buttons, 
    dialog identifies itself dialog or modal, 
    date grid table may identify itself as table or grid
  group: |
    The launch button indicates it has a popup, menu or dialog; days are announced with month and year
  state: |
    Date options express state (pressed, selected, disabled/dimmed)

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to the date dialog button
    result: |
      focus is strongly visually indicated
  - then:  |
      the spacebar and/or enter key
    result: |
      the date picker dialog appears
  - then:  |
      the arrow keys
    result: |
      the selection moves through next/previous dates
  - then:  |
      the home/end key
    result: |
      the selection moves to the first/last day of the current week
  - then:  |
      the page up/down key
    result: |
      the grid of dates moves to the next/previous month
  - then:  |
      shift key + page up/down
    result: |
      the grid of dates moves to the next/previous year
  - then:  |
      the spacebar and/or enter key
    result: |
      the button or selection is activated
  - then:  |
      the escape key
    result: |
      the date picker dialog disappears and focus returns to the date dialog button

gherkin-mobile:
  - when:  |
      swipe to focus on the date dialog button
  - then:  |
      doubletap with the button in focus
    result: |
      the date picker dialog appears
  - then:  |
      swipe through the dialog
    result: |
      the date options and controls come into focus
  - then:  |
      doubletap with the selection or button in focus
    result: |
      the intended action occurs

---

## Developer notes

[Full WAI-ARIA requirements](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html)

An accessible date picker will have the following components:
### Launch button
- Opens the date picker
- Focus returns to this button on closing the popup dialog

### Date picker popup dialog
- The dialog itself should be labelled by the month and year with `aria-labelledby="month-year-heading-id"`
- Use `aria-live="polite"` for the dialog, `aria-live="polite"` for month/year heading

### Calendar navigation buttons
- Use `aria-label="Previous"` and `aria-label="Next"` to name the buttons.

### Date grid table
- Use `aria-labelledby="month-year-heading-id"` to label the table

### Date picker buttons
  - Use `aria-selected="true"` to indicate state