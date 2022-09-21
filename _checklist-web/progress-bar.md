---
layout: entry
title:  "Progress bar"
description: "How to code and test an accessible progress bar for Web"
categories: main form
order: 0

keyboard:
  arrow keys: |
    The progress bar is able to be browsed

mobile:
  swipe: |
    Reads the progress bar

screenreader:
  name:  |
    The progress bar's purpose is clear
  role:  |
    It identifies itself as some kind of progress indicator
  state:  |
    It expresses its current value if it dynamically changes

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

Support varies by screen reader. It's recommended to add full aria attributes, even when using a native `<progressbar>` element.

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

### Inline dynamic loading waiting example

This example dynamically injects progress updates that will be read by a screen reader

- `aria-busy="true"` has spotty support, but does indicate that the region is busy
- `aria-describedby` is allows the current progress to be read when the button is focused
- `aria-disabled` reinforces that the save action is incomplete
- `role="status` has an implicit aria-live="polite" of polite and `aria-atomic="true"` meaning the entire content of the status will be read on each update

{% highlight html %}
{% include /examples/progress-bar-busy.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/progress-bar-busy.html %}
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