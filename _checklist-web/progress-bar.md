---
layout: entry
title:  "Progress bar"
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
    Purpose is clear
  role:  |
    Identifies itself as a progress bar or progress indicator
  group: |
    n/a
  state: |
    The current value is expressed live as it changes
---

## Code examples

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