---
layout: entry
title:  "Figure: maps, charts and graphics"
description: "How to test accessible figures, maps, charts and tables for the Web"
categories: main

keyboard:
  arrow-keys: |
    Browse to content
  tab: |
    Interactive figure controls are focusable
  enter: |
    Activates controls
  spacebar: |
    Activates controls

mobile:
  swipe: |
    Focus visibly moves to each control
  doubletap: |
    Activates the control

screenreader:
  name:  |
    Content is described by a heading, alt text or named on focus
  role:  |
    It identifies as a common HTML element (image, list, table)
  group: |
    An alternative method of consumption or interaction is available

gherkin-keyboard: 
  - when:  |
      the arrow key to browse to a figure
    result: |
      the figure comes into view
  - then:  |
      the tab key to move focus to figure controls (toggle, show/hide, etc) 
    result: |
      the control is in focus
  - then:  |
      the spacebar or enter key
    result: |
      the intended action occurs


gherkin-mobile:
  - when:  |
      swipe to browse to an image


---

## Code examples

### Consider making simple charts from semantic markup

{% highlight html %}
{% include /examples/figure-bar-chart.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/figure-bar-chart.html %}
</example>
{:/}

### Provide alternative ways to consume visual content

If there is one primary message for an chart that is displayed as an image file, describe it in the alt attribute.

{% highlight html %}
<img src="monthly-usage-chart.jpg" 
     alt="Usage shows a large jump in May to 91%">
{% endhighlight %}

### Provide alternative ways to consume data

If you have a figure that can't be described by alt text, place the content in a different format.

{::nomarkdown}
<example>
{% include /examples/pie-chart-image.html %}
</example>
{:/}

{% highlight html %}
{% include /examples/pie-chart-image.html %}
{% endhighlight %}

### Provide alternative interactions with dynamic figures

When building maps, add a search or filtering feature for those who can't use a mouse.

{% highlight html %}
<map-embed></map-embed>

<form role="search" 
      aria-label="Location search">
  <label for="search">
    Search for a location
  </label>
  <input type="search" id="search">
  <button type="submit">
    Search
  </button>
</form>
{% endhighlight %}

## Developer notes

### Name
- Use `alt="Descriptive figure content"` for images
- Supply a heading for interactive figures or `aria-label="Figure name"` can be used as well

### Role
- Wrap charts and tables in a `<figure>` element where applicable
- Include `<figcaption>` to describe the figure
- Use `<cite>` to label sources

### Group
- Provide alternative ways to consume content
  - Examples:
    - A map of phone coverage areas includes a search function
    - A chart embedded as an image includes a table of the data
    - A graphic showing phone plan benefits is followed by an unordered list of the benefits below a plan name heading.


