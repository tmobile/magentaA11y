---
layout: entry
title:  "Dynamic content"
description: "How to code and test a dynamic content and single page apps"
categories: main form
order: 2

keyboard:
  tab: |
    Focus dynamically begins at top of new content or top of page

mobile:
  swipe: |
      Focus moves within the carousel
  doubletap: |
      This typically activates most elements

screenreader:
  name:  |
    New content is announced
  role:  |
    None
  group: |
    None
  state: |
    n/a
---

## Code examples

### Use semantic HTML

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
