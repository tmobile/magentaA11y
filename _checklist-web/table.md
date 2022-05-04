---
layout: entry
title:  "Table"
description: "How to code and test an accessible table for Web"

categories: main

keyboard:
  arrow-keys: |
    The table scrolls into view (and with a screenreader the cells become individually readable)

mobile:
  swipe: |
    The table is browsed from cell to cell

screenreader:
  name:  |
    The table has a caption or a heading to describe its purpose
  role:  |
    It identifies itself as a table
  group: |
    Column headers and row headers are identified with screenreader shortcuts

gherkin-keyboard: 
  - when:  |
      the arrow keys
    result: |
      the table scrolls into view (but is not focusable)

gherkin-mobile:
  - when:  |
      swipe to focusable elements in the footer

---
## Code examples

### Use semantic HTML
This semantic HTML contains all accessibility features by default. 

Optional: The table is wrapped in a `<figure>` to indicate author and source.

{% highlight html %}
{%- include /examples/table.html -%}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/table.html %}
</example>
{:/}

{::nomarkdown}
<example>
{% include /examples/table-screen-reader-browser-pairing.html %}
</example>
{:/}


### When you can't use semantic HTML

If it's required to display tabular data without using a `<table>` element, attributes will have to added.

{% highlight html %}
<div role="table" aria-describedby="table-desc">
  <div id="table-desc">
    NATO Phoenetic Alphabet
  </div>
  <div role="rowgroup">
    <div role="row">
      <span role="columnheader">Letter</span>
      <span role="columnheader">NATO</span>
    </div>
  </div>
  <div role="rowgroup">
    <div role="row">
      <span role="cell">A</span>
      <span role="cell">Alpha</span>
    </div>
    <div role="row">
      <span role="cell">B</span>
      <span role="cell">Bravo</span>
    </div>
    <div role="row">
      <span role="cell">C</span>
      <span role="cell">thead</span>
    </div>
  </div>
</div>
{% endhighlight %}

## Developer notes
Don't use tables purely for layout. Only use tables to structure tabular data. 

### Name
- The table can be named by a heading above or a `<caption>`

### Role
- Semantic `<table>` structures identify headers appropriately and honors screen reader keyboard shortcuts.

### Group
- Wrapping a table in a [`<figure>` element](/OpenA11yEngineer/checklist-web/figure/) can be used to build a relationship to `<figcaption>` and `<cite>`

### State
- Sortable tables can use `aria-sort` to indicate state.

## Documentation
- [MSDN Web Docs - ARIA: table role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Table_Role)
- [WAI-ARIA table example](https://www.w3.org/TR/wai-aria-practices/examples/table/table.html)
