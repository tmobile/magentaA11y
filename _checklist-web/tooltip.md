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
  role:  |
    n/a
  group: |
    n/a
  state: |
    n/a
      
---

## Code examples

### We don't use tooltops

{% highlight html %}
<nope>
  <strong>We don't use tooltips.</strong>
</nope>
{% endhighlight %}


## Why don't we use tooltips?

### Tooltips are extremely difficult to implement. 

The specific WAI-ARIA guidance isn't clear and screen reader implementation will vary, so it's impossible to create success criteria.

### Tooltips are often indicative of poor UX design. 

If there is important content that is required to understand the UI, the tooltip is a sub optimal approach to helping the user.

### What should I do instead?

Put in the work to design and edit the UI language so that it's self explanatory.

### What if there's no other way?

If you still have detailed information that needs to be displayed, consider putting it in a modal.
