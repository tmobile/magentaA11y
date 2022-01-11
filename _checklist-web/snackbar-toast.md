---
layout: entry
title:  "Toast Snackbar"
description: "How to code and test an snackbar or toast for Web"
categories: main form

keyboard:
  tab: |
    Focus visibly moves in logical order to buttons or links inside the toast
  space: |
    Any buttons inside are activated
  enter: |
    Any links or buttons inside are activated

mobile:
  swipe: |
    Focus moves in logical order to the toast
  doubletap: |
    This typically activates most elements in the toast

screenreader:
  name:  |
    The toast is read when it appears (BUT focus DOES NOT transfer automatically when the toast appears)
  role:  |
    It identifies itself as an alert or status when it appears
  group: |
    If it is possible to close the toast, focus then returns to a logical place in the page
  state: |
    It remains open until closed by user

gherkin-keyboard: 
  - when:  |
      use features that trigger the toast
    result: |
      the toast (BUT focus DOES NOT transfer automatically when the alert appears)

gherkin-mobile:
  - when:  |
      use features that trigger the toast snackbar
---

## Avoid using toast snackbars

It's **exceedingly rare** that this is a good design choice and a more conventional HTML element shouldn't be used instead.

## Only use toast to reinforce updates

Toast snackbars should only be used for non-critical messaging, and the status described should be discernable on the page without the snackbar.

### Practical example

Given that I am on a dyamic single page app

- WHEN the customer changes the state of a toggle to OFF
- THEN the toast appears to _reinforce_ that the change has been saved
- AND the customer can **also** confirm this is true from the toggle itself

## Do not use toast for critical functionality

Never use toast for critical tasks (Ex: undo/unsend or confirmation of choices).

## Timing

It is preferable to not let a toast snackbar time out. 
