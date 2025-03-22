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
    Focus moves to the link
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
      there is a highly visible visual indication of keyboard focus
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

wcag:
  - name: Perceivable
    list:
      - criteria: Is easy to identify as interactive
      - criteria: Color or weight are not used as the only means of conveying it is a link
  - name: Operable
    list:
      - criteria: Is keyboard operable
      - criteria: The click/tap target area is no smaller than 44x44px
      - criteria: The focus state has a 3:1 minimum contrast ratio against default
      - criteria: The focus indication has a 3:1 minimum contrast ratio against adjacent elements
      - criteria: The focus indication has a minimum area equal to the width of the element and 2px in height
  - name: Understandable
    list:
      - criteria: Its purpose is clear in the context of the whole page
  - name: Robust
    list:
      - criteria: Conveys the correct semantic role
      - criteria: Expresses its state (if applicable)
      - criteria: Meets criteria across platforms, devices and viewports
---

## Links vs buttons

### If it goes somewhere, it's `<a>` link.

- When the user clicks a link, they are taken to a different location in the site.
  - Either another page or even another area of the same page
- A link can look like a big shiny button but it must be coded as `<a>` link

### If it does something, it's a `<button>`

- Buttons cause an action to occur on the same page
  - Submit a form (even when submission takes you to a new page)
  - Open a menu
  - Launch a modal
  - Expand details
- A button can look like a link, but it must be coded as a `<button>`

## Code examples

### Use semantic HTML with common sense names

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

### Name links logically

- **Do not** use a heading with a generic link below. 
- Instead, make the heading a link or programmatically associate the link with the heading using <code>aria-describedby</code>.

{% highlight html %}
<h3>About our coffee subscriptions</h3>
<p>Get the best coffee delivered to your door</p>
<a href="/about/">
   Learn more
</div>
{% endhighlight %}{: .bad-example}

{% highlight html %}
<h3><a href="/about/">About our coffee subscriptions</a></h3>
<p>Get the best coffee delivered to your door</p>
{% endhighlight %}{: .good-example}

{% highlight html %}
<h3 id="unique-id">About our coffee subscriptions</h3>
<p>Get the best coffee delivered to your door</p>
<a href="/about/" aria-describedby="unique-id">
   Learn more
</div>
{% endhighlight %}{: .good-example}

### Making a link with no `href` focusable

- **Do not** put anything but a URI in the `href`
- A link with no `href` will not be focusable with the keyboard without `tabindex="0"`.
- Add `role="link"` to ensure screen reader reads the role

{% highlight html %}
<a tabindex="0" role="link">
  About
</a>
{% endhighlight %}

{% raw %}
<example>
<a tabindex="0" role="link">
  About
</a>
</example>
{% endraw %}

### Avoid custom elements

This custom button requires extra attributes and keyboard event listeners.

{% highlight html %}
<custom-element role="link" tabindex="0">
  About
</custom-element>
{% endhighlight %}

### Repeating text links

Sometimes the design will call for multiple links with the same text label. In a case like this, `aria-label` can be used to name each link's purpose.

{% highlight html %}
<button>Get free coffee</button>
<a href="/free-coffee-tc/" aria-label="Free coffee terms and conditions">
  Terms &amp; Conditions
</a>
<button>Get free donuts</button>
<a href="/free-donuts-tc/" aria-label="Free donuts terms and conditions">
  Terms &amp; Conditions
</a>
{% endhighlight %}

### Don't duplicate the visible text name in the aria-label

**Do not** repeat the inner text content of a link in the `aria-label`.

{% highlight html %}
<a href="/do-NOT-repeat-yourself/" 
   aria-label="Do NOT repeat yourself">
   Do not repeat yourself
</div>
{% endhighlight %}{: .bad-example}

### Don't use javascript in href

- **Do not** use `"href="javascript:void(0)"`. 
- When screen readers read the href, it becomes confusing and nonsensical 

{% highlight html %}
<a href="javascript:void(0)">
   Do not use javascript in href
</div>
{% endhighlight %}{: .bad-example}

### Don't use "#" in href

{% highlight html %}
<a href="#">
   Do not use # to populate the href
</div>
{% endhighlight %}{: .bad-example}

## Disabled links

- If it's unavoidable to have a disabled link present you'll need these attributes for the screen reader.

{% highlight html %}
<a tabindex="0" role="link" aria-disabled="true">
  Continue
</a>
{% endhighlight %}

### Complex examples

<example>
{% include /examples/product.html %}
</example>

{% highlight html %}
{% include /examples/product.html %}
{% endhighlight %}

## Further Reading
- [WCAG 1.4.1 Use of Color (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)
- [WCAG 2.1.1 Keyboard (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard)
- [WCAG 2.4.4 Link Purpose (In Context) (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html)
- [WCAG 2.5.3 Label in Name (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html)
- [WCAG 4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)
