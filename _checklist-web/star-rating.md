---
layout: entry
title:  "Star rating"
categories: form

keyboard:
  tab: |
      Focus visibly moves to the checked radio input in the group. If a radio button is not checked, focus moves to the first radio button in the group.
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
      Input label and purpose is clear
  role:  |
      Identifies itself as a radio option
  group: |
      Each option has a label and all options are part of a named group.
  state: |
      Expresses its state (selected, checked, disabled)
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

The element should clearly express the rating and scale.

{% highlight html %}
{% include /examples/stars.html %}
{% endhighlight %}

{::nomarkdown}
{% include /examples/stars.html %}
{:/}





