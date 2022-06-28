---
layout: entry
title:  "Main landmark"
description: "How to code and test an accessible main landmark for Web"
categories: html main
order: 3

keyboard:
  skip-links: |
    Focus moves directly to the main content area
  tab: |
    Links and buttons within the main area are focusable

mobile:
  swipe: |
    Focus moves within main area

screenreader:
  role:  |
    It is discoverable with screenreader shortcuts as main landmark
  group: |
    It contains the content portion of the page starting with the H1

gherkin-keyboard: 
  - when:  |
      the arrow keys to browse the main content
    result: |
      the screen scroll through the page

gherkin-mobile:
  - when:  |
      swipe to elements in the header

---

## Code examples

### Use semantic HTML

This semantic HTML contains all accessibility features by default.


{% highlight html %}
{% include /examples/main.html %}
{% endhighlight %}

{::nomarkdown}
{% include /examples/main.html %}
{:/}


### When you can't use semantic HTML

This custom main element requires extra attributes.

{% highlight html %}
<div role="main" tabindex="-1" id="example-main"> 
  <h1>About our company</h1>
  <p>The main content of the page belongs here.</p>
</div>
{% endhighlight %}

## Developer notes

### Name
- Typically doesn't have a name other than its role.

### Role

- Identifies itself as a main landmark
- If a non-semantic element must be used (like a `<div>`) use `role="main"`.

### Group

- must contain the main content of the page.

### Focus

- Can be targeted with a skip link, but isn't focusable with the tab key
- Use `tabindex="-1"` to make the main targetable with a skip link.


