---
layout: entry
title:  "Footnote"
description: "How to code and test an accessible footnote for Web"

categories: main
order: 1

keyboard:
  tab: |
    Focus moves to the footnote link
  enter: |
    Activates the link, focus/tabindex moves directly to the targeted element     

mobile:
  swipe: |
    Focus moves to the footnote link
  doubletap:
    Activates the link, focus/tabindex moves directly to the targeted footnote

screenreader:
  name:  |
    It describes its purpose
  role:  |
    It identifies itself as a link

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to a footnote link
    result: |
      focus is strongly visually indicated
  - then:  |
      the enter key to activate the link
    result: |
      my focus moves directly to the targeted footnote

gherkin-mobile:
  - when:  |
      swipe to focus on a footnote link
  - then:  |
      doubletap with the link in focus
    result: |
      my focus moves directly to the targeted footnote
---

## Code examples

{% highlight html %}
{% include /examples/footnote.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/footnote.html %}
</example>
{:/}


## Thanks
[https://www.sitepoint.com/accessible-footnotes-css/](https://www.sitepoint.com/accessible-footnotes-css/)