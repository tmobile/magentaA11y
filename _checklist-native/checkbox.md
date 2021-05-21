---
layout: entry
title:  "Checkbox"
categories: controls


keyboard:
  tab: |
    Focus visibly moves to the checkbox
  spacebar: |
    Activates on iOS and Android
  enter: |
    Activates on Android
      
mobile:
  swipe: |
    Focus moves to the element, expresses its state ()
  doubletap: |
    Checkbox toggles between checked and unchecked states.

screenreader:
  name:  |
    Name describes the purpose of the control and matches the visible label
  role:  |
    Identifies itself as a Check box in Android and a Button in iOS
  group: |
    Visible label is grouped with the check box in a single swipe
  state: |
    Expresses its state (disabled/dimmed, checked, not checked)

---


## Developer notes
- A check box lets the user choose between two opposite states, actions or values  
- You should use a native component rather than custom, because it will announce the correct built-in screen reader output for free

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
  - NSSwitchButton
  - Announced as "button" or "checkbox"
- **Android**
  - CheckBox Class
  - Announced as "checkbox"

### Groupings

- Group visible label with checkbox
- **iOS**
  - accessibilityFrame
  - accessibilityFrameInContainerSpace
  - GroupView
- **Android**
  - ViewGroup
  - Set the container object's android:screenReaderFocusable attribute to true, and each inner object's android:focusable attribute to false. In doing so, accessibility services can present the inner elements' content descriptions/names, one after the other, in a single announcement.

### State

- **iOS**
  - UIControlState or isSelected, UIAccessibilityTraitNotEnabled
  - Selected: Announced as "checked"
  - Not selected: Announced as "not checked" as hint
  - Disabled: UIAccessibilityTraitNotEnabled. Announced as "dimmed"
- **Android**
  - Active: android:enabled=true, isChecked, setChecked
  - Disabled: android:enabled=false. Announced as: "disabled"

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