---
layout: entry
title:  "Alert Dialog"
categories: notifications

keyboard:
  tab or arrow keys: |
    Focus visibly moves, confined within the dialog
  escape: |
    The dialog closes and returns focus to the button that launched it
  space: |
    Any buttons or links are activated on iOS and Android
  enter: |
    Any buttons or links are activated on Android

mobile:
  swipe: |
    Focus moves, confined within the dialog
  doubletap: |
    This typically activates most elements (alternative custom actions may be implemented)
  group: |
    n/a
    
screenreader:
  name:  |
    The dialog describes its purpose or title if any (On launch with iOS. Often with first swipe on Android or intial focus is on CTA)
  role:  |
    May identify itself as a modal, dialog, drawer, sidebar, panel, popover, menu or alert. Confining the user within the modal communicates the context to the screen reader user that there is a modal present
  state: |
    When open, other content is inert. Expands/collapses, closes/opens states are typically announced for a menu, drawer, sidebar, panel or popover

settings:
  text resize: |
    Text can resize up to 200% without losing information
---


## Native Element

- Modal dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks, usually appearing over an existing screen
- Use native alerts when at all possible vs a custom element, as it will handle expected behavior without additional development effort
- Options to close the modal for the screen reader user:  
  - An invisible close button announced for the screen reader only, which can be in the swipe order after the last menu item
  - Two/three finger swipe
  - A close button
- Drawers usually have a handle or button to be focused by the screen reader to expand and collapse them. Tapping outside the modal to close can not be the only option for screen reader users

## iOS

### Name
- Programmatic name describes the purpose of the alert.
- For alerts and modals, the programmatic name is the title of the alert/modal.
- If visible text label exists, the programmatic name should match the visible text label.
    - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.

- **UIKit**
  - The visible label is the programmatic name of the alert.
  - If a visible label is not applicable in your case, set the alert's `accessibilityLabel` to the label of your choice.
    - To do this in Interface Builder, set the label using the Identity Inspector
  - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
  - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.
- **SwiftUI**
  - The visible label is the programmatic name of the alert.
  - If no visible label, use view modifier `accessibilityLabel(_:)`.
  - If button has icon(s), hide the icon(s) from VoiceOver by using view modifier `accessibilityHidden(true)`.

### Role
- Required: Screen reader user is confined inside the alert, communicating an alert is present

- **UIKit**
  - Use `UIAlertController` and add actions per your use case
- **SwiftUI**
  - Use view modifier `alert(_:isPresented:presenting:actions:message:)`
  - If applicable, use view modifier `accessibilityRemoveTraits(:)` to remove unwanted traits.  

### Groupings
- For a native alert, do not modify native grouping logic

- **UIKit**
  - Use `UIAlertController` grouping and ordering as is
- **SwiftUI**
  - Use the native alert's grouping and ordering as is

### State 
- Alerts that have an open/close state must be announced. Add logic and announcement to the programmatic name for the state
- Usually no one button is disabled in native alerts.

- **UIKit**  
  - When the focus lands on the alert's title, it is implied to the user that the alert is open.
- **SwiftUI**
  - When the focus lands on the alert's title, it is implied to the user that the alert is open.

### Focus
- Use the default focus functionality of the alert
- The screen reader focus **must** be confined within the alert. When the alert appears, the initial focus should be to a logical place or to where the default focus is for the device within the alert.

- **UIKit**
  - If needed, follow the below for focus management.
  - If VoiceOver is not reaching a particular element, set the element's `isAccessibilityElement` to `true`
    - **Note:** You may need to adjust the programmatic name, role, state, and/or value after doing this, as this action may overwrite previously configured accessibility.
  - To move screen reader focus to newly revealed content, use `UIAccessibility.post(notification:argument:)` that takes in `.screenChanged` and the newly revealed content as the parameter arguments.
  - To NOT move focus, but dynamically announce new content: use `UIAccessibility.post(notification:argument:)` that takes in `.announcement` and the announcement text as the parameter arguments.
  - `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements.  
- **SwiftUI**
  - If needed, follow the below for focus management.
  - For general focus management that impacts both screen readers and non-screen readers, use the property wrapper `@FocusState` to assign an identity of a focus state.
    - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:)` to assign focus on a view with `@FocusState` as the source of truth.
    - Use the property wrapper `@FocusState`in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
  - If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.

### Native Alert announcement examples
- Three separate focus areas
    - "alert, title" when alert appears with an audible ping.
    - "Body content"
    - "CTA, button"

## Android

### Name
- Programmatic name describes the purpose of the alert dialog
- For alerts, the programmatic name is the title of the alert.

- **Android Views**
  - Use Android view component `AlertDialog` for the alert, its default accessibility behavior will cover the programmatic name by using the title text.
- **Android Compose** 
  - Use composable `AlertDialog` which uses the title as the programmatic name

### Role
- Required: Screen reader user is confined inside an alert, communicating an alert is present.

- **Android Views**
  - Android view component `AlertDialog` has the dialog role defined
- **Android Compose** 
  - Composable `AlertDialog` has dialog role defined

### Groupings
- If you are implementing a native alert, do not modify native grouping logic
- If you require a custom alert, follow the steps below.

- **Android Views**
  - `ViewGroup`
  - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.
- **Android Compose** 
  - `Modifier.semantics(mergeDescendants = true) {}` for the child elements grouping/merging
  - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State
- Follow button state guidance if applicable
- **Android View**  
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`
- **Android Compose**
  - Active: default state is active and enabled. Use `Button(enabled = true)` to specify explicitly
  - Disabled:  `Button(enabled = false)` announces as disabled
  - Alternatively can use `modifier = Modifier.semantics { disabled() }` to announce as disabled

### Focus
- Use the default focus functionality of the native alert
- The screen reader focus **must** be confined within the alert. When the alert appears, the initial focus should be to a logical place or to where the default focus is for the device within the alert

- **Android View**
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
- **Android Compose**
  - `Modifier.focusTarget()` makes the component focusable
  - `Modifier.focusOrder()` needs to be used in combination with FocusRequesters to define focus order
  - `Modifier.onFocusEvent()`, `Modifier.onFocusChanged()` can be used to observe the changes to focus state
  - `FocusRequester` allows to request focus to individual elements with in a group of merged descendant views
  - *Example:* To customize the focus events behaviour
      - step 1: define the focus requester prior. `val (first, second) = FocusRequester.createRefs()`
      - step 2: update the modifier to set the order. `modifier = Modifier.focusOrder(first) { this.down = second }`
      - focus order accepts following values: up, down, left, right, previous, next, start, end
      - step 3: use `second.requestFocus()` to gain focus

### Code Example
- **Android Compose**
{% highlight kotlin %}
// Alert should not allow auto-dismiss on touching outside of the dialog view, a user action is required by displaying the Alert.
AlertDialog(
    onDismissRequest = {},
    title = { Text(text = "Title") },
    text = { Text(text = "Message") },
    confirmButton = { Button(onClick = { }) { Text(text = "Confirm") } },
    dismissButton = { Button(onClick = { }) { Text(text = "Cancel") } }
)
{% endhighlight %}

### Announcement examples - Announcements vary by device
- "Title, body copy, CTA button, double tap to activate"  TalkBack often announces the entire alert altogether in one announcement while focus is on the CTA.
-  Alerts can also be announced in several swipes, separating content.
    - "Title"
    - "Body copy"
    - "CTA button, double tap to activate" 
