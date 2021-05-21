---
layout: entry
title:  "Button"
categories: nav form
order: 1

keyboard:
  tab: |
    Focus visibly moves to the button.
  spacebar: |
    Activates the button.
  enter: |
    Activates the button.
    
screenreader:
  name:  |
    Purpose is clear
  role:  |
    Identifies as a button
  group: |
    Indicates it has popup for modals, listbox, or menus
  state: |
    Expresses its state if applicable (pressed, expanded, disabled)
          
mobile:
  swipe: |
    Focus moves to the element, expresses its state
  doubletap: |
    Activates the button

media:
  ios/button.mp4: |
    iOS Voiceover Safari
  android/button.mp4: |
    Android Talkback Chrome
  jaws/button.mp4: |
    JAWS Chrome
  nvda/button.mp4: |
    Windows NVDA Firefox

---


## Code examples

### Use semantic HTML
This semantic HTML contains all accessibility features by default.

{% highlight html %}
{% include /examples/button.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/button.html %}
</example>
{:/}

### Focusable disabled button

The preferred method is to use `aria-disabled="true"` so screen reader users can find the button, click submit and be notified of errors in the form.

{% highlight html %}
{% include /examples/button-focusable-disabled.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/button-focusable-disabled.html %}
</example>
{:/}

### Fully disabled button

A button that uses the disabled attribute will not be focusable, but it is still discoverable by the screen reader while browsing.


{% highlight html %}
{% include /examples/button-disabled.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/button-disabled.html %}
</example>
{:/}


### When you can't use semantic HTML

This custom button requires extra attributes and JS event listeners. Adding `tabindex="0"` makes it focusable.

{% highlight html %}
<div role="button" tabindex="0">
  Continue
</div>
{% endhighlight %}

### When there is no inner text

As a last resort, `aria-label` can be used.

{% highlight html %}
<div role="button" tabindex="0" aria-label="Continue">
  <!-- icon -->
</div>
{% endhighlight %}


## Developer notes

### Name
- Inner text should describe the purpose of the button.
- `aria-label="Button purpose"` can also be used (as a last resort)

### Role
- Native button identifies as button by default
- Use `role="button"` for custom elements

### Group
- Use `aria-haspopup="true"` for menu, listbox or modal
- `aria-controls="popupId"` is not well supported

### State
- Toggle buttons `aria-pressed="true/false"`
- Menus or expanders use `aria-expanded="true/false"` 
- Use the `disabled` state for inactive buttons 
- Use `aria-disabled="true/false"` state for inactive custom elements 

### Focus
- Focus must be visible
- Custom elements need `tabindex="0"` to be focusable

