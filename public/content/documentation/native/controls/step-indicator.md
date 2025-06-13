## General Notes

How to test a step indicator

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a step indicator

1. Test keyboard only, then screen reader + keyboard actions

    - Tab, arrow keys or ctl+tab: Focus visibly moves to the part of the control that is interactive
    - Spacebar: Activates on iOS and Android
    - Enter: Activates on Android

2. Test mobile screenreader gestures

    - Swipe: Focus moves to the control, expresses its name, role, state (if applicable)
    - Doubletap: Activates the control

3. Listen to screenreader output on all devices

    - Name: Purpose is clear (ex: "Step 6 of 7, Account")
    - Role: Identifies itself as a button or dropdown

4. Test device settings

    - Text resize: Text can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/step-indicator](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/step-indicator)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a step indicator

GIVEN THAT I am on a screen with a step indicator

1. Scenario: Test keyboard actions

   - WHEN  I press the "TAB", "ARROW KEYS", or "CTRL+TAB" keys  
      - THEN the focus should visibly move to the interactive part of the step indicator 
   - WHEN I press the "SPACEBAR" key 
      - THEN the step indicator should be activated on iOS and Android 
   - WHEN I press the "ENTER" key 
      - THEN the step indicator should be activated on Android 

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate to the step indicator 
      - THEN the focus should move to the step indicator 
         - AND the step indicator's name, role, and state (if applicable) should be expressed 
   - WHEN I double-tap the step indicator 
      - THEN the step indicator should be activated 

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader reads the step indicator 
      - THEN its name should clearly describe its purpose (e.g., "Step 6 of 7, Account") 
         - AND its role should be identified as a button or dropdown 

4. Scenario: Test device OS settings for text resize

   - WHEN I adjust the device text resize setting to 200%
      - THEN the text should resize up to 200% without losing information 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/step-indicator](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/step-indicator)

## iOS Developer Notes
### General Notes
- A control or graphic that shows the status or steps of a process in real time
- If the meaning of the step indicator graphic is visible in text near it, for example, 66% of 100% or step 2 of 3 underneath a progress bar, then the graphic should be ignored by the screen reader to avoid duplication of announcements.  Or group the graphic with the text in one swipe.  The visible text also helps users with various disabilities to interpret the graphic
- If the step indicator is interactive, it is in the swipe order for the screen reader and its text description is announced
- The graphic must meet color contrast ratios for the sections that are currently active

### Name
- **UIKit**
  - Programmatic name describes the purpose of the control.
  - You can programmatically set the visible label with `setTitle()`.
    - The button’s title will overwrite the button’s `accessibilityLabel`.
  - If a visible label is not applicable in this case, set the button's `accessibilityLabel` to the label of your choice.
    - To do this in Interface Builder, set the label using the Identity Inspector
  - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
  - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

- **SwiftUI**
  - If no visible label, use view modifier `accessibilityLabel(_:)`.

### Role
- When using non-native controls (custom controls), roles may need to be manually coded.

- **UIKit**
  - Use `UIProgressView` or `UIActivityIndicatorView`

- **SwiftUI**
  - Use `ProgressView`

### Groupings
- Group visible label with button, if applicable, to provide a programmatic name for the button

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
- **UIKit**  
  - For enabled: Set `isEnabled` to `true`.
  - For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
    - If necessary, you may change the accessibility trait of the button to `notEnabled`, but this may overwrite the current accessibility role of the button.

- **SwiftUI**
  - For selected, use `accessibilityAddTraits(.isSelected)`.
  - For disabled, use view modifier `disabled()`.

### Focus
- Use the device's default focus functionality. 
- External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.
- Initial focus on a screen should land in a logical place, such as back button, screen title, first text field, or first heading.

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

### Announcements
  - "Step 3 of 4”  (Text, non-interactive)
  - “Step 3 of 4, button” (Label and role of button)

## Android Developer Notes
### General Notes
- A control or graphic that shows the status of a process in real time
- If the meaning of the step indicator graphic is visible in text near it, for example, 66% of 100% or step 2 of 3 underneath a progress bar, then the graphic should be ignored by the screen reader to avoid duplication of announcements.  Or group the graphic with the text in one swipe.  The visible text also helps users with various disabilities to interpret the graphic
- If the step indicator is interactive, it is in the swipe order for the screen reader and its text description is announced
- The graphic must meet color contrast ratios for the sections that are currently active

### Name  

- **Android Views**  
  - `android:text` XML attribute
  - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements (icons) without a visible label
  - `contentDescription` overrides `android:text`
  - Use `labelFor` attribute to associate any visible label with the control

- **Jetpack Compose**
  - Compose uses semantics properties to pass information to accessibility services.
  - The built-in Button composable will fill the semantics properties with information inferred from the composable by default.
  - Optional: use `contentDescription` for a more descriptive name to override the default visible label of the button text.
  - Example specification of contentDescription in compose: `modifier = Modifier.semantics { contentDescription = "" }`

### Role
  - When not using native controls (custom controls), roles may need to be manually coded.
  - **Android Views**
    - `public class ProgressBar`

- **Jetpack Compose**
  - `LinearProgressIndicator` or `CircularProgressIndicator` composables

### Groupings
- Group visible label with button (if applicable) to provide a programmatic name for the button

- **Android Views**
  - `ViewGroup`
  - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.

- **Jetpack Compose**
  - `Modifier.semantics(mergeDescendants = true) {}` is equivalent to `importantForAccessibility` when compared to android views
  - `FocusRequester.createRefs()` helps to request focus to inner elements within the group

### State
- **Android Views**
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`. Announcement: disabled

- **Jetpack Compose**
  - Active: default state is active and enabled. Use `Button(enabled = true)` to specify explicitly
  - Disabled:  `Button(enabled = false)` announces as disabled
  - Alternatively can use `modifier = Modifier.semantics { disabled() }` to announce as disabled
  - Use `modifier = Modifier.semantics { stateDescription = "" }` to have a customized state announcement

### Focus
- Only manage focus when needed. Primarily, let the device manage default focus
- Consider how focus should be managed between child elements and their parent views
- External keyboard tab order often follows the screen reader focus, but sometimes needs focus management
- Initial focus on a screen should land in a logical place (back button, screen title, first text field, first heading)

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

### Custom Accessibility Action
- When UI elements are customized and coded to look like a specific component say button, to ensure that name, role, state and action are all intact might need to update accessibility service and semantics.
- Disclaimer: This customization would not be needed unless it is required to modify/add gestures or actions.
- The Button class by default supplies all the necessary semantics to make it fully accessible.

- **Android Views**
  - step 1: Create an accessibility service
  - step 2: Add the `FLAG_REQUEST_ACCESSIBILITY_BUTTON` flag in an AccessibilityServiceInfo object's `android:accessibilityFlags` attribute
  - step 3: To have a custom service register for the button's custom action callbacks, use `registerAccessibilityButtonCallback()`

- **Jetpack Compose**
  - List of custom accessibility actions can be defined relatively easily in compose compared to Views using customActions. 
  - Example: `modifier = Modifier.semantics { customActions = listOf(CustomAccessibilityAction(label = "", action = { true }))}`

### Announcements
  - "Step 3 of 4”  (Text, non-interactive)
  - “Step 3 of 4, button, double tap to activate” (Label, role and hint)
