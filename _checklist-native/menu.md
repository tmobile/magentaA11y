---
layout: entry
title:  "Menu"
categories: controls

keyboard:
  tab or arrow keys: |
    Focus visibly moves, confined within the menu
  escape: |
    The menu closes and returns focus to the button that launched it
  space: |
    Any buttons or links are activated on iOS and Android
  enter: |
    Any buttons or links are activated on Android

mobile:
  swipe: |
    Focus moves, confined within the menu
  doubletap: |
    Activates interactive elements
  group: |
    n/a
    
screenreader:
  name:  |
    Interactive options within the menu should follow button guidance.  The name should match the visible text
  role:  |
    Triggering element should announce as button
  state: |
    Typically, when open, other content is inert. Expands/collapses, closes/opens states are announced on the elements that close or open the menu

settings:
  text resize: |
    Text can resize up to 200% without losing information
---
## Developer notes

- A menu is a container for a list of items
- Use native menus when at all possible vs a custom element, as it will handle expected behavior without additional development effort
- Options to close the menu for the screen reader user:
  - An invisible close button announced for the screen reader only, can be in the swipe order after the last menu item
  - Two/three finger swipe to close (Android)
  - A close button
  - Swiping back to the element that opened menu
- Confining the user within the menu communicates the context to the screen reader user that there is a menu present. If menu hides content underneath it, the screen reader focus should be confined within the menu.
- Tapping outside the menu to close cannot be the only option for screen reader users

## iOS

### Name
- Programmatic name describes the purpose of the control.
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
- Since menu items are interactive, it must be indicated to the user that they are interactive such as indicating that it is a button or it can be double-tapped to be selected. 

- **UIKit**
  - Use `UIMenu`
- **SwiftUI**
  - Use native `Menu` view

### Groupings
- Each menu item and its children are grouped together
- Ensure logical reading order

- **UIKit**
  1. Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
  2. Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
  - If frame does not exist due to custom menu, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
    - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
  - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
  - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.
- **SwiftUI**
  - Native `Menu` views are accessible by default
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
- Focus should be confined within the menu, which can include the butto nthat opened it, if content underneath is hidden.
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

TODO: For Debbie

## Android

### Name
- Name describes the purpose of the control
- Programmatic name matches the visible text label (if any)

- **Android Views**
  - `android:text` XML attribute
  - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements (icons) without a visible label
  - `contentDescription` overrides `android:text`
  - Use `labelFor` attribute to associate the visible label with the control
- **Android Compose**
  - Compose uses semantics properties to pass information to accessibility services.
  - The built-in Button composable will fill the semantics properties with information inferred from the composable by default.
  - Optional: use `contentDescription` for a more descriptive name to override the default visible label of the button text.
  - Example specification of contentDescription in compose: `modifier = Modifier.semantics { contentDescription = "" }`

### Role
- When not using native controls (custom controls), roles will need to be manually coded.
- **Android Views**
  - Standard button or ImageButton
- **Android Compose**
  - Standard `Button` composable

### Groupings
- Group visible label with button (if applicable) to provide a programmatic name for the button
- Group label with data to ensure reading order is logical. (Not label, label, data, data)

- **Android Views**
  - `ViewGroup`
  - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.
- **Android Compose**
  - `Modifier.semantics(mergeDescendants = true) {}` is equivalent to `importantForAccessibility` when compared to android views
  - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State
- **Android Views**
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`. Announcement: disabled
- **Android Compose**
  - Active: default state is active and enabled. Use `Button(enabled = true)` to specify explicitly
  - Disabled:  `Button(enabled = false)` announces as disabled
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
- **Android Compose**
  - `Modifier.focusTarget()` makes the component focusable
  - `Modifier.focusOrder()` needs to be used in combination with FocusRequesters to define focus order
  - `Modifier.onFocusEvent()`, `Modifier.onFocusChanged()` can be used to observe the changes to focus state
  - `FocusRequester` allows to request focus to individual elements with in a group of merged descendant views
  - Example: To customize the focus events
    - step 1: define the focus requester prior. `val (first, second) = FocusRequester.createRefs()`
    - step 2: update the modifier to set the order. `modifier = Modifier.focusOrder(first) { this.down = second }`
    - focus order accepts following values: up, down, left, right, previous, next, start, end
    - step 3: use `second.requestFocus()` to gain focus

### Custom Accessibility Action
- When UI elements are customized and coded to look like a specific component say button, to ensure that name, role, state and action are all intact might need to update accessibility service and semantics.
- Disclaimer: This customization would not be needed unless it is required to modify/add gestures or actions.
- The Button class by default supplies all the necessary semantics to make it fully accessible.

- **Android Views**
  - step 1: Create an accessibility service
  - step 2: Add the `FLAG_REQUEST_ACCESSIBILITY_BUTTON` flag in an AccessibilityServiceInfo object's `android:accessibilityFlags` attribute
  - step 3: To have a custom service register for the button's custom action callbacks, use `registerAccessibilityButtonCallback()`

- **Android Compose**
  - List of custom accessibility actions can be defined relatively easily in compose compared to Views using customActions. 
  - Example: `modifier = Modifier.semantics { customActions = listOf(CustomAccessibilityAction(label = "", action = { true }))}`
  
### Announcement examples
- "button" in announcements below comes from the accessibility services most of the time when a native component is used, not from the label
  - **Note:** When the user has hints turned on in settings, "double tap to activate" will announce at the end of most interactive controls.  Testing should be done with hints turned on to ensure the user understands a control is interactive by hearing either "button" or "double tap to activate" or both.  Announcements on Android devices vary slightly due to manufacturer.
  
- "Label, button, double tap to activate"
- "Label, (other content in cell), button, double tap to activate" (grouping)
- "Label, button, selected, double tap to activate" (selected state)
- "Label, disabled" (disabled state)
