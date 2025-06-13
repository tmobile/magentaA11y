## General Notes

How to test an alert dialog

## Videos

### iOS VoiceOver

<video controls>
  <source src="media/video/native/alert-dialog/alert-dialog_IosVoiceOver.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback

<video controls>
  <source src="media/video/native/alert-dialog/alert-dialog_AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test an alert dialog

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Focus visibly moves, confined within the alert
   - Escape: The alert closes and returns focus to the element that launched it or to a logical place 
   - Space: Any buttons or links are activated on iOS and Android
   - Enter: Any buttons or links are activated on Android

2. Test mobile screenreader gestures

   - Swipe: Focus moves, confined within the alert
   - Doubletap: This typically activates most elements
   - Group: n/a

3. Listen to screenreader output on all devices

   - Name: Interactive elements within the alert should follow button guidance. The name should match the visible text for those buttons 
   - Role: May identify itself as a modal, dialog or alert. Confining the user within the alert communicates the context to the screen reader user that there is a modal present
   - State: n/a

4. Test device settings

   - Text resize: Text can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/notifications/alert-dialog](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/notifications/alert-dialog)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test an alert dialog

GIVEN THAT I am on a screen with an alert dialog

1. Scenario: Test keyboard actions

   - WHEN I press the "TAB" key, an arrow key, or "CTRL+TAB" key 
      - THEN the focus should visibly move and remain confined within the alert dialog 
   - WHEN I press the "ESCAPE" key 
      - THEN the alert should close and the focus should return to the element that launched it or to a logical place 
   - WHEN I press the "SPACEBAR" key 
      - THEN any buttons or links within the alert should be activated on iOS and Android 
   - WHEN I press the "ENTER" key 
      - THEN any buttons or links within the alert should be activated on Android 

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate within the alert 
      - THEN the focus should move and remain confined within the alert 
   - WHEN I double-tap an interactive element within the alert 
      - THEN that element should be activated 
         - AND group-related functionality is not applicable (n/a) 

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader reads the alert dialog and its elements 
      - THEN the names of interactive elements (such as buttons) should follow button guidance and match their visible text 
         - AND the alert should identify its role as a "modal," "dialog," or "alert" as applicable 
         - AND confining the user within the alert should communicate its modal context to the screen reader 
         - AND state-related functionality is not applicable (n/a)

4. Scenario: Test device OS settings for text resize

   - WHEN the text resize setting is increased up to 200% 
      - THEN the text within the alert should remain readable without losing information or functionality 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/notifications/alert-dialog](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/notifications/alert-dialog)

## iOS Developer Notes
### General Notes

   - An alert gives users critcal information they need right away, usually appearing over an existing screen
   - Use native alerts when at all possible vs a custom element, as it will handle expected behavior without additional development effort
   - Options to close the alert for the screen reader user: 
      - A close button
      - Call To Action (CTA)
      - Tapping outside the alert to close **cannot** be the only option for screen reader users

### Name

   - Programmatic name describes the purpose of the alert.
   - For alerts and modals, the programmatic name is the title of the alert/modal.
   - If visible text label exists, the programmatic name should match the visible text label.
      - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.

#### UIKit

   - The visible label is the programmatic name of the alert.
   - If a visible label is not applicable in your case, set the alert's `accessibilityLabel` to the label of your choice.
      - To do this in Interface Builder, set the label using the Identity Inspector
   - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
   - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

#### SwiftUI

   - The visible label is the programmatic name of the alert.
   - If no visible label, use view modifier `accessibilityLabel(_:)`.
   - If button has icon(s), hide the icon(s) from VoiceOver by using view modifier `accessibilityHidden(true)`.

### Role

   - Required: Screen reader user is confined inside the alert, communicating an alert is present

#### UIKit

   - Use `UIAlertController` and add actions per your use case

#### SwiftUI

   - Use view modifier `alert(_:isPresented:presenting:actions:message:)`
   - If applicable, use view modifier `accessibilityRemoveTraits(:)` to remove unwanted traits. 

### Groupings

   - For a native app alert, do not modify native grouping logic

#### UIKit

   - Use `UIAlertController` grouping and ordering as is

#### SwiftUI

   - Use the native alert's grouping and ordering as is

### State 

   - Alerts that have an open/close state must be announced. Add logic and announcement to the programmatic name for the state
   - Usually no one button is disabled in native alerts.

#### UIKit 

   - When the focus lands on the alert's title, it is implied to the user that the alert is open.

#### SwiftUI

   - When the focus lands on the alert's title, it is implied to the user that the alert is open.

### Focus

   - Use the default focus functionality of the alert
   - The screen reader focus **must** be confined within the alert. When the alert appears, the initial focus should be to a logical place or to where the default focus is for the device within the alert.

#### UIKit

   - If needed, follow the below for focus management.
   - If VoiceOver is not reaching a particular element, set the element's `isAccessibilityElement` to `true`
      - **Note:** You may need to adjust the programmatic name, role, state, and/or value after doing this, as this action may overwrite previously configured accessibility.
   - To move screen reader focus to newly revealed content, use `UIAccessibility.post(notification:argument:)` that takes in `.screenChanged` and the newly revealed content as the parameter arguments.
   - To NOT move focus, but dynamically announce new content: use `UIAccessibility.post(notification:argument:)` that takes in `.announcement` and the announcement text as the parameter arguments.
   - `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements. 

#### SwiftUI

   - If needed, follow the below for focus management.
   - For general focus management that impacts both screen readers and non-screen readers, use the property wrapper `@FocusState` to assign an identity of a focus state.
      - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:)` to assign focus on a view with `@FocusState` as the source of truth.
      - Use the property wrapper `@FocusState`in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
   - If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.

### Announcement examples

   - Three separate focus areas
      - "Alert, title" (When alert appears with an audible ping)
      - "Body content"
      - "CTA, button"

## Android Developer Notes
### General Notes

   - An alert gives users ciritcal information they need right away, usually appearing over an existing screen
   - Use native alerts when at all possible vs a custom element, as it will handle expected behavior without additional development effort
   - Options to close the modal for the screen reader user: 
      - Two/three finger swipe
      - A close button
      - Call To Action (CTA)
      - Tapping outside the alert to close **cannot** be the only option for screen reader users

### Name

   - Programmatic name describes the purpose of the alert dialog
   - For alerts, the programmatic name is the title of the alert

#### Android Views

   - Use Android view component `AlertDialog` for the alert, its default accessibility behavior will cover the programmatic name by using the title text.

#### Jetpack Compose 

   - Use composable `AlertDialog` which uses the title as the programmatic name

### Role

   - Required: Screen reader user is confined inside an alert, communicating an alert is present.

#### Android Views

   - Android view component `AlertDialog` has the dialog role defined

#### Jetpack Compose

   - Composable `AlertDialog` has dialog role defined
   
### Groupings

   - If you are implementing a native app alert, do not modify native grouping logic
   - If you require a custom alert, follow the steps below.

#### Android Views

   - `ViewGroup`
   - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.

#### Jetpack Compose

   - `Modifier.semantics(mergeDescendants = true) {}` for the child elements grouping/merging
   - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State

   - Follow button state guidance if applicable

#### Android View

   - Active: `android:enabled=true`
   - Disabled: `android:enabled=false`

#### Jetpack Compose

   - Active: default state is active and enabled. Use `Button(enabled = true)` to specify explicitly
   - Disabled: `Button(enabled = false)` announces as "disabled"
   - Alternatively can use `modifier = Modifier.semantics { disabled() }` to announce as "disabled"

### Focus

   - Use the default focus functionality of the native app alert
   - The screen reader focus **must** be confined within the alert. When the alert appears, the initial focus should be to a logical place or to where the default focus is for the device within the alert

#### Android View

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

#### Jetpack Compose

   - `Modifier.focusTarget()` makes the component focusable
   - `Modifier.focusOrder()` needs to be used in combination with `FocusRequester` to define focus order
   - `Modifier.onFocusEvent()`, `Modifier.onFocusChanged()` can be used to observe the changes to focus state
   - `FocusRequester` allows to request focus to individual elements with in a group of merged descendant views
   - *Example:* To customize the focus events behaviour
      - step 1: define the focus requester prior. `val (first, second) = FocusRequester.createRefs()`
      - step 2: update the modifier to set the order. `modifier = Modifier.focusOrder(first) { this.down = second }`
      - focus order accepts following values: up, down, left, right, previous, next, start, end
      - step 3: use `second.requestFocus()` to gain focus

### Code Example

#### Jetpack Compose

```java
// Alert should not allow auto-dismiss on touching outside of the dialog view, a user action is required by displaying the Alert.
AlertDialog(
    onDismissRequest = {},
    title = { Text(text = "Title") },
    text = { Text(text = "Message") },
    confirmButton = { Button(onClick = { }) { Text(text = "Confirm") } },
    dismissButton = { Button(onClick = { }) { Text(text = "Cancel") } }
)
```

### Announcement examples - Announcements vary by device and version

   - TalkBack sometimes announces the entire alert altogether in one announcement while focus is on the CTA. 
   - "Title, body copy, CTA button, double tap to activate" 
   - Alerts can also be announced in several swipes, separating content:
      - Initial focus can be on the first element
      - "Title" (if any)
      - "Body copy"
      - "CTA button, double tap to activate"
