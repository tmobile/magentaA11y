---
layout: entry
title:  "Loading spinner"
description: "How to code and test an accessible loading spinner for Web"
categories: main form
order: 0

keyboard:
  arrow keys: |
    The spinner is able to be browsed

mobile:
  swipe: |
    Reads the spinner

screenreader:
  name:  |
    The spinner's purpose is clear
  role:  |
    It identifies itself as some kind of progress or loading indicator
  state:  |
    It expresses its current value if it dynamically changes

gherkin-keyboard: 
  - when:  |
      the arrow key to browse to a spinner
    result: |
      the spinner comes into view

gherkin-mobile:
  - when:  |
      swipe to browse to a spinner
---


There are many variations of spinners.
* [WAI ARIA Multi-page form examples](https://www.w3.org/WAI/tutorials/forms/multi-page/)

## Code examples

### Use semantic HTML

This semantic HTML contains all accessibility features by default.

## Full takeover spinner

{% highlight html %}
{% include /examples/spinner-full.html %}
{% endhighlight %}

{::nomarkdown}
{% include /examples/spinner-full.html %}
{:/}

## Developer notes

### Name
- Use `aria-label="Progress bar name"` when there is not a visible title.

### Role
- Use `role="progressbar`

### Group
- If the progress bar is describing another region of the page, use `aria-describedby="progressbar-id"` to connect the two elements.

### State
- The state will be read out to the screen reader user by default.

### Focus
- Progress bar is not usually focusable.