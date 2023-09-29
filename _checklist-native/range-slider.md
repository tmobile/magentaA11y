---
layout: entry
title:  "Range slider"
categories: controls

keyboard:
  tab, arrow keys or Ctl+tab: |
    Focus moves visibly to the input
  arrow-keys: |
    Increase / decrease value one step

mobile:
  swipe: |
    Focus moves to the input
  iOS-swipe-up/down: |
    Increase/decrease slider value one step
  android-volume or swipe up/down: |
    Increase/decrease slider value one step

screenreader:
  name:  |
    Name describes the purpose of the control and matches the visible label 
  role:  |
    Identifies itself as "adjustable" in iOS and "seek control" in Android
  group: |
    Label is sometimes announced with the input
  value: |
    Expresses its current value

settings:
  text resize: |
    Text can resize up to 200% without losing information
---

## Developer Notes

- A slider is a horizontal track with a control called a thumb, which you  
  can slide with your finger to move between a minimum and maximum value

### Name

- Name describes the purpose of the control
- **iOS Options**
  - Set a label in Interface Builder in the Identity Inspector
  - Group visible text label and the control in the same view container: accessibilityFrameInContainerSpace
  - setTitle( ) method
  - If no visible label, use accessibilityLabel on control
  - Hint is used only if the results of interacting with it are not obvious from the control's label.
  - Match visible label, if any
  - To hide labels from VoiceOver announcements, uncheck the Accessibility Enabled checkbox in the Identity Inspector
  - If hiding visible label, use accessibilityLabel on control
- **Android Options**  
  - android:text XML attribute
  - Optional: use contentDescription for a more descriptive name, depending on type of view and for elements without a visible label.
  - contentDescription overrides android:text  
  - Use labelFor attribute to connect the visible label to the control

### Role

- **iOS**
  - UISlider
- **Android**
  - Seekbar class
  - Slider class

### Groupings

- Visible label is typically not grouped with the control.
- The visible label is focused separately from the adjustable control.  
  

### State

- **iOS**  
  - Active: isEnabled property
  - Disabled: UIAccessibilityTraitNotEnabled. Announcement: dimmed
- **Android**
  - Active: android:enabled=true
  - Disabled: android:enabled=false. Announcement: disabled

### Focus

- Only manage focus when needed. Primarily, let the device manage default focus.  
  
- Consider how focus should be managed between child elements and their parent views.
- **iOS Options**
  - accessibilityElementIsFocused  
  - isAccessibilityElement - Yes, if the element can respond to user input
  - To move screen reader focus to newly revealed content: UIAccessibilityLayoutChangedNotification
  - To NOT move focus, but announce new content: UIAccessibilityAnnouncementNotification
- **Android Options**
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
