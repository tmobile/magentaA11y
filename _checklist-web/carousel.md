---
layout: entry
title:  "Carousel"
description: "How to code and test an accessible carousel slideshow wizard"
categories: main
order: 2

keyboard:
  tab: |
    Focus moves to carousel controls (forward, backward, pause/play, stop)
  spacebar: |
    Activates the button
  enter: |
    Activates the button

mobile:
  swipe: |
    Focus moves within the carousel
  doubletap: |
    This typically activates most elements

screenreader:
  name:  |
    Its name and purpose is clear
  role:  |
    It identifies as a button
  group: |
    It indicates the number of slides and current position in the carousel

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to carousel controls (forward, backward, pause/play, stop)
    result: |
      focus is strongly visually indicated
  - then:  |
      the spacebar or enter key
    result: |
      the intended action occurs

gherkin-mobile:
  - when:  |
      swipe to move focus to carousel controls (forward, backward, pause/play, stop)
  - then:  |
      doubletap
    result: |
      the intended action occurs
---

## UX design notes

Think carefully before you use a carousel or slideshow wizard.

### Carousels are often a poor design choice

- As a general rule, [carousels should be avoided](https://shouldiuseacarousel.com/) for critical functionality unless there is a strong business case.
- People must be highly motivated to engage with a carousel beyond the first slide.
- A good business case might be a multi-step lead form, but this should always be A/B tested against a traditional scrolling form.

### Carousels can be a development challenge

- Logical focus order and updates for the screen reader may be complex interactions for developers.

## Code examples

### Use semantic HTML

This is one example of an accessible carousel wizard.
- It is not the only way to build a carousel, but it meets all the critieria:
  - The group has a name
  - New slides titles are announced
  - Arrow keys advance the slides

{% highlight html %}
{% include /examples/carousel.html %}
{% endhighlight %}

{::nomarkdown}
{% include /examples/carousel.html %}
{:/}
