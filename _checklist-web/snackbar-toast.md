---
layout: entry
title:  "Toast Snackbar"
description: "How to code and test an snackbar or toast for Web"

categories: main form

keyboard:
  tab: |
    Focus visibly moves in logical order to the toast.
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
    The element announces its purpose or title
  role:  |
    Identifies itself as an alert or status
  group: |
    When closed, focus returns to a logical place in the page
  state: |
    Toast remains open until closed by user
        

---

## Only use toast to reinforce updates

Toast snackbars should only be used for non-critical messaging, and the status described should be discernable on the page.

For example, upon changing state of a toggle to unsubscribe from a list, the toast can reinforce the change has been saved, but the user can also confirm this from the toggle itself.

## Do not use toast for critical functionality

Never use toast for critical tasks (Ex: undo/unsend or confirmation of choices).

## Timing

It is preferable to not let a toast snackbar time out. 
