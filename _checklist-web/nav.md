---
layout: entry
title:  "Navigation landmark"
description: "How to code and test an accessible navigation menu for Web"
categories: header nav footer html
order: 2

keyboard:
  skip-links: |
    Focus moves directly to the nav element or the first focusable control in the nav
  tab: |
    Focus moves to controls within the nav and there is a highly visible visual indication of keyboard focus

mobile:
  swipe: |
      Focus moves within the nav
  doubletap: |
      This typically activates most elements

screenreader:
  name:  |
    it indicates its role AND IF multiple navigations are present (ex: Main navigation, Site map, Breadcrumbs), the name of the navigation
  role:  |
    it is discoverable with screenreader shortcuts as a navigation landmark

gherkin-keyboard: 
  - when:  |
      tab is used to browse the navigation menu
    result: |
      that there is a highly visible visual indication of keyboard focus on interactive controls within the navigation region

gherkin-mobile:
  - when:  |
      swipe to elements in the navigation
---

## Code examples

### Use semantic HTML

This semantic HTML contains all accessibility features by default.

{% highlight html %}
{% include /examples/nav.html %}
{% endhighlight %}

{::nomarkdown}
{% include /examples/nav.html %}
{:/}

## Keep custom menus as simple as possible

Use semantic elements where possible.

{% highlight html %}
{% include /examples/nav-menu.html %}
{% endhighlight %}

{::nomarkdown}
{% include /examples/nav-menu.html %}
{:/}

### When you can't use semantic HTML

This custom navigation requires extra attributes.

{% highlight html %}
<div role="navigation">
  <ul>
    <li><a href="/">Website name</a></li>
    <li><a href="/about/">About</a></li>
    <li><a href="/contact/">Contact</a></li>
  <ul/>
</div>
{% endhighlight %}

### Multiple navigation elements

When there is more than one navigation element, they must have a name.

{% highlight html %}
<nav tabindex="-1" id="nav" aria-label="Main">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about/">About</a></li>
    <li><a href="/contact/">Contact</a></li>
  <ul/>
</nav>

<h2 id="cat-heading">Categories</h2>
<nav id="cat-nav" aria-labelledby="#cat-heading">
  <ul>
    <li><a href="/alpha/">Alpha</a></li>
    <li><a href="/bravo/">Bravo</a></li>
    <li><a href="/charlie/">Charlie</a></li>
  <ul/>
</nav>

<footer>
  <nav aria-label="Site map">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about/">About</a></li>
      <li><a href="/contact/">Contact</a></li>
    <ul/>
  </nav>
</footer>


{% endhighlight %}


## Developer notes

### Name
- If there are multiple `<nav>` elements (site menu, pagination, categories) it may be helpful to name them
  - Use `aria-label="Menu name"` when there is not a visible nav title.
  - `aria-describedby="menu-name-id"` can be used when the nav title is a visible heading.
  
### Role

- Identifies itself as navigation
- **DO NOT** add 'menu' or 'option' roles with arrow key event listeners unless you're building an actual application like Gmail.

### Focus

- When skip links are used, add `tabindex="-1"` so that focus can move to the `nav` element, (not just bring it into view).

## Further Reading
- [WCAG 3.2.3 Consistent Navigation (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation)
- [WCAG 4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)
