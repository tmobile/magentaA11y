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

This is one example of an accessible carousel wizard.
- It is not the only way to build a carousel, but it meets all the critieria:
  - The group has a name
  - New slides titles are announced
  - Arrow keys advance the slides

{% highlight html %}
{% include /examples/aria-live.html %}
{% endhighlight %}

{::nomarkdown}
{% include /examples/aria-live.html %}
{:/}
