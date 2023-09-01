---
layout: entry
title:  "Sheet"
categories: controls

keyboard:
  tab and arrow keys: |
      Focus visibly moves to the sheet or first interactive element
  spacebar: |
      Activates on iOS and Android
  enter: |
      Activates on Android
        
mobile:
  swipe: |
      Focus moves to the element, expresses its name, role, value & state (if applicable)
  doubletap: |
     Activates interactive elements

screenreader:
  name:  |
      Purpose is clear and matches any visible label
  role:  |
      Identifies itself as a button in iOS and "double tap to activate" in Android
  group: |
      Visible label is grouped or associated with controls in a single swipe
  state: |
      Expresses its state (expands/collapses or disabled/dimmed)

settings:
  text resize: |
    Text can resize up to 200% without losing information
---

## Developer notes
- A sheet helps people perform a distinct task that’s related to the parent view without taking them away from their current context
- Use native elements when at all possible vs a custom element, as it will handle expected behavior without additional development effort
- Most sheets appear as a card that partially covers the underlying content. 
- The screen reader should be confined in the sheet/drawer if it covers underlining content. If a sheet does not cover other content, the screen reader does not have to be confined in it
- Ensure there is a way to collapse or close the sheet for the screen reader (iOS)
- Move screen reader focus into sheet when opened
- A grabber is recommended but not required for Android if a two-finger swipe for the screen reader in any direction closes it


## iOS

### Name
- Programmatic name describes the purpose of the control.
- Ensure that the button that activates the sheet has a programmatic name. The sheet does not have one as it is implied by the button's programmatic name.

- **UIKit**
  - Set the programmatic name of the button that activates the sheet.
  - You can programmatically set the visible label with `setTitle()`.
    - The button’s title will overwrite the button’s `accessibilityLabel`.
  - If a visible label is not applicable in this case, set the button's `accessibilityLabel` to the label of your choice.
    - To do this in Interface Builder, set the label using the Identity Inspector
  - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
  - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.
- **SwiftUI**
  - Set the programmatic name of the button that activates the sheet.
  - If there is no visible label, use view modifier `accessibilityLabel(_:)`.
  - If button has icon(s), hide the icon(s) from VoiceOver by using view modifier `accessibilityHidden(true)`.

### Role
- When using non-native controls (custom controls), roles will need to be manually coded.

- **UIKit**
  - Use `UIButton` for the button that activates the sheet.
  - If necessary, set `accessibilityTraits` to `.button`.
- **SwiftUI**
  - Use native `Button` view
  - If necessary, use view modifier `accessibilityAddTraits(.isButton)` to assign the role as Button.
  - If applicable, use view modifier `accessibilityRemoveTraits(:)` to remove unwanted traits.  

### Groupings
- Group visible label with button, if applicable, to provide a programmatic name for the button.
- Group label with data to ensure reading order is logical. (Not label, label, data, data).

- **UIKit**
  1. Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
  2. Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
  - If frame does not exist due to custom button, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
    - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
  - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
  - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.
- **SwiftUI**
  - Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.

### State 
- **UIKit**  
  - For enabled: Set `isEnabled` to `true`.
  - For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
    - If necessary, you may change the accessibility trait of the button to `notEnabled`, but this may overwrite the current accessibility role of the button.
- **SwiftUI**
  - For selected, use `accessibilityAddTraits(.isSelected)`.
  - For disabled, use view modifier `disabled()`.

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
- "button" in announcements below comes from the accessibility services most of the time when a native component is used, not from the label. Options for announcements below depend on framework and versions. Announcement order can vary.

- "Label, button"
- "Label, (other content in cell), button" (grouping)
- "Label, button, selected" (selected state)
- "Label, dimmed, button" (disabled state)

## Android

### Name
- Name describes the purpose of the control
- Ensure that the button that activates the sheet has a programmatic name. The sheet does not have one as it is implied by the button's programmatic name.

- **Android Views**
  - `android:text` XML attribute
  - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements (icons) without a visible label
  - `contentDescription` overrides `android:text`
  - Use `labelFor` attribute to associate the visible label with the control
- **Jetpack Compose**
  - Compose uses semantics properties to pass information to accessibility services.
  - The built-in Button composable will fill the semantics properties with information inferred from the composable by default.
  - Optional: use `contentDescription` for a more descriptive name to override the default visible label of the button text.
  - Example specification of contentDescription in compose: `modifier = Modifier.semantics { contentDescription = "" }`

### Role
- When not using native controls (custom controls), roles will need to be manually coded.
- **Android Views**
  - `ModalBottomSheet`
  - Grabber announces as "double tap to activate"
- **Jetpack Compose**
  - `ModalBottomSheet`
  - `BottomSheetScaffold`
  - When use the drag handle on top of the sheet from the native component then it will be announced as "collapse drag handle" with actions available (three fingers tapping to view). With no drag handle designed UI, a close button is required to be displayed and have the init focus whenever the sheet is triggered and showing.

### Groupings
- Group visible label with action (if applicable) to provide a programmatic name for the action
- Group label with data to ensure reading order is logical. (Not label, label, data, data)

- **Android View**
  - ViewGroup
  - Set the container objects `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement
- **Jetpack Compose**
  - `Modifier.semantics(mergeDescendants = true) {}` is equivalent to `importantForAccessibility` when compared to android views
  - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State
- **Android Views**
  - Grabber, if any, announces as expands/collapses
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`. Announcement: disabled
- **Jetpack Compose**
  - Partial expanded bottom sheet: Drag handle, if any, announces as "collapse drag handle" with actions available in taleback menu (Expand/Dismiss)
  - Full expanded bottom sheet: Drag handle, if any, announces as "expanded drag handle" with actions available in talkback menu (Collapse/Dismiss)
  - Full expanded bottom sheet with no partial expanded state: Drag handle, if any, announces as "drag handle" with actions available in talkback menu (Dismiss)
  - Fixed bottom sheet with Close button and no drag handle: Close button state:
    - Active: default state is active and enabled. Use `Button(enabled = true)` to specify explicitly
    - Disabled:  `Button(enabled = false)` announces as disabled
    - Alternatively can use `modifier = Modifier.semantics { disabled() }` to announce as disabled

### Focus
- When a sheet is closed, the focus should return to the triggering element.
- Only manage focus when needed. Primarily, let the device manage default focus
- Consider how focus should be managed between child elements and their parent views
- Moving focus into the sheet when an action opens it makes it clear to the screen reader user that there is a sheet available

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

### Code example
- **Jetpack Compose**
{% highlight kotlin %}
var openBottomSheet by rememberSaveable { mutableStateOf(false) }
val scope = rememberCoroutineScope()
val bottomSheetState = rememberModalBottomSheetState()
Button(onClick = { openBottomSheet = !openBottomSheet }) {
    Text(text = "Show Bottom Sheet")
}
if (openBottomSheet) {
    ModalBottomSheet(
        onDismissRequest = { openBottomSheet = false },
        sheetState = bottomSheetState
    ) {
        Column(modifier = Modifier.fillMaxWidth()) {
            OutlinedButton(
                modifier = Modifier.align(Alignment.CenterHorizontally).semantics {
                    disabled()
                },
                // Note: If you provide logic outside of onDismissRequest to remove the sheet,
                // you must additionally handle intended state cleanup, if any.
                onClick = {
                    scope.launch { bottomSheetState.hide() }.invokeOnCompletion {
                        if (!bottomSheetState.isVisible) {
                            openBottomSheet = false
                        }
                    }
                }
            ) {
                Text("Hide Bottom Sheet")
            }
            LazyColumn {
                items(50) {
                    ListItem(
                        headlineContent = { Text("Sheet item /$it") },
                        leadingContent = {
                            Icon(
                                Icons.Default.Star,
                                contentDescription = "Localized description"
                            )
                        }
                    )
                }
            }
        }
    }
}
{% endhighlight %}

### Announcement examples
