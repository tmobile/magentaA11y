---
layout: entry
title:  "Number input"
description: "How to code and test an accessible number input for Web"
categories: form

keyboard:
  tab: |
    Focus moves visibly to the input unless it's disabled
  Number keys: |
    Numbers are entered
  Non-number keys: |
    Nothing is entered

mobile:
  swipe: |
    Focus moves to the input, number pad appears

screenreader:
  name:  |
    Its purpose is clear
  role:  |
    It identifies itself as a text input
  group: |
    Hints or errors are read after the label, related inputs include a group name (Ex: Enter your personal information)
  state: |
    If applicable, it expresses its state (required, disabled / dimmed / unavailable)

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to a number input
    result: |
      focus is strongly visually indicated
  - then:  |
      the number keys
    result: |
      numbers are entered
  - then:  |
      non-number keys
    result: |
      nothing is entered

gherkin-mobile:
  - when:  |
      swipe to focus on a text input
  - then:  |
      the number keypad is revealed


---

## Code examples

### Use `type="text"` 

Use `type=text` with `inputmode="numeric"` with an input pattern and JS to filter out non-numeric characters.

### Don't use `type="number"`

The `type="number"` input is intended for **integers** and includes features we _don't_ want (like stepper/scroll functionality) that is a nuisance to everyone 

- Phone, credit card, pin etc. are not integers
- NVDA doesn't fully support `type="number"` inputs at this time

{% highlight html %}
{% include /examples/input-text-number.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-text-number.html %}
</example>
{:/}

### Disabled number input

- Disabled inputs should not be focusable

{% highlight html %}
{% include /examples/input-text-number-disabled.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-text-number-disabled.html %}
</example>
{:/}

## Developer notes

- [Stepper/counter input example](/checklist-web/stepper-input/)

### Name
- Include `for="input-id` in each `<label>` label to associate it with the input
- Use `aria-label="Input name"` as a last resort if a `<label>` can't be used
- Don't hide the label on focus

### Role
- Identifies as a text input


### Group
- Include `for="input-id` in each `<label>` label to associate it with the input
- Use `<fieldset>` and `<legend>` to name a group of inputs.

### Focus
- Focus must be visible