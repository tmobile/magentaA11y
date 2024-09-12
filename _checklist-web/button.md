---
layout: entry
title:  "Button"
description: "How to code and test accessible buttons for the Web"
categories: nav form
order: 1

keyboard:
  tab: |
    Focus moves to the button and there is a highly visible visual indication of keyboard focus
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
    It expresses its state if applicable (pressed, expanded, disabled/dimmed/unavailable)

mobile:
  swipe: |
    Focus moves to the element, expresses its state
  doubletap: |
    Activates the button

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to a button
    result: |
      there is a highly visible visual indication of keyboard focus
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

wcag:
  - name: Perceivable
    list:
      - criteria: Is easy to identify as interactive
      - criteria: Color is not used as the only means of conveying information (error, success, pressed, expanded, etc)
  - name: Operable
    list:
      - criteria: Is keyboard operable
      - criteria: The click/tap target area is no smaller than 44x44px
      - criteria: The disabled and focus states have a 3:1 minimum contrast ratio against default
      - criteria: The focus indication has a 3:1 minimum contrast ratio against adjacent elements
      - criteria: The focus indication has a minimum area equal to the width of the element and 2px in height
  - name: Understandable
    list:
      - criteria: Its purpose is clear in the context of the whole page
  - name: Robust
    list:
      - criteria: Conveys the correct semantic role 
      - criteria: Expresses its state (if applicable)
      - criteria: Meets criteria across platforms, devices and viewports
---

## Buttons vs links

### If it goes somewhere, it's `<a>` link.

- When the user clicks a link, they are taken to a different location in the site.
  - Either another page or even another area of the same page
- A link can look like a big shiny button but it must be coded as `<a>` link

### If it does something, it's a `<button>`

- Buttons cause an action to occur on the same page
  - Submit a form (even when submission takes you to a new page)
  - Open a menu
  - Launch a modal
  - Expand details
- A button can look like a link, but it must be coded as a `<button>`

## Code examples

### Use semantic HTML

- This semantic HTML contains all accessibility features by default.
- It uses [CSS pseudo attributes](https://github.com/tmobile/magentaA11y/blob/main/_sass/modules/_button.scss) to create the arrow indicator, no Javascript.

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

<div role="button" tabindex="0" aria-label="Buy now, iPhone 17">
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