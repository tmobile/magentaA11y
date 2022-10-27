---
layout: entry
title:  "Image: jpg, gif, png, svg"
description: "How to code and test accessible images the Web"
categories: main

keyboard:
  tab: |
    Nothing, images themselves are not focusable (unless it is a control)
  arrow-keys: |
    Screen reader reads the alt text or ignores decorative images

mobile:
  swipe: |
    The screenreader reads the alt text (or ignores decorative images)

screenreader:
  name:  |
    The content of the image alt text is clear (or ignored if decorative)
  role:  |
    It identifies its role as an image or graphic (or ignored if decorative)

gherkin-keyboard: 
  - when:  |
      the arrow keys to browse to an image
    result: |
      the image comes into view
  - when:  |
      the tab key
    result: |
      nothing, images themselves are not focusable (unless it is a control)

gherkin-mobile:
  - when:  |
      swipe to browse to an image
---

## Basic examples

### Describe the content of the image
If you were describing the image to someone who couldn't see it, what would you say?

{% highlight html %}
<img src="/farm.jpg" 
     alt="Rustic barn surrounded by rolling hills">
{% endhighlight %}

### Linked SVG that conveys meaning

{% highlight html %}
<img src="/coffee-roaster.svg" 
     role="img"
     alt="Coffee roaster">
{% endhighlight %}

## Decorative images

There are times that images shouldn't be read because they would be repetitive or not add any value to the content.

### The alt attribute is still required

- To be valid html, the `alt` attribute must still be present, even if empty
  - When the `alt` attribute is empty, the screen reader ignores it.
  - When the `alt` attribute is missing, the screen reader will read the src url or filename of the image.

### Reinforce decorative images with aria-hidden

- Use `aria-hidden="true"` as a backup and reinforcement:
  - As a backup: **developers often mistakenly omit the alt attribute entirely**, meaning that some screenreaders will read the entire filename.
  - As a **reinforcement** to ensure the screenreader ignores the image. Screenreaders have been observed reading an image role when the alt attribute is present but empty.

{% highlight html %}
<img src="/info-icon.png" aria-hidden="true" alt>
{% endhighlight %}

{% highlight html %}
<a href="tel:8888888888">
  <!-- The phone icon would be repetitive in this case and should be hidden -->
  <img src="/phone-icon.png" aria-hidden="true" alt>
  Call us: 888-888-888
</a>
{% endhighlight %}


## Using inline SVG

### Inline SVG that conveys meaning

Inline SVGs require some special code to be read consistently in all screenreaders.

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

## Animated gifs

### Animations (like gifs) can be accessible if:
- they are set to stop after 5 seconds or 
- if users are presented with a way to pause it

### Further reading

- This page owes a lot to this exhaustive blog post: [Contextually Marking up accessible images and SVGs by Scott O'Hara](https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html)
