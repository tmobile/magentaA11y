---
layout: entry
title:  "Date picker"
categories: pickers

keyboard:
  tab and arrow keys: |
      Focus visibly moves to the picker
  spacebar: |
      Selects and opens the picker/spinner on iOS and Android
  enter: |
      Selects and opens the picker/spinner on Android
        
mobile:
  swipe: |
      Focus moves to the element, expresses its name, role, value & state (if applicable)
  doubletap: |
     Selects and opens picker/spinner

screenreader:
  name:  |
      Purpose is clear and matches any visible label
  role:  |
      Identifies itself as a button in iOS and "double tap to activate" in Android
  group: |
      Visible label is grouped or associated with the picker in a single swipe
  state: |
      Expresses its state (disabled/dimmed)

settings:
  text resize: |
    Text can resize up to 200% without losing information
---

## Developer notes


- Spinners and pickers provide a quick way to select one value from a set. Dropdowns/ Spinners/ Pickers all follow this page's guidance
- Use native menus when at all possible vs a custom element, as it will handle expected behavior without additional development effort
- Screen reader focus moves to the picker or spinner when it opens. Sometimes it takes one swipe to enter spinner on Android
- "Picker item, adjustable" "swipe up or down to adjust the value" for custom actions on the picker are the common announcements on iOS. Done button closes picker and screen reader focus should move to the button that opened the picker
- "Dropdown list" or "pop up window" often brings up a modal on Android.  Focus remains in modal or back to triggering button.  Swipe anywhere on screen with two fingers can close modal
- The value or option that the user chose must be announced along with the name and role

### Name

- Name describes the purpose of the control

- **iOS Tips**
  - Set a label in Interface Builder in the Identity Inspector
  - Group visible text label and the control in the same view container: `accessibilityFrameInContainerSpace`
  - `setTitle( ) method`
  - If no visible label, use `accessibilityLabel` on control
  - `Hint` is used sparingly and if the results of interacting with it are not obvious from the control's label.
  - Match visible label, if any
  - To hide labels from VoiceOver announcements, uncheck the Accessibility Enabled checkbox in the Identity Inspector
  - If hiding visible label, use `accessibilityLabel` on control
- **Android Tips**  
  - `android:text` XML attribute
  - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements without a visible label
  - `contentDescription` overrides `android:text`  
  - Use `labelFor` attribute to connect the visible label to the control

### Role

- **iOS**
  - UIPickerView
  - UIDatePicker
  - "picker item" and/or "adjustable" can be the role
- **Android**
  - Spinner Class  
  - DatePickerDialog 
  - TimePickerDialog
  - See native date or time pickers in Gmail or Settings to determine the specific device's swipe order and behavior (Ex: Gmail-Compose-Menu-Schedule send-Pick date & time)
  - "pop up window" or "dropdown list" can be the role  

### Groupings

- Visible label and control are grouped together in one swipe
- Visible label and other non-interactive elements can be grouped together in one swipe in a table row
- **iOS**
  - `accessibilityFrame`
  - `accessibilityFrameInContainerSpace`
  - GroupView
  - Only the container class is an accessible element
- **Android**
  - ViewGroup
  - Set the container objects `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement

### State

- **iOS**  
  - Active: `isEnabled property`
  - Disabled: `UIAccessibilityTraitNotEnabled`. Announcement: dimmed
- **Android**  
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`. Announcement: disabled

### Focus

- Only manage focus when needed. Primarily, let the device manage default focus
- Consider how focus should be managed between child elements and their parent views
- Moving focus into the picker/spinner tells the screen reader user there is a picker available
- Screen reader focus can move out of the picker onto the rest of the screen, as it is not considered a modal on iOS, not on Android

- **iOS**
  - `accessibilityViewIsModal` contains the screen reader focus inside the Modal
  - `accessibilityElementIsFocused`  
  - `isAccessibilityElement` makes the element visible or not to the Accessibility API
  - `accessibilityElementsHidden` indicates that the children elements of the target element are visible or not to the Accessibility API
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
