---
layout: entry
title:  "Separator / horizontal rule"
description: "How to code and test an accessible separator / horizontal rule for Web"
categories: main form

keyboard:
  any key	: |
    Nothing. Should be ignored by the screenreader.
  
mobile:
  swipe: |
    Nothing. Should be ignored by the screenreader.
  
screenreader:
  name:  |
    None. Should be ignored by the screenreader.
  role:  |
    n/a
  group: |
    n/a
  state: |
    n/a
---

## Developer notes

Separators should be ignored by the screenreader.

It is preferred to create these lines with CSS rather than using a DOM element.


## Code examples

If you are unable to use appropriate CSS styles, add `aria-hidden="true"` to ensure it doesn't distract from the experience.

### Semantic HTML

{% highlight html %}
<hr aria-hidden="true">
{% endhighlight %}

### Custom elements

Angular Material uses a dom element to create separators.

{% highlight html %}
<div role="separator" aria-hidden="true"></div>
{% endhighlight %}




