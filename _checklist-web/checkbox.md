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
    Input label and purpose is clear
  role:  |
    Identifies itself as a checkbox
  group: |
    Each option has an associated label, related checkboxes should include a group name
  state: |
    Expresses its state (checked/unchecked, disabled)

gherkin-keyboard: 
  when:  |
    I press the tab key to move focus to a checkbox
  see: |
    focus is strongly visually indicated
  then:  |
    I press the spacebar to activate the checkbox
  then-see: |
    the state is changed

gherkin-screenreader:
  when:  |
    I use a desktop screenreader AND use the the keyboard to focus on a checkbox
  then:  |
    I press the spacebar to activate the checkbox
  then-hear: |
    the state is changed

gherkin-mobile:
  when:  |
    I use a mobile screenreader AND swipe to focus on a checkbox
  then:  |
    I doubletap with the checkbox in focus
  then-hear: |
    the state is changed

gherkin-screenreader-output:
  name:  |
    its name/label
  role:  |
    its role of checkbox
  state: |
    its state: checked or unchecked
  group: |
    its group name if applicable

---

## Code examples

### Use semantic HTML
This semantic HTML contains all accessibility features by default.

{% highlight html %}
{% include /examples/input-checkbox.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-checkbox.html %}
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
- `label` text should describe the checkbox input.
- Use `aria-describedby="hint-id"` for hints or additional descriptions
- `aria-label="Checkbox input purpose"` can also be used (as a last resort)

### Role
- **By default**, semantic HTML checkbox inputs identify as a checkbox
- Use `role="checkbox"` for custom elements

### Group
- Semantic HTML
    - `<fieldset>` should wrap a checkbox group
    - `<legend>` should describe the group's purpose
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
- Custom elements will require keyboard event listeners and roving tabindex


