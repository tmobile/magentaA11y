---
layout: entry
title:  "Number input"
description: "How to code and test an accessible number input for Web"
categories: form

keyboard:
  tab: |
    Focus moves visibly to the input
  Number keys: |
    Numbers are entered
  Non-number keys: |
    Nothing is entered

mobile:
  swipe: |
    Focus moves to the input, numeric keypad is revealed

screenreader:
  name:  |
    Its purpose is clear
  role:  |
    It identifies itself as an editable input
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
      swipe to focus on a number input
  - then:  |
      enter a number
    result: |
      the numeric keypad is revealed

wcag:
  - name: Perceivable
    list:
      - criteria: Is easy to identify as interactive
      - criteria: Type size is optically no smaller than 16px Helvetica
      - criteria: The text has a 4.5:1 minimum contrast ratio
      - criteria: Label is always visible (placeholder cannot be used as a label)
      - criteria: Color is not used as the only means of conveying information or state (error, success, focus, disabled etc)
  - name: Operable
    list:
      - criteria: Is keyboard operable
      - criteria: Mobile device displays numeric keypad (instead of full keyboard)
      - criteria: The click/tap target area is no smaller than 44x44px
      - criteria: The disabled and focus states have a 3:1 minimum contrast ratio against default
      - criteria: The focus indication has a minimum area equal to the width of the element and 2px in height
  - name: Understandable
    list:
      - criteria: The input purpose should be clear in the context of the whole page
      - criteria: The width of the input accommodates/affords the intended input, reinforcing its purpose
  - name: Robust
    list:
      - criteria: Conveys the correct semantic role 
      - criteria: Expresses its state
      - criteria: Meets criteria across platforms, devices and viewports
---

## Code examples

### Don't use `type="number"`

The `type="number"` input is intended for **integers** and includes features we _don't_ want (like stepper/scroll functionality) that is a nuisance to everyone 

- Phone, credit card, pin etc. are not integers
- NVDA doesn't fully support `type="number"` inputs at this time

### Use `type="text"` for number inputs

Use `type=text` with `inputmode="numeric"` with an input pattern and JS to filter out non-numeric characters.

{% highlight html %}
{% include /examples/input-text-number.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-text-number.html %}
</example>
{:/}

### Disabled and focusable number input (preferred)

- Using the `aria-disabled` attribute will allow the input to be focusable and more discoverable

{% highlight html %}
{% include /examples/input-text-number-disabled-focusable.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-text-number-disabled-focusable.html %}
</example>
{:/}

### Fully disabled number input (avoid)

- Fully `disabled` inputs are not focusable so may not be as discoverable in a form

{% highlight html %}
{% include /examples/input-text-number-disabled.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-text-number-disabled.html %}
</example>
{:/}

### Telephone number input

- Setting type="tel" changes the keyboard for mobile app users

{% highlight html %}
{% include /examples/input-tel.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-tel.html %}
</example>
{:/}

## Developer notes

- [Why the GOV.UK Design System team changed the input type for numbers](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/)
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