---
layout: entry
title:  "Dropdown"
categories: controls

keyboard:
  tab, arrow keys or Ctl+tab: |
      Focus visibly moves to the Dropdown
  spacebar: |
      Selects and opens the Dropdown on iOS and Android
  enter: |
      Selects and opens the Dropdown on Android
        
mobile:
  swipe: |
      Focus moves to the element, expresses its name, role, value & state (if applicable)
  doubletap: |
     Selects and opens Dropdown

screenreader:
  name:  |
      Purpose is clear and matches any visible label
  role:  |
      Identifies itself as a button in iOS and "double tap to activate" in Android
  group: |
      Visible label is grouped or associated with the Dropdown in a single swipe
  state: |
      Expresses its state (disabled/dimmed)

settings:
  text resize: |
    Text can resize up to 200% without losing information
---

## Developer notes

### Name
- Programmatic name describes the purpose of the control.
- The visible text must be grouped with the dropdown menu.
- If visible text label exists, the programmatic name should match the visible text label.
    - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.

- **UIKit**
  - You can programmatically set the visible label with `setTitle()`.
    - The button’s title will overwrite the button’s `accessibilityLabel`.
  - If a visible label is not applicable in this case, set the button's `accessibilityLabel` to the label of your choice.
    - To do this in Interface Builder, set the label using the Identity Inspector
  - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
  - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.
- **SwiftUI**
  - If no visible label, use view modifier `accessibilityLabel(_:)`.
  - If button has icon(s), hide the icon(s) from VoiceOver by using view modifier `accessibilityHidden(true)`.

### Role
- When using non-native controls (custom controls), roles will need to be manually coded. Otherwise in native controls, they are automatically assigned.
- Since a dropdown menu is interactive, it must be indicated to the user that they are interactive such as indicating that it is a button or it can be double-tapped to be selected. 

- **UIKit**
  - A dropdown menu does not come native in UIKit, so implementing one requires some extra manual work to emulate the functionality and appearance of a traditional dropdown menu.
    - There are a few common strategies in creating a custom dropdown menu, such as using a `UITableView` and/or `UIStackView`, which appears and behaves like a menu when the user opens the dropdown menu.
- **SwiftUI**
  - Use native `Picker` view, but there must extra development to make the interactive field have an appearance of a traditional dropdown menu.

### Groupings
- The title and dropdown menu are grouped together. Double-tapping the dropdown menu will open the menu.
- Each dropdown menu item and its children are grouped together
- Ensure logical reading order

- **UIKit**
  1. Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
  2. Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
  - If frame does not exist due to custom menu, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
    - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
  - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
  - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.
- **SwiftUI**
  - Native `Picker` views are accessible by default. However, if applicable, the interactive field that opens the dropdown menu must be implemented in a manner that is accessible, such as having a programmatic name, value, and role.
  - If necessary, use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.

### State
- The state of the dropdown menu must be announced (i.e. expands/collapses, opens/closes). Add logic and announcements to the programmatic name for the state.

- **UIKit**
  - If applicable, dropdown menu items should be announced whether they are selected/unselected. 
  - For enabled menu items: Set `isEnabled` to `true`.
  - For disabled menu items: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
    - If necessary, you may change the accessibility trait of the menu item to `notEnabled`, but this may overwrite the current accessibility role of the menu item.
- **SwiftUI**
  - If applicable, dropdown menu items should be announced whether they are selected/unselected. 
  - For selected menu items, use `accessibilityAddTraits(.isSelected)`.
  - For disabled menu items, use view modifier `disabled()`.

### Focus
- Use the device's default focus functionality. 
- Focus should be confined within the dropdown menu, which can include the button that opened it, if content underneath is hidden.
- External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.
- When a dropdown menu is closed, the focus should return to the triggering element
- An invisible close button can be implemented to close the dropdown menu. Ensure this button is in the swipe order, if implemented. Double-tapping the triggering element also suffices.

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

## Android

### Developer notes

### Name
- Name describes the purpose of the control, with additional label description if needed.

- **Android Views**
  - `android:text` XML attribute
  - Use `contentDescription`, depending on type of view and for elements (icons) without a visible label
  - `contentDescription` overrides `android:text`
  - Use `labelFor` attribute to associate the visible label with the control
- **Jetpack Compose**
  - Compose uses semantics properties to pass information to accessibility services
  - The built-in `ExposedDropdownMenuBox`, `ExposedDropdownMenu` and `DropdownMenuItem` components will fill the semantics properties with information inferred from the composable by default
  - Optional: use `contentDescription` for a more descriptive name to override the default text label of the `DropdownMenuItem` composable
  - Example specification of contentDescription in compose: `modifier = Modifier.semantics { contentDescription = "" }`

### Role
- Required: Screen reader user is confined inside a dropdown when it opens
- When not using native controls (custom controls), roles will need to be manually coded.
- **Android Views**
  - `Spinner` Class
  - "pop up window" or "dropdown list" can be the role  
- **Jetpack Compose**
  - `ExposedDropdownMenuBox`, `ExposedDropdownMenu`, `DropdownMenuItem`

### Groupings
- Visible label, if any, is grouped with the dropdown item in a single swipe
- Group label with data to ensure reading order is logical. (Not label, label, data, data)

- **Android Views**
  - `ViewGroup`
  - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.

- **Jetpack Compose**
  - When use built-in Composable `DropdownMenuItem`, `ExposedDropdownMenu` in `ExposedDropdownMenuBox`, then it has the default grouping with the elements inside.
  - Use `Modifier.semantics(mergeDescendants = true) {}` when work on the customized dropdown items
  - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State
- **Android Views**
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`. Announcement: disabled
- **Jetpack Compose**
  - Active: default state is active and enabled. Use `DropdownMenuItem(enabled = true)` to specify explicitly
  - Disabled:  `DropdownMenuItem(enabled = false)` announces as disabled
  - Alternatively can use `modifier = Modifier.semantics { disabled() }` to announce as disabled
  - Use `modifier = Modifier.semantics { stateDescription = "" }` to have a customized state announcement

### Focus
- Only manage focus when needed. Primarily, let the device manage default focus
- Consider how focus should be managed between child elements and their parent views
- External keyboard tab order often follows the screen reader focus, but sometimes needs focus management
- Moving focus into the dropdown tells the screen reader user there is a dropdown available
- When a dropdown is closed, the focus should return to the triggering element.

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
  
### Code Example
- **Jetpack Compose**
{% highlight kotlin %}
val items = listOf("Item 1", "Item 2", "Item 3")
var expanded by remember { mutableStateOf(false) }
var selectedItemText by remember { mutableStateOf(items[0]) }
ExposedDropdownMenuBox(
    expanded = expanded,
    onExpandedChange = { expanded = !expanded },
) {
    TextField(
        // The `menuAnchor` modifier must be passed to the text field for correctness.
        modifier = Modifier.menuAnchor(),
        readOnly = true,
        value = selectedItemText,
        onValueChange = {},
        label = { Text("Label") },
        trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded) },
        colors = ExposedDropdownMenuDefaults.textFieldColors(),
    )
    ExposedDropdownMenu(
        expanded = expanded,
        onDismissRequest = { expanded = false },
    ) {
        items.forEach { selectionOption ->
            DropdownMenuItem(
                text = { Text(selectionOption) },
                onClick = {
                    selectedItemText = selectionOption
                    expanded = false
                },
                contentPadding = ExposedDropdownMenuDefaults.ItemContentPadding
            )
        }
    }
}
{% endhighlight %}

### Announcement examples
