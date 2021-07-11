---
layout: entry
title:  "Toggle switch"
description: "How to code and test an accessible toggle switch for Web"
categories: form

keyboard:
  tab: |
    Focus visibly moves to the switch
  spacebar: |
    Toggles the switch between states
      
mobile:
  swipe: |
    Focus moves to the element, expresses its state
  doubletap: |
    Element toggles between states.

screenreader:
  name:  |
    Input label and purpose is clear
  role:  |
    Identifies itself as a switch, toggle button or checkbox
  group: |
    Each switch has an associated label
  state: |
    Expresses its state (on/off, checked/unchecked, disabled/dimmed)

---


## Code examples

### Use as much semantic HTML as possible

This semantic HTML contains all accessibility features by default, and only requires the addition of `role="switch"`. 

{% highlight html %}
{% include /examples/input-switch.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-switch.html %}
</example>
{:/}

### You can also use a button

This `<button>` toggle has focus and keyboard criteria built in. It requires the addition of `role="switch"` and scripting to toggle `aria-checked="true/false"`.

{% highlight html %}
<button role="switch" aria-checked="true">
  Alpha
</div>
{% endhighlight %}



### When you can't use semantic HTML

This custom switch requires extra attributes and keyboard event listeners.

{% highlight html %}
<div role="switch" tabindex="0" aria-checked="true">
  Alpha
</div>
{% endhighlight %}


## Developer notes


### Name
- `label` text should describe the input.
- Use `aria-describedby="hint-id"` for hints or additional descriptions
- `aria-label="Switch purpose"` can also be used (as a last resort)

### Role
- Use `role="switch"`

### Group
- Semantic HTML
    - `<fieldset>` should wrap a switch group
    - `<legend>` should describe the group's purpose
    - Each `<label>` must include `for="input-id"` to be associated with its input
- Custom elements
    - Use `role="group"` in the palace of fieldset
    - Use `aria-labelledby="label-id"` to associate an element as a label
    - `aria-label="Group purpose"` can also be used if there's no label with an ID

### State
- Semantic HTML
    - Use `checked` for native HTML
    - Use the `disabled` state for inactive switches
- Custom element
    - Use `aria-checked="true/false"` to express state
    - Use `aria-disabled="true"` to declare inactive elements
    - Use `aria-readonly="true"` to declare a switch can't be edited

### Focus
- Focus must be visible


