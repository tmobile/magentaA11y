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
    Focus moves within the main area

screenreader:
  role:  |
    It is discoverable with screenreader shortcuts as main landmark
  group: |
    It contains the content portion of the page ideally starting with the H1

gherkin-keyboard: 
  - when:  |
      the arrow keys to browse the main content
    result: |
      the screen scroll through the page

gherkin-mobile:
  - when:  |
      swipe to elements in the page

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
- If a page has multiple `<main>` landmarks, then each should have a unique programmatic label.
  - Use `aria-label="Content name"` when there is not a visible content label.
  - `aria-labelledby="content-id"` can be used when the content label is a visible heading or existing page text.


### Role

- Identifies itself as a main landmark
- If a non-semantic element must be used (like a `<div>`) use `role="main"`.


### Group

- must contain the main content of the page.
- Ideally appears only once per Web page.

### Focus

- Can be targeted with a skip link, but isn't focusable with the tab key
- Use `tabindex="-1"` to make the main targetable with a skip link.

## Further Reading
- [WCAG 1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html)
