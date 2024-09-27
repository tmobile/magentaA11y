---
layout: entry
title:  "Video/audio player"
description: "How to code and test an accessible video/audio player for Web"
categories: main

keyboard:
  tab: |
    Focus visibly moves to each control
  spacebar: |
    Activates the control button
  enter: |
    Activates the control button
  arrow-keys: |
    Fast forward/reverse media
          
mobile:
  swipe: |
    Focus visibly moves to each control
  doubletap: |
    Activates the control

screenreader:
  name:  |
    The video control purpose is clear (play, pause, stop)
  role:  |
    Video controls identify as button, switch etc.
  group: |
    Audio content never autoplays
  state: |
    It expresses it state if applicable (pressed, expanded, disabled)

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to a control
    result: |
      focus is strongly visually indicated
  - then:  |
      the spacebar and/or enter key to activate the button
    result: |
      the intended action occurs
  - then:  |
      the arrow keys (left/right)
    result: |
      the media fast forwards/reverses

gherkin-mobile:
  - when:  |
      swipe to move focus to a video control
  - then:  |
      doubletap with the video control in focus
    result: |
      the intended action occurs

---

### Autoplay can be very disruptive or hurt people

Let people choose if they're subjected to video content.

- For people using a screen reader, it unexpectedly interferes with their ability to hear/control their machine  
- For people with cognitive differences, it can make it impossible to focus
- For people with light sensitivity or vestibular disorders, some video content can cause illness

### Is it ever okay?

- Media with audio must not autoplay
- Silent video can autoplay under these conditions:
  - It must stop after 5 seconds 
  - The video features accessible controls
  - Autoplay is disabled when device reduce motion settings are activated

## Code examples

### A heading can serve as a name

{% highlight html %}
<h2>The Princess Bride</h2>
<video-embed>
</video-embed>
{% endhighlight %}

### An `aria-label="Media title"` can also be used

{% highlight html %}
<video-embed aria-label="The Princess Bride"></video-embed>
{% endhighlight %}

## Developer notes

### Name

- A heading (`<h1>` `<h2>` `<h3>`) above the media can serve as a name
- `aria-label="Media title"` on a wrapper element can also be used

### Role

- Controls must identify as buttons, switches, etc.
- There are accessible video embed options available

### Group

- Captions are mandatory for spoken audio content
  - Do not rely on auto-captioning
  - This may require the manual creation of a VTT file
  - There are many options online that will create these for you
- Transcripts should be HTML based (not a PDF)

### State

- Controls must identify their state (pressed, checked, selected, value, etc)

### Focus

- Focus must be visible
