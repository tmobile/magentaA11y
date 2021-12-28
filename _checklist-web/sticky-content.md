---
layout: entry
title:  "Sticky element"
description: "How to code and test an accessible sticky menu element for Web"
categories: main

keyboard:
  tab: |
    Controls are focusable in a logical order within the page
      
mobile:
  swipe: |
    Content and controls within the sticky element appear in a logical order in relation to the whole page

screenreader:
  group: |
    Interactive elements are read in logical order in relation to the whole page

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to interactive elements inside the sticky element
    result: |
      focus is strongly visually indicated in a logical order in relation to the whole page

gherkin-mobile:
  - when:  |
      swipe to the sticky element
---

## Code examples

### Place the element in logical DOM order

This semantic HTML appears in logical order in the page. 

It uses only CSS (no JavaScript) to float content as desired.

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

- Must appear in logical page order within the page.
- Do not place it at the actual end or beginning of the DOM


