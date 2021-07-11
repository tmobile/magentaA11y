---
layout: entry
title:  "Figure: map, chart, table"
description: "How to test accessible figures, maps, charts and tables for the Web"
categories: main

keyboard:
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
    Content is described by a heading, alt text or named on focus; control purpose is clear
  role:  |
    Element indicates it is a map, table, or image
  group: |
    Alternative method interaction is available.
  state: |
    n/a
---

## Code examples

### Provide alternative ways to consume visual content

If there is one primary message for an image chart, describe it in the alt attribute.

{% highlight html %}
<img src="pie-chart.jpg" 
     alt="Sales forecast show June 34% higher">
{% endhighlight %}


### Provide alternative ways to consume data

If you have a figure that can't be described by alt text, place the content in a different format.
{% highlight html %}
{% include /examples/pie-chart-image.html %}
{% endhighlight %}

{::nomarkdown}
{% include /examples/pie-chart-image.html %}
{:/}

### Provide alternative interactions with dynamic figures

When building maps, add a search or filtering feature for those who can't use a mouse.

{% highlight html %}
<map-embed></map-embed>

<form role="search" action="/map/">
  <label for="search">
    Search for an location
  </label>
  <input type="search" id="search">
  <button type="submit">
    Search
  </button>
</form>
{% endhighlight %}



## Developer notes

### Name
- Use `alt="Figure content"` for images
- Supply a heading for interactive figures or `aria-label="Figure name"` can be used as well.

### Role
- Wrap charts and tables in a `<figure>` element where applicable.
- Include `<figcaption>` to describe the figure
- Use `<cite>` to label sources.

### Group
- Provide alternative ways to consume content
  - Examples:
    - A map of phone coverage areas includes a search function
    - A chart embedded as an image includes a table of the data


