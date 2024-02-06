---
layout: entry
title:  "Web view" 
categories: common-patterns


keyboard:
  tab, arrow keys or Ctl+tab: |
    Moves to all interactive elements in navigation bar and web view
  spacebar: |
    Activates on iOS and Android
  enter: |
    Activates on Android
         
mobile gestures:
  swipe: |
     Focus moves to the element, expresses its name, role (state, if applicable)
  doubletap: |
    Activates the interactive element  

screenreader: 
  focus:  |
      Initial focus should go to all elements in the navigation bars
  navigation:  |
      Native and web view elements are all in the swipe order      

settings:
  text resize: |
    N/A for web views and native navigation bar text
---

## iOS

### Developer notes
- A webview is a portion of a webpage, usually html code, incorporated seamlessly into the app’s UI
- Sometimes a hidden web element is announced 
- An obvious sign that you are in a webview are web-only accessibility announcements such as a “landmark” or a heading level
- A common use for web views is if the content changes often
- A “Link” announcement in web views usually navigates the user to a new screen.  In a native app “link” usually means the action will open a browser on your phone
- External Blue Tooth keyboard testing can be erratic and inconsistent on web views
- Enlarging text from Accessibility settings does not work on the web view sections of the screen

- **UIKit and SwiftUI**
- `WKWebView`

### Focus
- Use the device's default focus functionality. 
- Consider how focus should be managed between child elements and their parent views.
- External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.
- Initial focus on a screen should land in a logical place, such as the nav bar back button, screen title, or first text field

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
- A webview is a portion of a webpage, usually html code, incorporated seamlessly into the app’s UI
- Sometimes a hidden web element is announced 
- An obvious sign that you are in a webview are web-only accessibility announcements such as a “landmark” or a heading level
- A common use for web views is if the content changes often
- A “Link” announcement in web views usually navigates the user to a new screen.  In a native app “link” usually means the action will open a browser on your phone
- External Blue Tooth keyboard testing can be erratic and inconsistent on web views
- Enlarging text from Accessibility settings does not work on the web view sections of the screen

- **Android Views**
- `public class WebView`

- **JetPack Compose**
  - `AndroidView():`  To embed Android views in your Compose layouts
  - `Factory:`  Function that creates an instance of the Android view


### Focus
- Only manage focus when needed. Primarily, let the device manage default focus
- Consider how focus should be managed between child elements and their parent views
- External keyboard tab order often follows the screen reader focus, but sometimes needs focus management
- Initial focus on a screen should land in a logical place (back button, screen title, first text field, first heading)
- When a menu, picker or modal is closed, the focus should return to the triggering element.

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
