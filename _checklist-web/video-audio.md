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
    Fast forward/reverse media or operate some controls
          
mobile:
  swipe: |
    Focus visibly moves to each control
  doubletap: |
    Activates the control

screenreader:
  name:  |
    Content is described by a heading or named on focus; button purpose is clear
  role:  |
    Controls identify as buttons, switches, etc.
  group: |
    Includes captions and a HTML based transcript
  state: |
    Media should not autoplay
---


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
- A heading (`<h1>` `<h2>` `<h3>`) above the media can serve as a name. 
- `aria-label="Media title"` on a wrapper element can also be used.

### Role
- Controls should identify as buttons, switches, etc.
- There are accessible video embed options available

### Group
- Captions are mandatory for spoken audio content
- This may require the creation of a VTT file
  - There are many options online that will create these for you
- Transcripts should be HTML based (not a PDF)

### State
- Video should almost never autoplay
- Media with audio should absolutely **never** autoplay
- Controls should identify their state (pressed, checked, selected, etc)

### Focus
- Focus must be visible
