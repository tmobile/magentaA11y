---
layout: entry
title:  "iframe"
description: "How to code and test an accessible iframe for Web"
categories: main form
order: 22

keyboard:
  arrow keys: |
    Content within the iframe is browsed
  tab: |
    Interactive content in the iframe come into view

mobile:
  swipe: |
    Content within the iframe is browsed
    
screenreader:
  name:  |
    The title of the iframe is read if the iframe contains content 
  group:  |
    If the iframe does not contain content, the iframe is ignored

gherkin-keyboard: 
  - when:  |
      the arrow keys or tab key
    result: |
      the content of the iframe is browsed

gherkin-mobile:
  - when:  |
      swipe to content in the iframe
      
---

## Code examples

### When an iframe contains content

{% highlight html %}
<iframe title="Coffee maker demonstration" 
        src="coffee-maker-demo.html">
</iframe>
{% endhighlight %}

### When an iframe does not contain content

{% highlight html %}
<iframe title="Hidden intentionally"
        aria-hidden="true" 
        src="script-injection.net">
</iframe>
{% endhighlight %}