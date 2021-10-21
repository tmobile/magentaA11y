---
layout: entry
title:  "Text input"
description: "How to code and test an accessible text input for Web"
categories: form

keyboard:
  tab: |
    Focus moves visibly to the input
      
mobile:
  swipe: |
    Focus moves to the input
  keyboard: |
    Keyboard appears

screenreader:
  name:  |
    Purpose is clear
  role:  |
    Identifies itself as a text input
  group: |
    Label is read with the input
  state: |
    The input can be required, disabled
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

{% highlight html %}
{% include /examples/input-text-disabled.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-text-disabled.html %}
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