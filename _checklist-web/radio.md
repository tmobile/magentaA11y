---
layout: entry
title:  "Radio button"
categories: form

keyboard:
  tab: |
    Focus visibly moves to the checked radio button in the group. If a radio button is not checked, focus moves to the first radio button in the group.
  spacebar: |
    If the radio button with focus is not checked, changes the state to checked.  Otherwise, does nothing.
  arrow-keys: |
    Moves focus to and checks the previous or next radio button in the group
        
mobile:
  swipe: |
    Focus moves to the element, expresses its state
  doubletap: |
    If the radio button with focus is not checked, changes the state to checked. Otherwise, does nothing.

screenreader:
  name:  |
    Its label and purpose is clear
  role:  |
    It identifies itself as a radio option
  group: |
    Each option has an associated label and the radio group name
  state: |
    It expresses its state (selected, checked, disabled)

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to a radio group
    result: |
      focus is strongly visually indicated on the first unselected option or the selected option
  - then:  |
      the spacebar to activate the radio button
    result: |
      the radio button with focus change state to selected.
  - then:  |
      the arrow keys to focus radio button
    result: |
      the state is changed

gherkin-mobile:
  - when:  |
      swipe to focus on a radio button
  - then:  |
      doubletap with the radio in focus
    result: |
      the state is changed
---



## Code examples

### Use semantic HTML
This semantic HTML contains all accessibility features by default.

{% highlight html %}
{% include /examples/input-radio.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-radio.html %}
</example>
{:/}

### Required radio inputs

Ensuring all screenreaders indicate radio inputs as being required requires some aria and reinforcement.

- Use `aria-required="true"` to indicate the group is required
- Use `aria-invalid="true/false"` to indicate an error state
- Add `role="radiogroup"` to the `<fieldset>` to make the `aria-required` attribute valid
- Add "Required" as text to the `<legend>` to ensure compliance across all platforms

{% highlight html %}
{% include /examples/input-radio-required.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-radio-required.html %}
</example>
{:/}

### When you can't use semantic HTML

This custom button requires extra scripting work for roving tabindex and event listeners.

{% highlight html %}
<custom-label id="labelId">
    Which is your favorite NATO letter:
</custom-label>
<div role="radiogroup" aria-labelledby="labelId">
  <custom-element role="radio" tabindex="-1">
    Alpha
  </custom-element>
  <custom-element role="radio" tabindex="-1">
    Bravo
  </custom-element>
  <custom-element role="radio" tabindex="-1">
    Charlie
  </custom-element>  
</div>
{% endhighlight %}

## Speciality use cases

### Radio with interactive elements

When a UI calls for interactive elements inbetween radio buttons, this can be very difficult.
- Radio button focus order is not what you think it is.
- When nothing is selected, tab order moves through as expected. 
- However, as soon as a radio button is selected, the selected radio input receives focus first from the group. 

This hack must be used very carefully on a case by case basis.
  
{% highlight html %}
{% include /examples/input-checkbox-radio.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-checkbox-radio.html %}
</example>
{:/}

## Developer notes

### Name
- `label` text should describe the radio input.
- Use `aria-describedby="hint-id"` for hints or additional descriptions
- `aria-label="Radio input purpose"` can also be used (as a last resort)

### Role
- **By default**, semantic HTML radio inputs identify as radio button
- Use `role="radio"` for custom elements

### Group
- Semantic HTML
    - `<fieldset>` should wrap the radio group
    - `<legend>` should describe the group's purpose
    - Each `<label>` must include `for="input-id"` to be associated with its input
- Custom elements
    - Use `role="radiogroup"` to take the palace of fieldset
    - Use `aria-labelledby="label-id"` to associate an element as a label
    - `aria-label="Group purpose"` can also be used if there's no label with an ID

### State
- Semantic HTML
    - `checked` (will be read as "selected" by screen reader)
    - Use the `disabled` state for inactive buttons
- Custom element
    - Use `aria-checked="true/false"` to express state
    - Use `aria-disabled="true"` to declare inactive elements

### Focus
- Focus must be visible
- Custom elements will require keyboard event listeners and roving tabindex
- **DO NOT** put interactive elements inbetween radio inputs.


