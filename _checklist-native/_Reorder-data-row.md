---
layout: entry
title:  "Reorder data row" 
categories: controls 


keyboard:
  tab, arrow keys or Ctl+tab: |
    Focus visibly moves to the control
  spacebar: |
    Activates on iOS
  
          
mobile gestures:
  swipe: |
    Focus moves to the control, expresses its name, role, state (if applicable)
  Doubletap and hold: |
    Activates the reorder action
    
screenreader: 
  name:  |
    Purpose is clear and matches visible label 
  role:  |
    Control identifies as a button and draggable
  group: |
    Associate the visible label with the reorder control
  state: |
    Expresses the state of the control is disabled (dimmed)

settings:
  text resize: |
    Text can resize up to 200% without losing information
---

<!-- 
Enter Developer Notes for native but not platform specific, add additional information if needed
-->



## iOS

### Developer notes
- A common pattern on the reorder component is to offer a delete option.  If this is the case, then the label is interactive, with the delete button appearing upon double tap. "Remove" is added prior to the label announcement programmatically.
- The native component provides thorough instruction announcements that are very intuitive
  
  
### Name
- Programmatic name describes the purpose of the control.
- The programmatic name should match the visible text label
    - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognition.

<!-- 
Enter information for iOS Name using UIKIT, update below with appropriate details, replace _component with new component name or appropriate description
-->
- **UIKit**
  - You can programmatically set the visible label with `setTitle()`.
    - The _component title will overwrite the _component `accessibilityLabel`.
  - If a visible label is not applicable in this case, set the _component `accessibilityLabel` to the label of your choice.
    - To do this in Interface Builder, set the label using the Identity Inspector
  - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
  - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

<!-- 
Enter information for iOS Name using SwiftUI, update below with appropriate details
-->
- **SwiftUI**
  - If no visible label, use view modifier `accessibilityLabel(_:)`.


<!-- 
Enter information for iOS Role, update information below with appropriate details, or remove details not needed
-->
### Role
- When using non-native controls (custom controls), roles will need to be manually coded.

<!-- 
Enter information for iOS Name using UIKIT, update below with appropriate details, replace _component with new component name or appropriate description
-->
- **UIKit**
  - 
  - 

<!-- 
Enter information for iOS Name using SwiftUI, update below with appropriate details
-->
- **SwiftUI**
  - 
  - 

<!-- 
Enter information for iOS Groupings, update below with appropriate details, replace _component with new component name or appropriate description
-->
### Groupings
- Group visible label with the reorder button, if applicable, to provide a programmatic name for the reorder button.

<!--
Enter information for iOS Groupings using UIKit, update below with appropriate details
-->
- **UIKit**
  - 
  - 
<!--
Enter information for iOS Groupings using SwiftUI, update below with appropriate details
-->
- **SwiftUI**
  - Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.

<!-- 
Enter information for iOS State, update below with appropriate details, replace control with new component name or appropriate description
-->
### State 

<!-- 
Enter information for iOS State for UIKit, update below with appropriate details, replace control with new component name or appropriate description
-->
- **UIKit**  
  - For enabled: Set `isEnabled` to `true`.
  - For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
    - If necessary, you may change the accessibility trait of the _component to `notEnabled`, but this may overwrite the current accessibility role of the control.

<!-- 
Enter information for iOS State for SwiftUI, update below with appropriate details, replace control with new component name or appropriate description
-->
- **SwiftUI**
  - For selected, use `accessibilityAddTraits(.isSelected)`.
  - For disabled, use view modifier `disabled()`.

<!-- 
Enter information for iOS Focus, update below with appropriate details
-->
### Focus
- Use the device's default focus functionality. 
- Consider how focus should be managed between child elements and their parent views.
- External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.

<!-- 
Enter information for iOS Focus using UIKit, update below with appropriate details
-->
- **UIKit**
  - If VoiceOver is not reaching a particular element, set the element's `isAccessibilityElement` to `true`
    - **Note:** You may need to adjust the programmatic name, role, state, and/or value after doing this, as this action may overwrite previously configured accessibility.
  - Use `accessibilityViewIsModal` to contain the screen reader focus inside the modal.
  - To move screen reader focus to newly revealed content, use `UIAccessibility.post(notification:argument:)` that takes in `.screenChanged` and the newly revealed content as the parameter arguments.
  - To NOT move focus, but dynamically announce new content: use `UIAccessibility.post(notification:argument:)` that takes in `.announcement` and the announcement text as the parameter arguments.
  - `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements. 

<!-- 
Enter information for iOS Focus using SwiftUI, update below with appropriate details
--> 
- **SwiftUI**
  - For general focus management that impacts both screen readers and non-screen readers, use the property wrapper `@FocusState` to assign an identity of a focus state.
    - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:)` to assign focus on a view with `@FocusState` as the source of truth.
    - Use the property wrapper `@FocusState`in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
  - If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.


<!-- 
Enter information for iOS VoiceOver announcements for the specific component, update below with appropriate details and announcement examples
--> 
### Announcement examples
- "Remove, English US, button" (Option to delete row - Delete button appears and announces as "Delete, button"
- "Reorder, English, button, draggable, double tap and hold, wait for the sound, then drag to rearrange" (on three-line reorder button)
- "Moved below Spanish"  (After double tap and hold and two-click sound is heard, slowly drag up or down, waiting for the row above or below to announce. Continue to slowly move up or down until moved to the desired location.  Lift finger to complete task)

