---
layout: entry
title:  "Form"
description: "How to code and test an accessible text input for Web"
categories: form
order: 1

keyboard:
  tab: |
    Focus moves visibly to the inputs inside the form
      
mobile:
  swipe: |
    Focus moves to the inputs inside the form
  keyboard: |
    Keyboard appears

screenreader:
  name:  |
    If multiple forms are present (Ex: Search, Sign in, Newsletter subscription), the form should have a name
  role:  |
    It is discoverable with screenreader shortcuts as a form landmark along with its name

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to inputs inside the form
    result: |
      focus is strongly visually indicated

gherkin-mobile:
  - when:  |
      swipe to focus on inputs inside the form

---

## Code examples

### Use semantic HTML

This semantic HTML contains all accessibility features by default. 

{% highlight html %}
{% include /examples/form.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/form.html %}
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