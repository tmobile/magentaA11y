---
layout: entry
title:  "Reorder data row" 
categories: controls 


keyboard:
  tab, arrow keys or Ctl+tab: |
    Focus can visibly move to the reorder control, but cannot be activated  
          
mobile gestures:
  swipe: |
    Focus moves to the control, expresses its name, role, state (if applicable)
  Doubletap and hold: |
    Activates the reorder action
    
screenreader: 
  name:  |
    Purpose is clear and matches visible label 
  role:  |
    Control identifies as a button and ”draggable”
  group: |
    Associate the visible label with the reorder control
  state: |
    Expresses the state of the control is disabled (dimmed)

settings:
  text resize: |
    Text can resize up to 200% without losing information (visible label text)
---


## iOS

### Developer notes
- A common pattern on the reorder component is to offer a delete option.  If this is the case, then the label is interactive, with the delete button appearing upon double tap. "Remove" is added prior to the label announcement programmatically.
- The native component provides thorough instruction announcements that are very intuitive
  
  
### Name
- Programmatic name describes the purpose of the control.
- The programmatic name should match the visible text label
    - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognition.

- **UIKit**
  - You can programmatically set the visible label with `setTitle()`.
    - The _component title will overwrite the _component `accessibilityLabel`.
  - If a visible label is not applicable in this case, set the _component `accessibilityLabel` to the label of your choice.
    - To do this in Interface Builder, set the label using the Identity Inspector
  - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
  - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

- **SwiftUI**
  - If no visible label, use view modifier `accessibilityLabel(_:)`.


### Role
- When using non-native controls (custom controls), roles will need to be manually coded.
- Follow code guidance for Button control.  Ensure “draggable” is also announced.

### State 

- **UIKit**  
  - For enabled: Set `isEnabled` to `true`.
  - For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
    - If necessary, you may change the accessibility trait of the _component to `notEnabled`, but this may overwrite the current accessibility role of the control.

- **SwiftUI**
  - For selected, use `accessibilityAddTraits(.isSelected)`.
  - For disabled, use view modifier `disabled()`.

### Focus
- Use the device's default focus functionality. 
- Consider how focus should be managed between child elements and their parent views.

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

### Announcement examples for editing Keyboards in Settings
- "Remove, English US, button" (Option to delete row - Delete button appears and announces as "Delete, button"
- "Reorder, English, button, draggable, double tap and hold, wait for the sound, then drag to rearrange" (on three-line reorder button)
- "Moved below Spanish"  (After double tap and hold and two-click sound is heard, slowly drag up or down, waiting for the row above or below to announce. Continue to slowly move up or down until moved to the desired location.  Lift finger to complete task)
