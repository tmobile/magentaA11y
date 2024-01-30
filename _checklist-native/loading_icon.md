---
layout: entry
title:  "Loading Icon" 
categories: common patterns


keyboard:
  tab, arrow keys or Ctl+tab: |
    N/A
         
mobile gestures:
  swipe: |
    Focus can move to the loading icon, but it should not be necessary because “loading” is announced dynamically
   
screenreader: 
  Name:  |
    “Loading” is announced dynamically

settings:
  text resize: |
    N/A
---

## iOS

### Developer notes
- A loading icon communicates that a screen or page is loading.  The screen reader is informed by hearing “loading” or anything similar, to understand that they should wait to continue
- The screen reader user should not have to swipe to the icon.  It should be dynamically announced
- Screen reader focus on the icon is optional
- If the screen takes a long time to load, the announcement for loading may happen again

### Name
- Programmatic name describes the purpose of the icon

- **UIKit**
  - You can programmatically set the visible label with `setTitle()`.
    - The _component title will overwrite the _component `accessibilityLabel`.
  - If a visible label is not applicable in this case, set the _component `accessibilityLabel` to the label of your choice.
    - To do this in Interface Builder, set the label using the Identity Inspector
  - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
  - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

- **SwiftUI**
  - If no visible label, use view modifier `accessibilityLabel(_:)` 


### Focus
- The screen reader user should not have to swipe to the icon to announce “Loading” 

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
- "Loading”


## Android

### Developer notes
- A loading icon communicates that a screen or page is loading.  The screen reader is informed by hearing “loading” or anything similar, to understand that they should wait to continue
- The screen reader user should not have to swipe to the icon.  It should be dynamically announced
- Screen reader focus on the icon is optional
- If the screen takes a long time to load, the announcement for loading may happen again

### Name
- Name describes the purpose of the icon

- **Android Views**
  - `android:text` XML attribute
  - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements (icons) without a visible label
  - `contentDescription` overrides `android:text`
  - Use `labelFor` attribute to associate the visible label with the control

- **Jetpack Compose**
  - Compose uses semantics properties to pass information to accessibility services.
  - Example specification of contentDescription in compose: `modifier = Modifier.semantics { contentDescription = "" }`

### Focus
- The screen reader user should not have to swipe to the icon to announce “Loading” 

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
- "Loading”
