---
layout: entry
title:  "Autocomplete input with listbox"
description: "How to test an accessible listbox with inline autocomplete text input for the Web"
categories: form
     
keyboard:
  tab: |
    Focus moves visibly to the text input
  arrow-keys: |
    Focus moves to and selects the next option. 
    If the textbox is empty and the listbox is not displayed, opens the listbox and moves visual focus to the next option.
    In both cases DOM focus remains on the textbox.
  enter: |
    The textbox value is set to the content of the selected option.
    The listbox closes.
  escape: |
    Clears the textbox. If the listbox is displayed, closes it.

mobile:
  swipe: |
    Focus moves to the input, traverses list
  double-tap: |
    Opens select, chooses option

screenreader:
  name:  |
    Its purpose is clear
  role:  |
    It identifies itself as a select, popup, menu/submenu, listbox or combobox
  group: |
    Its label is read and selected options are read
  state: |
    It indicates the value of the text input 
    
gherkin-keyboard: 
  - when:  |
      the tab key to move focus to the text input
    result: |
      focus is strongly visually indicated
  - then:  |
      the arrow keys to select an option
    result: |
      the selected option is the new text input value
  - then:  |
      the enter key
    result: |
      the selected option is changed and focus returns to the text input
  - then:  |
      the escape key when the select is open 
    result: |
     it collapses and focus moves to the text input

gherkin-mobile:
  - when:  |
      swipe to focus on a select
  - then:  |
      doubletap with the select in focus
    result: |
      the selected option is changed

wcag:
  - name: Perceivable
    list:
      - criteria: Is easy to identify as interactive
      - criteria: Text size is optically no smaller than 16px Helvetica
      - criteria: The text has a 4.5:1 minimum contrast ratio
      - criteria: Label is always visible (placeholder cannot be used as a label)
      - criteria: Color is not used as the only means of conveying information or state (error, success, focus, disabled etc)
  - name: Operable
    list:
      - criteria: Is keyboard operable
      - criteria: The click/tap target area is no smaller than 44x44px
      - criteria: The disabled and focus states have a 3:1 minimum contrast ratio against default
      - criteria: The focus indication has a minimum area equal to the width of the element and 2px in height
  - name: Understandable
    list:
      - criteria: The input purpose should be clear in the context of the whole page
      - criteria: The width of the input accommodates/affords the intended input, reinforcing its purpose
  - name: Robust
    list:
      - criteria: Meets criteria across platforms, devices and viewports
---

## Code examples

### Custom listbox with autocomplete

Custom listboxes are notoriously difficult to build in an accessible fashion for screenreaders.

- [WAI-ARIA examples](https://w3c.github.io/aria-practices/examples/combobox/combobox-autocomplete-list.html)

### Semantic input with datalist autocomplete

- This simple example illustrates all the functionality of a listbox with inline autocomplete in Chrome and Firefox.
  - **This is not production ready code** as its support across browsers is not uniform.
  - A `datalist` is **not fully supported in Safari**, but is included in the newest Safari Technology Preview as of late 2022
  - Support and functionality on mobile devices varies

{% highlight html %}
{% include /examples/input-text-autocomplete.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-text-autocomplete.html %}
</example>
{:/}
