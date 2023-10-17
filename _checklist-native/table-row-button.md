---
layout: entry
title:  "Table row/list item"
categories: controls

keyboard:
  tab: |
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
  group: |
    Visible label (if any) is grouped or associated with the button in a single swipe
  state: |
    Expresses its state (disabled/dimmed)

settings:
  text resize: |
    Text can resize up to 200% without losing information
---

## General Notes
A table row/list item can be created by using different types of native components in iOS and Android, such as iOS `List`, `Button`, `UITableView` and Android `RecyclerView`, `Column`, and `LazyColumn`. 

In general, a table row/list item is an interactive item within a scrolling, single-column row or list of rows. The table row/list item can contain multiple elements inside it such as text, form inputs, buttons, etc. However, a table row/list item can also be a non-interactive element as well.

You should use a native component rather than custom component, because it will have the correct name, role, and values associated with it for accessibility.

## iOS
### Developer Notes on Name, Role, Groupings, and State
#### Name
The programmatic name describes the purpose of the control.

- If visible text label exists, the programmatic name should match the visible text label.
    - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.
- The visible label is the programmatic name
  - If there is a description following the visible label, it must be announced before the role.

**UIKit**
- If a visible label is not applicable in this case, set the button's `accessibilityLabel` to the label of your choice.
  - To do this in Interface Builder, set the label using the Identity Inspector
- To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
- To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

**SwiftUI**
- If no visible label, use view modifier `accessibilityLabel(_:)`.
- If button has icon(s), hide the icon(s) from VoiceOver by using view modifier `accessibilityHidden(true)`.

#### Role
When using non-native controls (custom controls), roles will need to be manually coded.

**UIKit**
- Implement a [`UITableView`](https://developer.apple.com/documentation/uikit/uitableview) which is defined as "A view that presents data using rows in a single column."
- If `UITableView` does not fit the use case, please use a `UIButton` and style as appropriate.
- Set the specific `UITableViewCell` as interactive or capable of a tap gesture.
- If user is redirected away from the app, set `accessibilityTraits` to `.link`.
- If user is redirected to a screen within the app, set `accessibilityTraits` to `.button`.

**SwiftUI**
- Use native [`List`](https://developer.apple.com/documentation/swiftui/list) view, defined as "A container that presents rows of data arranged in a single column, optionally providing the ability to select one or more members."
  - If using the `List` view is not suitable for your use case, you may implement as a `Button` and stylize the component as an interactable table row. Or you may make a fully custom table row from scratch that is interactable and redirects the user to the correct destination.
- If user is redirected away from the app, use view modifier `accessibilityAddTraits(.isButton)` to assign the role as Link.
- If user is redirected away from the app, use view modifier `accessibilityAddTraits(.isLink)` to assign the role as Link.
- If applicable, use view modifier `accessibilityRemoveTraits(:)` to remove unwanted traits.  

#### Groupings
- Group visible label with table row, if applicable, to provide a programmatic name for the table row.
- Group label with data to ensure reading order is logical. (Not label, label, data, data).

**UIKit**
1. Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
2. Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
- If frame does not exist due to custom table row, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
  - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
- Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
- Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.

**SwiftUI**
- Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.

#### State 
**UIKit**  
- For enabled: Set `isEnabled` to `true`.
- For disabled: Set `isEnabled` to `false`.
  - If necessary, you may change the accessibility trait of the table rows to `notEnabled`, but this may overwrite the current accessibility role of the table row.

**SwiftUI**
- For disabled, use view modifier `disabled()`.

#### Focus
- Use the device's default focus functionality. 
- Focus ring must surround the table row
- Consider how focus should be managed between child elements and their parent views.
- External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.
- Initial focus on a screen should land in a logical place, such as back button, screen title, first text field, or first heading.
- When a menu, picker, or modal is closed, the focus should return to the triggering element.

**UIKit**
- If VoiceOver is not reaching a particular element, set the element's `isAccessibilityElement` to `true`
  - **Note:** You may need to adjust the programmatic name, role, state, and/or value after doing this, as this action may overwrite previously configured accessibility.
- Use `accessibilityViewIsModal` to contain the screen reader focus inside the modal.
- To move screen reader focus to newly revealed content, use `UIAccessibility.post(notification:argument:)` that takes in `.screenChanged` and the newly revealed content as the parameter arguments.
- To NOT move focus, but dynamically announce new content: use `UIAccessibility.post(notification:argument:)` that takes in `.announcement` and the announcement text as the parameter arguments.
- `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements.  

**SwiftUI**
- For general focus management that impacts both screen readers and non-screen readers, use the property wrapper `@FocusState` to assign an identity of a focus state.
  - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:)` to assign focus on a view with `@FocusState` as the source of truth.
  - Use the property wrapper `@FocusState`in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
- If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.

#### Announcement examples
- "Label, button"  
- "Label, (plus other content in cell), button" (grouping)
- "Label, button, selected" (selected state)
- "Label, dimmed, button" (disabled state)

## Android
### Developer Notes on Name, Role, Groupings, and State
#### Name
- Name describes the purpose of the control and matches the visible label, which can all be grouped together in the table row in an accessibility label

#### Role
- Add header trait to table rows that describe a section if needed and do not make header row interactive

**Android View**
- Use an interactive [`RecyclerView`](https://developer.android.com/develop/ui/views/layout/recyclerview) which is used to display large datasets.
- Should be coded as a list, if more than one row

**Jetpack Compose**
- Use regular [`Column`](https://developer.android.com/reference/kotlin/androidx/compose/foundation/layout/package-summary#Column(androidx.compose.ui.Modifier,androidx.compose.foundation.layout.Arrangement.Vertical,androidx.compose.ui.Alignment.Horizontal,kotlin.Function1)) for a table row with short list
- Use [`LazyColumn`](https://developer.android.com/jetpack/compose/lists#lazy) for a long list of items
- For the row to behave as button role, use `modifier.clickable` with role of `role.Button`

#### Groupings
- Group text label/ images/controls together in one swipe
- Only one interactive control can be in the swipe    

**Android View**
- ViewGroup
- Set the container object's android:screenReaderFocusable attribute to true, and each inner object's android:focusable attribute to false. In doing so, accessibility services can present the inner elements' content descriptions/names, one after the other, in a single announcement.

**Jetpack Compose**
- In `item` or `items` composable of the table, the `modifier.clickable` with the role of button will group the internal components automatically.

#### State
**Android View**  
- Active: `android:enabled=true`
- Disabled" `android:enabled=false`

**Jetpack Compose**
- Active: `enabled=true`
- Disabled: `enabled=false`

#### Focus
- Only manage focus when needed. Primarily, let the device manage default focus.  
- Consider how focus should be managed between child elements and their parent views.

**Android View**
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

**Jetpack Compose**
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
- "Label, (plus other content in cell), double tap to activate" (grouping)
- "Selected, Label, double tap to activate" (selected state or row with a checkmark)
- "Label, dimmed" (disabled state)