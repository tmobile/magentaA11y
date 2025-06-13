## General Notes

How to test a menu

## Videos

### iOS VoiceOver

<video controls>
  <source src="media/video/native/menu/menu_IosVoiceOver.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback

<video controls>
  <source src="media/video/native/menu/menu_AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a menu

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Focus visibly moves, confined within the menu
   - Escape: The menu closes and returns focus to the button that launched it
   - Space: Any buttons or links are activated on iOS and Android
   - Enter: Any buttons or links are activated on Android

2. Test mobile screenreader gestures

   - Swipe: Focus moves, confined within the menu. Two finger swipe anywhere often dismisses menu (Android only)
   - Doubletap: Activates interactive elements
   - Group: n/a

3. Listen to screenreader output on all devices

   - Name: Interactive options within the menu should follow button guidance. The name should match the visible text for those buttons
   - Role: May identify itself as a menu, popover or modal. Confining the user within the menu communicates the context to the screen reader user that there is a modal present
   - State: Typically, when open, other content is inert. Expands/collapses, closes/opens states are announced on the elements that close or open the menu

4. Test device settings

   - Text resize: Text can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/menu](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/menu)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a menu

GIVEN THAT I am on a screen with a menu

1. Scenario: Test keyboard actions

   - WHEN I press the "TAB", "ARROW KEYS", or "CTRL+TAB" keys 
      - THEN the focus should visibly move and remain confined within the menu 
   - WHEN I press the "ESCAPE" key 
      - THEN the menu should close and return focus to the button that launched it 
   - WHEN I press the "SPACEBAR" key 
      - THEN any buttons or links within the menu should be activated on iOS and Android 
   - WHEN I press the "ENTER" key 
      - THEN any buttons or links within the menu should be activated on Android

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate within the menu 
      - THEN the focus should move and remain confined within the menu 
         - AND a two-finger swipe anywhere should dismiss the menu (Android only) 
   - WHEN I double-tap interactive elements within the menu 
      - THEN those elements should be activated

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader reads the menu and its contents 
      - THEN interactive options within the menu should follow button guidance 
         - AND the name of interactive elements should match the visible text 
         - AND the menu's role should be identified as a menu, popover, or modal 
         - AND confining the user's focus within the menu should communicate the presence of a modal to the screen reader 
         - AND its state should be expressed (e.g., INERT when open, EXPANDED/COLLAPSED, or CLOSED/OPENED) on the elements that close or open the menu

4. Scenario: Test device OS settings for text resize

   - WHEN I adjust the device text resize setting to 200%
      - THEN the text within the menu should resize up to 200% without losing information 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/menu](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/menu)

## iOS Developer Notes
### General Notes

   - A menu is a container for a list of items
   - Use native app menus when at all possible vs a custom element, as it will handle expected behavior without additional development effort
   - Options to close the menu for the screen reader user:
      - An invisible close button announced for the screen reader only, can be in the swipe order after the last menu item 
      - A close button
      - Swiping back to the element that opened menu
   - If menu hides content underneath it, the screen reader focus should be confined within the menu
   - Tapping outside the menu to close cannot be the only option for screen reader users

### Name

   - Programmatic name describes the purpose of the control.
   - If visible text label exists, the programmatic name should match the visible text label.
      - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.

   - **UIKit**

      - You can programmatically set the visible label with `setTitle()`.
         - The menu's title will overwrite the menu's `accessibilityLabel`.
      - If a visible label is not applicable in this case, set the menu's `accessibilityLabel` to the label of your choice.
         - To do this in Interface Builder, set the label using the Identity Inspector
      - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
      - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

   - **SwiftUI**

      - If no visible label, use view modifier `accessibilityLabel(_:)`.
      - If menu item has icon(s), hide the icon(s) from VoiceOver by using view modifier `accessibilityHidden(true)`.

### Role

   - When using non-native controls (custom controls), roles will need to be manually coded. Otherwise in native app controls, they are automatically assigned.
   - Since menu items are interactive, it must be indicated to the user that they are interactive such as indicating that it is a button or it can be double-tapped to be selected. 

   - **UIKit**

      - Use `UIMenu`

   - **SwiftUI**

      - Use native app `Menu` view

### Groupings

   - Each menu item and its children are grouped together
   - Ensure logical reading order

   - **UIKit**

      - Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
      - Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
         - If frame does not exist due to custom menu, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
            - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
         - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
         - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.

   - **SwiftUI**

      - Native app `Menu` views are accessible by default
      - If necessary, use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.

### State

   - In the case of expandable menus, state of the menu must be announced (i.e. expands/collapses, opens/closes). Add logic and announcements to the programmatic name for the state.

   - **UIKit**

      - If applicable, menu items should be announced whether they are selected/unselected, in the cases of radio buttons or checkboxes. 
      - For enabled menu items: Set `isEnabled` to `true`.
      - For disabled menu items: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
         - If necessary, you may change the accessibility trait of the menu item to `notEnabled`, but this may overwrite the current accessibility role of the menu item.

   - **SwiftUI**

      - If applicable, menu items should be announced whether they are selected/unselected, in the cases of radio buttons or checkboxes. 
      - For selected menu items, use `accessibilityAddTraits(.isSelected)`.
      - For disabled menu items, use view modifier `disabled()`.

### Focus

   - Use the device's default focus functionality. 
   - Focus should be confined within the menu, which can include the button that opened it, if content underneath is hidden.
   - External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.
   - When a menu is closed, the focus should return to the triggering element
   - An invisible close button can be implemented to close the menu. Ensure this button is in the swipe order, if implemented.

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

   - Options for announcements below depend on framework and versions. Announcement order can vary. "Menu" in label is optional, but recommended.
   - "Label menu, button"
   - "Label, button" (without recommended "menu" announcement)
   - "Label menu, dimmed, button" (disabled state)
   - "Dismiss context menu, button" (Invisible button in swipe past the last item in menu)

## Android Developer Notes
### General Notes

   - A menu is a container for a list of items
   - Use native app menus when at all possible vs a custom element, as it will handle expected behavior without additional development effort
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

      - `DropdownMenu`, `DropdownMenuItem`

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

```java
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
```

### Announcement examples

  - Options for announcements below depend on framework and versions. Announcement order can vary.
  - "Open navigation drawer, button, double tap to activate"
  - "More options, button, double tap to activate"
  - "Open main menu, button, double tap to activate"
  - "More options button, disabled" (disabled state)
