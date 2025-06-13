## General Notes

How to test a video/audio player

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a video/audio player

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Focus visibly moves to each control
   - Spacebar: Activates the control button
   - Enter: Activates the control button
   - Arrow-keys: Fast forward/reverse media

2. Test mobile screenreader gestures

   - Swipe: Focus visibly moves to each control
   - Doubletap: Activates the control

3. Listen to screenreader output on all devices

   - Name: The video control purpose is clear (play, pause, stop)
   - Role: Video controls identify as button, switch etc.
   - Group: Audio content never autoplays
   - State: It expresses it state if applicable (pressed, expanded, disabled)

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/video-audio-player](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/video-audio-player)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a video/audio player

GIVEN THAT I am on a page with a video/audio player

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to a control I SEE focus is strongly visually indicated
   - THEN when I use the spacebar and/or enter key to activate the button I SEE the intended action occurs
   - THEN when I use the arrow keys (left/right) I SEE the media fast forwards/reverses

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use the tab key to move focus to a control
      - I HEAR the video control purpose is clear (play, pause, stop)
      - I HEAR video controls identify as button, switch etc.
      - I HEAR audio content never autoplays
      - I HEAR it expresses it state if applicable (pressed, expanded, disabled)
   - THEN when I use the spacebar and/or enter key to activate the button I HEAR the intended action occurs
   - THEN when I use the arrow keys (left/right) I HEAR the media fast forwards/reverses

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND

      - I swipe to focusable to a video control

      - I HEAR the video control purpose is clear (play, pause, stop)

      - I HEAR video controls identify as button, switch etc.

      - I HEAR audio content never autoplays

      - I HEAR it expresses it state if applicable (pressed, expanded, disabled)
   - Then when I doubletap with the video control in focus I HEAR the intended action occurs


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/video-audio-player](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/video-audio-player)

## Developer notes

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

```html
<h2>The Princess Bride</h2>
<video-embed>
</video-embed>
```

### An `aria-label="Media title"` can also be used

```html
<video-embed aria-label="The Princess Bride"></video-embed>
```

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
