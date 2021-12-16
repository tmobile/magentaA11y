---
layout: entry
title:  "Image: jpg, gif, png, svg"
description: "How to code and test accessible images the Web"
categories: main

keyboard:
  tab: |
    Nothing, images should not be focusable unless they are part of a control
  arrow-keys: |
    The alt text of the image

mobile:
  swipe: |
      The screenreader reads the alt text

screenreader:
  name:  |
    The content of the image alt text is clear
  role:  |
    It dentifies its role as an image or graphic

gherkin-keyboard: 
  - when:  |
      the arrow key to browse to an image
    result: |
      the image comes into view

gherkin-mobile:
  - when:  |
      swipe to focus on an image

---

## Code examples

### Describe the content of the image
If you were describing the image to someone who couldn't see it, what would you say?

{% highlight html %}
<img src="/farm.jpg" 
     alt="Rustic barn surrounded by rolling hills">
{% endhighlight %}

### Linked SVG that conveys meaning

{% highlight html %}
<img src="/smartphone.svg" 
     role="img"
     alt="Smartphone">
{% endhighlight %}

### Images that are decorative
When the alt attribute is empty, the screen reader ignores it. The `alt` attribute is still required to be valid html.

{% highlight html %}
<img src="/smartphone.png" alt="">

<img src="/smartphone.png" alt>
{% endhighlight %}

### Inline SVG that conveys meaning
{% highlight html %}
<svg role="img" focusable="false">
  <title>Accessible Name</title>
  <use xlink:href="#svg-id" aria-hidden="true" />
  <!-- if not using <use> then the child elements 
       of the inline SVG would go here -->
</svg>
{% endhighlight %}

### Inline SVG `<use>` that conveys meaning
{% highlight html %}
<svg role="img" aria-label="Name" focusable="false">
  <use xlink:href="#..." aria-hidden="true"></use>
</svg>
{% endhighlight %}


### Inline SVG that is decorative
{% highlight html %}
<svg aria-hidden="true" focusable="false">
  <!-- ... --> 
</svg>
{% endhighlight %}

## Developer notes

### Animations (like gifs) can be accessible if:
- they are set to stop after 5 seconds or 
- if users are presented with a way to pause it

### Further reading
- Exhaustive test driven blog post: https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html
