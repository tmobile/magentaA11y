---
layout: entry
title:  "Scrolling container"
description: "How to code and test a scrolling overflow text container"
categories: form

keyboard:
  tab: |
    Focus visibly moves to container
  arrow keys: |
    Browses the the container

screenreader:
  name:  |
    Its purpose is clear
  role:  |
    It identifies its role as region

mobile:
  swipe: |
    The content is browsed in logical order

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to the container
    result: |
      focus is strongly visually indicated
  - then:  |
      the up/down arrow keys
    result: |
      the content is browsed up/down

gherkin-mobile:
  - when:  |
      swipe move browse to the container
  - then:  |
      swipe move browse to the content
    result: |
      the content is read


---
## Do not enable/disable buttons based on scrolling container

- Screen readers can read content _without_ changing the scroll offset position in the viewpoint.
- If you use a scrolling container for terms & conditions, **don't disable the continue button** because someone using a screen reader may not be able to enable the button.

## Code examples

{::nomarkdown}
<example>
<div role="region" 
     aria-label="Screenreader browser pairing table"  
     class="scrolling-container" 
     tabindex="0">
     
     {% include /examples/table-screen-reader-browser-pairing.html %}
</div>     
</example>
{:/}

{% highlight html %}
{% include /examples/scrolling-container.html %}
{% endhighlight %}


## Developer notes

### Name
- Use `aria-label="Container purpose"` to give the container a name and purpose.

### Role
- Use `role="region"` to set apart the div as a landmark.

### Focus
- Use `tabindex="0"` to make the container element focusable
- Focus must be visible

