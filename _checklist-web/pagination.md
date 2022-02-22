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
    The pagination navigation is named
  role:  |
    The navigation landmark is discoverable with screenreader shortcuts

gherkin-keyboard: 
  - when:  |
      the arrow keys to browse to a pagination navigation
    result: |
      the navigation comes into view
  - then:  |
      the tab key to move focus to a link in the navigation and use the enter key
    result: |
      my browser goes to the intended location

gherkin-mobile:
  - when:  |
      swipe to elements in the navigation
  - then:  |
      doubletap with the link in focus
    result: |
      my browser goes to the intended location
---

## Code examples

### Use semantic HTML
This semantic HTML contains all accessibility features by default.

{% highlight html %}
{% include /examples/pagination.html %}
{% endhighlight %}

{::nomarkdown}
{% include /examples/pagination.html %}
{:/}


## Developer notes

### Name

- Use `aria-label="Pagination"` when there is not a visible nav title.
  - `aria-describedby="title-id"` can be used when the nav title is a visible heading.
- Use `aria-label="Page X"` for each entry link.

### Role

- Identifies itself as navigation
- Use `role="navigation"` when it's not possible to use `<nav`. 
- **DO NOT** add menu or option roles with arrow key event listeners unless you're building an actual application like Gmail.

### State

- Use `aria-current="page"` on the current page item.