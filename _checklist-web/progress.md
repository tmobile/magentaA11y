---
layout: entry
title:  "Progress indicator"
description: "How to code and test an accessible progress bar, loader or spinner for Web"
categories: main form
order: 0

keyboard:
  arrow keys: |
    Content within the progress indicator is browsed in logical order

mobile:
  swipe: |
    Content within the progress indicator is browsed in logical order

screenreader:
  name:  |
    The progress indicator purpose is clear
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

wcag:
  - name: Perceivable
    list:
      - criteria: Is easy to identify as a progress indicator
      - criteria: State indicator or any text has a 4.5:1 minimum contrast ratio
      - criteria: Color is not used as the only means of conveying state
  - name: Understandable
    list:
      - criteria: The purpose must be clear in the context of the whole page
      - criteria: The name and state for screen readers must fit the context
  - name: Robust
    list:
      - criteria: Conveys the correct semantic role
      - criteria: Expresses its state
      - criteria: Meets criteria across platforms, devices and viewports
---

## Code examples

### Progress bar

There are many variations of progress bars and loading spinners, some of which may not need to be a true progress bar at all.

- [WAI ARIA Multi-page form examples](https://www.w3.org/WAI/tutorials/forms/multi-page/)

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

### Spinner loading takeover

- There are many variations of loaders / spinners.
- While a takeover spinner modal is present, other content on the page must be inert

#### Use semantic HTML

- This semantic HTML contains all accessibility features using a dialog.
  - The `progress` element can be used to describe the state

#### Ensure content is ready before being available

- If content is being loaded slowly behind the spinner inside an `aria-live` region, use `aria-busy="true"` to keep it from being read until the update is complete

{% highlight html %}
{% include /examples/spinner-full.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/spinner-full.html %}
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
