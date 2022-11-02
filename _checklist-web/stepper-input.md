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
    Its purpose is clear (+/- buttons are ignored)
  role:  |
    It identifies itself as a select, popup button, menu/submenu or listbox
  group: |
    Its label is read with the input
  state: |
    It indicates when the select is expanded/collapsed, indicates which option is selected

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to the select (+/- buttons are ignored)
    result: |
      focus is strongly visually indicated
  - then:  |
      the arrow keys to select an option
    result: |
      the selected option is changed
  - then:  |
      the escape key when the select is open 
    result: |
      it collapses and focus moves to the select

gherkin-mobile:
  - when:  |
      swipe to focus on the select (+/- buttons are ignored)
  - then:  |
      doubletap with the select in focus
    result: |
      the picker/spinner opens
---

## Code examples

### Speciality stepper integer input

This component is useful for small-ish selections. If the max count is more than 20, this component will be cumbersome for people using a mouse.

{% highlight html %}
{% include /examples/input-select-stepper.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-select-stepper.html %}
</example>
{:/}

## Developer notes

This example provides the simplest answer to a number input with a stepper control with minimal scripting.

Notice that the stepper buttons are hidden from the screen reader because it's a better user experience to simply use the native select.

Using a select also eliminates any issues with the update being read by the screenreader on button press.

### Notable failed prototype attempts

- Do not use a `input type="number"` — NVDA doesn't support number inputs
- Wrapping a `input type="text"` with `aria-live="assertive"` isn't reliably output across all screen readers on change events
