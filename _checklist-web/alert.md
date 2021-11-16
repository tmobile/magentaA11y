---
layout: entry
title:  "Alert"
description: "How to code accessible alerts for web pages"
categories: main form

keyboard:
  keyboard: |
    Focus does not move to the alert when it appears

mobile:
  swipe: |
      Focus does not move to the alert when it appears, but it can be perceived by the screen reader

screenreader:  
  name:  |
    The alert's purpose should be read aloud when it appears
  role:  |
    Identifies itself as an alert
  group: |
    n/a
  state: |
    n/a

---

## Notes

- Use alerts sparingly. 
- The alert will be read by the screen reader when it becomes visible / appears in the DOM.
- If an alert is present on page load, it won't be read automatically

## Code examples

{% highlight html %}
{% include /examples/hint-error.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/hint-error.html %}
</example>
{:/}


## Developer notes

- Screenreaders do not implement alerts uniformly and must be tested
  - JAWS and VoiceOver are more generous than NVDA in triggering alert messages
  - Just because an alert pattern works in one screenreader doesn't mean it will work in all three

### Name
- Inner text describes alert

### Role
- Use `role="alert"` 

### Focus
- Focus does change when the alert appears

