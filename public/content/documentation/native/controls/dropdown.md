## General Notes

How to test a dropdown

## Videos

### iOS Voiceover
<video controls>
  <source src="media/video/native/dropdown/dropdown-iOSVoiceOver.mp4" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback
<video controls>
  <source src="media/video/native/dropdown/dropdown-AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a dropdown

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Focus visibly moves to the Dropdown
   - Spacebar: Selects and opens the Dropdown on iOS and Android
   - Enter: Selects and opens the Dropdown on Android

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the element, expresses its name, role, value & state (expanded or collapsed)
   - Doubletap: Selects and opens Dropdown

3. Listen to screenreader output on all devices

   - Name: Purpose is clear and matches any visible label
   - Role: Identifies itself as a button in iOS and "double tap to activate" in Android
   - Group: Visible label is grouped or associated with the Dropdown in a single swipe
   - State: Expresses its state (disabled/dimmed). Expanded/collapsed states are announced on the elements that close or open the dropdown

4. Test device settings

   - Text resize: Text can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/dropdown](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/dropdown)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a dropdown

GIVEN THAT I am on a screen with a dropdown

1. Scenario: Test keyboard actions

   - WHEN I press the "TAB", "ARROW KEYS", or "CTRL+TAB" keys 
      - THEN the focus should visibly move to the dropdown 
   - WHEN I press the "ESCAPE" key 
      - THEN the dropdown should close and return focus to the button that launched it 
   - WHEN I press the "SPACEBAR" key 
      - THEN the dropdown should be selected and opened on iOS and Android 
   - WHEN I press the "ENTER" key 
      - THEN the dropdown should be selected and opened on Android 

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate to the dropdown 
      - THEN the focus should move to the dropdown 
         - AND the dropdown's name, role, value, and state (EXPANDED or COLLAPSED) should be expressed 
   - WHEN I double-tap the dropdown 
      - THEN the dropdown should be selected and opened

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader reads the dropdown 
      - THEN its name should clearly describe its purpose and match any visible label 
         - AND its role should be identified as a button in iOS and as "double tap to activate" in Android 
         - AND its visible label should be grouped or associated with the dropdown in a single swipe 
         - AND its state (DISABLED/DIMMED) should be expressed 
         - AND the EXPANDED or COLLAPSED state should be announced on the elements that close or open the dropdown

4. Scenario: Test device OS settings for text resize

   - WHEN I adjust the device text resize setting to 200%
      - THEN the text on the dropdown should resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/dropdown](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/dropdown)

## iOS Developer Notes
There is no native dropdown element for iOS.  The notes below are suggestions and accessibility guidance.

### General Notes
- A dropdown is a button that opens a list of options.  When an option is chosen, it displays in the field as the value
- The difference between a menu and dropdown is a menu item performs an action when activated.  A dropdown item only replaces the current option
- The screen reader focus moves directly to first option in dropdown upon double tapping the dropdown button and is confined in the list.
- Sometimes, a hidden "dismiss context menu" button after the last item is available to close it.
- Focus should go back to the triggering dropdown button, displaying the new option
- There must be a visible label for the dropdown field that is not a placeholder and it describes the purpose of the dropdown.
- The screen reader focus also remains confined in the dropdown list
- The state of expanded or collapsed should be announced

### Name
- Programmatic name describes the purpose of the control.
- If visible text label exists, the programmatic name should match the visible text label.
    - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognition
- When naming a button, do not add "button" to the programmatic name (label). Assigning "Button" as the role will handle this announcement.
  - **Incorrect announcement:** "Submit button, Button"
  - **Correct announcement:** "Submit, Button"
- Placeholder or value text is NOT the programmatic name

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
- When using non-native controls (custom controls), roles will need to be manually coded.
- One option is to use a table view and a button inside a UIStackView

- **UIKit**
  - Use `UIButton`
  - If necessary, set `accessibilityTraits` to `.button`.
- **SwiftUI**
  - Use native `Button` view
  - If necessary, use view modifier `accessibilityAddTraits(.isButton)` to assign the role as Button.
  - If applicable, use view modifier `accessibilityRemoveTraits(:)` to remove unwanted traits.  

### Groupings
- Group visible label with button, if applicable, to provide a programmatic name for the button.

- **UIKit**
  - Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
  - Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
    - If frame does not exist due to custom button, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
      - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
    - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
    - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.
- **SwiftUI**
  - Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.

### State
- In the case of expandable dropdowns, state of the dropdown must be announced (i.e. expanded/collapsed). Add logic and announcements to the programmatic name for the state.

- **UIKit**
  - If applicable, dropdown items should be announced whether they are selected/unselected, in the cases of radio buttons or checkboxes. 
  - For enabled dropdown items: Set `isEnabled` to `true`.
  - For disabled dropdown items: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
    - If necessary, you may change the accessibility trait of the dropdown item to `notEnabled`, but this may overwrite the current accessibility role of the dropdown item.
- **SwiftUI**
  - If applicable, dropdown items should be announced whether they are selected/unselected, in the cases of radio buttons or checkboxes. 
  - For selected dropdown items, use `accessibilityAddTraits(.isSelected)`.
  - For disabled dropdown items, use view modifier `disabled()`.

### Focus
- Use the device's default focus functionality. 
- Consider how focus should be managed between child elements and their parent views.
- External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.
- Initial focus on a screen should land in a logical place, such as back button, screen title, first text field, or first heading.
- When a menu, picker, or modal is closed, the focus should return to the triggering element.

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

### Announcement examples

- "Button label, chosen option label, button, collapsed"  (Button that opens dropdown with selected option from dropdown and state)
- "Selected, chosen option label, button" (Selected option in dropdown list)
- "Label, button" (Other options in list that populate dropdown)
- "Dismiss context menu, button"  (Optional Hidden button that closes dropdown)


## Android Developer Notes

- A dropdown or spinner is a button that opens a list of options.  When an option is chosen, it displays in the field (replaces the current option or placeholder)
- The screen reader focus moves directly to first option in dropdown/spinner upon double tapping the dropdown button and is confined in the list.
- Sometimes, a hidden "dismiss context menu" button after the last item is available to close it.
- Focus should go back to the triggering dropdown/spinner button, displaying the new option
- There must be a visible label for the dropdown field that is not a placeholder and it describes the purpose of the dropdown.
- The screen reader focus also remains confined in the dropdown list
- The state of expanded or collapsed should be announced

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
- When not using native app controls (custom controls), roles will need to be manually coded.
- **Android Views**
  - `Spinner` Class
  - "pop up window" or "dropdown list" can be the role  
- **Jetpack Compose**
  - `ExposedDropdownMenuBox`, `ExposedDropdownMenu`, `DropdownMenuItem`

### Groupings
- Visible label, if any, is grouped with the dropdown item in a single swipe as an option for a programmatic name for the spinner

- **Android Views**
  - `ViewGroup`
  - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.

- **Jetpack Compose**
  - When use built-in Composable `DropdownMenuItem`, `ExposedDropdownMenu` in `ExposedDropdownMenuBox`, then it has the default grouping with the elements inside.
  - Use `Modifier.semantics(mergeDescendants = true) {}` when work on the customized dropdown items
  - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State
- Expandable dropdowns
  - State must be announced - expands/collapses, opens/closes. Add logic and announcement to the programmatic name for the state
  - If "opens" or "closes" is not included in the name, the expanded/collapsed state must be announced
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

**Jetpack Compose**
```java
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
```

### Announcement examples (vary with devices and OS)
- "Label, button, selected option label, in list, collapsed, double tap to activate"  (Opens drop down menu)
- "Selected, selected option label, index, double tap to activate"  (Selected list item)
- "Other option label, double tap to activate"  (Other list item)
