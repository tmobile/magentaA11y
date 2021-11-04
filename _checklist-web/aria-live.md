---
layout: entry
title:  "Dynamic content"
description: "How to code and test a dynamic content and single page apps"
categories: main form
order: 2

keyboard:
  tab: |
    Focus starts at top of new content or top of page
  arrow-keys: |
    Screen reader browsing and focus starts at top of new content or top of page

mobile:
  swipe: |
    Focus starts at top of new content or top of page

screenreader:
  name:  |
    New content is announced or indicated 
  role:  |
    None
  group: |
    Browsing and focus starts at top of new content or top of page
  state: |
    n/a
---

## How does aria-live work?

- The screenreader expects content **within** an `aria-live="polite"` attribute to change
- By default, only the content that has changed will be read
- To force the screenreader to read contents that did not change within the element, add `aria-atomic="true"`
- Rarely should you use `aria-live="assertive"`. It will override every other message from the screenreader

## About alerts

- An element using `role="alert"` has `aria-live="assertive"` by default

## Code example

This is one example of a dynamic content region. It is similar to the carousel example.

- It is not the only way to build a dynamic region, but it meets all the critieria:
  - New content is announced
  - Focus is placed at the top of the content

{% highlight html %}
{% include /examples/aria-live.html %}
{% endhighlight %}

{::nomarkdown}
{% include /examples/aria-live.html %}
{:/}
