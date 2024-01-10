---
layout: entry
title:  "Textarea multiline input"
description: "How to code and test an accessible textarea multiline input for Web"
categories: form

keyboard:
  tab: |
    Focus moves visibly to the textarea unless it's disabled

mobile:
  swipe: |
    Focus moves to the textarea
  keyboard: |
    Keyboard appears

screenreader:
  name:  |
    Its purpose is clear
  role:  |
    It identifies itself as a textarea
  group: |
    Hints or errors (ex: chars remaining) are read after the label, related inputs include a group name (ex: Contact us)
  state: |
    If applicable, it expresses its state (required, disabled / dimmed / unavailable)
  status: |
    Character counter updates dynamically after keypress and a short delay

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to a textarea
    result: |
      focus is strongly visually indicated

gherkin-mobile:
  - when:  |
      swipe to focus on a textarea

wcag:
  - name: Perceivable
    list:
      - criteria: Is easy to identify as interactive
      - criteria: Type size is optically no smaller than 16px Helvetica
      - criteria: The text has a 4.5:1 minimum contrast ratio
      - criteria: Label is always visible (placeholder cannot be used as a label)
      - criteria: Color is not used as the only means of conveying information or state (error, success, focus, disabled etc)
  - name: Operable
    list:
      - criteria: Is keyboard operable
      - criteria: The click/tap target area is no smaller than 44x44px
      - criteria: The disabled and focus states have a 3:1 minimum contrast ratio against default
      - criteria: The focus indication has a 3:1 minimum contrast ratio against adjacent elements
      - criteria: The focus indication has a minimum area equal to the width of the element and 2px in height
  - name: Understandable
    list:
      - criteria: The input purpose should be clear in the context of the whole page
      - criteria: The width of the input accommodates/affords the intended input, reinforcing its purpose
  - name: Robust
    list:
      - criteria: Conveys the correct semantic role 
      - criteria: Expresses its state (if applicable)
      - criteria: Meets criteria across platforms, devices and viewports
      - criteria: Status messages are announced by screen readers
---

## Code examples

### Use semantic HTML

- <strong>Note:</strong> There are two containers in the HTML that have the same counter content. One of them is hidden from screen readers by use of `aria-hidden="true"` and the other visually hidden container's content is dynamically updated after a slight pause. This is to ensure the screen reader does not interrupt the announcement of the key pressed with the announcement of the dynamic counter text update.
- **Delay the update** for dynamic counters
  - Use `setTimeout`to allow the accessibility tree and screen reader time to update in a logical fashion e.g. 1500ms
- **Do not** reference the `role="status"` element with aria-describedby
  - This causes a bug in VoiceOver 

{% highlight js %}
const textarea = document.getElementById('message');
if(textarea) {
    const chars = document.getElementById('currentChars');
    const srOutputTarget = document.getElementById('sr-counter-target');
    textarea.addEventListener("input", event => {
        const target = event.currentTarget;
        const maxLength = target.getAttribute("maxlength");
        const currentLength = target.value.length;
        // update the visible counter text
        chars.innerHTML = maxLength - currentLength;
        // update the visually hidden counter text
        setTimeout(function() {
            srOutputTarget.innerHTML = maxLength - currentLength;
        },1000);
    });
}
{% endhighlight %}

{% highlight html %}
{% include /examples/textarea.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/textarea.html %}
</example>
{:/}
