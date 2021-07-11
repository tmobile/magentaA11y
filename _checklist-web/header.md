---
layout: entry
title:  "Header / banner"
categories: header html
description: "How to code and test an accessible header for websites"
order: 2

keyboard:
  skip-links: |
    Focus moves directly to the header
  tab: |
    Links and buttons within the header are focusable

mobile:
  swipe: |
    Focus moves within the dialog and doesn't enter the rest of the page.
  doubletap: |
    This typically activates most elements.

screenreader:
  name:  |
    Discoverable by screen reader as header or banner landmark
  role:  |
    Identifies itself as a header or banner landmark
  group: |
    Typically contains site title and primary navigation
  state: |
    n/a
---

## Code examples

### Use semantic HTML

This semantic HTML contains all accessibility features by default.

{% highlight html %}
<header tabindex="-1" id="example-header">
  <a href="/">Website name</a>
</header>
{% endhighlight %}

### When you can't use semantic HTML

This custom header requires extra attributes.

{% highlight html %}
<div role="banner" tabindex="-1" id="example-header">
  <a href="/">Website name</a>
</div>
{% endhighlight %}

## Developer notes

### Name
- Typically doesn't have a name or description

### Role

- Identifies itself as a header or banner landmark
- The native `<header>` element will identify itself as a header
- If a non-semantic element must be used (like a `<div>`) use `role="banner"` to make the element discoverable.

### Group

-   Typically contains site title and primary navigation

### Focus

- Can be targeted with a skip link, but isn't focusable with the tab key
- Use `tabindex="-1"` to make the header targetable with a skip link.


