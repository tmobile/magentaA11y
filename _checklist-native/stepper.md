---
layout: entry
title:  "Stepper"
categories: controls


keyboard:
  tab: |
    Focus visibly moves to the button
  arrow keys: |
    Focus visibly moves to the button
  spacebar: |
    Activates the button on iOS and Android
  enter: |
    Activates the button on Android
          
mobile:
  swipe: |
    Focus moves to the element, expresses its state, if applicable
  doubletap: |
    Activates the button
    
screenreader: 
  name:  |
    Purpose is clear and matches visible label
  role:  |
    Identifies as a button in iOS and "double tap to activate" in Android
  group: |
    n/a
  state: |
    Expresses its state and stepper value (disabled/dimmed)
---

## Developer notes


A stepper is a two-segment control used to increase or decrease an incremental value

### Name

- Name includes the purpose and describes the item changing, matching any visible label and references the number shown between stepper (if visible). Example - Phone is visible label and 3 is the number between the increment buttons: "Removes one phone from 3 phones, button".  
  
- **iOS Options**
  - Container class {stepper + label}  
  - Set a label in Interface Builder in the Identity Inspector
  - Group visible text label and the control in the same view container: accessibilityFrameInContainerSpace or Stackview
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
  - UIStepper Class
  - UIAccessibilityTraitAdjustable must be linked to the  `accessibilityIncrement()`  and  `accessibilityDecrement() methods.`
- **Android**
  - Extend the most relevant View subclass as is relevant to this control
  - Button or ImageButton  

### Groupings

n/a

### State

- **iOS**  
  - Active: isEnabled property
  - Disabled: UIAccessibilityTraitNotEnabled
  - Announcement: dimmed
- **Android**
  - Active: android:enabled=true
  - Disabled" android:enabled=false
  - Announcement: disabled

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