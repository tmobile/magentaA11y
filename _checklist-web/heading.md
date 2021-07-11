---
layout: entry
title:  "Heading: h1, h2, h3"
categories: main
description: "How to code and test accessible headings for websites"

keyboard:
  tab: |
    Nothing, headings should not be focusable 
      
mobile:
  swipe: |
      The screenreader reads the heading and its level

screenreader:
  name:  |
    The heading's purpose and level should be clear
  role:  |
    Identifies itself as a heading and its level
  group: |
    Headings are logically ordered, starting with a single h1, sections titled by h2, and subsections with h3
  state: |
    n/a

---

## Code examples

### Use semantic HTML
This semantic HTML contains all accessibility features by default.

{% highlight html %}
<h1>
  About our company
</h1>
{% endhighlight %}

### When you can't use semantic HTML

This custom header requires extra attributes.

{% highlight html %}
<div role="heading" aria-level="1">
  About our company
</div>
{% endhighlight %}

## Developer notes

### Name
- Inner text describes the heading

### Role
- Semantic headings `<h1>` `<h2>` `<h3>` identify themselves as headings and express the level
- Use `role="heading" aria-level="1"` to for custom elements

### Group
- Headings should be logically ordered.
- Start with a single `<h1>` per page.
  - Title major sections with `<h2>`
    - Subsections with `<h3>`
      - It should be rare that `<h4>` and beyond is required.

### Focus
- Headings (probably) should not receive focus

