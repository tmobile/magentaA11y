---
layout: entry
title:  "Modal Dialog"
description: "How to code and test an accessible modal dialog popup for Web"
categories: main

keyboard:
  tab: |
    Focus visibly moves only within the dialog, starting with the dialog element itself on launch
  escape: |
    The dialog closes and returns focus to the button that launched it
  space: |
    Any buttons are activated
  enter: |
    Any buttons or links are activated
  arrow-keys: |
    Screen reader browses only within the dialog

mobile:
  swipe: |
    Focus moves within the dialog and doesn't enter the rest of the page.
  doubletap: |
    This typically activates most elements.

screenreader:
  name:  |
    The dialog describes its purpose or title on launch
  role:  |
    Identifies itself as a modal or dialog
  group: |
    When closed, focus returns to the launch button
  state: |
    When open, content behind the modal is inert
---

## Required attributes

### Launch button
- Should be a button, not a link
- Upon closing, focus should return to the button that launched the dialog
- **Do not**  use`aria-haspopup`. This attribute has very low and support and unpredictable output across screen readers. 

### Name
- The modal window has a logical descriptive name from either:
  - `aria-label="Modal title"` or
  - `aria-labelledby="heading-id"` pointing to an `<h2>` as a title    

### Role
- Use `role="dialog"` so the screen reader can identify this as a dialog or modal

### Group
- Upon closing, focus should return to the button that launched the dialog

### State
- Use `aria-modal="true"` to indicate content beneath the modal is inert and that the screen reader should not browse outside the dialog.

### Focus
- use `tabindex="-1"` to make the modal itself targetable for focus
- Focus must be visible
- Upon closing, focus should return to the button that launched the dialog

### Documentation
- [Browser Support](https://caniuse.com/?search=dialog)

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

