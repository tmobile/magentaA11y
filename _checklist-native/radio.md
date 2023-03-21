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

- Use a radio button when a user is to select an item from a predefined list of options.
- Except in a rare case where a mixed state is needed, radio buttons should be mutually exclusive.
- You should use a native element rather than a custom element because it will announce the correct built-in screen reader announcements without additional development effort.
-  A radio button should just change between selected and unselected states. It should not automatically navigate the user to another field or screen when selected, as that may cause a change of context. Revealing new information on the same screen as a result of activating a radio button is usually not a change of context.
- Name, Role, State must be announced when focus is on the control. Announcing the label before the radio button does not meet this requirement.
    
## iOS

### Name
- Programmatic name describes the purpose of the control.
- If visible text label exists, the programmatic name should match the visible text label.
    - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.
- Placeholder text is NOT the programmatic name

- **UIKit**
  - You can programmatically set the visible label with `setTitle()`.
    - The radio button's title will overwrite its `accessibilityLabel`.
  - If a visible label is not applicable in this case, set the radio button's `accessibilityLabel` to the label of your choice.
    - To do this in Interface Builder, set the label using the Identity Inspector
  - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
  - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.
- **SwiftUI**
  - By default, the visible label of a radio group is the accessibility label of that radio group
	- The visible label of a radio button of a radio group is the accessibility label of that radio button
  - If no visible label, use view modifier `accessibilityLabel(_:)` and assign to the radio group and individual radio buttons accordingly.

### Role
- When using non-native controls (custom controls), roles will need to be manually coded.

- **UIKit**
  - Since there is no native radio button in UIKit, implementing a custom checkbox may be necessary using `UIButton`, `UISwitch`, `UIControl`, or another class.
  - If necessary, set `accessibilityTraits` to `.button`. Be sure to set the accessibility value to either "Selected"/"Checked" or "Unselected"/"Unchecked" to indicate that this control behaves as a radio button.
  - An alternative to setting the accessibility trait to `.button` is removing and hiding the accessibility trait using `accessibilityTraits.remove(:)`. Then, append ", Radio Button" or ", Button" to the programmatic name
- **SwiftUI**
  - Use native `Picker` view with `.pickerStyle(.radioGroup)` 

### Groupings
- Group visible label with radio button, if applicable, to provide a programmatic name for the radio button.
- Group label with data to ensure reading order is logical. (Not label, label, data, data).
- Group the units such that the label, role, and state of the checkbox is announced in a single announcement.

- **UIKit**
  1. Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
  2. Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
  - If frame does not exist, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
    - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
  - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
  - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.
- **SwiftUI**
  - Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.
  - If the tap gesture is removed due to grouping logic, restore the tap gesture functionality using bindings to bind the tap gesture of the container with the state of the checkbox.

### State 
- **UIKit** 
  - For checked state: Set `accessibilityValue` to "Selected" or "Checked"
  - For unchecked state: Optionally, set `accessibilityValue` to "Unselected" or "Unchecked"
  - For enabled state: Set `isEnabled` to `true`.
  - For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
    - If necessary, you may change the accessibility trait of the button to `notEnabled`, but this may overwrite the current accessibility role of the button.
- **SwiftUI**
  - For checked state, if necessary: Set accessibility value to "Selected" or "Checked" with `accessibility(:)`
  - For unchecked state, if necessary: Set accessibility value to "Unselected" or "Unchecked" with `accessibilityValue(:)`
  - For disabled, use view modifier `disabled()`.

### Focus
- Use the device's default focus functionality. 
- Consider how focus should be managed between child elements and their parent views.
- External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.
- Initial focus on a screen should land in a logical place, such as back button, screen title, first text field, or first heading.
- When a bottom navigation bar element is activated, the next screen's initial focus should move to the top of the screen. It should not stay in the bottom navigation bar.
- When a menu, picker, or modal is closed, the focus should return to the triggering element.

- **UIKit**
  - If VoiceOver is not reaching a particular element, set the element's `isAccessibilityElement` to `true`
    - **Note:** You may need to adjust the programmatic name, role, state, and/or value after doing this, as this action may overwrite previously configured accessibility.
  - Use `accessibilityViewIsModal` to contain the screen reader focus inside the modal.
  - To move screen reader focus to newly revealed content, use `UIAccessibility.post(notification:argument:)` that takes in `.screenChanged` and the newly revealed content as the parameter arguments.
  - To NOT move focus, but dynamically announce new content: use `UIAccessibility.post(notification:argument:)` that takes in `.announcement` and the announcement text as the parameter arguments.
  - `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements.  
- **SwiftUI**
  - For general focus management that impacts both screen readers and non-screen readers, use the property wrapper `@FocusState` to assign an identity of a focus state.
    - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:)` to assign focus on a view with `@FocusState` as the source of truth.
    - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
  - If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.

### Announcement examples
- TBA