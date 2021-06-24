---
layout: entry
title:  "Alert"
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

## Code examples

Use alerts sparingly. The alert will be read by the screen reader when it becomes visible / appears in the DOM.

{% highlight html %}
{% include /examples/alert.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/alert.html %}
</example>
{:/}


## Developer notes

### Name
- Inner text describes alert

### Role
- Use `role="alert"` 

### Focus
- Focus does change when the alert appears

