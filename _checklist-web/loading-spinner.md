---
layout: entry
title:  "Loader / spinner"
description: "How to code and test an accessible loading spinner for Web"
categories: main form
order: 0

keyboard:
  arrow keys: |
    Content within the loader is browsed in logical order
  tab: |
    Focus visibly moves only within the loader

mobile:
  swipe: |
    Reads the loader

screenreader:
  name:  |
    The loader's purpose is clear
  role:  |
    It identifies itself as some kind of progress or loading indicator
  state:  |
    It expresses its current value if it dynamically changes

gherkin-keyboard: 
  - when:  |
      the arrow key to browse to a loader
    result: |
      the spinner comes into view

gherkin-mobile:
  - when:  |
      swipe to browse to a loader
---

## Development notes

- There are many variations of loaders / spinners.
- While the loader is present, other content on the page should be inert

## Code examples

### Use semantic HTML

- This semantic HTML contains all accessibility features by default

{% highlight html %}
{% include /examples/spinner-full.html %}
{% endhighlight %}

{::nomarkdown}
{% include /examples/spinner-full.html %}
{:/}