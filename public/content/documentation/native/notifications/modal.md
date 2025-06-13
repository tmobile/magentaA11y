## General Notes

How to test a modal

## Videos

### iOS VoiceOver

<video controls>
  <source src="media/video/native/modal/modal_IosVoiceOver.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

### Android Talkback

<video controls>
  <source src="media/video/native/modal/modal_AndroidTalkback.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a modal

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Focus visibly moves to any interactive element
   - Escape: The modal closes and returns focus to the button that launched it
   - Space: Any buttons or links are activated on iOS and Android
   - Enter: Any buttons or links are activated on Android

2. Test mobile screenreader gestures

   - Swipe: Focus moves into the modal, confined within the modal
   - Doubletap: This typically activates most elements (alternative custom actions may be implemented)
   - Group: n/a

3. Listen to screenreader output on all devices

   - Name: The modal itself is not interactive. Any close button label should describe the close action
   - Role: Any CTA in the modal announces as a button
   - State: n/a

4. Test device settings

   - Text resize: Text can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/segmented-control](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/segmented-control)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a modal

GIVEN THAT I am on a screen with a modal

1. Scenario: Test keyboard actions

   - WHEN I press the "TAB" key, "ARROW" keys, or "CTRL+TAB" keys
        - THEN the focus should visibly move to any interactive element within the modal 
   - WHEN I press the "ESCAPE" key
        - THEN the modal should close
            - AND focus should return to the button that launched it
   - WHEN I press the "SPACEBAR" key
        - THEN any buttons or links should be activated on iOS and Android
   - WHEN I press the "ENTER" key
        - THEN any buttons or links should be activated on Android 

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate 
        - THEN focus should move into the modal and remain confined within it 
   - WHEN I double-tap an element 
        - THEN it should be activated unless an alternative custom action is implemented 

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader is active 
        - THEN the modal itself should not be announced as interactive 
            - AND any close button label should clearly describe the close action 
            - AND any call-to-action (CTA) elements within the modal should be announced as a button 

4. Scenario: Test device OS settings for text resize

   - WHEN I have increased text size in device settings
        - THEN text should resize up to 200% without losing information 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/segmented-control](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/segmented-control)

## iOS Developer Notes
### General Notes

- Modal dialogs draw attention to an important, narrowly scoped task, usually appearing over an existing screen
- Options to close the modal for the screen reader user:
   - An invisible close button announced for the screen reader only
   - A close button
   - A Call To Action (CTA) that navigates the user and closes the modal
- Tapping outside the modal to close **cannot** be the only option for screen reader users when the modal covers other content

### Name

- Programmatic name describes the purpose of any interactive element in the modal or the title of the modal
- If visible text label exists, the programmatic name should match the visible text label.
   - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognition
   
#### UIKit

- The visible label for any interactive element is the programmatic name for it.
- If a visible label is not applicable in your case, set the modal's `accessibilityLabel` to the label of your choice.
   - To do this in Interface Builder, set the label using the Identity Inspector
- To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
- To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

#### SwiftUI

- The visible label for any interactive element is the programmatic name for it
- If no visible label, use view modifier `accessibilityLabel(_:)`

### Role

- Required: Screen reader user is confined inside the modal, communicating a modal is present

#### UIKit

- Set the `modalPresentationStyle` of the `UIViewController` to a `UIModalPresentationStyle` of your choice

#### SwiftUI

- Use view modifier for modal, such as `.sheet`, `.fullScreenCover`, `.popover`. Apply view modifiers to adjust the size of the modal accordingly.

### Groupings

- Group content to minimize swipes and give context to the user

#### UIKit

- Since a modal is a presentation of another view, follow logical grouping and reading order within the view.
   - Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
   - Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
- If frame does not exist due to custom alert, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
   - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
- Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
- Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.

#### SwiftUI

- Since a modal is a presentation of another view, follow logical grouping and reading order within the view.
- Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.

### State 

- Modals that may have an open/close or expands/collapses state must be announced. Add logic and announcement to the programmatic name for the state

#### UIKit

- When the modal appears, the initial focus on the Close button will imply to the user that they are in a modal.
- For disabled content within the modal: Set the content's `isEnabled` to `false`. Announcement for disabled is "Dimmed".

#### SwiftUI

- When the modal appears, the initial focus on the Close button will imply to the user that they are in a modal.
- For disabled content, use view modifier `disabled()`.

### Focus

- Use the default focus functionality of the modal
- The screen reader focus **must** be confined within the alert or modal. When the modal appears, the initial focus should be to a logical place or to where the default focus is for the device within the modal.
- Within the modal, ensure the content is following logical reading order. Follow suggested accessibility guidance for content containing buttons, links, etc.

#### UIKit

- If VoiceOver is not reaching a particular element, set the element's `isAccessibilityElement` to `true`
   - **Note:** You may need to adjust the programmatic name, role, state, and/or value after doing this, as this action may overwrite previously configured accessibility.
- Use `accessibilityViewIsModal` to contain the screen reader focus inside the modal.
- To move screen reader focus to newly revealed content, use `UIAccessibility.post(notification:argument:)` that takes in `.screenChanged` and the newly revealed content as the parameter arguments.
- To NOT move focus, but dynamically announce new content: use `UIAccessibility.post(notification:argument:)` that takes in `.announcement` and the announcement text as the parameter arguments.
- `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements. 

#### SwiftUI

- For general focus management that impacts both screen readers and non-screen readers, use the property wrapper `@FocusState` to assign an identity of a focus state.
   - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:)` to assign focus on a view with `@FocusState` as the source of truth.
   - Use the property wrapper `@FocusState`in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
- If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.

### Modal announcements

Initial focus areas:
- Close button "Close, button" or
- Invisible button at the top of the screen default announcement: "Double tap to close modal"

## Android Developer Notes
### General Notes

- Modal dialogs draw attention to an important, narrowly scoped task, usually appearing over an existing screen
- Options to close the modal for the screen reader user: 
   - An invisible close button announced for the screen reader only
   - Two/three finger swipe
   - A close button
   - A Call To Action (CTA) that navigates the user and closes the modal
- Tapping outside the modal to close can not be the only option for screen reader users when the modal covers other content

### Name

- Programmatic name describes the purpose of the modal or any interactive element

#### Android Views

- Use Android view component `AlertDialog` for the modal, its default accessibility behavior will cover the programmatic name by using the title text.

#### Jetpack Compose 

- Use composable `AlertDialog`, `ModalBottomSheet` or other native composable as modal. A title view need to used as the programmatic name.

### Role

- Required: Screen reader user is confined inside a modal, communicating an modal is present.

#### Android Views

- Android view component `AlertDialog` has the dialog role defined for using as modal

#### Jetpack Compose 

- Composable `AlertDialog` has default role defined
- Composable `ModalBottomSheet` has default role defined

### Groupings

- If you are implementing a native app modal, do not modify native grouping logic
- If you require a custom modal, follow the steps below.

#### Android Views

- `ViewGroup`
- Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.

#### Jetpack Compose 

- `Modifier.semantics(mergeDescendants = true) {}` for the child elements grouping/merging
- `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State

- Follow button state guidance if applicable
- Modals that have an open/close or expands/collapses state must be announced. Add logic and announcement to the programmatic name for the state

#### Android Views

- Active: `android:enabled=true`
- Disabled: `android:enabled=false`

#### Jetpack Compose

- Active: default state is active and enabled. Use `Button(enabled = true)` to specify explicitly
- Disabled: `Button(enabled = false)` announces as "disabled"
- Alternatively can use `modifier = Modifier.semantics { disabled() }` to announce as "disabled"

### Focus

- Use the default focus functionality of the modal
- The screen reader focus **must** be confined within the modal. When the modal appears, the initial focus should be to a logical place or to where the default focus is for the device within the modal
- Android initially focuses on the CTA ("Close" button) in the modal, not the text or title unless the close CTA is not designed at the first focus order in modal
- Android often takes one swipe to bring focus inside the modal

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
// Use AlerDialog as Modal with onDismissRequest action that enable dialog dismiss when user touch outside the dialog modal
AlertDialog(
    onDismissRequest = { onDismiss(true) },
    title = { Text(text = "Title") },
    text = { Text(text = "Message") },
    confirmButton = { Button(onClick = { }) { Text(text = "Confirm") } },
    dismissButton = { Button(onClick = { }) { Text(text = "Cancel") } }
)
// Example on using ModalBottomSheet as Modal
ModalBottomSheet(
    onDismissRequest = { openBottomSheet = false },
    sheetState = bottomSheetState,
    windowInsets = windowInsets
) {
    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.Center) {
        Button(
          onClick = {
              scope.launch { bottomSheetState.hide() }.invokeOnCompletion {
                  if (!bottomSheetState.isVisible) {
                      openBottomSheet = false
                  }
              }
            }
        ) {
            Text("Close")
        }
    }
}
```

### Modal announcements

Initial focus area example: 
 - Close button "Close, button, double tap to activate"
