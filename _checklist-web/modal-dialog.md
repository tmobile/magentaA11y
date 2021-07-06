---
layout: entry
title:  "Modal Dialog"
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
    When open, other content is inert
---

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

## Developer notes

- The `aria-haspopup` attribute has very low support across screen readers. It is recommended to not use this attribute on modal windows and dialog boxes.

### Name
- The modal window has a descriptive value from either:
  - `aria-label="Modal title"` or
  - `aria-labelledby="heading-id"` pointing to an `<h2>` as a title    

### Role
- For custom elements, use `role="dialog"`

### Group
- Upon closing, focus should return to the element that launched the dialog

### State
- Use `aria-modal="true"` to indicate content beneath the modal is inert.

### Focus
- Focus must be visible
- Upon closing, focus should return to the element that launched the dialog

### Documentation
- [Browser Support](https://caniuse.com/?search=dialog)


