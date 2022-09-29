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
      Visble label can be grouped or associated with the radio button in a single swipe
  state: |
      Expresses its state (disabled/dimmed, iOS: checked/not checked, selected.  Android: checked/not checked)

settings:
  text resize: |
    Text can resize up to 200% without losing information
---

### **Developer Notes**

- Use a radio button when a user is to select an item from a predefined list of options
- Except in a rare case where a mixed state is needed, radio buttons should be mutually exclusive
- You should use a native element rather than a custom element because it will announce the correct built-in screen reader announcements without additional development effort
-  A radio button should just change between checked and unchecked states.  It should not automatically navigate the user to another field or screen when checked, as that may cause a change of context. Revealing new information on the same screen as a result of activating a checkbox is usually not a change of context.
- Name, Role, State must be announced when focus is on the control. Announcing the label before the radio button does not meet this requirement.
    
### Name

- Programmatic name describes purpose while focus is on the control (or on the whole table row/blade)
- Programmatic name matches the visible text label 

- **iOS Tips**
	- Set a label in Interface Builder in the Identity Inspector
	- Group visible text label and the control in the same view container: `accessibilityFrameInContainerSpace`
	- `setTitle( )` method
	- If no visible label, use `accessibilityLabel` on control
	- `Hint` is used sparingly and if the results of interacting with it are not obvious from the control's label
	- To hide labels from VoiceOver announcements, uncheck the Accessibility Enabled checkbox in the Identity Inspector or use `isAccessibilityElement=false`
- **Android Tips**  
	- `android:text` XML attribute
	- Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements without a visible label
	- `contentDescription` overrides `android:text`  
	- Use `labelFor` attribute to associate the visible label with the control (Best practice)

### Role
- Role is automatically announced if a native component is used
- When not using native controls (custom controls), roles will need to be manually coded.

- **iOS**
	- Standard UIButton
	- Announce as "button"
- **Android**
	- Standard RadioButton with RadioGroup when applicable
	- Announcement: "double tap to activate" 

### Groupings

- Group visible label with radio button (label and radio button can be grouped together in a tableview/row/blade - one swipe) to provide a programmatic name for the button 
-   Or use `labelFor` (Android)

- **iOS Tips**
  -   `accessibilityFrame`
  -   `accessibilityFrameInContainerSpace`
  -   Create a wrapper as an accessible element
  -   Define action upon double-tap
  -   `shouldGroupAccessibilityElement` attribute: For a precise order if the native order should be disrupted.
  -   `GroupView`
  -   `shouldGroupAccessibilityChildren` attribute indicates whether VoiceOver must group it's children views. This allows making unique vocalizations or define a particular reading order for a part of the page
- **Android Tips**
	- ViewGroup
	- Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement

### State

- States can be selected, dimmed/disabled, checked/unchecked, on/off

- **iOS**  
  - `UIControlState` or `isSelected`, `UIAccessibilityTraitNotEnabled`
  - Selected: Announced as "checked" or "selected"
  - Not selected: Announced as "not checked" (optional)
  - Active: `isEnabled property`
  - Disabled: `UIAccessibilityTraitNotEnabled`. Announced as "dimmed"
- **Android**
	- Active: `android:enabled=true`
	- Disabled: `android:enabled=false`
	- on/off: `isChecked`, `setChecked`
	- Announcement: disabled, checked/not checked

### Focus

- Only manage focus when needed. Primarily, let the device manage default focus order.
- Consider how focus should be managed between child elements and their parent views or containers
- External keyboard tab order often follows the screen reader focus, but sometimes needs focus management

- **iOS**
	- `accessibilityElementIsFocused`  
	- `isAccessibilityElement` makes the element visible or not to the Accessibility API
	- `accessibilityElementsHidden` indicates that the children elements of the target element are visible or not to the Accessibility API
	- `accessibilityViewIsModal` contains the screen reader focus inside the Modal
	- To move screen reader focus to newly revealed content: `UIAccessibilityLayoutChangedNotification`
	- To NOT move focus, but dynamically announce new content: `UIAccessibilityAnnouncementNotification`
	- `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements.  
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
	- For a `ViewGroup`, set `screenReaderFocusable=true` and each inner object’s attribute to keyboard focus (`focusable=false`)
