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

{% highlight html %}
{% include /examples/form.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/form.html %}
</example>
{:/}
