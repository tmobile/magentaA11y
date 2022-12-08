---
layout: entry
title:  "Password input"
description: "How to code and test an accessible password input for Web"
categories: form

keyboard:
  tab: |
    Focus moves visibly to the input or show password checkbox
  spacebar: |
    Toggles the show password checkbox
      
mobile:
  swipe: |
    Focus moves to the input
  keyboard: |
    Keyboard appears

screenreader:
  name:  |
    Its purpose is clear
  role:  |
    It identifies itself as a text input
  group: |
     Hints or errors are read after the label (Ex: Password formatting)
  state: |
    If applicable, it expresses its state (required, disabled / dimmed / unavailable) and it is indicated if the password is being shown

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to the password input
    result: |
      focus is strongly visually indicated
  - then:  |
      the tab key to move focus to the show/hide password feature
    result: |
      its name, role and state
  - then:  |
      the show/hide password feature
    result: |
      the state of the password visibility (with or without characters entered)

gherkin-mobile:
  - when:  |
      swipe to focus on a password input

wcag:
  - name: Perceivable
    list:
      - criteria: Is easy to identify as interactive
      - criteria: Color is not used as the only means of conveying information
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
      - criteria: Expresses its state
      - criteria: Meets criteria across platforms, devices and viewports
---

## Code examples

### Use semantic HTML

- This semantic HTML contains all accessibility features by default. 
- Placing the show password checkbox ahead of the password input increases discoverability for screen reader users.
  - CSS pseudo elements are used in the checkbox label to express its state on focus of the password input.

{% highlight html %}
{% include /examples/input-password.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-password.html %}
</example>
{:/}

## Developer notes

### Name
- Include `for="input-id` in each `<label>` label to associate it with the input
- Use `aria-label="Input name"` as a last resort if a `<label>` can't be used

### Role
- Identifies as some kind of secure input

### State
- The show password checkbox must indicate its state on focus

### Group
- Include `for="input-id` in each `<label>` label to associate it with the input
- Use `<fieldset>` and `<legend>` to name a group of inputs.

### Focus
- Focus must be visible