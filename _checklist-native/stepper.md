---
layout: entry
title:  "Stepper"
categories: controls


keyboard:
  tab, Ctr+tab or arrow keys: |
    Focus visibly moves to the button
  spacebar: |
    Activates the button on iOS and Android
  enter: |
    Activates the button on Android
          
mobile:
  swipe: |
    Focus moves to the element, expresses its state, if applicable
  doubletap: |
    Activates the button
    
screenreader: 
  name:  |
    Purpose is clear and matches visible label
  role:  |
    Identifies as a button in iOS and "double tap to activate" in Android
  value: |
    Express the stepper value dynamically when it has visibly changed and when value is in focus
  state: |
    Expresses its state (disabled/dimmed)

settings:
  text resize: |
    Text can resize up to 200% without losing information
---

## iOS

### Developer notes 
- A stepper is a two-segment control used to increase or decrease an incremental value
- When new value changes, it gets announced dynamically without moving focus from the increment/decrement button
- Announcing the label when appropriate with the value gives the screen reader users and users with memory challenges context

### Name
- If visible text label exists, the programmatic name should match the visible text label.
  - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.

- **UIKit**
  - You can programmatically set the visible label with `setTitle()`.
    - The stepper's title will overwrite the segment’s `accessibilityLabel`.
  - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
  - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.
- **SwiftUI**
  - By default, the programmatic name is the visible text label of the segment
  - If necessary, use view modifier `accessibilityLabel(_:)`.
  - If a segment has icon(s), hide the icon(s) from VoiceOver by using view modifier `accessibilityHidden(true)`.

### Role
- The presence of the stepper buttons implies an interactive stepper component.
- The stepper buttons themselves should be announced as "Button".

- **UIKit**
  - Use `UIStepper`
- **SwiftUI**
  - Use native `Stepper` view

### Groupings
- N/A

- **UIKit**
  - Follow native grouping and order
- **SwiftUI**
  - Follow native grouping and order

### State
- The stepper button's state should be announced as "Increment" or "Decrement".
- The new value should be announced when the user activates one of the buttons.

- **UIKit**
  - For disabled stepper: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
    - If necessary, you may change the accessibility trait of the menu item to `notEnabled`, but this may overwrite the current accessibility role of the segmented control.
- **SwiftUI**
  - For disabled, use view modifier `disabled()`.

### Focus
- Use the device's default focus functionality. 
- External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.

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

### Announcements
- Increment
  - "Label with current value, Increment, Button"
  - if button is activated new value will dynamically announce
- Decrement
  - "Label with current value, Decrement, Button"
  - if button is activated new value will dynamically announce

## Android

There is no native stepper element for Android.  The notes below are suggestions and accessibility guidance.

### Developer notes 
- A stepper is a two-segment control used to increase or decrease an incremental value
- When new value changes, it gets announced dynamically without moving focus from the increment/decrement button
- Announcing the label when appropriate with the value gives the screen reader users and users with memory challenges context
  
### Name
- Name includes the purpose and describes the item changing, matching any visible label and references the number shown between stepper (if visible).

- android:text XML attribute
- Optional: use contentDescription for a more descriptive name, depending on type of view and for elements without a visible label.
- contentDescription overrides android:text  
- Use labelFor attribute to connect the visible label to the control

### Role
- Extend the most relevant View subclass as is relevant to this control
- Button or ImageButton  

### State
- Active: android:enabled=true
- Disabled: android:enabled=false
- Announcement: disabled

### Focus
- Only manage focus when needed. Primarily, let the device manage default focus.  
- Consider how focus should be managed between child elements and their parent views.
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

### Announcements
- Increment
  - "Label with value, Increment, Double tap to activate"
  - if button is activated new value will dynamically announce
- Decrement
  - "Label with value, Decrement, Double tap to activate"
  - if button is activated new value will dynamically announce
