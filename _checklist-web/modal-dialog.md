---
layout: entry
title:  "Modal Dialog"
description: "How to code and test an accessible modal dialog popup for Web"
categories: main

keyboard:
  launch button: |
    Focus visibly moves to the open dialog itself
  arrow keys: |
    Content only within the dialog is browsed in logical order
  tab: |
    Focus visibly moves only within the dialog, starting with the first interactive control (typically close button)
  escape: |
    The dialog closes and returns focus to the button that launched it
  space: |
    Any buttons are activated
  enter: |
    Any buttons or links are activated
  
mobile:
  swipe: |
    Focus moves within the dialog and doesn't enter the rest of the page.
  doubletap: |
    This typically activates most elements.

screenreader:
  name:  |
    The dialog describes its purpose or title on launch
  role:  |
    It identifies itself as a modal or dialog
  group: |
    When closed, focus returns to the launch button
  state: |
    When open, content behind the modal remains inert

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to the launch button and use  spacebar and/or enter key to activate the button
    result: |
      the dialog opens
  - then:  |
      the tab key or arrow keys
    result: |
      focus stays trapped in the modal dialog
  - then:  |
      the escape key
    result: |
      focus returns to the launch button
  - or:  |
      the tab key to move focus to the dismiss/close button <strong>AND THEN</strong> use the spacebar or enter key to activate the dismiss/close button
    result: |
      focus returns to the launch button

gherkin-mobile:
  - when:  |
      swipe to focus to the launch button
  - then:  |
      doubletap with the button in focus
    result: |
      the dialog opens
  - then:  |
      swipe within the modal dialog
    result: |
      focus stays trapped in the modal dialog
  - then:  |
      swipe to move focus to the dismiss/close button <strong>AND THEN</strong> double tap on the close button
    result: |
      focus returns to the launch button
---

## Required attributes

### Launch button
- Should be a button, not a link
- Upon closing, focus must return to the button that launched the dialog
- **Do not**  use`aria-haspopup`. This attribute has very low and support and unpredictable output across screen readers. 

### Name
- The modal window has a logical descriptive name from either:
  - `aria-label="Modal title"` or
  - `aria-labelledby="heading-id"` pointing to an `<h2>` as a title    

### Role
- Use `role="dialog"` so the screen reader can identify this as a dialog or modal

### Group
- Upon closing, focus must return to the button that launched the dialog

### State
- Use `aria-modal="true"` to indicate content beneath the modal is inert and that the screen reader must not browse outside the dialog.

### Focus
- Use `tabindex="-1"` to make the modal itself targetable for focus
- Upon closing, focus must return to the button that launched the dialog

### Documentation
- [Browser Support](https://caniuse.com/?search=dialog)

## Screenreader differences

- NVDA
  - By default, NVDA may the entire modal upon launch. This is expected behavior.


## Code examples

### Use semantic HTML where possible

Browser support for `<dialog>` is still incomplete. 

Some browsers require additional scripting. This simple example works in Chrome, but [may not work correctly in all browsers](https://caniuse.com/?search=dialog) such as Safari and Firefox.

{% highlight html %}
{% include /examples/modal-dialog.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/modal-dialog.html %}
</example>
{:/}