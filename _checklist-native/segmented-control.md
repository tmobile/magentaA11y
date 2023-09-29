---
layout: entry
title:  "Segmented Control / Tab"
categories: controls

keyboard:
  tab, arrow keys or Ctl+tab: |
    Focus visibly moves to the button
  arrow keys: |
    Navigate through group
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
    Expresses its state (selected/disabled/dimmed)

settings:
  text resize: |
    This element is exempt from text resizing requirements
---

## Developer notes

- A segmented control is a horizontal set of two or more segments presented, each of which functions as a mutually exclusive button

### Name
- A programmatic name is assigned to each segment title
- If visible text label exists, the programmatic name should match the visible text label.
    - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.

- **UIKit**
  - You can programmatically set the visible label with `setTitle()`.
    - The segment's title will overwrite the segment’s `accessibilityLabel`.
  - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
  - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.
- **SwiftUI**
  - By default, the programmatic name is the visible text label of the segment
  - If necessary, use view modifier `accessibilityLabel(_:)`.
  - If a segment has icon(s), hide the icon(s) from VoiceOver by using view modifier `accessibilityHidden(true)`.

### Role
- Since picker items are interactive, it must be indicated to the user that they are interactive such as indicating that it is a button or it can be double-tapped to be selected. 

- **UIKit**
  - Use `UISegmentedControl`
- **SwiftUI**
  - Use native `Picker` view
  - Use `SegmentedPickerStyle`

### Groupings
- N/A

- **UIKit**
  - Follow native grouping and order
- **SwiftUI**
  - Follow native grouping and order

### State
- A state of the individual segments themselves are announced, which is either "Selected" or "Unselected"
- The position of the segment out of the entire set must be announced.

- **UIKit**
  - Segments should be announced whether they are selected/unselected.
  - For disabled menu items: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
    - If necessary, you may change the accessibility trait of the menu item to `notEnabled`, but this may overwrite the current accessibility role of the segmented control.
- **SwiftUI**
  - By default, the "selected" state is announced and the position of the segment out of the set.
  - For disabled, use view modifier `disabled()`.

### Focus
- Use the device's default focus functionality. 
- Focus should be confined within the segmented control
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

### Announcement examples
- Options for announcements below depend on framework and versions. Announcement order can vary.  "Menu" in label is optional, but recommended.

- "Label menu, button"
- "Label, button"  (without recommended "menu" announcement)
- "Label menu, dimmed, button" (disabled state)
- "Dismiss context menu, button" (Invisible button in swipe past the last item in menu)

## Android

### Developer notes

- A menu is a container for a list of items
- Use native menus when at all possible vs a custom element, as it will handle expected behavior without additional development effort
- Options to close the menu for the screen reader user:
  - An invisible close button announced for the screen reader only, can be in the swipe order after the last menu item
  - Two/three finger swipe to close
  - A close button
  - Swiping back to the element that opened menu
- If menu hides content underneath it, the screen reader focus should be confined within the menu.
- Tapping outside the menu to close cannot be the only option for screen reader users

### Name
- Name describes the purpose of the control (Ex: opens settings menu or closes menu), with additional label description if needed.

- **Android Views**
  - `android:text` XML attribute
  - Use `contentDescription`, depending on type of view and for elements (icons) without a visible label
  - `contentDescription` overrides `android:text`
  - Use `labelFor` attribute to associate the visible label with the control
- **Jetpack Compose**
  - Compose uses semantics properties to pass information to accessibility services
  - The built-in `DropdownMenuItem` composable will fill the semantics properties with information inferred from the composable by default
  - Optional: use `contentDescription` for a more descriptive name to override the default text label of the `DropdownMenuItem` composable
  - Example specification of contentDescription in compose: `modifier = Modifier.semantics { contentDescription = "" }`

### Role
- Required: Screen reader user is confined inside a menu, communicating a modal is present if hiding content underneath it
- When not using native controls (custom controls), roles will need to be manually coded.
- **Android Views**
  - `android.view.Menu`
- **Jetpack Compose**
  - `DropdownMenu`, `ExposedDropdownMenuBox`

### Groupings
- Visible label, if any, is grouped with the menu button in a single swipe
- Group label with data to ensure reading order is logical. (Not label, label, data, data)

- **Android Views**
  - `ViewGroup`
  - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.
- **Jetpack Compose**
  - When use built-in Composable `DropdownMenuItem` in `DropdownMenu`, then it has the default grouping with the elements inside.
  - Use `Modifier.semantics(mergeDescendants = true) {}` when work on the customized menu items
  - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State
- Expandable menus
  - State must be announced - expands/collapses, opens/closes. Add logic and announcement to the programmatic name for the state
  - If "opens" or "closes" is not included in the name, the expands/collapses state must be announced
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
  
### Code Example
- **Jetpack Compose**
{% highlight kotlin %}
var expanded by remember { mutableStateOf(false) }
DropdownMenu(
    expanded = expanded,
    onDismissRequest = { expanded = false }
) {
    DropdownMenuItem(
        text = { Text("Settings") },
        onClick = { /* Handle settings! */ },
        leadingIcon = {
            Icon(
                Icons.Outlined.Settings,
                contentDescription = null
            )
        })
}
{% endhighlight %}

### Announcement examples
- Options for announcements below depend on framework and versions. Announcement order can vary.  

- "Open navigation drawer, button, double tap to activate"
- "More options, button, double tap to activate"
- "Open main menu, button, double tap to activate"
- "More options button, disabled" (disabled state)
