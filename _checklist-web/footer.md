---
layout: entry
title:  "Footer landmark"
description: "How to test an accessible footer for the Web"
categories: html footer
order: 9

keyboard:
  skip-links: |
    If a skip link points to the footer, focus moves directly to the footer
  tab: |
    Links and buttons within the footer are focusable

mobile:
  swipe: |
    Focus moves within footer.
  doubletap: |
    This typically activates most elements.

screenreader:
  role:  |
    It is discoverable with screenreader shortcuts as a footer or contentinfo landmark
  group: |
    It typically contains copyright information, navigation links, and privacy statements.

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to a interactive element in the footer
    result: |
      focus is strongly visually indicated

gherkin-mobile:
  - when:  |
      swipe to focusable elements in the footer
---

## Code examples

### Use semantic HTML

This semantic HTML contains all accessibility features by default.

{% highlight html %}
{% include /examples/footer.html %}
{% endhighlight %}

{::nomarkdown}
{% include /examples/footer.html %}
{:/}

### When you can't use semantic HTML

This custom footer requires extra attributes.

{% highlight html %}
<div role="contentinfo" tabindex="-1" id="example-footer">
  &copy; 2021 Site Name
</div>
{% endhighlight %}

## Developer notes

### Name
- Typically doesn't have a name

### Role

- Identifies itself as a footer or contentinfo landmark
- If a non-semantic element must be used (like a `<div>`) use `role="contentinfo"`.

### Group

- Typically contains copyright information, navigation links, and privacy statements.

### Focus

- Can be targeted with a skip link, but isn't focusable with the tab key
- Use `tabindex="-1"` to make the footer targetable with a skip link.


