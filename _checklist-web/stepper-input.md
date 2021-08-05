---
layout: entry
title:  "Stepper input"
description: "How to code and test an accessible listbox select dropdown for the Web"

categories: form

keyboard:
  tab: |
    Focus moves visibly to the select
  spacebar: |
    If select is focused, expands the select and places focus on the currently selected option in the list. 
    If focus is in the options, collapses the select and keeps the currently selected option.
  arrow-keys: |
    Moves focus to and selects the next option. 
    If the listbox is collapsed, also expands the list.
  escape: |
    If the select is displayed, collapses the select and moves focus to the button.
  home: |
    If the select is displayed, moves focus to and selects the first option.
  end: |
    If the select is displayed, moves focus to and selects the last option.e.
     
mobile:
  swipe: |
    Ignores +/- buttons, focus moves to the input, traverses list
  double-tap: |
    Opens select, selects option

screenreader:
  name:  |
    Purpose is clear, +/- buttons are ignored
  role:  |
    Identifies itself as a menu/submenu or listbox
  group: |
    Label is read with the input
  state: |
    Indicates when the button is expanded/collapsed, indicates which option is selected    
---

## Code examples


### Speciality stepper integer input

{% highlight html %}
{% include /examples/input-number-stepper.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-number-stepper.html %}
</example>
{:/}
