---
layout: entry
title:  "Skip link"
description: "How to code and test an accessible skip link for Web"

categories: html
order: 1

keyboard:
  tab: |
    Focus moves to the skip link and there is a visual indication of keyboard focus
  enter: |
    Activates the link, focus/tabindex moves directly to the targeted element

mobile:
  swipe: |
    Focus moves to the skip link
  doubletap:
    Activates the link, focus/tabindex moves directly to the targeted element

screenreader:
  name:  |
    It describes which landmark it's targeting
  role:  |
    It identifies itself as a link
  group: |
    It is typically the first element in the page

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to a skip link
    result: |
      focus is strongly visually indicated
  - then:  |
      the enter key to activate the link
    result: |
      my focus moves directly to the targeted element

gherkin-mobile:
  - when:  |
      swipe to focus on a skip link
  - then:  |
      doubletap with the link in focus
    result: |
      my focus moves directly to the targeted element
---

## Code examples

{% highlight html %}
{% include /examples/main.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/main.html %}
</example>
{:/}

## Developer notes

### Group

- Skip links must be the first perceivable elements in the page

### Focus

- Landmarks and other elements can be targeted with a skip link, but aren't individually focusable with the tab key
- Use `tabindex="-1"` to make the target focusable with a skip link.