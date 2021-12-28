---
layout: entry
title:  "Alert"
description: "How to code accessible alerts for web pages"
categories: main form

keyboard:
  tab: |
    Focus does not automatically move to the alert, but can move to interactive elements within the alert (example: Dismiss button)
  arrow: |
    Browses to the alert like any other content

mobile:
  swipe: |
    Focus does not move to the alert when it appears, but it can be browsed by the screenreader

screenreader:  
  name:  |
    The alert is read when it appears (BUT focus DOES NOT transfer automatically when the alert appears)
  role:  |
    It identifies itself as an alert

gherkin-keyboard: 
  - when:  |
      use features that trigger the alert
    result: |
      the alert (BUT focus DOES NOT transfer automatically when the alert appears)

gherkin-mobile:
  - when:  |
      use features that trigger the alert
---

## Notes

Alerts are dynamic content that is injected into the page when it changes and a person using a screenreader needs to know that some state of the application has changed.

- Use alerts sparingly. 
- If an alert is present on page load, it won't be read automatically
  - If an element is present on page load, it is not technically an alert
- The alert will be read by the screen reader when it becomes visible / appears in the DOM


## Code examples

{% highlight html %}
{% include /examples/hint-error.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/hint-error.html %}
</example>
{:/}


## Developer notes

- Screenreaders do not implement alerts uniformly and must be tested
  - JAWS and VoiceOver are more generous than NVDA in triggering alert messages
  - Just because an alert pattern works in one screenreader doesn't mean it will work in all three

### Name
- Inner text describes alert when it appears on screen

### Role
- Use `role="alert"` for elements injected into the page

### Focus
- Focus does move to the element when the alert appears

