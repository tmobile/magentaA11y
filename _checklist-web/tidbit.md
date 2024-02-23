---
layout: entry
title:  "Tidbit"
description: "How to code and test an accessible tidbit for Web"
categories: main

keyboard:
  arrow-keys: |
    The Tidbit scrolls into view
  tab-key: |
    The focusable link (if present) receives keyboard focus - there is a highly visible focus ring

mobile:
  swipe: |
    The individual contents of the Tidbit are accessed in this order: Icon, heading, paragraph, link

screenreader:
  name:  |
    The screen reader announces the text alternative for the info icon. Such as "Info","Error", "Caution". 
  description:  |
    The screen reader announces the visual label for any nested controls and any additional context. e.g. "Learn more Cats are amazing creatures". Note: Some screen readers require different navigational techniques to get the additional context to announce.
  role:  |
    It identifies the info icon as an image and the Tidbit heading as a heading
  group: |
    There is no grouping for the Tidbit

gherkin-keyboard: 
  - when:  |
      the arrow keys
    result: |
      the Tidbit scrolls into view

  - when:  |
      the tab key
    result: |
      the focusable link (if present) receives keyboard focus - there is a highly visible focus ring

gherkin-mobile:
  - when:  |
      swipe to contents of the Tidbit are accessed in this order: Icon, heading, paragraph, link

---
## Code examples

### Use semantic HTML
Typical Tidbit markup consists of an SVG icon, heading, paragraph text, and a link.

## Standard Tidbit
{% highlight html %}
{%- include /examples/tidbit.html -%}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/tidbit.html %}
</example>
{:/}

### Developer notes
- <strong>Icon:</strong> Ensure that the info icon has a text alternative. Add <code>role="img"</code> and <code>aria-label="Info"</code> to the SVG.
- <strong>Heading:</strong> Ensure the bold text that leads the Tidbit paragraph text is a heading element. Consider the hiearchy of the page when choosing the heading level.
- <strong>Link:</strong> If the link in the Tidbit is a generic "Learn more" "More info" style link, ensure that it is programmatically associated with the nearby heading with <code>aria-describedby</code>. The <code>aria-describedby</code> value will the the <code>ID</code> found on the heading element at the top of the Tidbit.

***

## Tidbit with no heading
{% highlight html %}
{%- include /examples/tidbit-no-heading.html -%}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/tidbit-no-heading.html %}
</example>
{:/}

### Developer notes
- Ensure the link text is meaningful. Avoid generic "Learn more" "Read more" links when there is no heading.

***

## Tidbit with no heading no tertiary link
{% highlight html %}
{%- include /examples/tidbit-no-heading-no-link.html -%}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/tidbit-no-heading-no-link.html %}
</example>
{:/}

***

## Tidbit - Error example
{% highlight html %}
{%- include /examples/tidbit-error.html -%}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/tidbit-error.html %}
</example>
{:/}

## Tidbit - Caution example
{% highlight html %}
{%- include /examples/tidbit-caution.html -%}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/tidbit-caution.html %}
</example>
{:/}

### Developer notes
- Ensure the SVG icon has a meaningful text alternative. e.g. <code>aria-label="Error"</code> or <code>aria-label="Caution"</code>

***

### Name
- The icon is an informative image and should have a text alternative of "Info", "Error", "Caution"

### Role
- The "i" icon is an image due to the use of <code>role="img"</code> on the SVG.
- The bold text at the top of the Tidbit owns a role of <code>heading</code> due to the use of an <code>h2</code> element.

## Documentation
- [WCAG 2.4.4 Link Purpose](https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html)
- [WCAG 1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)