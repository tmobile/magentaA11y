---
layout: entry
title:  "Radio button"
categories: controls

keyboard:
  tab and arrow keys: |
      Focus visibly moves to the radio button
  spacebar: |
      Activates on iOS and Android
  enter: |
      Activates on Android
        
mobile:
  swipe: |
      Focus moves to the element, expresses its name, role, state
  doubletap: |
     Toggles the radio button state

screenreader:
  name:  |
      Purpose is clear and matches any visible label
  role:  |
      Identifies itself as a button in iOS and radio button in Android
  group: |
      Visble label is grouped or associated with the radio button in a single swipe
  state: |
      Expresses its state (disabled/dimmed, iOS: checked/not checked, selected.  Android: checked/not checked)
---

### **Developer Notes**

- Use a radio button when a user is to select an item from a predefined list of options
- Except in a rare case where a mixed state is needed, radio buttons should be mutually exclusive
- You should use a native element rather than a custom element because it will announce the correct built-in screen reader announcements without additional development effort
-  A radio button should just change between checked and unchecked states.  It should not automatically navigate the user to another field or screen when checked, as that would most likely cause a change of context
    
### Name

- Name describes purpose while focus is on the control (or on the whole table row/blade)

- **iOS Tips**
	- Set a label in Interface Builder in the Identity Inspector
	- Group visible text label and the control in the same view container: `accessibilityFrameInContainerSpace`
	- `setTitle( )` method
	- If no visible label, use `accessibilityLabel` on control
	- `Hint` is used sparingly and if the results of interacting with it are not obvious from the control's label
	- Match visible label
	- To hide labels from VoiceOver announcements, uncheck the Accessibility Enabled checkbox in the Identity Inspector or use `isAccessibilityElement=false`
	- If hiding visible label from screen reader, use `accessibilityLabel` on control
- **Android Tips**  
	- `android:text` XML attribute
	- Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements without a visible label
	- `contentDescription` overrides `android:text`  
	- Use `labelFor` attribute to associate the visible label with the control (Best practice)

### Role

- Role is automatically announced if a native component is used

- **iOS**
	- Standard NSRadioButton
	- Announce as "button"
- **Android**
	- Standard RadioButton with RadioGroup when applicable
	- Announcement: "double tap to activate" 

### Groupings

- Group visible label with radio button (label and radio button can be grouped together in a tableview/row/blade - one swipe)

- **iOS Tips**
	- `accessibilityFrame`
	- `accessibilityFrameInContainerSpace`
	- GroupView
	- Only the container class is an accessible element `isAccessibilityElement=true` and announces all elements in one announcement  This makes child elements no longer accessible by screen reader 
- **Android Tips**
	- ViewGroup
	- Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement

### State

- States can be selected, dimmed/disabled, checked/unchecked, on/off

- **iOS**  
	- Active: `isEnabled property`
	- Disabled: `UIAccessibilityTraitNotEnabled`
	- disabled/dimmed
	- on/off:  `isOn` or `setOn` or `isChecked`
	- Announcement: dimmed, selected  
        
- **Android**
	- Active: `android:enabled=true`
	- Disabled: `android:enabled=false`
	- on/off: `isChecked`, `setChecked`
	- Announcement: disabled, checked/not checked

### Focus

- Only manage focus when needed. Primarily, let the device manage default focus order.
- Consider how focus should be managed between child elements and their parent views or containers

- **iOS**
	- `accessibilityElementIsFocused`  
	- `isAccessibilityElement` makes the element visible or not to the Accessibility API
	- `accessibilityElementsHidden` indicates that the children elements of the target element are visible or not to the Accessibility API
	- `accessibilityViewIsModal` contains the screen reader focus inside the Modal
	- To move screen reader focus to newly revealed content: `UIAccessibilityLayoutChangedNotification`
	- To NOT move focus, but dynamically announce new content: `UIAccessibilityAnnouncementNotification`
- **Android**
	- `importantForAccessibility` makes the element visible to the Accessibility API
	- `android:focusable`
	- `android=clickable`
	- Implement an `onClick( )` event handler for keyboard, as well as `onTouch( )`
	- `nextFocusDown`
	- `nextFocusUp`
	- `nextFocusRight`
	- `nextFocusLeft`
	- `accessibilityTraversalBefore` (or after)
	- To move screen reader focus to newly revealed content: `Type_View_Focused`
	- To NOT move focus, but dynamically announce new content: `accessibilityLiveRegion`(set to polite or assertive)
	- To hide controls: `Important_For_Accessibility_false`
