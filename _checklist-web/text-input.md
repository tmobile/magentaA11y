---
layout: entry
title:  "Text input"
description: "How to code and test an accessible text input for Web"
categories: form

keyboard:
  tab: |
    Focus moves visibly to the input unless it's disabled
      
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
    Hints or errors are read after the label, related inputs include a group name (Ex: Enter your personal information)
  state: |
    If applicable, it expresses its state (required, disabled / dimmed / unavailable)

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to a text input
    result: |
      focus is strongly visually indicated

gherkin-mobile:
  - when:  |
      swipe to focus on a text input

design:
  - name: Perceivable
    list:
      - criteria: Is easy to identify as interactive
      - criteria: Type size is optically no smaller than 16px
      - criteria: The text has a 4.5:1 minimum contrast ratio
      - criteria: Color is not used as the only means of conveying information or state (error, success, focus, disabled etc)
  - name: Operable
    list:
      - criteria: The click/tap target area is no smaller than 44x44px
      - criteria: The focus indication has a minimum area equal to the width of the element and 2px in height
      - criteria: The focus state has a 3:1 minimum contrast ratio between the default and focused states
      - criteria: The focus indication has a 3:1 minimum contrast ratio against adjacent elements
  - name: Understandable
    list:
      - criteria: The input purpose should be clear in the context of the whole page
      - criteria: The width of the input accommodates the intended input, reinforcing its purpose
  - name: Robust
    list:
      - criteria: Meets criteria across platforms, devices and viewports
---

## Code examples

### Use semantic HTML
This semantic HTML contains all accessibility features by default. 

{% highlight html %}
{% include /examples/input-text.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-text.html %}
</example>
{:/}

### Required input

{% highlight html %}
{% include /examples/input-text-required.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-text-required.html %}
</example>
{:/}

### Disabled but focusable input

- Use JS to preventDefault()
- There may be times that it is advantageous for the input to be disabled but still focusable
- Fully disabled inputs are not focusable and may not be as discoverable in a form

{% highlight html %}
{% include /examples/input-text-disabled-focusable.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-text-disabled-focusable.html %}
</example>
{:/}

### Fully disabled input

- Fully `disabled` inputs are not focusable so may not be as discoverable in a form

{% highlight html %}
{% include /examples/input-text-disabled.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-text-disabled.html %}
</example>
{:/}


### `readonly` input

- Only use readonly when presenting **already submitted** information.
- `readonly` inputs are focusable but not editable
- VoiceOver does not describe `readonly` attribute, so `aria-disabled` was added to reinforce that it's not editable

{% highlight html %}
{% include /examples/input-text-readonly.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-text-readonly.html %}
</example>
{:/}

### Email input

- Setting type="email" changes the keyboard for mobile app users

{% highlight html %}
{% include /examples/input-email.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-email.html %}
</example>
{:/}



### Output

- `output` can be used for a dynamic content that changes based on user inputs (example: a calculator).
- Screenreader support varies, so placing the label inside the output seems to work best
- Alternatively, using a custom element with role="status" will achieve more predictable results

{% highlight html %}
{% include /examples/output.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/output.html %}
</example>
{:/}

### Group of inputs

After the screenreader focuses on each input, it will read the group name "Enter your personal information" after the input.

{% highlight html %}
{% include /examples/input-text-group.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-text-group.html %}
</example>
{:/}

## Developer notes

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

## Design notes

- Perceivable
  - Is easy to identify as interactive
  - Type size is no smaller than 16px
  - The text has a 4.5:1 minimum contrast ratio
  - Color is not used as the only means of conveying information (error, success, etc)
- Operable
  - The clickable/tappable target area is no smaller than 44x44px
  - The focus indication has a minimum area equal to the width of the element and 2px in height
  - The focus state has a 3:1 minimum contrast ratio between the default and focused states
  - The focus indication has a 3:1 minimum contrast ratio against adjacent elements
- Understandable
  - The input purpose should be clear in the context of the whole page
  - The width of the input accommodates the intended input, reinforcing its purpose
    - Ex: State field is 2 characters wide
- Robust
  - Meets criteria across platforms, devices and viewports