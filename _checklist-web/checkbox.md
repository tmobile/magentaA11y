---
layout: entry
title:  "Checkbox"
description: "How to code and test an accessible checkbox for the Web"
categories: form


keyboard:
  tab: |
    Focus visibly moves to the checkbox
  spacebar: |
    Toggles the checkbox between states

mobile:
  swipe: |
    Focus moves to the element, expresses its state
  doubletap: |
    Checkbox toggles between checked and unchecked states.

screenreader:
  name:  |
    Its label and purpose is clear
  role:  |
    It identifies its role of checkbox
  group: |
    Hints or errors are read after the label and related inputs include a group name (ex: Account settings)
  state: |
    It expresses its state (checked/unchecked, disabled)

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to a checkbox
    result: |
      focus is strongly visually indicated
  - then:  |
      the spacebar to activate the checkbox
    result: |
      the state is changed

gherkin-mobile:
  - when:  |
      swipe to focus on a checkbox input
  - then:  |
      doubletap with the checkbox in focus
    result: |
      the state is changed

design:
  - name: Perceivable
    list:
      - criteria: Is easy to identify as a checkbox
      - criteria: Color is not used as the only means of conveying state (checked/unchecked)
  - name: Operable
    list:
      - criteria: The click/tap target area includes the label and is no smaller than 44x44px
      - criteria: The checked, disabled and focus states have a 3:1 minimum contrast ratio against default
      - criteria: The focus indication has a 3:1 minimum contrast ratio against adjacent elements
      - criteria: The focus indication has a minimum area equal to the width of the element and 2px in height
  - name: Understandable
    list:
      - criteria: There are no other interactive elements inside the label
      - criteria: Its purpose is clear in the context of the whole page
  - name: Robust
    list:
      - criteria: Meets criteria across platforms, devices and viewports
---

## Code examples

### Use semantic HTML

- This semantic HTML contains all accessibility features by default.
- It uses [CSS pseudo attributes](https://github.com/tmobile/magentaA11y/blob/main/_sass/modules/_input-checkbox.scss) to create the checkbox indicator, no Javascript.

{% highlight html %}
{% include /examples/input-checkbox.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-checkbox.html %}
</example>
{:/}

### Don't put interactive elements inside the label

Even though this is valid HTML, it creates unpredictable results with screenreaders. A (currently) reliable method is to keep interactive elements outside the label and reference it with `aria-describedby="hint-id"`

{% highlight html %}
{% include /examples/input-checkbox-legal.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-checkbox-legal.html %}
</example>
{:/}

### Disabled and focusable checkbox (preferred)

- An input using `aria-disabled="true` will be focusable with the tab key
- Use JS to preventDefault()

{% highlight html %}
{% include /examples/input-checkbox-disabled-focusable.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-checkbox-disabled-focusable.html %}
</example>
{:/}

### Fully disabled checkbox

- An input using `disabled` will not be focusable with the tab key
- Arrow keys will still be able to browse disabled inputs

{% highlight html %}
{% include /examples/input-checkbox-disabled.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-checkbox-disabled.html %}
</example>
{:/}

### When you can't use semantic HTML

This custom checkbox requires extra attributes and event listeners.

{% highlight html %}
<div role="checkbox" tabindex="0" aria-checked="true">
  Alpha
</div>
{% endhighlight %}


### Speciality checkboxes

Sometimes a design may call for a card type checkbox. 
- Its core should still be a semantic checkbox input
- Use `aria-describedby` to read extra content _after_ the the name, role and state

{% highlight html %}
{% include /examples/input-checkbox-card.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-checkbox-card.html %}
</example>
{:/}

## Developer notes

### Name
- `label` text must describe the checkbox input.
- Use `aria-describedby="hint-id"` for hints or additional descriptions
- `aria-label="Checkbox input purpose"` can also be used (as a last resort)

### Role
- **By default**, semantic HTML checkbox inputs identify as a checkbox
- Use `role="checkbox"` for custom elements

### Group
- Semantic HTML
    - `<fieldset>` wraps a checkbox group
    - `<legend>` describes the group's purpose
    - Each `<label>` must include `for="input-id"` to be associated with its input
- Custom elements
    - Use `role="group"` in the palace of fieldset
    - Use `aria-labelledby="label-id"` to associate an element as a label
    - `aria-label="Group purpose"` can also be used if there's no label with an ID

### State
- Semantic HTML
    - Use `checked` for native HTML
    - Use the `disabled` state for inactive checkboxes
- Custom element
    - Use `aria-checked="true/false"` to express state
    - Use `aria-disabled="true"` to declare inactive elements

### Focus
- Focus must be visible
- Custom elements will require keyboard event listeners