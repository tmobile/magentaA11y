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
    It expresses if the password is being shown and if applicable: required, disabled / dimmed / unavailable

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

### Checkbox variant

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


### Button variant
- The button leads the input so screen reader and keyboard only users can change the state before interacting with the field.
- Two containers consisting of the same non-visual text is used separately for a description on the toggle button and a live region to automatically update screen readers of the field type change.
  - The button is describedby by non-visual text in the code via <code>aria-describedby</code>. This container owns CSS <code>display: none;</code>. While we can still reference it on the toggle button via <code>aria-describedby</code> pointing to its <code>ID</code> it won't be discovered if screen reader users are navigating the form in browse mode. 
  - The Live Region is separately presenting the same state text but this text is removed from the DOM after a short pause so screen readers users don't also discover this redundant text. 
- When the toggle button is activated its description is updated and the state is automatically announced by the screen reader. "Password is currently visible".
- The password field type toggles between type of <code>password</code> and <code>text</code>.

{% highlight html %}
{% include /examples/input-password-with-button.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-password-with-button.html %}
</example>
{:/}


## Developer notes

### Name
- Include `for="input-id` in each `<label>` label to associate it with the input
- Use `aria-label="Input name"` as a last resort if a `<label>` can't be used

### Role
- Identifies as some kind of secure input [or text when toggled to text]

### State
- The show password checkbox must indicate its state on focus
- If using Live Region to communicate state:
  - Provide non-visual state text programmatically associated with the visibility toggle via <code>aria-describedby</code>. This container can own <code>aria-hidden="true"</code> or CSS <code>display: none;</code> so it is not discovered by screen reader users.
  - If you use a Live Region ensure it does not own <code>aria-hidden="true"</code> or CSS <code>display: none;</code> as that impacts screen reader support. Remove contents after a small timeout so screen reader users do not discover its contents.

### Group
- Include `for="input-id` in each `<label>` label to associate it with the input
- Use `<fieldset>` and `<legend>` to name a group of inputs.

### Focus
- Focus must be visible