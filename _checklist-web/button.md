---
layout: entry
title:  "Button"
description: "How to code and test accessible buttons for the Web"
categories: nav form
order: 1

keyboard:
  tab: |
    Focus visibly moves to the button.
  spacebar: |
    Activates the button.
  enter: |
    Activates the button.

screenreader:
  name:  |
    Its purpose is clear
  role:  |
    It identifies its role of button
  group: |
    It indicates if it has popup for listbox or menus
  state: |
    It expresses its state if applicable (pressed, expanded, disabled)

mobile:
  swipe: |
    Focus moves to the element, expresses its state
  doubletap: |
    Activates the button

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to a button
    result: |
      focus is strongly visually indicated
  - then:  |
      the spacebar and/or enter key to activate the button
    result: |
      the intended action occurs

gherkin-mobile:
  - when:  |
      swipe to focus on a button
  - then:  |
      doubletap with the button in focus
    result: |
      the intended action occurs


---


## Code examples

### Use semantic HTML
This semantic HTML contains all accessibility features by default.

{% highlight html %}
{% include /examples/button.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/button.html %}
</example>
{:/}

### Focusable disabled button

The preferred method is to use `aria-disabled="true"` so screen reader users can find the button, click submit and be notified of errors in the form.

{% highlight html %}
{% include /examples/button-focusable-disabled.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/button-focusable-disabled.html %}
</example>
{:/}

### Fully disabled button

A button that uses the disabled attribute will not be focusable, but it is still discoverable by the screen reader while browsing.

{% highlight html %}
{% include /examples/button-disabled.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/button-disabled.html %}
</example>
{:/}

### When you can't use semantic HTML

This custom button requires extra attributes and JS event listeners. Adding `tabindex="0"` makes it focusable.

{% highlight html %}
<div role="button" tabindex="0">
  Continue
</div>
{% endhighlight %}

### When there is no inner text

As a last resort, `aria-label` can be used.

{% highlight html %}
<div role="button" tabindex="0" aria-label="Continue">
  <!-- icon -->
</div>
{% endhighlight %}


### When there are repeating buttons

Sometimes the design will call for multiple buttons with the same text label. In a case like this, `aria-label` can be used to name each control's purpose.

{% highlight html %}
<button aria-label="Edit payment date">
  Edit
</div>
<button aria-label="Edit payment amount">
  Edit
</div>
{% endhighlight %}

## Developer notes

### Name
- Inner text should describe the purpose of the button.
- `aria-label="Button purpose"` can also be used (as a last resort)

### Role
- Native button identifies as button by default
- Use `role="button"` for custom elements

### Group
- Use `aria-haspopup="true"` for menu, listbox or modal
- `aria-controls="popupId"` is not well supported

### State
- Toggle buttons `aria-pressed="true/false"`
- Menus or expanders use `aria-expanded="true/false"` 
- Use the `disabled` state for inactive buttons 
- Use `aria-disabled="true/false"` state for inactive custom elements 

### Focus
- Focus must be visible
- Custom elements need `tabindex="0"` to be focusable
