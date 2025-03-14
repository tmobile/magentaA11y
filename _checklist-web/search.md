---
layout: entry
title:  "Search input"
description: "How to code and test an accessible search input for Web"

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
    Its purpose is clear
  role:  |
    It identifies itself as a search input
  group: |
    The form itself is discoverable with screenreader shortcuts as search landmark

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to a search input
    result: |
      focus is strongly visually indicated
  - then:  |
      the tab key to move focus to the search submit button
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
      - criteria: Any click/tap target area is no smaller than 44x44px
      - criteria: The disabled and focus states have a 3:1 minimum contrast ratio against default
      - criteria: The focus indication has a minimum area equal to the width of the element and 2px in height
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

## Further Reading
- [WCAG 1.1.1 Non-text Content (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html)
- [WCAG 1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html)
- [WCAG 1.3.5 Identify Input Purpose (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose)
- [WCAG 2.1.1 Keyboard (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html)
- [WCAG 3.2.3 Consistent Navigation (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html)
- [WCAG 3.3.2 Labels or Instructions (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html)
- [WCAG 4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)

