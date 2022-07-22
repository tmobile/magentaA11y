---
layout: entry
title:  "Alert notification"
description: "How to code accessible alerts or status for web pages"
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

### Basic notification

{% highlight html %}
{% include /examples/alert-notification.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/alert-notification.html %}
</example>
{:/}

### Error alert from an input field

{% highlight html %}
{% include /examples/input-text-error.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-text-error.html %}
</example>
{:/}

## Developer notes

### Browser + screenreader quirks

- Screenreaders do not implement alerts uniformly and must be tested
  - Just because an alert pattern works in one screenreader doesn't mean it will work in all three
- The element referenced by the `aria-describedby` attribute cannot use the `role="alert"` attribute (see example above for workaround). 
  - [VoiceOver fails to read a referenced `role="alert"` element when the input is in focus](https://a11ysupport.io/tests/tech__aria__aria-describedby-with-role-alert).
- NVDA will read the alert twice if it appears while the input is in focus: once from the `role="alert"` being injected and from the `aria-describedby` association.
- NVDA needs a fraction of a second to catch up with changes in the DOM, use a `setTimeout` to delay displaying the alert

### Name
- Inner text describes alert when it appears on screen

### Role
- Use `role="alert"` for elements injected into the page

### Focus
- Focus does move to the element when the alert appears

## Design notes

- Perceivable
  - Type size is no smaller than 16px
  - The text has a 4.5:1 minimum contrast ratio
  - Color is not used as the only means of conveying information
- Operable
  - The clickable/tappable target areas are no smaller than 44x44px
  - The focus indication has a minimum area equal to the width of the element and 2px in height
  - The focus state has a 3:1 minimum contrast ratio between the default and focused states
  - The focus indication has a 3:1 minimum contrast ratio against adjacent elements
- Understandable
  - The alert purpose should be clear in the context of the whole page
- Robust
  - Meets criteria across platforms, devices and viewports