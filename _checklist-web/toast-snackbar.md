---
layout: entry
title:  "Toast snackbar"
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

## Don't use toast snackbars

It's **exceedingly rare** this is a good design choice. 

- Snackbars are a custom HTML construct and have no semantic meaning. 
- They add auditory noise to the screen reader experience and are difficult to browse if the message was missed.
- As such, like [tooltips](/checklist-web/tooltip/), it is difficult to define precise acceptance criteria.

### Instead use an inline element to indicate a change

- Inject a success message _in proximity_ to the updated control
- Place undo/edit buttons in easy to find locations for keyboard users
- Utilize a confirmation screen on exit

{::nomarkdown}
<example>
{% include /examples/input-switch-dynamic.html %}
</example>
{:/}


### Never use toast snackbars for:

- Critical or irrevocable functionality like:
    - Time sensitive actions (ex: Unsend this message)
    - Confirmation of choices (ex: Are you sure you want to send payment?)
    - Blocking error messages
- On page load messaging/alerts
  - Performing unexpected actions or alerts on page load is confusing to people using a screenreader

### Timing

- It is preferable to not let a toast snackbar time out. 
- If the snackbar must dismiss automatically, it is preferred that [timing be adjustable (WCAG 2.2.1)](https://www.w3.org/WAI/WCAG21/Understanding/timing-adjustable.html).

## Only use toast snackbars to _reinforce_ updates

- If using a snackbar is unavoidable, it must only be used for non-critical messaging. 
- The status injected must also be discernable on the page _without the snackbar_.

### Practical example

Given that I am on a dynamic single page app

- WHEN the customer changes the state of a toggle to OFF or ON
  - THEN the toast appears to _reinforce_ that the change has been saved
  - AND the customer can confirm this is true from the toggle itself

## Code example

{% highlight html %}
<div id="toast">
  <span id="toast-message" role="status">
    <!-- Inject snackbar message here -->
  </span>
  <button type="button">
    Dismiss
  </button>
</div>
{% endhighlight %}
