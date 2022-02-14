---
layout: entry
title:  "Hint, help, or error"
description: "How to code and test accessible Hint, help, or error messages for the Web"
categories: form

keyboard:
  tab: |
    The input comes into focus
      
mobile:
  swipe: |
    The input's name is read, then the hint text
    
screenreader:
  name:  |
    After the input label is read, the hint, help or error is read
  role:  |
    When it appears, an error is read automatically as an alert
    
gherkin-keyboard: 
  - when:  |
      the tab key to move focus to an input
    result: |
      hint, help or error text meets size and contrast requirements

gherkin-mobile:
  - when:  |
      swipe to focus on an input

---
## Code examples

### Adding hint/help text

{% highlight html %}
{% include /examples/input-text.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-text.html %}
</example>
{:/}

### Adding an error

Note: The alert must be structured as below to function properly in VoiceOver, with the alert text nested inside the `role="alert"` element.

{% highlight html %}
{% include /examples/input-text-error.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-text-error.html %}
</example>
{:/}

## Developer notes

### Browser + screenreader quirks

- Screenreaders do not implement alerts uniformly and must be tested
  - Just because an alert pattern works in one screenreader doesn't mean it will work in all three
- The element referenced by the `aria-describedby` attribute cannot use the `role="alert"` attribute (see example above for workaround). 
  - [VoiceOver fails to read a referenced `role="alert"` element when the input is in focus](https://a11ysupport.io/tests/tech__aria__aria-describedby-with-role-alert).
- NVDA will read the alert twice if it appears while the input is in focus: once from the `role="alert"` being injected and from the `aria-describedby` association.
- NVDA needs a fraction of a second to catch up with changes in the DOM, use a `setTimeout` to delay displaying the alert

### Name
- Inner text describes the hint

### Role
- May have `role="alert"` if serving as an input error message

### Group
- Use `aria-describedby="hint-id"` to associate an input with a hint.

### Focus
- Hints should not receive focus

