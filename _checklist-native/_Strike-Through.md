---
layout: entry
title:  "Strike-Through" 
categories: common-patterns


keyboard:
  tab, arrow keys or Ctl+tab: |
    Focus visibly moves to the striked-through text only if it is interactive
  spacebar: |
    Activates on iOS and Android
  enter: |
    Activates on Android
          
mobile gestures:
  swipe: |
    Focus moves to the striked-through text and only if it is interactive, expresses its name, role, state (if applicable)
  doubletap: |
    Activates the interactive strike-through component, if interacive
    
screenreader: 
  name:  |
    Purpose is clear and matches visible text for interactive component along with meaning of strike-through
  role:  |
    Input field identifies as a button in iOS and Android
  group: |
    n/a
  state: |
    Expresses the button state (if applicable)

settings:
  text resize: |
    Text can resize up to 200% without losing information
---


## iOS

### Developer notes
- A strike-through is a style that indicates something is removed, deleted, unavailable or canceled, but the original text is meaningful enough and remains visible
- The strike-through must not be ignored by the screen reader.  Adding an accessibility label to the striked-through text will convey its meaning.  This can be done by grouping the new price with the strike-through price and strike-through accessibility label and announce together.
  
### Name
- Programmatic name describes the purpose of the control, if strike-through text is interactive
- If visible text is interactive, the programmatic name should match the visible text andding the strike-through meaning
    - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.
- Placeholder text is NOT the programmatic name

<!-- 
Enter information for iOS Name using UIKIT, update below with appropriate details, replace _component with new component name or appropriate description
-->
- **UIKit**
  - You can programmatically set the visible label with `setTitle()`.
    - The _component title will overwrite the _component `accessibilityLabel`.
  - If a visible label is not applicable in this case, set the _component `accessibilityLabel` to the label of your choice.
    - To do this in Interface Builder, set the label using the Identity Inspector
  - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
  - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

<!-- 
Enter information for iOS Name using SwiftUI, update below with appropriate details
-->
- **SwiftUI**
  - If no visible label, use view modifier `accessibilityLabel(_:)`.


<!-- 
Enter information for iOS Role, update information below with appropriate details, or remove details not needed
-->
### Role
- When using non-native controls (custom controls), roles will need to be manually coded.

<!-- 
Enter information for iOS Name using UIKIT, update below with appropriate details, replace _component with new component name or appropriate description
-->
- **UIKit**
  - 
  - 

<!-- 
Enter information for iOS Name using SwiftUI, update below with appropriate details
-->
- **SwiftUI**
  - 
  - 

<!-- 
Enter information for iOS Groupings, update below with appropriate details, replace _component with new component name or appropriate description
-->
### Groupings
- Group strike-through text with the strike-through accessibility label and updated text

<!--
Enter information for iOS Groupings using UIKit, update below with appropriate details
-->
- **UIKit**
  - 
  - 
<!--
Enter information for iOS Groupings using SwiftUI, update below with appropriate details
-->
- **SwiftUI**
  - Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.

<!-- 
Enter information for iOS State, update below with appropriate details, replace seach field with new component name or appropriate description
-->
### State 

<!-- 
Enter information for iOS State for UIKit, update below with appropriate details, replace search field with new component name or appropriate description
-->
- **UIKit**  
  - For enabled: Set `isEnabled` to `true`.
  - For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
    - If necessary, you may change the accessibility trait of the _component to `notEnabled`, but this may overwrite the current accessibility role of the search field.

<!-- 
Enter information for iOS State for SwiftUI, update below with appropriate details, replace search field with new component name or appropriate description
-->
- **SwiftUI**
  - For selected, use `accessibilityAddTraits(.isSelected)`.
  - For disabled, use view modifier `disabled()`.

<!-- 
Enter information for iOS Focus, update below with appropriate details
-->
### Focus
- Use the device's default focus functionality. 
- External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.

<!-- 
Enter information for iOS Focus using UIKit, update below with appropriate details
-->
- **UIKit**
  - If VoiceOver is not reaching a particular element, set the element's `isAccessibilityElement` to `true`
    - **Note:** You may need to adjust the programmatic name, role, state, and/or value after doing this, as this action may overwrite previously configured accessibility.
  - Use `accessibilityViewIsModal` to contain the screen reader focus inside the modal.
  - To move screen reader focus to newly revealed content, use `UIAccessibility.post(notification:argument:)` that takes in `.screenChanged` and the newly revealed content as the parameter arguments.
  - To NOT move focus, but dynamically announce new content: use `UIAccessibility.post(notification:argument:)` that takes in `.announcement` and the announcement text as the parameter arguments.
  - `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements. 

<!-- 
Enter information for iOS Focus using SwiftUI, update below with appropriate details
--> 
- **SwiftUI**
  - For general focus management that impacts both screen readers and non-screen readers, use the property wrapper `@FocusState` to assign an identity of a focus state.
    - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:)` to assign focus on a view with `@FocusState` as the source of truth.
    - Use the property wrapper `@FocusState`in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
  - If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.


<!-- 
Enter information for iOS VoiceOver announcements for the specific component, update below with appropriate details and announcement examples
--> 
### Announcement examples
- "Amount was $57 and is now $27"  (Strike-through on $57 grouped with updated price of #27)
- "Auto search results below"  (Added when auto-populated search results are shown - optional)

## Android

### Developer notes
- A strike-through is a style that indicates something is removed, deleted, unavailable or canceled, but the original text is meaningful enough and remains visible
- The strike-through must not be ignored by the screen reader.  Adding an accessibility label to the striked-through text will convey its meaning.  This can be done by grouping the new price with the strike-through price and strike-through accessibility label and announce together

### Name
- Name describes the purpose of the control, if strike-through text is interactive
- Programmatic name matches the visible text 

- **Android Views**
  - `android:text` XML attribute
  - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements (icons) without a visible label
  - `contentDescription` overrides `android:text`

<!-- 
Enter information for Android Name for Jetpack Compose, update information below with appropriate details, or remove details not needed
-->
- **Jetpack Compose**
  - Compose uses semantics properties to pass information to accessibility services.
  - Example specification of contentDescription in compose: `modifier = Modifier.semantics { contentDescription = "" }`

<!-- 
Enter information for Android Role, update information below with appropriate details, or remove details not needed
-->
### Role
- When not using native controls (custom controls), roles will need to be manually coded.

<!-- 
Enter information for Android Role for Android Views, update information below with appropriate details
-->
- **Android Views**
  - 

<!-- 
Enter information for Android Role for Jetpack Compose, update information below with appropriate details
-->
- **Jetpack Compose**
  - 

<!-- 
Enter information for Android Groupings, update information below with appropriate details, or remove details not needed
-->
### Groupings
- Group visible label or icon with the input field, if applicable, to provide a programmatic name for the search field.

<!-- 
Enter information for Android Groupings using Android Views, update information below with appropriate details, or remove details not needed
-->
- **Android Views**
  - `ViewGroup`
  - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.

<!-- 
Enter information for Android Groupings using Jetpack Compose, update information below with appropriate details, or remove details not needed
-->
- **Jetpack Compose**
  - `Modifier.semantics(mergeDescendants = true) {}` is equivalent to `importantForAccessibility` when compared to android views
  - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

<!-- 
Enter information for Android State, update information below with appropriate details, or remove details not needed
-->
### State

<!-- 
Enter information for Android State for Android Views, update information below with appropriate details, or remove details not needed
-->
- **Android Views**
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`. Announcement: disabled

<!-- 
Enter information for Android State for Jetpack Compose, update information below with appropriate details, or remove details not needed
-->
- **Jetpack Compose**
- 

<!-- 
Enter information for Android Focus, update information below with appropriate details, or remove details not needed
-->
### Focus
- Only manage focus when needed. Primarily, let the device manage default focus
- External keyboard tab order often follows the screen reader focus, but sometimes needs focus management

<!-- 
Enter information for Android Focus for Android Views, update information below with appropriate details, or remove details not needed
-->
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

<!-- 
Enter information for Android Focus for Jetpack Compose, update information below with appropriate details, or remove details not needed
-->
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

<!-- 
Enter information for Android Custom Accessibility Action, update information below with appropriate details, or remove details not needed
-->
### Custom Accessibility Action
- When UI elements are customized and coded to look like a specific component say button, to ensure that name, role, state and action are all intact might need to update accessibility service and semantics.
- Disclaimer: This customization would not be needed unless it is required to modify/add gestures or actions.

<!-- 
Enter information for Android Custom Accessibility Action for Android Views, update information below with appropriate details, or remove details not needed
-->
- **Android Views**
- 

<!-- 
Enter information for Android Custom Accessibility Action for Jetpack Compose, update information below with appropriate details, or remove details not needed
-->
- **Jetpack Compose**
  - List of custom accessibility actions can be defined relatively easily in compose compared to Views using customActions. 
  - Example: `modifier = Modifier.semantics { customActions = listOf(CustomAccessibilityAction(label = "", action = { true }))}`
  
### Announcement examples 
- "Amount was $57 and is now $27"  (Strike-through on $57 grouped with updated price of #27)
- "Auto search results below"  (Added when auto-populated search results are shown - optional)
