---
layout: entry
title:  "Basic web page"
description: "How to code and test accessible HTML"
categories: html
order: 0

keyboard:
  tab: |
    Enters the page and visibly focuses only interactive elements

mobile:
  swipe: |
    Focus moves within page
  pinch/stretch: |
    Content zooms up to 200%
  orientation: |
    Content is accessible in landscape or portrait orientation

screenreader:
  name:  |
    The page has a unique logical title in the browser tab
  role:  |
    Major landmarks are discoverable with screenreader shortcuts: header/banner, navigation, main and footer/content info landmarks

gherkin-keyboard: 
  - when:  |
      the keyboard to open a new web page
    result: |
      a highly noticeable visual indication of keyboard focus on focusable controls

gherkin-mobile:
  - when:  |
      swipe to enter from the web browser tabs
  - then: |
      change orientations
    result: |
      content is accessible in landscape or portrait orientation

settings:
  zoom: |
    Text can be zoomed to 200% and the page can be zoomed to 400% without a loss of content or two-dimensional scrolling
---
## Developer notes

### Validate your code

Use [HTML validation](https://validator.w3.org/nu/) as the foundation for ensuring your page works for everyone.

## Code examples

### Declare a language

This affects the screenreader pronunciation.

{% highlight html %}
<html lang="en">
</html>
{% endhighlight %}

### Give your page a unique title

- Each page must have unique `<title>` in the `<head>`
  - This includes single page dynamic apps _if_ the URI changes during the user journey
- Do not use the `|` pipe character as a divider (it is read by screen readers)

{% highlight html %}
<head>
  <title>Page title - Website title</title>
</head>
{% endhighlight %}

### Ensure users can zoom in

People with low vision need the ability to enlarge the page on mobile and desktop.

{% highlight html %}
<head>
  <meta name="viewport" 
        content="width=device-width, 
        initial-scale=1">
</head>
{% endhighlight %}

### Structure your page with landmarks

Landmarks give structure to the page for the screenreader user to be able to navigate the page by major sections.

Each page must include:

- [Header](/checklist-web/header/)
- [Nav](/checklist-web/nav/)
- [Main](/checklist-web/main/)
- [Footer](/checklist-web/footer/)

{% highlight html %}
<header>
  <!-- Contains the site title -->
</header>
<nav>
  <!-- Primary navigation menu-->
</nav>
<main> 
  <!-- Main content -->
</main>
<footer>
  <!--  Site map and legal info -->
</footer>
{% endhighlight %}