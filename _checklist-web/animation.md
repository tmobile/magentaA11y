---
layout: entry
title:  "Animation"
description: "How to test accessible animations for the Web"
categories: main

keyboard:
  tab: |
    Where applicable, focus moves directly to pause/play/hide controls
  spacebar: |
    Activates the control
  enter: |
    Activates the control
  reduced motion settings: |
    Animation is disabled or reduced

screenreader:   
  name:  |
    The control's purpose (pause/play/hide) is clear
  role:  |
    It identifies its role of button
  state: |
    The control expresses its state if applicable (pressed, expanded)

mobile:
  swipe: |
    Focus moves to the control
  doubletap: |
    Activates the button

gherkin-keyboard:
  - when:  |
      tab key to move focus to the pause/play/hide controls
    result: |
      the control is strongly visibly focused
  - then:  |
      the spacebar or enter key to activate the control
    result: |
      the intended action occurs
  - then:  |
      the device's reduced motion settings
    result: |
      the animation is disabled or reduced

gherkin-mobile:
  - when:  |
      swipe to move focus to the pause/play/hide controls
  - then:  |
      doubletap to activate control
    result: |
      the intended action occurs
  - then:  |
      the device's reduced motion settings
    result: |
      the animation is disabled or reduced

design:
  - name: Perceivable
    list:
      - criteria: Color is not used as the only means of conveying information (error, success, etc)
  - name: Operable
    list:
      - criteria: "For any animation controls:"
      - criteria: The click/tap target area is no smaller than 44x44px
      - criteria: The disabled and focus states have a 3:1 minimum contrast ratio against default
      - criteria: The focus indication has a 3:1 minimum contrast ratio against adjacent elements
      - criteria: The focus indication has a minimum area equal to the width of the element and 2px in height
  - name: Understandable
    list:
      - criteria: Any control's purpose is clear in the context of the whole page
  - name: Robust
    list:
      - criteria: The animation respects device reduce motion settings and still conveys any critical information
      - criteria: Meets criteria across platforms, devices and viewports

---
## Developer notes

### Animations (like gifs) can be accessible if:
- they are set to stop after 5 seconds or 
- if users are presented with a way to pause it

## Code examples

### Allow animations to be disabled with CSS

People with vestibular disorders can be made ill by sweeping animations on screen.

It is important to change or disable animations when device reduce motion settings are activated.

This can be accomplished via CSS media query.

{% highlight css %}
@keyframes bounce {
  0% { transform: scale(1); }
  25% { transform: scale(.9); }
  50% { transform: scale(1); }
  75% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes dissolve {
  0% { background-color: green; }
  50% { background-color: darkgreen; }
  100% { background-color: green; }
}

.animation {
  background-color: green;
  animation: bounce 2s linear infinite both;
}

@media (prefers-reduced-motion) {
  .animation {
    animation-name: dissolve;
  }
}
{% endhighlight %}

{% highlight html %}
{% include /examples/animation.html %}
{% endhighlight %}


### Bouncy box
If your device is set to reduce motion, the animation will softly fade from one color to the next instead of bounce; otherwise it will bounce.

{::nomarkdown}
<example>
{% include /examples/animation.html %}
</example>
{:/}

### Detecting with JS
{% highlight javascript %}
const pref = 
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );
{% endhighlight %}



