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

## Rethinking Toast Snackbars

Toast snackbars might seem like an easy way to provide feedback, but they’re often not the best fit for accessible and user-friendly design. Here’s why:

- Accessibility Limitations: Because snackbars are custom HTML elements, they lack semantic meaning and can be challenging for assistive technologies like screen readers.
- Missed Messages: If a user doesn’t catch a snackbar in time, it’s difficult to go back and review the information.
- Auditory Clutter: For screen readers, snackbars can create unnecessary noise, especially if they appear frequently or unexpectedly.
- Unclear Rules: Like tooltips, snackbars are tricky to define and test consistently in design criteria.

### Instead use an inline element to indicate a change

- Inline Feedback: Inject a success message _in proximity_ to the updated control
- Accessible Undo/Redo Options: Place these buttons in clear, easy-to-navigate locations.
- Thoughtful Confirmations: Use a confirmation screen for critical actions or when users are exiting an important flow.

{::nomarkdown}
<example>
{% include /examples/input-switch-dynamic.html %}
</example>
{:/}


### When Toast Snackbars Don’t Work:
There are certain scenarios where snackbars simply aren’t the right tool:

- Critical or Irreversible Actions: For example, “Unsend this message” or “Confirm payment.” These require deliberate, visible feedback
- Blocking Error Messages: Important errors should grab attention and provide clear guidance—not rely on a fleeting message.
- Page-Load Alerts: Automatically showing messages on page load can confuse users, particularly those using screen readers.

### Timing

If you find a situation where a toast snackbar is truly necessary:

- Avoid auto-dismiss wherever possible.
- If dismissal must be automatic, make sure the [timing is adjustable to meet WCAG 2.2.1 standards]
  (https://www.w3.org/WAI/WCAG21/Understanding/timing-adjustable.html).
  

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
