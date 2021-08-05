---
layout: entry
title:  "Number input"
description: "How to code and test an accessible number input for Web"
categories: form

keyboard:
  tab: |
    Focus moves visibly to the input
  
mobile:
  swipe: |
    Focus moves to the input, number pad appears

screenreader:
  name:  |
    Purpose is clear
  role:  |
    Identifies itself as a input
  group: |
    Label is read with the input
  state: |
    The input can be required, disabled
---

## Code examples

### Use `type="text"` 

Use `type=text` with `inputmode="numeric"` with an input pattern and JS to filter out non-numeric characters.

### Don't use `type="number"` for non-integers

The `type="number"` input is intended for **integers** and includes features we _don't_ want (like stepper/scroll functionality) that is a nuisance to everyone. 

Phone, credit card, pin etc. are not integers.

{% highlight html %}
{% include /examples/input-text-number.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-text-number.html %}
</example>
{:/}

### For integers

Only use the `type="number"` for true sequential numbers.

{% highlight html %}
{% include /examples/input-number.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-number.html %}
</example>
{:/}

### Speciality stepper integer input

This stepper uses a fieldset to group all controls together.

{% highlight html %}
{% include /examples/input-number-stepper.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-number-stepper.html %}
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