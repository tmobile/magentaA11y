---
layout: entry
title:  "Sticky element"
description: "How to code and test an accessible sticky menu element for Web"
categories: main

keyboard:
  tab: |
    Controls are visibly focusable in a logical order in relation to the whole page
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
      focus is visually indicated in a logical order in relation to the whole page

gherkin-mobile:
  - when:  |
      swipe to the sticky element
---

## Pitfalls of sticky content

Unless you have a really good reason, it's best to avoid sticking content to the bottom (or top) of the page. While it seems like an obvious solution, without user testing in production environments you won't know how people are really going to interact with it.

### Ask the following questions first

- Where will this appear in the actual DOM (code) order?
  - If it's injected at the top or bottom of the content, will it be cumbersome or impossible for someone using a keyboard or screen reader to locate it?
- Is it preferable to place this content in multiple locations on the page?
  - A "Buy now" button can appear more than once in the page.
- Will this content be perceived as an ad and thus ignored by the customer?
  - We've trained people for years to ignore sticky content in their browser offering app downloads and other ads. Why is your popup sticky content any different?

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
- To ensure that controls which receive keyboard focus are not concealed by a sticky container, utilize CSS [scroll-padding](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding).

{% highlight css %}
html { scroll-padding-top: 3rem; }
{% endhighlight %}

<script>
  document.documentElement.style.scrollPadding = "5rem 0";
</script>


