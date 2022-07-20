---
layout: entry
title:  "Textarea"
description: "How to code and test an accessible textarea for Web"
categories: form

keyboard:
  tab: |
    Focus moves visibly to the textarea unless it's disabled
      
mobile:
  swipe: |
    Focus moves to the textarea
  keyboard: |
    Keyboard appears

screenreader:
  name:  |
    Its purpose is clear
  role:  |
    It identifies itself as a textarea
  group: |
    Hints or errors (ex: chars remaining) are read after the label, related inputs include a group name (ex: Contact us)
  state: |
    If applicable, it expresses its state (required, disabled / dimmed / unavailable)

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to a textarea
    result: |
      focus is strongly visually indicated

gherkin-mobile:
  - when:  |
      swipe to focus on a textarea

---

## Code examples

### Use semantic HTML
This semantic HTML contains all accessibility features by default. 

{% highlight html %}
{% include /examples/textarea.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/textarea.html %}
</example>
{:/}
