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

### Disabled input

- Disabled inputs should not be focusable

{% highlight html %}
{% include /examples/input-text-disabled.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-text-disabled.html %}
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