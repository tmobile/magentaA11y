---
layout: entry
title:  "Expander accordion"
description: "How to code and test accessible expander buttons"
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
    Its purpose is clear
  role:  |
    It identifies its role of a button or details
  state: |
    It expresses its state (expanded/collapsed)

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to an expander
    result: |
      focus is strongly visually indicated
  - then:  |
      the spacebar and/or enter key to activate the expander
    result: |
      the hidden content is revealed

gherkin-mobile:
  - when:  |
      swipe to focus on a button
  - then:  |
      doubletap with the button in focus
    result: |
      the intended action occurs

design:
  - name: Perceivable
    list:
      - criteria: Is easy to identify as interactive
      - criteria: Color is not used as the only means of conveying information (expanded/collapsed)
  - name: Operable
    list:
      - criteria: Is keyboard operable
      - criteria: The click/tap target area is no smaller than 44x44px
      - criteria: The focus indication has a minimum area equal to the width of the element and 2px in height
      - criteria: The focus state has a 3:1 minimum contrast ratio between the default and focused states
      - criteria: The focus indication has a 3:1 minimum contrast ratio against adjacent elements
  - name: Understandable
    list:
      - criteria: Its purpose is clear in the context of the whole page
  - name: Robust
    list:
      - criteria: Meets criteria across platforms, devices and viewports

---


## Code examples

### Use semantic HTML

- This semantic HTML contains all accessibility features by default with no scripting required.
- It uses [CSS pseudo attributes](https://github.com/tmobile/magentaA11y/blob/main/_sass/modules/_details-summary.scss) to create the expanded/collapsed indicator, no Javascript.


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
- Inner text must describe the purpose

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

