---
layout: entry
title:  "Scrolling container"
description: "How to code and test a scrolling overflow text container"
categories: main form
order: 1

keyboard:
  tab: |
    Focus visibly moves to container
  spacebar: |
    Scrolls the container down
  arrow keys: |
    Browses the the container

screenreader:
  name:  |
    Its purpose is clear
  role:  |
    It identifies its role as region

mobile:
  swipe: |
    Browses the content

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to the container
    result: |
      focus is strongly visually indicated
  - then:  |
      the up/down arrow keys
    result: |
      the content is browsed up/down
  - then:  |
      the spacebar
    result: |
      the container scrolls down

gherkin-mobile:
  - when:  |
      swipe move browse to the container
  - then:  |
      swipe move browse to the content
    result: |
      the content is read


---
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

