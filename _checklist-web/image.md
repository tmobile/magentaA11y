---
layout: entry
title:  "Informative Image"
description: "How to code and test accessible informative images (jpg, gif, png, svg)"
categories: main

keyboard:
  arrow-keys: |
    Screen reader reads the alt text (ignored if decorative)

mobile:
  swipe: |
    The screenreader reads the alt text (ignored if decorative)

screenreader:
  name:  |
    The content of the image alt text is clear (ignored if decorative)
  role:  |
    It identifies its role as an image or graphic (ignored if decorative)

gherkin-keyboard: 
  - when:  |
      the arrow keys to browse to an image
    result: |
      the image comes into view

gherkin-mobile:
  - when:  |
      swipe to browse to an image

wcag:
  - name: Perceivable
    list:
      - criteria: All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, unless it is decorative or repetitive
      - criteria: If an image contains text critical to understanding the page the user has a text alternative that serves the equivalent purpose
---
## Is this image decorative or informative?
If the image conveys important meaning, and there's no other text on the page which explains the concept within it, then the image is likely informative. If the image is included for purely stylistic purposes and doesn't impart any meaning to the rest of the content on the page, then the image is likely decorative. In this case, check out the [decorative image checklist](/checklist-web/image-decorative) item instead. 

If your image contains text inside it, it should not! This is a violation of [WCAG AA 1.4.5 Images of Text](https://www.w3.org/WAI/WCAG21/Understanding/images-of-text.html). Exceptions exist for logos.

## Describe the content of the image
If you were describing the image to someone via phone conversation and they couldn't see what you were looking at, what would you say?

{% highlight html %}
<img src="/farm.jpg" 
     alt="Rustic barn surrounded by rolling hills" />
{% endhighlight %}

## Using inline SVG

### Inline SVG that conveys meaning

Inline SVGs require some special code to be read consistently in all screenreaders:
- Name: either `aria-label` or `<title />`
- Role: `role="img"`

If you are using a `<use />` element, add `aria-hidden="true"` to it.

#### Using title

{% highlight html %}
<svg role="img" focusable="false">
  <title>Accessible Name</title>
  <use xlink:href="#svg-id" aria-hidden="true" />
  <!-- if not using <use> then the child elements 
       of the inline SVG would go here -->
</svg>
{% endhighlight %}

#### Using aria-label

{% highlight html %}
<svg role="img" aria-label="Accessible name" focusable="false">
  <use href="#svg-id" aria-hidden="true" />
  <!-- if not using <use> then the child elements 
       of the inline SVG would go here -->
</svg>
{% endhighlight %}

## Animated gifs

### Animations (like gifs) can be accessible if:
- they are set to stop after 5 seconds or 
- if users are presented with a way to pause it

## Further reading
- This page owes a lot to this exhaustive blog post: [Contextually Marking up accessible images and SVGs by Scott O'Hara](https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html)
- [W3C Image decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/)
- [WCAG 1.1.1 Non-text Content (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)
- [WCAG SC 1.4.5 Images of Text (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text)
- [WCAG SC 2.2.2 Pause, Stop, Hide (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)

