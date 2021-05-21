---
layout: entry
title:  "Picker / Spinner / Dropdown"
categories: controls

keyboard:
  tab and arrow keys: |
      Focus visibly moves to the radio button
  spacebar: |
      Selects the radio button on iOS and Android
  enter: |
      Selects the radio button on Android
        
mobile:
  swipe: |
      Focus moves to the element, expresses its state
  doubletap: |
     Toggles the radio button state

screenreader:
  name:  |
      Purpose is clear and matches any visible label
  role:  |
      Identifies itself as a button in iOS and radio button in Android
  group: |
      Visible label is grouped or associated with the radio button in a single swipe
  state: |
      Expresses its state (disabled/dimmed, iOS: checked/not checked.  Android: checked/not checked)
---

## Developer notes


Spinners and pickers provide a quick way to select one value from a set. Dropdowns/ Spinners/ Pickers all follow this page's guidance.

### Name

Name describes the purpose of the control

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
  - UIPickerView
  - UIDatePicker
- **Android**
  - Spinner Class  
  - DatePickerDialog
  - TimePickerDialog  

### Groupings

- Visible label and control are grouped together in one swipe
- Visible label and other non-interactive elements can be grouped together in one swipe in a table row
- **iOS**
  - accessibilityFrame
  - accessibilityFrameInContainerSpace
  - GroupView
  - Only the container class is an accessible element
- **Android**
  - ViewGroup
  - Set the container object's android:screenReaderFocusable attribute to true, and each inner object's android:focusable attribute to false. In doing so, accessibility services can present the inner elements' content descriptions/names, one after the other, in a single announcement

### State

- **iOS**  
  - Active: isEnabled property
  - Disabled: UIAccessibilityTraitNotEnabled. Announcement: dimmed
  - Add hint if it collapses and expands: "collapses" and "expands"
- **Android**  
  - Active: android:enabled=true
  - Disabled: android:enabled=false. Announcement: disabled
  - Native elements will have states available (ex: "collapsed, double tap to expand list")

### Focus

Only manage focus when needed. Primarily, let the device manage default focus.  

Consider how focus should be managed between child elements and their parent views.

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