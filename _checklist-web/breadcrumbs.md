---
layout: entry
title:  "Breadcrumbs"
description: "How to code and test accessible breadcrumbs for the Web"
categories: nav main
order: 1

keyboard:
  tab: |
    Focus moves to the link and there is a highly visible visual indication of keyboard focus
  enter: |
    Activates the link

mobile:
  swipe: |
    Focus moves to the link
  doubletap: |
    Activates the link

screenreader:
  name:  |
    The link names correspond to their destination page titles
  role:  |
    Links identify as a links in a breadcrumb navigation landmark
  state:  |
    The current page link is indicated when focused
  group:  |
    Is discoverable with screenreader shortcuts as a navigation landmark

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
      - criteria: Meets criteria across platforms, devices and viewports
      - criteria: Conveys the correct semantic role and current state is announced
---

## Code example

{% highlight html %}
{% include /examples/nav-breadcrumbs.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/nav-breadcrumbs.html %}
</example>
{:/}

## Developer notes

- Breadcrumb link names must correspond to their destination page titles.
  - In the example here, the "Web" link uses an `aria-label` that corresponds to the full title of the destination page.
- Use a `<nav>` with a unique name like `aria-label=”breadcrumbs”`
- Placing the links inside `<ol>` and `<li>` provides context to users about a given breadcrumb’s position in a list and of the total number of breadcrumbs.
- Add `aria-current="page"` to the last link in the breadcrumb. This represents the current item within a container or set of related elements.
- [ARIA Authoring Practices Guide (APG) Breadcrumb Example](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/examples/breadcrumb/)