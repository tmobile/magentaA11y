---
layout: entry
title:  "Listbox with inline autocomplete"
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
    Selects option

screenreader:
  name:  |
    Purpose is clear
  role:  |
    Identifies itself as a listbox
  group: |
    Label is read with the input
  state: |
    Indicates when the list is expanded/collapsed
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