---
layout: entry
title:  "Pagination nav"
description: "How to code and test an accessible pagination nav for Web"
categories: main nav
order: 0

keyboard:
  tab: |
    Focus moves to links and buttons within the nav
        
mobile:
  swipe: |
      Focus moves within the nav
  doubletap: |
      Activates links

screenreader:
  name:  |
    The pagination nav has a logical name ("pagination")
  role:  |
    The nav landmark is discoverable with screenreader shortcuts

gherkin-keyboard: 
  - when:  |
      the arrow keys to browse to a pagination navigation
    result: |
      the nav comes into view
  - then:  |
      the tab key to move focus to a link in the nav and use the enter key
    result: |
      my browser goes to the intended location or the page is dynamically updated and I'm notified about this change in the UI

gherkin-mobile:
  - when:  |
      swipe to elements in the nav
  - then:  |
      doubletap with the link in focus
    result: |
      my browser goes to the intended location or the screen is dynamically updated and I'm notified about this change in the UI

wcag:
  - name: Perceivable
    list:
      - criteria: Is easy to identify as interactive
  - name: Operable
    list:
      - criteria: Is keyboard operable
      - criteria: The click/tap target area is no smaller than 44x44px
      - criteria: The focus state has a 3:1 minimum contrast ratio against default
      - criteria: The focus indication has a 3:1 minimum contrast ratio against adjacent elements
      - criteria: The focus indication has a minimum area equal to the width of the element and 2px in height
      - criteria: Color is not used as the only means of conveying current page
  - name: Understandable
    list:
      - criteria: Its purpose is clear in the context of the whole page
      - criteria: It has the correct semantic meaning (link, navigation)
  - name: Robust
    list:
      - criteria: Conveys the correct semantic role 
      - criteria: Expresses its state
      - criteria: Meets criteria across platforms, devices and viewports
---

## Code examples

### Use semantic HTML
This semantic HTML contains all accessibility features by default.

{% highlight html %}
{% include /examples/nav-pagination.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/nav-pagination.html %}
</example>
{:/}

## Developer notes

### Name

- Use `aria-label="Pagination"` when there is not a visible nav title.
  - `aria-describedby="title-id"` can be used when the nav title is a visible heading.
- Use `aria-label="Page X"` for each entry link.

### Role

- Identifies itself as navigation
- Use `role="navigation"` when it's not possible to use `<nav>`. 
- **DO NOT** add menu or option roles with arrow key event listeners unless you're building an actual application like Gmail.

### State

- Use `aria-current="page"` on the current page item.