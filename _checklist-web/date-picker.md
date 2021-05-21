---
layout: entry
title:  "Date picker dialog"
categories: form

keyboard:
  tab: |
    Focus visibly moves to the date grid table and calendar navigation buttons
  escape: |
    The dialog closes and focus returns to the launch button
  arrow keys: |
    Focus visibly moves through next/previous days
  spacebar: |
    Activates the date picker buttons and calendar navigation buttons
  enter: |
    Activates the date picker buttons and calendar navigation buttons
  page up/down	: | 
    Changes the grid of dates to the previous/next month.
  shift + page Up/down: |
    Changes the grid of dates to the previous/next year.
  home/end: |
    Moves focus to the first/last day of the current week.   
           
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
      Launch button indicates it has a popup, days are announced with month and year
  state: |
      Date buttons express state (pressed, disabled/dimmed)
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