---
layout: entry
title:  "Strikethrough content"
description: "How to code and test strikethrough text"
categories: main form
order: 0

keyboard:
  arrow: |
    Browses the content

mobile:
  swipe: |
    The content makes sense and is in logical order

screenreader:
  name:  |
    The content makes sense and is in logical order

gherkin-keyboard: 
  - when:  |
      the arrow key to browse the content
    result: |
      the content comes into view

gherkin-mobile:
  - when:  |
      swipe to browse the content

---

## Developer notes

- Do not use `aria-label` to add context. Some screenreaders will not read `aria-label` from non-interactive components.

## Code examples

{% highlight html %}
{% include /examples/strikethrough.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/strikethrough.html %}
</example>
{:/}