---
layout: entry
title:  "Stepper input"
description: "How to code and test an accessible stepper input"

categories: form

keyboard:
  tab: |
    Focus moves visibly to the select
  enter or spacebar: |
    If select is focused, expands the select and places focus on the currently selected option in the list. 
    If focus is in the options, collapses the select and keeps the currently selected option.
  arrow-keys: |
    Moves focus to and selects the next option. 
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

This component is useful for small-ish selections. If the max count is more than 20, this component will be cumbersome for people using a mouse.


{% highlight html %}
{% include /examples/input-number-stepper.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-number-stepper.html %}
</example>
{:/}

## Developer notes

This example provides the simplest answer to a number input with a stepper control with minimal scripting.

Notice that the stepper buttons are hidden from the screen reader because it's a better user experience to simply use the native select.

Using a select also eliminates any issues with the update being read by the screenreader on button press.

### Other attempts

- Using a `input type="number"` with its built in stepper is also simple, can be similarly styled, but NVDA can't read number input labels
- Wrapping a `input type="text"` with `aria-live="assertive"` isn't reliablly output across all screenreaders on change events

### Other possible options

If an unlimited number of options is required, using a normal text input with added controls will work, but a hidden element using `aria-live="assertive` will be required for the screenreader user.