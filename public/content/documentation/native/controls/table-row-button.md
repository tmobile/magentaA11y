## General Notes

How to test a table row button / list item

## Videos

### iOS VoiceOver

<video controls>
  <source src="media/video/native/table-row-button/table-row-button_IosVoiceOver.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback

<video controls>
  <source src="media/video/native/table-row-button/table-row-button_AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a table row button / list item

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Focus visibly moves to the row/blade, if interactive
   - Spacebar: Activates the row/blade on iOS and Android
   - Enter: Activates the row/blade on Android

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the element, expresses its state, if applicable
   - Doubletap: Activates the row/blade

3. Listen to screenreader output on all devices

   - Name: Purpose is clear and matches the visible label
   - Role: Identifies as a button in iOS and "double tap to activate" in Android
   - Group: Visible label (if any) is grouped or associated with the button in a single swipe
   - State: Expresses its state (disabled/dimmed)

4. Test device settings

   - Text resize: Text can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/table-row-button](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/table-row-button)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a table row button / list item

GIVEN THAT I am on a screen with a table row button / list item

1. Scenario: Test keyboard actions

   - WHEN I press the "TAB" key 
      - THEN the focus should visibly move to the row or blade if it is interactive 
   - WHEN I press the "SPACEBAR" key 
      - THEN the row or blade should be activated on iOS and Android 
   - WHEN I press the "ENTER" key 
      - THEN the row or blade should be activated on Android 

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate to the row or blade 
      - THEN the focus should move to the row or blade 
         - AND its state should be expressed if applicable 
   - WHEN I double-tap the row or blade 
      - THEN the row or blade should be activated 

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader reads the row or blade 
      - THEN its name should clearly describe its purpose and match the visible label 
         - AND its role should be identified as "button" in iOS 
         - AND on Android, it should instruct "double tap to activate" 
         - AND the visible label (if any) should be grouped or associated with the button in a single swipe 
         - AND its state (DISABLED or DIMMED) should be expressed if applicable 

4. Scenario: Test device OS settings for text resize

   - WHEN the text resize setting is increased up to 200% 
      - THEN the text within the row or blade should remain readable without losing information or functionality 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/table-row-button](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/table-row-button)

## iOS Developer Notes
### General Notes
   - This entry describes the native app table row/list item component but does not address text-based ordered or unordered lists. Text-based ordered or unordered lists should not be identified as a defect found in native app platforms as there is not an equivalent component in the native app space.

### Developer Notes

   - A table row/list item can be created by using different types of native components in iOS, such as iOS `List`, `Button`, `UITableView` 
   - In general, a table row/list item can be a single interactive row or an interactive item within a scrolling, single-column row or list of rows. The table row/list item can contain multiple elements inside it such as text, images, icons, form inputs, buttons, etc.
   - However, a table row/list item can also be a non-interactive element as well.
   - Generally, all items in the row are grouped together, ie., the caret is not focused separately
   - If there are two interactive elements, there will be two focusable areas.
   - Often, the first focus is around the whole row, but will activate only the first interactive element
   - You should use a native component rather than custom component, because it will have the correct name, role, and values associated with it for accessibility.

#### Name

The programmatic name describes the purpose of the control.

   - If visible text label exists, the programmatic name should match the visible text label.
      - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.
   - The visible label is the programmatic name
      - If there is a description following the visible label, it must be announced before the role.

   - **UIKit**

      - If a visible label is not applicable in this case, set the button's `accessibilityLabel` to the label of your choice.
         - To do this in Interface Builder, set the label using the Identity Inspector
      - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
      - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

   - **SwiftUI**

      - If no visible label, use view modifier `accessibilityLabel(_:)`.
      - If button has icon(s), hide the icon(s) from VoiceOver by using view modifier `accessibilityHidden(true)`.

#### Role

When using non-native controls (custom controls), roles will need to be manually coded.

   - **UIKit**

      - Implement a [`UITableView`](https://developer.apple.com/documentation/uikit/uitableview) which is defined as "A view that presents data using rows in a single column."
      - If `UITableView` does not fit the use case, please use a `UIButton` and style as appropriate.
      - Set the specific `UITableViewCell` as interactive or capable of a tap gesture.
      - If user is redirected away from the app, set `accessibilityTraits` to `.link`.
      - If user is redirected to a screen within the app, set `accessibilityTraits` to `.button`.

   - **SwiftUI**

      - Use native [`List`](https://developer.apple.com/documentation/swiftui/list) view, defined as "A container that presents rows of data arranged in a single column, optionally providing the ability to select one or more members."
         - If using the `List` view is not suitable for your use case, you may implement as a `Button` and stylize the component as an interactable table row. Or you may make a fully custom table row from scratch that is interactable and redirects the user to the correct destination.
      - If user is redirected away from the app, use view modifier `accessibilityAddTraits(.isButton)` to assign the role as Link.
      - If user is redirected away from the app, use view modifier `accessibilityAddTraits(.isLink)` to assign the role as Link.
      - If applicable, use view modifier `accessibilityRemoveTraits(:)` to remove unwanted traits. 

#### Groupings

   - Group text label/ images/controls together in one swipe
   - Only one interactive control can be in the swipe 

   - **UIKit**

      - Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
      - Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
         - If frame does not exist due to custom table row, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
            - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
         - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
         - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.

   - **SwiftUI**

      - Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.

#### State 

   - **UIKit** 

      - For enabled: Set `isEnabled` to `true`.
      - For disabled: Set `isEnabled` to `false`.
         - If necessary, you may change the accessibility trait of the table rows to `notEnabled`, but this may overwrite the current accessibility role of the table row.

   - **SwiftUI**

      - For disabled, use view modifier `disabled()`

#### Focus

   - Use the device's default focus functionality. 
   - Focus ring must surround the table row
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

#### Announcement examples

   - "Label, button" 
   - "Label, (plus other content in cell), button" (grouping - all in one focusable area)
   - "Label, button, selected" (selected state)
   - "Label, dimmed, button" (disabled state)


## Android Developer Notes
### General Notes

   - A table row/list item can be created by using different types of native components in Android, such as `RecyclerView`, `Column`, and `LazyColumn`. 
   - In general, a table row/list item can be a single interactive row or an interactive item within a scrolling, single-column row or list of rows. The table row/list item can contain multiple elements inside it such as text, images, icons, form inputs, buttons, etc.
   - However, a table row/list item can also be a non-interactive element as well
   - Generally, all items in the row are grouped together, ie., the caret is not focused separately
   - If there are two interactive elements, there will be two focusable areas
   - Often, the first focus is around the whole row, but will activate only the first interactive element
   - You should use a native component rather than custom component, because it will have the correct name, role, and values associated with it for accessibility.

#### Name

   - Name describes the purpose of the control and matches the visible label, which can all be grouped together in the table row in an accessibility label

#### Role

   - Add header trait to table rows that describe a section if needed, usually not interactive

   - **Android View**

      - Use an interactive [`RecyclerView`](https://developer.android.com/develop/ui/views/layout/recyclerview) which is used to display large datasets.
      - Should be coded as a list, if more than one row

   - **Jetpack Compose**

      - Use regular [`Column`](https://developer.android.com/reference/kotlin/androidx/compose/foundation/layout/package-summary#Column(androidx.compose.ui.Modifier,androidx.compose.foundation.layout.Arrangement.Vertical,androidx.compose.ui.Alignment.Horizontal,kotlin.Function1)) for a table row with short list
      - Use [`LazyColumn`](https://developer.android.com/jetpack/compose/lists#lazy) for a long list of items
      - For the row to behave as button role, use `modifier.clickable` with role of `role.Button`

#### Groupings

   - Group text label/ images/controls together in one swipe
   - Only one interactive control can be in the swipe 

   - **Android View**

      - `ViewGroup`
      - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' content descriptions/names, one after the other, in a single announcement.

   - **Jetpack Compose**

      - In `item` or `items` composable of the table, the `modifier.clickable` with the role of button will group the internal components automatically.

#### State

   - **Android View** 

      - Active: `android:enabled=true`
      - Disabled" `android:enabled=false`

   - **Jetpack Compose**

      - Active: `enabled=true`
      - Disabled: `enabled=false`

#### Focus

   - Use the device's default focus functionality. 
   - Focus ring must surround the table row
   - Consider how focus should be managed between child elements and their parent views.
   - External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.

   - **Android View**

      - `android:focusable=true`
      - `android=clickable=true`
      - Implement an `onClick()` event handler for keyboard, not `onTouch()`
      - `nextFocusDown`
      - `nextFocusUp`
      - `nextFocusRight`
      - `nextFocusLeft`
      - `accessibilityTraversalBefore` (or after)
      - To move screen reader focus to newly revealed content: `Type_View_Focused`
      - To NOT move focus, but announce new content: `accessibilityLiveRegion`
      - To hide controls: `Important_For _Accessibility_NO`

   - **Jetpack Compose**

      - `Modifier.focusTarget()` makes the component focusable
      - `Modifier.focusOrder()` needs to be used in combination with FocusRequesters to define focus order
      - `Modifier.onFocusEvent()`, `Modifier.onFocusChanged()` can be used to observe the changes to focus state
      - `FocusRequester` allows to request focus to individual elements with in a group of merged descendant views
      - *Example:* To customize the focus events behaviour
         - step 1: define the focus requester prior. `val (first, second) = FocusRequester.createRefs()`
         - step 2: update the modifier to set the order. `modifier = Modifier.focusOrder(first) { this.down = second }`
         - focus order accepts following values: up, down, left, right, previous, next, start, end
         - step 3: use `second.requestFocus()` to gain focus

#### Announcement examples

   - "Label, double tap to activate"
   - "Label, (plus other content in cell), double tap to activate" (grouping - all in one focusable area)
   - "Selected, Label, double tap to activate" (selected state or row with a checkmark)
   - "Label, dimmed" (disabled state)
