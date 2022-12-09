---
layout: entry
title:  "Tooltip"
description: "How to code and test an accessible tooltip for Web"

categories: main

keyboard:
  Any-key: |
    Nothing, because we don't use tooltips

mobile:
  Any-gesture: |
    Nothing, because we don't use tooltips
    
screenreader:
  name:  |
    Nothing, because we don't use tooltips

gherkin-keyboard: 
  - when:  |
      the arrow keys or tab key
    result: |
      nothing, because we don't use tooltips

gherkin-mobile:
  - when:  |
      swipe

wcag:
  - name: Perceivable
    list:
      - criteria: Nothing to perceive because we don't use tooltips 
  - name: Operable
    list:
      - criteria: No need to operate because we don't use tooltips 
  - name: Understandable
    list:
      - criteria: The rest of the UI is understandable so we don't need tooltips to explain it
  - name: Robust
    list:
      - criteria: The design is super robust because it doesn't rely on tooltips
---

## Code and design examples

### We don't use tooltips

{% highlight html %}
<nope>
  <strong>We don't use tooltips.</strong>
</nope>
{% endhighlight %}

## Why don't we use tooltips?

### Tooltips are indicative of poor UX design. 

If there is important content that is required to understand the UI, the tooltip is a sub optimal approach to helping the user.

### Tooltip acceptance criteria are impossible to define

The specific WAI-ARIA guidance isn't clear and screen reader implementation will vary, so it's impossible to create success criteria.

### What should I do instead?

Put in the work to design and edit the UI language so that it's self explanatory.

### What if there's no other way?

If you still have detailed information that needs to be displayed, consider putting it in a modal or an expander accordion component.
