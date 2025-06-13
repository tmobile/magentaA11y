## General Notes

How to test a checkbox

## Videos

### iOS VoiceOver
<video controls>
  <source src="media/video/native/checkbox/checkboxVoiceOver.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Andriod Talkback
<video controls>
  <source src="media/video/native/checkbox/checkboxTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a checkbox

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Focus visibly moves to the checkbox
   - Spacebar: Activates on iOS and Android
   - Enter: Activates on Android

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the element, expresses its name, role, state
   - Doubletap: Checkbox toggles between checked and unchecked states

3. Listen to screenreader output on all devices

   - Name: Name describes the purpose of the control and matches the visible label
   - Role: Identifies itself as a checkbox in Android and a Button or checkbox in iOS
   - Group: Visible label can be grouped with the checkbox in a single swipe
   - State: Expresses its state (disabled/dimmed, checked, not checked, selected, unselected)

4. Test device settings

   - Text resize: Text label can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/checkbox](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/checkbox)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a checkbox

GIVEN THAT I am on a screen with a checkbox

1. Scenario: Test keyboard actions

   - WHEN I press the "TAB", "ARROW KEYS", or "CTRL+TAB" keys 
      - THEN the focus should visibly move to the checkbox 
   - WHEN I press the "SPACEBAR" key 
      - THEN the checkbox should be activated on iOS and Android 
   - WHEN I press the "ENTER" key 
      - THEN the checkbox should be activated on Android

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate to the checkbox 
      - THEN the focus should move to the checkbox 
         - AND the checkbox's name, role, and state should be expressed 
   - WHEN I double-tap the checkbox 
      - THEN the checkbox should toggle between CHECKED and NOT CHECKED states 

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader reads the checkbox 
      - THEN its name should describe the purpose of the control and match the visible label 
         - AND its role should be identified as a checkbox in Android and as a button or checkbox in iOS 
         - AND its visible label should be grouped with the checkbox in a single swipe 
         - AND its state (DISABLED/DIMMED, CHECKED, NOT CHECKED, SELECTED, UNSELECTED) should be expressed

4. Scenario: Test device OS settings for text resize

   - WHEN I adjust the device text resize setting to 200% 
      - THEN the text label should resize up to 200% without losing information 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/checkbox](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/checkbox)

## iOS Developer Notes
### General Notes
- A check box lets the user choose between two opposite states, actions or values  
- You should use a native app control when at all possible vs a custom element, as it will automatically and correctly announce the role without additional development effort
- A check box should toggle between checked and unchecked. It should not automatically navigate the user to another field or screen when activated, as that may cause a change of context. Revealing new information on the same screen as a result of activating a checkbox is usually ok, as it is not a change of context
- Name, Role, State must be announced when focus is on the control. Announcing the label only in a separate swipe before the checkbox does not meet this requirement

### Name
- Programmatic name describes the purpose of the control.
- If visible text label exists, the programmatic name should match the visible text label.
    - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.

- **UIKit**
  - You can programmatically set the visible label with `setTitle()`.
    - The checkbox's title will overwrite the checkbox's `accessibilityLabel`.
  - If a visible label is not applicable in this case, set the button's `accessibilityLabel` to the label of your choice.
    - To do this in Interface Builder, set the label using the Identity Inspector
  - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
  - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.
- **SwiftUI**
  - By default, the visible label of a Toggle is the accessibility label
  - If no visible label, use view modifier `accessibilityLabel(_:)`.

### Role
- When using non-native controls (custom controls), roles will need to be manually coded.

- **UIKit**
  - Since there is no native checkbox in UIKit, implementing a custom checkbox may be necessary using `UIButton`, `UISwitch`, `UIControl`, or another class.
    - Extend from one of the UIKit native controls above. A common control for custom checkboxes to extend from is the `UIButton`, but choose the native control that best fits your use case.
    - Provide your own checked and unchecked checkbox images
    - Implement action handlers for your custom checkbox
    - Set accessibility properties accordingly
  - If necessary, set `accessibilityTraits` to `.button`. Be sure to set the accessibility value to either "Checked" or "Unchecked" to indicate that this control behaves as a checkbox.
  - An alternative to setting the accessibility trait to `.button` is removing and hiding the accessibility trait using `accessibilityTraits.remove(:)`. Then, append ", Checkbox" to the programmatic name
- **SwiftUI**
  - Use native `Toggle` view with `toggleStyle(.checkbox)` 

### Groupings
- Group visible label with checkbox, if applicable, to provide a programmatic name for the checkbox.
- Group the units such that the label, role, and state of the checkbox is announced in a single announcement.

- **UIKit**
  - Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
  - Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
  - If frame does not exist, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
    - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
  - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
  - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.
- **SwiftUI**
  - Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.
  - If the tap gesture is removed due to grouping logic, restore the tap gesture functionality using bindings to bind the tap gesture of the container with the state of the checkbox.

### State 
- **UIKit** 
  - For checked state: Set `accessibilityValue` to "Checked"
  - For unchecked state: Optionally, set `accessibilityValue` to "Unchecked"
  - For enabled state: Set `isEnabled` to `true`.
  - For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
    - If necessary, you may change the accessibility trait of the button to `notEnabled`, but this may overwrite the current accessibility role of the button.
- **SwiftUI**
  - For checked state, if necessary: Set accessibility value to "Checked" with `accessibility(:)`
  - For unchecked state, if necessary: Set accessibility value to "Unchecked" with `accessibilityValue(:)`
  - For disabled, use view modifier `disabled()`.

### Focus
- Use the device's default focus functionality. 
- Consider how focus should be managed between child elements and their parent views.
- External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.
- Initial focus on a screen should land in a logical place, such as back button, screen title, first text field, or first heading.

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
    - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
  - If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.

### Announcement examples
- Appending checkbox to label:
- "Label checkbox, checked, button"
- "Label checkbox, not checked, button"  (not checked or "unselected" are acceptable)
- Not appending to label:
- "Label, checked, button"
- "Label, not checked, button"  (both "not checked" or "unselected" are acceptable)

## Android Developer Notes
### General Notes
- A check box lets the user choose between two opposite states, actions or values  
- You should use a native control when at all possible vs a custom element, as it will automatically and correctly announce the role without additional development effort
- A check box should toggle between checked and unchecked. It should not automatically navigate the user to another field or screen when activated, as that may cause a change of context. Revealing new information on the same screen as a result of activating a checkbox is usually ok, as it is not a change of context.
- Name, Role, State must be announced when focus is on the control. Announcing the label only in a separate swipe before the checkbox does not meet this requirement.

#### Code example
```java
val checkedState = remember { mutableStateOf(true) }
val stateNotSubscribed = "Not Selected"
val stateSubscribed = "Selected"
Row(
  modifier = Modifier
        .semantics {
            stateDescription = if (checkedState.value) { stateSubscribed } else { stateNotSubscribed }
            contentDescription = "Subscribe"
        }
        .toggleable(
            value = checkedState.value,
            onValueChange = { checkedState.value = it },
            role = Role.Checkbox
        )
  ) {
    Checkbox(
            modifier = Modifier.align(Alignment.CenterVertically),
            checked = checkedState.value,
            onCheckedChange = null
    )
        Text(text = "Subscription")
    }
```

### Name

-   Programmatic name describes the purpose of the control
-   Programmatic name matches the visible text label 

- **Android Views**  
  - `android:text` XML attribute
  - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements (icons) without a visible label
  - `contentDescription` overrides `android:text`  
  - Use `labelFor` attribute to associate the visible label with the control (best practice)
- **Jetpack Compose**
  - By default, the simple checkbox composable is readout & focused separately from its label text, which makes it hard to understand the context. 
  - Use `Row` composable and `toggleable(role = Role.Checkbox)` with inner element as `Checkbox` composable (recommended practice) to have entire row including its label focused for selection, so it allows screenreader to read the name and role together. 
  - Optional: use `Modifier.semantics {  contentDescription = "" }` for a more descriptive name

### Role
-   When not using native controls (custom controls), roles will need to be manually coded.

- **Android Views**
  - CheckBox Class
  - Announced as "checkbox"
- **Jetpack Compose**
  - Simple checkbox composable. 
  - Alternatively use checkbox composable in combination with `Row` and `toggleable(role = Role.Checkbox)`. Code example above.
  - Announced as "checkbox"

### Groupings
-   Group visible label with button (if applicable) to provide a programmatic name for the button

- **Android Views**
  - ViewGroup
  - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.
  -  use `labelFor`
- **Jetpack Compose**
  - `Modifier.semantics(mergeDescendants = true) {}` is equivalent to importantForAccessibility when compared to android views.
  - To allow checkbox grouping, specify `onCheckedChange = null` on inner simple checkbox composable when combined with `Row` composable and `toggleable(value = checkedState.value, onValueChange = { checkedState.value = it })`. This makes the entire row group selectable including its label. 
  - `FocusRequester` can be used to request focus to individual components with in the group. More on FocusRequester in the focus section below.
 
### State
-   When native code is not available for a state, add the state to the programmatic name (label).  Add logic when needed. 

- **Android Views**
  - Active: `android:enabled=true`, `isChecked`, `setChecked`
  - Disabled: `android:enabled=false` announced as: "disabled"
- **Jetpack Compose**
  - Checked: `Checkbox(checked = true)` announced as: "checked"
  - Enabled:  `Checkbox(enabled = true)` 
  - Disabled: `Checkbox(enabled = false)` announced as: "disabled"
  - When using checkbox composable with row and toggleable, need to specify `Modifier.toggleable(enabled = false)` along with `Checkbox(enabled = false)`
  - Use `modifier = Modifier.semantics { stateDescription = "" }` to have a customized state announcement.

### Focus

  - Only manage focus when needed. Primarily, let the device manage default focus
  - Consider how focus should be managed between child elements and their parent views
  - External keyboard tab order often follows the screen reader focus, but sometimes needs focus management

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
     - To hide controls: `Important_For_Accessibility_false`
     - For a `ViewGroup`, set `screenReaderFocusable=true` and each inner object’s attribute to keyboard focus (`focusable=false`)
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

### Announcement examples
- "Checked, label, checkbox, double tap to toggle"
- "Not checked, label, checkbox, double tap to toggle"
