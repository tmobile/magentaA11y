---
layout: entry
title:  "Wheel Picker"
categories: controls

keyboard:
  tab, arrow keys or Ctl+tab: |
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

## iOS

### Developer notes
- Spinners and pickers provide a quick way to select one value from a set. Dropdowns/ Spinners/ Pickers all follow this page's guidance
- Use native menus when at all possible vs a custom element, as it will handle expected behavior without additional development effort
- Screen reader focus moves to the picker or spinner when it opens. Sometimes it takes one swipe to enter spinner on Android
- "Picker item, adjustable" "swipe up or down to adjust the value" for custom actions on the picker are the common announcements on iOS. Done button closes picker and screen reader focus should move to the button that opened the picker
- "Dropdown list" or "pop up window" often brings up a modal on Android. Focus remains in modal or back to triggering button. Swipe anywhere on screen with two fingers can close modal
- The value or option that the user chose must be announced along with the name and role

### Name
- Programmatic name describes the purpose of the control.
- It is the name of the element that opens the wheel picker.
- If visible text label exists, the programmatic name should match the visible text label.
    - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.
- Placeholder text is NOT the programmatic name

- **UIKit**
  - You can programmatically set the visible label with `setTitle()`.
    - The date picker's title will overwrite the date picker's `accessibilityLabel`.
  - If a visible label is not applicable in this case, set the date picker's `accessibilityLabel` to the label of your choice.
    - To do this in Interface Builder, set the label using the Identity Inspector
  - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
  - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.
- **SwiftUI**
  - If no visible label, use view modifier `accessibilityLabel(_:)`.

### Role

- **UIKit**
  - Use `UIPickerView`
- **SwiftUI**
  - Use native `Picker` view with `WheelPickerStyle`
  - If applicable, use view modifier `accessibilityRemoveTraits(:)` to remove unwanted traits.  

### Groupings

- **UIKit**
  1. Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
  2. Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
  - If frame does not exist due to custom button, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
    - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
  - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
  - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.
- **SwiftUI**
  - Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.

### State 
- **UIKit**  
  - For enabled: Set `isEnabled` to `true`.
  - For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
    - If necessary, you may change the accessibility trait of the button to `notEnabled`, but this may overwrite the current accessibility role of the button.
- **SwiftUI**
  - For disabled, use view modifier `disabled()`.

### Focus
- Use the device's default focus functionality. 
- External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.
- Initial focus on a screen should land in a logical place, such as back button, screen title, first text field, or first heading.
- When the date picker is closed, the focus should return to the triggering element.

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
    - Use the property wrapper `@FocusState`in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
  - If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.

### Announcement examples

- 