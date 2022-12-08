---
layout: entry
title:  "Star rating input"
description: "How to code and test an accessible star rating input for Web"
categories: form

keyboard:
  tab: |
    Focus visibly moves to the checked radio button in the group. If a radio button is not checked, focus moves to the first radio button in the group.
  spacebar: |
    If the radio button with focus is not checked, changes the state to checked.  Otherwise, does nothing.
  arrow-keys: |
    Moves focus to and checks the previous or next radio button in the group
        
mobile:
  swipe: |
    Focus moves to the element, expresses its state
  doubletap: |
    If the radio button with focus is not checked, changes the state to checked. Otherwise, does nothing.

screenreader:
  name:  |
    Its label and purpose is clear
  role:  |
    It identifies itself as a radio option
  group: |
    Each option has an associated label and the radio group name
  state: |
    It expresses its state (selected, checked, disabled)

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to a radio group
    result: |
      focus is strongly visually indicated on the first unselected option or the selected option
  - then:  |
      the spacebar to activate the radio button
    result: |
      the radio button with focus change state to selected.
  - then:  |
      the arrow keys to focus radio button
    result: |
      the state is changed

gherkin-mobile:
  - when:  |
      swipe to focus on a radio button
  - then:  |
      doubletap with the radio in focus
    result: |
      the state is changed

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
  - name: Understandable
    list:
      - criteria: Its purpose is clear in the context of the whole page
  - name: Robust
    list:
      - criteria: Conveys the correct semantic role 
      - criteria: Expresses its state
      - criteria: Meets criteria across platforms, devices and viewports
---

## Code examples

### As radio group

This radio group uses CSS to reverse the visual order of the radio inputs while preserving accessibility.

{% highlight html %}
{% include /examples/input-stars.html %}
{% endhighlight %}

{::nomarkdown}
{% include /examples/input-stars.html %}
{:/}

### Displaying star ratings

The element must clearly express the rating and scale.

{% highlight html %}
{% include /examples/stars.html %}
{% endhighlight %}

{::nomarkdown}
{% include /examples/stars.html %}
{:/}





