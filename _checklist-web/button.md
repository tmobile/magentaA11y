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

### When there's no inner text that text doesn't make sense

- As a last resort, `aria-label` can be used.
- `aria-label` will (typically) replace the inner text of the button for the screen reader output.
- DO NOT repeat the inner text in the `aria-label` as some screenreaders will read both.

{% highlight html %}
<div role="button" tabindex="0" aria-label="Continue">
  <!-- icon but no text -->
</div>

<div role="button" tabindex="0" aria-label="Add iPhone 17 to cart">
  Buy now <!-- Ambiguous text doesn't describe the intent -->
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
- Use the `disabled` state for completely inactive buttons that shouldn't be focusable
- Use `aria-disabled="true/false"` state for inactive custom elements 

### Focus
- Focus must be visible
- Custom elements (like `<div>`) need `tabindex="0"` to be focusable

## Design notes

- Perceivable
  - Is easy to identify as interactive 
  - Type size is no smaller than 16px
  - The text has a 4.5:1 minimum contrast ratio
  - Color is not used as the only means of conveying information
- Operable
  - The clickable/tappable target areas are no smaller than 44x44px
  - The focus indication has a minimum area equal to the width of the element and 2px in height
  - The focus state has a 3:1 minimum contrast ratio between the default and focused states
  - The focus indication has a 3:1 minimum contrast ratio against adjacent elements
- Understandable
  - The button purpose should be clear in the context of the whole page
  - It has the correct semantic meaning
    - If it goes somewhere, it's `<a>` link (that can look like a button)
    - If it does something, it's a `<button>` (that can look like a link)
- Robust
  - Meets criteria across platforms, devices and viewports