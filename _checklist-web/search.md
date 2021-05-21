---
layout: entry
title:  "Search input"
categories: nav header

keyboard:
  tab: |
    Focus moves visibly to the search text input and search button
  space: |
    Search button is activated
  enter: |
    Search is activated
      
mobile:
  swipe: |
    Focus moves to the search text input and search button
  doubletap: |
    Search button is activated

screenreader:
  name:  |
    Label describes input
  role:  |
    Identifies itself as a search input
  group: |
    Form identifies itself as search group
  state: |
    n/a
---

## Code examples

### Use semantic HTML
This semantic HTML contains all accessibility features by default. Include a search button.

{% highlight html %}
{% include /examples/input-search.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-search.html %}
</example>
{:/}

## Developer notes

### Name
- Use a `label` with a `for="input-id` to describe the input
- Use `aria-label="Search this website"` if a `label` can't be used

### Role
- Use `role="search"` for the `<form>`
- Use `type="search"` for the text `<input>`

### Group
- Form identifies itself as `role="search"` 
- Include a search submit button.

### Focus
- Focus must be visible


