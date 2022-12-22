---
layout: entry
title:  "List"
categories: main
description: "How to code and test accessible ordered and unordered lists for web"

keyboard:
  tab: |
    Nothing, list items must not be focusable
  arrow-keys: |
    Browses list items (when using screen reader)
  
mobile:
  swipe: |
    The screenreader reads the list content

screenreader:
  role:  |
    It identifies itself as a list
  group: |
    It declares the number of items in the list

gherkin-keyboard: 
  - when:  |
      the arrow key to browse to a list
    result: |
      the list comes into view
  - when:  |
      the tab key
    result: |
      nothing happens to the list itself because lists must NOT be focusable

gherkin-mobile:
  - when:  |
      swipe to browse a list
---

## Lists are not focusable with the tab key

- When using a screen reader, the **arrow keys** are used to browse non-focusable content
- The tab key only focuses interactive elements (ex: buttons, links or inputs) inside the list item.

## Code examples

### Unordered list

This semantic HTML contains all accessibility features by default.

{% highlight html %}
<ul>
  <li>Charlie</li>
  <li>Romeo</li>
  <li>Juliet</li>
  <li>Mike</li>
  <li>Victor</li>
</ul>
{% endhighlight %}

{::nomarkdown}
<example>
<h3>NATO letters that are common first names</h3>
<ul>
  <li>Charlie</li>
  <li>Romeo</li>
  <li>Juliet</li>
  <li>Mike</li>
  <li>Victor</li>
</ul>
</example>
{:/}


### Ordered list

{% highlight html %}
<ol>
  <li>Alpha</li>
  <li>Bravo</li>
  <li>Charlie</li>
</ol>
{% endhighlight %}

{::nomarkdown}
<example>
<h3>The NATO alphabet</h3>
<ol>
  <li>Alpha</li>
  <li>Bravo</li>
  <li>Charlie</li>
</ol>
</example>
{:/}

### When you can't use semantic HTML

As a **last resort**, this custom list uses extra attributes if it's not possible to edit the markup structure.

{% highlight html %}
<!-- The NATO alphabet -->
<div role="list">
  <div role="listitem">Alpha</div>
  <div role="listitem">Bravo</div>
  <div role="listitem">Charlie</div>
</div>
{% endhighlight %}

## Do not interrupt the list

The `<ul>` or `<ol>` list must only contain `<li>` list items.

{% highlight html %}
<!-- Starcrossed NATO letters -->
<ul>
  <li>Romeo</li>
  <div>
    <a href="#">Buy tickets to Romeo and Juliet, The Experience</a>
  </div>
  <li>Juliet</li>
</ul>
{% endhighlight %}{: .bad-example}

## Do not create fake lists

Adding returns or generic markup does not produce a list navigable by screen reader.

{% highlight html %}
Charlie <br/>
Romeo <br/>
Juliet <br/>

<div>Alpha</div>
<div>Bravo</div>
<div>Charlie</div>
{% endhighlight %}{: .bad-example}