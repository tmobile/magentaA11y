---
layout: entry
title:  "Decorative image"
description: "How to code and test accessible decorative images (jpg, gif, png, svg)"
categories: main

keyboard:
  arrow-keys: |
    Screenreader ignores the image completely

mobile:
  swipe: |
    The screenreader ignores the image completely

screenreader:
  role:  |
    The image is ignored

gherkin-keyboard: 
  - when:  |
      the arrow keys to browse to an image
    result: |
      the image is skipped and ignored

gherkin-mobile:
  - when:  |
      swipe to browse to an image

wcag:
  - name: Perceivable
    list:
      - criteria: All non-text content that is purely for decoration or which repeats existing on-screen text nearby should be ignored and skipped over by screenreaders.
---

## Decorative images

There are times that images shouldn't be read because it would be repetitive or not add any value in addition to the existing page content. These types of images are generally included for purely stylistic purposes and don't impart any meaning to the rest of the content on the page.

## Is this image decorative or informative?
If the image conveys important meaning, and there's no other text on the page which explains the concept within it, then the image is likely informative. In this case, check out the [informative image checklist](/checklist-web/image) item instead. 

If your image contains text inside it, it should not! This is a violation of [WCAG AA 1.4.5 Images of Text](https://www.w3.org/WAI/WCAG21/Understanding/images-of-text.html). Exceptions exist for logos.

## The alt attribute is still required

- To have valid HTML, the `alt` attribute must still be present, even when set to the empty empty value of `alt`. Note that `alt` and `alt=""` (no space) are equivalent in HTML.
  - When the `alt` attribute is empty, the screen reader ignores it (and will not read anything).
  - When the `alt` attribute is missing, the screen reader will read the `src` name or filename of the image which is a very poor user experience.

## Reinforce decorative images with aria-hidden

- Use `aria-hidden="true"` as a backup and reinforcement to `alt`:
  - Backup: **developers often mistakenly omit the alt attribute entirely**, meaning that some screenreaders will read the entire filename without an alt attribute. Including `aria-hidden="true"` will act as a backup.
  - Reinforcement: using `aria-hidden="true"` ensures that screenreaders ignores the image. Screenreaders have been observed reading an image role even when the alt attribute is empty.

{% include /examples/image-decorative.html %}

{% highlight html %}
<img src="/info-icon.png" aria-hidden="true" alt />
<p>Note: Your plan might be changing soon.</p>
{% endhighlight %}

{% highlight html %}
<a href="tel:8888888888">
  <!-- The phone icon would be repetitive in this case and should be hidden -->
  <img src="/phone-icon.png" aria-hidden="true" alt />
  Call us: 888-888-888
</a>
{% endhighlight %}

## Using inline SVG

### Inline SVG that conveys meaning

Inline SVGs require some special code to be hidden properly from screen readers:
- `aria-hidden="true"`

If you are using a `<use />` element, add `aria-hidden="true"`.

### Inline SVG that is decorative
{% highlight html %}
<svg aria-hidden="true" focusable="false">
  <use href="#svg-id" aria-hidden="true" />
  <!-- if not using <use> then the child elements 
       of the inline SVG would go here -->
</svg>
{% endhighlight %}

## Further reading
- This page owes a lot to this exhaustive blog post: [Contextually Marking up accessible images and SVGs by Scott O'Hara](https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html)
- [W3C Image decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/)
