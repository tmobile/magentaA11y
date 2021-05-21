---
layout: entry
title:  "Text input"
categories: controls

keyboard:
  tab: |
    Focus moves visibly to the input on iOS, keyboard appears on Android
  spacebar: |
    Activates the keyboard on iOS
          
mobile:
  swipe: |
    Focus moves to the input
  doubletap: |
    Keyboard appears

screenreader:
  name:  |
    Purpose is clear
  role:  |
    Identifies itself text field on iOS, edit box on Android
  group: |
    Label is read with the input
  state: |
    The input can be disabled/dimmed
---

## Developer notes


- Lets users enter and edit text

### Name

- Name describes what data is to be entered and matches a **required**  persistent visible label.  
  
- Placeholders are not considered a persistent visible label as they disappear when data is entered.
- Name must be announced with the role, when screen reader focus is on the text field (Ex: "Amount, text field, double tap to edit")
- **iOS Options**
  - Set a label in Interface Builder in the Identity Inspector
  - Group visible text label and the control in the same view container: accessibilityFrameInContainerSpace
  - setTitle( ) method
  - Hint is used only if the results of interacting with it are not obvious from the control's label.
  - To hide labels from VoiceOver announcements, uncheck the Accessibility Enabled checkbox in the Identity Inspector
  - If hiding visible label, use accessibilityLabel on control  
- **Android Options**  
  - android:text XML attribute
  - Optional: use contentDescription for a more descriptive name, depending on type of view and for elements without a visible label.
  - contentDescription overrides android:text  
  - Use labelFor attribute to connect the visible label to the control  

### Role

- **iOS**
  - UITextField
- **Android**
  - EditBox

### Groupings

- Group textfield and persistent visible text label together in one swipe.  
  
- **iOS**
  - accessibilityFrame
  - accessibilityFrameInContainerSpace
  - Only the container class is an accessible element
- **Android**
  - ViewGroup
  - Set the container object's android:screenReaderFocusable attribute to true, and each inner object's android:focusable attribute to false. In doing so, accessibility services can present the inner elements' content descriptions/names, one after the other, in a single announcement.

### State

- **iOS**  
  - Active: isEnabled property
  - Disabled: UIAccessibilityTraitNotEnabled. Announcement: dimmed  
- **Android**
  - Active: android:enabled=true
  - Disabled: android:enabled=false. Announcement: disabled

### Focus

Only manage focus when needed. Primarily, let the device manage default focus.  
Consider how focus should be managed between child elements and their parent views.

- **iOS Options**
  - accessibilityElementIsFocused  
  - isAccessibilityElement - Yes, if the element can respond to user input
- **Android Options**
  - android:focusable=true
  - android=clickable=true
  - Implement an onClick( ) event handler for keyboard, not onTouch( )
  - nextFocusDown
  - nextFocusUp
  - nextFocusRight
  - nextFocusLeft
  - accessibilityTraversalBefore (or after)
  - To hide controls: Important_For _Accessibility_NO