---
layout: entry
title:  "Single page application"
description: "How to code and test a dynamic content and single page apps"
categories: main form
order: 2

keyboard:
  arrow-keys: |
    Browsing starts consistently at top of new page content OR top of page
  tab: |
    Focus starts consistently at the first interactive element in the content or top of page

mobile:
  swipe: |
    Focus starts at top of new content or top of page

screenreader:
  name:  |
    New content is announced or indicated 
  group:  |
    Browsing and focus starts consistently at top of new page content or top of page

gherkin-keyboard: 
  - when:  |
      the application AND whole new dynamic page appears
    result: |
      browsing and focus starts consistently at top of new page content or top of page
  - then:  |
      the tab key
    result: |
      focus starts consistently at the first interactive element in the new page content or top of page

gherkin-mobile:
  - when:  |
      use the application AND new dynamic content page appears
---

## Focus management & consistency

- Focus should be **deliberately and consistently** placed at the
  - top of new page content or 
  - top of the HTML page
- Pick one or the other and **consistently** follow that pattern
- **DO NOT** place focus on the first input on page load

## How does dynamic `aria-live` content work?

- The screenreader expects content **within** an element with a `aria-live="polite"` attribute to change
- By default, **only the content that has changed** will be read
- To force the screenreader to read all contents even if it did not change within the element, add `aria-atomic="true"`
- **Rarely** should you use `aria-live="assertive"` as it will override every other message from the screenreader

## About alerts

- _By default_ an element using `role="alert"` has `aria-live="assertive"`

## Code example

This is one example of a dynamic content region. It is similar to the carousel example.

- It is not the only way to build a dynamic region, but it meets all the critieria:
  - New content is announced
  - Focus is consistently placed at the top of the content

{% highlight html %}
{% include /examples/aria-live.html %}
{% endhighlight %}

{::nomarkdown}
{% include /examples/aria-live.html %}
{:/}
