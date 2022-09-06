---
layout: entry
title:  "Link"
description: "How to code and test accessible links for the Web"
categories: nav main
order: 1

keyboard:
  tab: |
    Focus visibly moves to the link.
  enter: |
    Activates the link.

mobile:
  swipe: |
    Focus moves to the element
  doubletap: |
    Activates the link

screenreader:
  name:  |
    Its purpose is clear
  role:  |
    It identifies itself as a link

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to a link
    result: |
      focus is strongly visually indicated
  - then:  |
      the enter key to activate the link
    result: |
      my browser goes somewhere

gherkin-mobile:
  - when:  |
      swipe to focus on a link
  - then:  |
      doubletap with the link in focus
    result: |
      my browser goes somewhere

design:
  - name: Perceivable
    list:
      - criteria: Is easy to identify as interactive
      - criteria: Color and weight are not used as the only means of conveying it is a link
  - name: Operable
    list:
      - criteria: The click/tap target area is no smaller than 44x44px
      - criteria: The focus state has a 3:1 minimum contrast ratio against default
      - criteria: The focus indication has a 3:1 minimum contrast ratio against adjacent elements
      - criteria: The focus indication has a minimum area equal to the width of the element and 2px in height
  - name: Understandable
    list:
      - criteria: Its purpose is clear in the context of the whole page
      - criteria: It has the correct semantic meaning. If it goes somewhere, it’s a link (that can look like a button). If it does something, it’s a button (that can look like a link)
  - name: Robust
    list:
      - criteria: Meets criteria across platforms, devices and viewports
---

## Code examples

### Use semantic HTML
This semantic HTML contains all accessibility features by default. 

{% highlight html %}
<a href="/about/">
  About
</a>
{% endhighlight %}

{% raw %}
<example>
<a href="/about/">
  About
</a>
</example>
{% endraw %}

If a link has no definable url, add `tabindex="0"` to make it focusable.

{% highlight html %}
<a tabindex="0">
  About
</a>
{% endhighlight %}

{% raw %}
<example>
<a tabindex="0">
  About
</a>
</example>
{% endraw %}

### Avoid custom elements
This custom button requires extra attributes and event listeners.

{% highlight html %}
<custom-element role="link" tabindex="0">
  About
</custom-element>
{% endhighlight %}

### Repeating text links

Sometimes the design will call for multiple links with the same text label. In a case like this, `aria-label` can be used to name each link's purpose.

{% highlight html %}
<a href="/security/" aria-label="Security policy">
  Learn more
</a>
<a href="/privacy/" aria-label="Privacy policy">
  Learn more
</a>
{% endhighlight %}

### Don't duplicate the visible text name in the aria-label

**Do not** repeat the inner text content of a link in the `aria-label`.

{% highlight html %}
<a href="/do-NOT-repeat-yourself/" 
   aria-label="Do NOT repeat yourself">
   Do NOT repeat yourself
</div>
{% endhighlight %}{: .bad-example}

### Complex examples

- Don't wrap large blocks of content or nest other interactive components inside a link.
- This example uses a simple link and references product information using `aria-describedby`
- This allows the link to be read first (without the repetition of the image alt text) and then the screen reader will read the related product information (colors, pricing).

<example>
{% include /examples/product.html %}
</example>

{% highlight html %}
{% include /examples/product.html %}
{% endhighlight %}

## Developer notes

### Name
- Inner text should describe the purpose of the link.
- **Do not** repeat the inner text content of a link in the `aria-label`

### Role
- Native link identifies as link by default
- Use `role="link"` for custom elements

### Focus
- Focus must be visible
- Custom elements need `tabindex="0"` to be focusable