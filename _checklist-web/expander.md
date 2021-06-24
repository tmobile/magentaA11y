---
layout: entry
title:  "Expander accordion"
categories: main

keyboard:
  tab: |
    Focus visibly moves to the expander.
  spacebar: |
    Toggles the expander.
  enter: |
    Toggles the expander.

mobile:
  swipe: |
    Focus moves to the element, expresses its state (expanded/collapsed)
  doubletap: |
    Toggles the expander

screenreader:
  name:  |
    Purpose is clear
  role:  |
    Identifies as a button or details
  group: |
    n/a
  state: |
    Expresses its state (expanded/collapsed)
---


## Code examples

### Use semantic HTML
This semantic HTML contains all accessibility features by default with no scripting required.

{% highlight html %}
{% include /examples/details-summary.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/details-summary.html %}
</example>
{:/}

### Use semantic HTML where possible
This custom expander uses a semantic button with `aria-expanded` with additional scripting to toggle content and states.

{% highlight html %}
{% include /examples/expander.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/expander.html %}
</example>
{:/}


## Developer notes

### Name
- Inner text should describe the purpose

### Role
- `<details>` identifies as details
- Native button identifies as button by default
- Use `role="button"` for custom elements

### Group
- You *can* use `aria-controls="popupId"`, but it is not well supported

### State
- Menus or expanders use `aria-expanded="true/false"` 

### Focus
- Focus must be visible

