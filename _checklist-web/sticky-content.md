---
layout: entry
title:  "Sticky content"
categories: main

keyboard:
  tab: |
    Controls are focusable in a logical order within the page
      
mobile:
  swipe: |
    Content and controls within the sticky element appear in a logical order within the page

screenreader:
  name:  |
    Discoverable by screen reader
  role:  |
    n/a
  group: |
    Appears in logical page order within the page
  state: |
    n/a
---

## Code examples

### Place the element in logical DOM order
This semantic HTML appears in logical order in the page.

{% highlight html %}
{% include /examples/sticky-content.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/sticky-content.html %}
</example>
{:/}

## Developer notes

### Group

- Must appears in logical page order within the page.
- Do not place it at the actual end or beginning of the DOM


