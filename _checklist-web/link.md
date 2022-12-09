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
- Instead, make the heading a link.

{% highlight html %}
<h3>About our coffee subscriptions</h3>
<p>Get the best coffee delivered to your door</p>
<a href="/about/">
   Learn more
</div>
{% endhighlight %}{: .bad-example}

### Making a link with no `href` focusable

If a link has no definable url, add `tabindex="0"` to make it focusable.

- A link with no `href` will not be focusable with the keyboard. 
- **Do not** put anything but a URI in the `href`

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

### Complex examples

- **Don't** wrap large blocks of content or nest other interactive components inside a link.
- This complex example uses a simple link and references product information using `aria-describedby`
- This allows the link to be read first (without the repetition of the image alt text) and then the screen reader will read the related product information (colors, pricing).
- The HTML is **written in logical order** for the screen reader and CSS grid layout is used to re-arrange the elements visually.
- No Javascript is used, this example uses well supported CSS only techniques

<example>
{% include /examples/product.html %}
</example>

{% highlight html %}
{% include /examples/product.html %}
{% endhighlight %}