---
layout: entry
title:  "Progress bar"
description: "How to code and test an accessible progress bar for Web"
categories: main form
order: 0

keyboard:
  tab: |
    Nothing happens, progress bar is not typically focusable
        
mobile:
  swipe: |
    Reads the progress bar

screenreader:
  name:  |
    The progress bar's purpose is clear
  role:  |
    It identifies itself as a progress bar or progress indicator
  state:  |
    It expresses its value if it dynamically changes

gherkin-keyboard: 
  - when:  |
      the arrow key to browse to a progress bar
    result: |
      the progress bar comes into view

gherkin-mobile:
  - when:  |
      swipe to browse to a progress bar
---

## Code examples

There are many variations of progressbars, some of which may not need to be a true progress bar at all.
* [WAI ARIA Multi-page form examples](https://www.w3.org/WAI/tutorials/forms/multi-page/)

Support varies by screen reader. It's recommended to add full aria attributes, even when using a native `<progress>` element.

### Use semantic HTML
This semantic HTML contains all accessibility features by default.

{% highlight html %}
{% include /examples/progress-bar.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/progress-bar.html %}
</example>
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