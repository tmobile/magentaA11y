---
layout: entry
title:  "Field Errors" 
categories: common patterns


keyboard:
  tab, arrow keys or Ctl+tab: |
    N/A
         
mobile gestures:
  swipe: |
    N/A
   
screenreader: 
  Error message:  |
    “Error” is usually announced as alt text for an error icon and the error message announcement follows it

group: |
    Group elements that are logical, like the error icon and the error message

settings:
  text resize: |
    Text can resize up to 200% without losing information
---

## iOS

### Developer notes
- An error message tells the user what and how they need to fix to finish the screen’s action
- Validation for a user input field can be in various ways.  So, the focus on the error field and timing of the announcement can vary.  
- The error message that appears on the screen must be communicated to the screen reader user 
- Screen reader focus can move to the field in error upon validation or when CTA is activated, or upon leaving field
- If the field in error is not in focus upon validation, the error message must be next in the swipe order to announced
- Announcement should include “Error” or similar language, the name of the field in error, data entered and error message
- If multiple errors appear on the screen when CTA triggers validation, the focus should move to the first field in error


### Focus
- Use the device's default focus functionality
- Consider how focus should be managed between child elements and their parent views

- **UIKit**
  - If VoiceOver is not reaching a particular element, set the element's `isAccessibilityElement` to `true`
    - **Note:** You may need to adjust the programmatic name, role, state, and/or value after doing this, as this action may overwrite previously configured accessibility.
  - To move screen reader focus to newly revealed content, use `UIAccessibility.post(notification:argument:)` that takes in `.screenChanged` and the newly revealed content as the parameter arguments.
  - To NOT move focus, but dynamically announce new content: use `UIAccessibility.post(notification:argument:)` that takes in `.announcement` and the announcement text as the parameter arguments.
  - `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements. 

- **SwiftUI**
  - For general focus management that impacts both screen readers and non-screen readers, use the property wrapper `@FocusState` to assign an identity of a focus state.
    - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:)` to assign focus on a view with `@FocusState` as the source of truth.
    - Use the property wrapper `@FocusState`in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
  - If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.


### Announcement examples
- "Error. Password, Password is not correct, text field, required, yyyzzz”  (Icon description, field name, error message, role, asterisk, data entered)


## Android

### Developer notes
- An error message tells the user what and how they need to fix to finish the screen’s action
- Validation for a user input field can be in various ways.  So, the focus on the error field and timing of the announcement can vary.  
- The error message that appears on the screen must be communicated to the screen reader user 
- Screen reader focus can move to the field in error upon validation or when CTA is activated, or upon leaving field
- If the field in error is not in focus upon validation, the error message must be next in the swipe order to announced
- Announcement should include “Error” or similar language, the name of the field in error, data entered and error message
- If multiple errors appear on the screen when CTA triggers validation, the focus should move to the first field in error

### Focus
- Only manage focus when needed. Primarily, let the device manage default focus
- Consider how focus should be managed between child elements and their parent views

- **Android Views**
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
  - To hide controls: `importantForAccessibility=false`
  - For a `ViewGroup`, set `screenReaderFocusable=true` and each inner object’s attribute to keyboard focus (`focusable=false`)

- **Jetpack Compose**
  - `Modifier.focusTarget()` makes the component focusable
  - `Modifier.focusOrder()` needs to be used in combination with FocusRequesters to define focus order
  - `Modifier.onFocusEvent()`, `Modifier.onFocusChanged()` can be used to observe the changes to focus state
  - `FocusRequester` allows to request focus to individual elements with in a group of merged descendant views
  - Example: To customize the focus events
    - step 1: define the focus requester prior. `val (first, second) = FocusRequester.createRefs()`
    - step 2: update the modifier to set the order. `modifier = Modifier.focusOrder(first) { this.down = second }`
    - focus order accepts following values: up, down, left, right, previous, next, start, end
    - step 3: use `second.requestFocus()` to gain focus

### Announcement examples 
- Order and content will vary with device and OS
- "Editing, yyyzzz, edit box, Password, error, password is not correct, actions available”  (edit mode, data entered, role, field name, icon description, error message, extra actions)
