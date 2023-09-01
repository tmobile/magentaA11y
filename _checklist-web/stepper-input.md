---
layout: entry
title:  "Stepper input"
description: "How to code and test an accessible stepper input"
categories: form

keyboard:
  tab: |
    Focus moves to either the select field or buttons
  enter or spacebar: |
    If select is focused, expands the select and places focus on the currently selected option in the list 
    If focus is in the options, collapses the select and keeps the currently selected option.
    If focus is on one of the buttons, it will either increment or decrement the value
  arrow-keys: |
    If select is focused, moves focus to and selects the next option
  escape: |
    If the select is displayed, collapses the select and moves focus to the button
  home: |
    If the select is displayed, moves focus to and selects the first option
  end: |
    If the select is displayed, moves focus to and selects the last option
     
mobile:
  swipe: |
    Moves focus to each form control in the pattern
  double-tap: |
    If select is focused, opens select, selects option
    If a button is focused, it will either increment or decrement the value
screenreader:
  name:  |
    Button labels are clear and include context
    The select field's visual label is announced
  role:  |
    For the select field it identifies itself as a select, popup button, menu/submenu or listbox
    For the buttons they are identified as button
  group: |
    Its label is read with the input
  state: |
    It indicates when the select is expanded/collapsed, indicates which option is selected

gherkin-keyboard: 
  - when:  |
      the tab key to move focus form fields
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
  - when:  |
      the enter key is pressed on buttons
    result: |
      the value is incremented or decremented    

gherkin-mobile:
  - when:  |
      swipe to focus on the form fields
  - then:  |
      doubletap with the select in focus
    result: |
      the picker/spinner opens
  - then:  |
      doubletap with the button in focus
    result: |
      the value is incremented or decremented

wcag:
  - name: Perceivable
    list:
      - criteria: Is easy to identify as interactive
      - criteria: Color is not used as the only means of conveying information
  - name: Operable
    list:
      - criteria: Is keyboard operable
      - criteria: The click/tap target area is no smaller than 44x44px
      - criteria: The disabled and focus states have a 3:1 minimum contrast ratio against default
      - criteria: The focus indication has a 3:1 minimum contrast ratio against adjacent elements
      - criteria: The focus indication has a minimum area equal to the width of the element and 2px in height
      - criteria: The form field label in the code contains the text that is visually presented
  - name: Understandable
    list:
      - criteria: Its purpose is clear in the context of the whole page
  - name: Robust
    list:
      - criteria: Conveys the correct semantic role 
      - criteria: Expresses its state (if applicable)
      - criteria: Meets criteria across platforms, devices and viewports
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

This stepper example provides both `button` and `select` elements for users to change a value.

A non-visual live container with `aria-live="polite"` is present in the page at DOM load. When the `button` elements are activated, this non-visual live container is updated with dynamic content that screen reader users will hear announced as they increment or decrement the value. This dynamic text is then removed from the DOM after a few seconds (but not the actual container with `aria-live="polite"`) so the message is not discovered by screen reader users after interaction.

The value of the `select` element naturally communicates the updated value to screen reader users so the live container is not updated when that form element is interacted with.

The `button` `aria-label` values should be plain text and they should include context of what they affect when activated (typically the label for the `select`).  e.g. Increase Quantity, Add Quantity
