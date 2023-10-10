---
layout: entry
title:  "Captcha"
categories: controls


keyboard:
  tab: |
    Focus visibly moves to the captcha
  spacebar: |
    Activates the captcha on iOS and Android
  enter: |
    Activates the button on Android
          
mobile:
  swipe: |
    Focus moves to the interactive elements, expresses its state, if applicable
  doubletap: |
    Activates the button
    
screenreader: 
  name:  |
    Purpose is clear (ex: "Captcha")
  role:  |
    Identifies itself as a button or image button, if interactive
  group: |
    If in a table row, group with other elements (one interactive element per grouping)
  state: |
    Expresses its state (disabled/dimmed)

settings:
  text resize: |
    Text can resize up to 200% without losing information
---


## Developer notes
- There are several experiences for Captcha:  
  - An image in a table row, where the whole table row acts like a button.  
  - A single interactive element, like an image button
  - An audio challenge as an equivalent experience to the image challenge

When selecting the type of Captcha, do not limit the options to only <a href="https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html#dfn-cognitive-function-test"> cognitive function tests </a> (e.g. remembering or transcribing a word, or recognizing a picture the website provided).  When possible, When possible, leverage captcha or <a href="https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-enhanced.html#examples"> other solutions recommended by the W3C</a>.

### Name

Experiences:  

- Alt text on the image that describes its purpose.
- Name describes the purpose of the control and matches any visible text in image
- Programmatic name of each interactive component in audio challenge is announced.

Name describes the purpose of the control

**iOS Options**

- Set a label in Interface Builder in the Identity Inspector
- Group visible text label and the control in the same view container: accessibilityFrameInContainerSpace
- setTitle( ) method
- If no visible label, use accessibilityLabel on control
- Hint is used only if the results of interacting with it are not obvious from the control's label.
- Match visible label, if any
- To hide labels from VoiceOver announcements, uncheck the Accessibility Enabled checkbox in the Identity Inspector
- If hiding visible label, use accessibilityLabel on control

**Android Options**  

- android:text XML attribute
- Optional: use contentDescription for a more descriptive name, depending on type of view and for elements without a visible label.
- contentDescription overrides android:text  
  
- Use labelFor attribute to connect the visible label to the control

### Role

Experiences:  

- Identifies as an image
- Identifies as an image button
- Each interactive component in audio challenge identifies as a button or text field

### Groupings

Experiences:  

- If in a table row, group all text and elements in the table row, identifying each elements name. The whole table row should be in one swipe, announcing as "button" or "double tap to activate". There can be only one interactive element in a table row.

- **iOS**
  - accessibilityFrame
  - accessibilityFrameInContainerSpace
  - Only the container class is an accessible element
- **Android**
  - ViewGroup
  - Set the container object's android:screenReaderFocusable attribute to true, and each inner object's android:focusable attribute to false. In doing so, accessibility services can present the inner elements' content descriptions/names, one after the other, in a single announcement.

### State

Experiences:  

- If grouped in table row, it's possible for the whole row to have a dimmed/disabled state, or the captcha button disabled separately
- Image button can have a disabled state (dimmed/disabled)
- Buttons in audio challenge can have a disabled state (dimmed/disabled)

### Focus

Experiences:  

1) Focus is on the whole table row. There should be no focus on any single element, if the whole table row is grouped together, as long as there is only one interactive element per row.

2) The image button receives focus by swipe or touch

3) Each element in audio challenge receives focus by swipe or touch. User is confined inside a modal, if presented

Only manage focus when needed. Primarily, let the device manage default focus.  
Consider how focus should be managed between child elements and their parent views.

**iOS Options**
- accessibilityElementIsFocused  
- isAccessibilityElement - Yes, if the element can respond to user input
- To move screen reader focus to newly revealed content: UIAccessibilityLayoutChangedNotification
- To NOT move focus, but announce new content: UIAccessibilityAnnouncementNotification
  
**Android Options**
- android:focusable=true
- android=clickable=true
- Implement an onClick( ) event handler for keyboard, not onTouch( )
- nextFocusDown
- nextFocusUp
- nextFocusRight
- nextFocusLeft
- accessibilityTraversalBefore (or after)
- To move screen reader focus to newly revealed content: Type_View_Focused
- To NOT move focus, but announce new content: accessibilityLiveRegion
- To hide controls: Important_For _Accessibility_NO