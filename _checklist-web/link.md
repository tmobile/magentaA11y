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
<a href="/dont-repeat-yourself/" 
   aria-label="Don't repeat yourself">
   Don't repeat yourself
</div>
{% endhighlight %}{: .bad-example}

## Developer notes

### Name
- Inner text should describe the purpose of the link.
- **Do not** repeat the inner text content of a link in the `aria-label`

### Role
- Native button identifies as button by default
- Use `role="link"` for custom elements

### Focus
- Focus must be visible
- Custom elements need `tabindex="0"` to be focusable

