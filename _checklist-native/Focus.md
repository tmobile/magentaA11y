---
layout: entry
title:  "Focus" 
categories: common patterns


keyboard:
  tab, arrow keys or Ctl+tab: |
    Focus visibly moves to all controls
  visible focus indicator: |
    Is clearly shown around controls in a logical order

          
mobile gestures:
  swipe: |
    Initial focus moves to a logical place on screen, then to all meaningful images, text and controls
  Doubletap: |
    Activates controls
    
screenreader: 
  initial focus: |
    Starts in a logical place (ex: back button, close button, top of screen)
  navigate: |
    Focus moves left to right, top to bottom in a logical order
  visible focus indicator: |
    Is clearly shown around content when tapped or with navigation gestures

---

## iOS

### Developer notes
- On most devices, the screen reader focus indicator color can be changed to pass color contrast ratios against its background
- Keep focused components from being obscured by other content, like Cookies and Chat buttons
- Focus should move into a picker, modal or alert when it appears
- When a modal or alert is closed, focus should go back to triggering element, or to a logical place
- Focus should be contained in a modal when content underneath is hidden
- Let the device manage focus, for the most part
- Do not move focus automatically when on a user-input component (radio button, text field, etc)
- Keyboard focus should be visible and if possible, pass color contrast ratio of 3:1
  
  

### Focus
- Consider how focus should be managed between child elements and their parent views.
- External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.

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


## Android

### Developer notes
- On most devices, the screen reader focus indicator color can be changed to pass color contrast ratios against its background
- Keep focused components from being obscured by other content, like Cookies and Chat buttons
- Focus should move into a picker, modal or alert when it appears
- When a modal or alert is closed, focus should go back to triggering element, or to a logical place
- Focus should be contained in a modal when content underneath is hidden
- Let the device manage focus, for the most part
- Do not move focus automatically when on a user-input component (radio button, text field, etc)
- Keyboard focus should be visible and if possible, pass color contrast ratio of 3:1

### Focus
- Only manage focus when needed. Primarily, let the device manage default focus
- Consider how focus should be managed between child elements and their parent views
- External keyboard tab order often follows the screen reader focus, but sometimes needs focus management

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
