---
layout: entry
title:  "Stepper"
categories: controls


keyboard:
  tab, Ctr+tab or arrow keys: |
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

settings:
  text resize: |
    Text can resize up to 200% without losing information
---

## iOS

### Developer notes 
- A stepper is a two-segment control used to increase or decrease an incremental value
- When new value changes, it gets announced dynamically without moving focus from the increment/decrement button

### Name
- Name includes the purpose and describes the item changing, matching any visible label and references the number shown between stepper (if visible).  
  
- Container class {stepper + label}  
- Set a label in Interface Builder in the Identity Inspector
- Group visible text label and the control in the same view container: accessibilityFrameInContainerSpace or Stackview
- setTitle( ) method
- If no visible label, use accessibilityLabel on control
- Hint is used only if the results of interacting with it are not obvious from the control's label.
- Match visible label, if any
- To hide labels from VoiceOver announcements, uncheck the Accessibility Enabled checkbox in the Identity Inspector
- If hiding visible label, use accessibilityLabel on control

### Role
- UIStepper Class
- UIAccessibilityTraitAdjustable must be linked to the  `accessibilityIncrement()`  and  `accessibilityDecrement() methods.`

### State
- Active: isEnabled property
- Disabled: UIAccessibilityTraitNotEnabled
- Announcement: dimmed

### Focus
- Only manage focus when needed. Primarily, let the device manage default focus.  
- Consider how focus should be managed between child elements and their parent views.
- accessibilityElementIsFocused  
- isAccessibilityElement - Yes, if the element can respond to user input
- To move screen reader focus to newly revealed content: UIAccessibilityLayoutChangedNotification
- To NOT move focus, but announce new content: UIAccessibilityAnnouncementNotification

### Announcements
- Increment
  - "Label with current value, Increment, Button"
  - if button is activated new value will announce
- Decrement
  - "Label with current value, Decrement, Button"
  - if button is activated new value will announce

## Android

### Developer notes 
- A stepper is a two-segment control used to increase or decrease an incremental value
- When new value changes, it gets announced dynamically without moving focus from the increment/decrement button

### Name
- Name includes the purpose and describes the item changing, matching any visible label and references the number shown between stepper (if visible).

- android:text XML attribute
- Optional: use contentDescription for a more descriptive name, depending on type of view and for elements without a visible label.
- contentDescription overrides android:text  
- Use labelFor attribute to connect the visible label to the control

### Role
- Extend the most relevant View subclass as is relevant to this control
- Button or ImageButton  

### State
- Active: android:enabled=true
- Disabled: android:enabled=false
- Announcement: disabled

### Focus
- Only manage focus when needed. Primarily, let the device manage default focus.  
- Consider how focus should be managed between child elements and their parent views.
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

### Announcements
- Increment
  - "Label with value, Increment, Double tap to activate"
  - if button is activated new value will announce
- Decrement
  - "Label with value, Decrement, Double tap to activate"
  - if button is activated new value will announce
