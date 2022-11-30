---
layout: entry
title:  "Toast Snackbar"
description: "How to code and test an snackbar or toast for Web"
categories: main form

keyboard:
  tab: |
    Focus visibly moves in logical order to buttons or links inside the toast
  space: |
    Any buttons inside are activated
  enter: |
    Any links or buttons inside are activated

mobile:
  swipe: |
    Focus moves in logical order to the toast
  doubletap: |
    This typically activates most elements in the toast

screenreader:
  name:  |
    The toast is read when it appears (BUT focus DOES NOT transfer automatically when the toast appears)
  role:  |
    It identifies itself as an alert or status when it appears
  group: |
    If it is possible to close the toast, focus then returns to a logical place in the page
  state: |
    It remains open until closed by user

gherkin-keyboard: 
  - when:  |
      use features that trigger the toast
    result: |
      the toast (BUT focus DOES NOT transfer automatically when the alert appears)

gherkin-mobile:
  - when:  |
      use features that trigger the toast snackbar
---

## Avoid using toast snackbars

It's **exceedingly rare** this is a good design choice. A more semantic or visually inline HTML element should probably be used instead.

Snackbars are a custom HTML construct and have no semantic meaning. As such, like [tooltips](/checklist-web/tooltip/), it is difficult to define precise acceptance criteria.

### Never use snackbars for:

- Critical or irrevocable functionality like:
    - Time sensitive actions (ex: Unsend this message)
    - Confirmation of choices (ex: Are you sure you want to send payment?)
    - Error messages
- On page load messaging/alerts
  - Performing unexpected actions or alerts on page load is confusing to people using a screenreader

## Only use toast to _reinforce_ updates

If using a snackbar is unavoidable, it must only be used for non-critical messaging. 

The status injected must also be discernable on the page _without the snackbar_.

### Practical example

Given that I am on a dynamic single page app

- WHEN the customer changes the state of a toggle to OFF or ON
  - THEN the toast appears to _reinforce_ that the change has been saved
  - AND the customer can confirm this is true from the toggle itself

### Timing

It is preferable to not let a toast snackbar time out. 

If the snackbar must dismiss automatically, it is preferred that [timing be adjustable (WCAG 2.2.1)](https://www.w3.org/WAI/WCAG21/Understanding/timing-adjustable.html).

## Code example

{% highlight html %}
<div class="snackbar" role="status">
  <strong>Let's at least try to avoid using these</strong>
  <button>Dismiss</button>
</div>
{% endhighlight %}



{% highlight html %}
{% include /examples/snackbar.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/snackbar.html %}
</example>
{:/}
## Developer notes

### Name

- Inner text describes snackbar when it appears on screen

### Role

- Use `role="status"` for snackbars injected into the page

### Focus

- Focus **must not** move to the element automatically when the snackbar appears


