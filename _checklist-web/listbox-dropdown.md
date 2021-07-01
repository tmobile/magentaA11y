---
layout: entry
title:  "Listbox select dropdown"
categories: form

keyboard:
  tab: |
    Focus moves visibly to the input
  enter or spacebar: |
    If the focus is on the button, expands the listbox and places focus on the currently selected option in the list. 
    If focus is in the listbox, collapses the listbox and keeps the currently selected option as the button label.
  arrow-keys: |
    Moves focus to and selects the next option. 
    If the listbox is collapsed, also expands the list.
  escape: |
    If the listbox is displayed, collapses the listbox and moves focus to the button.
  home: |
    If the listbox is displayed, moves focus to and selects the first option.
  end: |
    If the listbox is displayed, moves focus to and selects the last option.e.
     
mobile:
  swipe: |
    Focus moves to the input, traverses list
  double-tap: |
    Opens listbox, selects option

screenreader:
  name:  |
    Purpose is clear
  role:  |
    Identifies itself as a listbox
  group: |
    Label is read with the input
  state: |
    Indicates when the button is expanded/collapsed, indicates which option is selected    
---

## Code examples


### Use Semantic HTML

This native select contains all the accessibility criteria for free and is styled to look cool.

{% highlight html %}
{% include /examples/input-select.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-select.html %}
</example>
{:/}

### Custom elements

Custom listboxes are notoriously difficult to make screen reader accessible. 

Even Angular Material documentation says "The native `<select>` offers the best accessibility because it is supported directly by screen-readers."

{% highlight html %}
<div id="listbox-label">
  Choose a NATO Phoenetic Letter
</div>
<button aria-haspopup="listbox"
        aria-labelledby="listbox-label listbox-button"
        id="listbox-button">
        Charlie
</button>
<ul tabindex="-1"
    role="listbox"
    aria-labelledby="listbox-label"
    class="hidden">
  <li id="alpha" role="option">
    Alpha
  </li>
  <li id="bravo" role="option">
    Bravo
  </li>
  <li id="charlie" role="option">
    Charlie
  </li>
</ul>
{% endhighlight %}




## Developer notes
Custom listboxes are notoriously difficult to develop in a way that works for the screen reader.

Angular material custom listbox requires the Live Announcer overlay to be accessible, and [advises using a native `<select>` for accessibility](https://material.angular.io/components/select/overview).

Before you attempt to use one of these, be certain a native `<select>` is not an option.

[WAI-ARIA listbox examples](https://www.w3.org/TR/wai-aria-practices-1.1/examples/listbox/listbox-collapsible.html)

### Name
- The popup button should reference the label with `aria-labelledby="listbox-label listbox-button"`

### Role
- Use `role="listbox"` on the list itself.
- Use `role="option"` for each list item

### State
- The state is expressed by changing the inner text of the focusable popup button

### Group
- Listboxes require a number of relationships to be built with custom attributes.
- Use `aria-haspopup="listbox"` to indicate its function
- Naming the popup button requires `aria-labelledby="listbox-label listbox-button"`
- The list itself requires `aria-labelledby="listbox-label"` to associate options with the label.

### Focus
- Focus must be visible
- Using the arrow keys doesn't change the focus, it changes the name of the focusable popup button