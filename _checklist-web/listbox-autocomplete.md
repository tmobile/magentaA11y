---
layout: entry
title:  "Listbox with inline autocomplete"
description: "How to code and test an accessible listbox with inline autocomplete for the Web"
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
      the selected option
  - then:  |
      the enter key
    result: |
      the selected option is changed and focus returns to the text input
  - then:  |
      the escape key when the select is open 
    result: |
     it collapses and focus moves to the select

gherkin-mobile:
  - when:  |
      swipe to focus on a select
  - then:  |
      doubletap with the select in focus
    result: |
      the selected option is changed
---
## Code example

{% highlight html %}
{% include /examples/input-listbox-autocomplete.html %}
{% endhighlight %}

## Developer notes

### Name
- Purpose must be clear from the label

### Role
- Use `role="combobox"` for the input
- Use `role="listbox"` for the list of options
- Use `role="option"` for the individual options

### State
- Use `aria-expanded="true/false"` on the text input to indicate the state of the list

### Group
- Use `aria-haspopup="true"` on the text input to indicate there is a popup

### Focus
- Focus must be visible

## Documentation
- [WAI-ARIA examples](https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html)