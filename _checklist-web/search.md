---
layout: entry
title:  "Search input"
description: "How to code and test an accessible search input for Web"

categories: nav header

keyboard:
  tab: |
    Focus moves to the search text input and search button [if present] and there is a highly visible visual indication of keyboard focus
  space: |
    Search button is activated [if present]
  enter: |
    Search is activated [if present]

mobile:
  swipe: |
    Focus moves to the search text input and search button [if present]
  doubletap: |
    Search button is activated [if present]

screenreader:
  name:  |
    Its purpose is clear
  role:  |
    It identifies itself as a search input
  group: |
    The form itself is discoverable with screenreader shortcuts as search landmark

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to a search input
    result: |
      there is a highly visible visual indication of keyboard focus
  - then:  |
      the tab key to move focus to the search submit button [if present]
    result: |
      the button is focused
  - then:  |
      the enter or spacebar key
    result: |
      the search results are presented

gherkin-mobile:
  - when:  |
      swipe to focus on a search input

wcag:
  - name: Perceivable
    list:
      - criteria: Is easy to identify as interactive
      - criteria: Type size is optically no smaller than 16px Helvetica
      - criteria: Text/iconography has a 4.5:1 minimum contrast ratio
      - criteria: Color is not used as the only means of conveying information or state (error, success, focus, disabled etc)
  - name: Operable
    list:
      - criteria: Is keyboard operable
      - criteria: Any click/tap target area is ideally no smaller than 44x44px
      - criteria: The disabled and focus states have a 3:1 minimum contrast ratio against default
      - criteria: A search submit button is also available and meets button design criteria
  - name: Understandable
    list:
      - criteria: The search scope should be clear in the context of the whole page
      - criteria: The width of the input accommodates/affords the intended input, reinforcing its purpose
  - name: Robust
    list:
      - criteria: Conveys the correct semantic role 
      - criteria: Expresses its state (if applicable)
      - criteria: Meets criteria across platforms, devices and viewports
---

## Code examples

### Use semantic HTML

- This semantic HTML contains all accessibility features by default. 
- Include a search button

### Search with autocomplete suggestions

- For search autocomplete see [Autocomplete input with listbox](/checklist-web/listbox-autocomplete/)

{% highlight html %}
{% include /examples/form-search.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/form-search.html %}
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


