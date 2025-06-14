## General Notes

How to test an expandable region

## Videos

### iOS Voiceover
<video controls>
  <source src="media/video/native/expandable/expandable-iOSVoiceOver.mp4" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback
<video controls>
  <source src="media/video/native/expandable/expandable-AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>


## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test an expandable region

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Focus visibly moves to the expandable region
   - Spacebar: Activates on iOS and Android
   - Enter: Activates on Android

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the element, expresses its name, role (state, if applicable)
   - Doubletap: Activates the expandable region

3. Listen to screenreader output on all devices

   - Name: Purpose is clear and matches visible label
   - Role: Identifies as an expandable region in iOS and expandable region or "double tap to activate" in Android
   - Group: Visible label is grouped or associated with the expandable region in a single swipe
   - State: Expresses its state (expanded/collapsed)

4. Test device settings

   - Text resize: Text can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/expandable](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/expandable)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test an expandable region

GIVEN THAT I am on a screen with an expandable region

1. Scenario: Test keyboard actions

   - WHEN I press the "TAB", "ARROW KEYS", or "CTRL+TAB" keys 
      - THEN the focus should visibly move to the expandable region 
   - WHEN I press the "SPACEBAR" key 
      - THEN the expandable region should be activated on iOS and Android 
   - WHEN I press the "ENTER" key 
      - THEN the expandable region should be activated on Android 

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate to the expandable region 
      - THEN the focus should move to the expandable region 
         - AND the expandable region's name, role, and state (if applicable) should be expressed 
   - WHEN I double-tap the expandable region 
      - THEN the expandable region should be activated 

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader reads the expandable region 
      - THEN its name should clearly describe its purpose and match the visible label 
         - AND its role should be expressed 

4. Scenario: Test device OS settings for text resize

   - WHEN I adjust the device text resize setting to 200%
      - THEN the text on the expandable region should resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/expandable](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/expandable)


## iOS Developer Notes
There is no native expandable or accordion element for iOS.  The notes below are suggestions and accessibility guidance.

### General Notes
- An expandable region is a view that shows items in a two-level list; groups which can individually be expanded to show its children.
- The expand/collapses indicator (caret) is not focused separately.  As part of a table row/list view, the label, images and other non-interactive content in the row are usually announced together. The caret shows the state, which should be announced as part of the whole row announcement.
- When the row is activated to expand, the focus stays on that row and does not automatically move to the new content.
- Name, Role, State must be stated in a single announcement when focus is on the control area (caret icon should not gain focus alone).

### Name
- Programmatic name describes the purpose of the control.
- If visible text label exists, the programmatic name should match the visible text label.
    - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognition.

- **UIKit**
  - You can programmatically set the visible label with `setTitle()`.
    - The expandable region title will overwrite the expandable region `accessibilityLabel`.
  - If a visible label is not applicable in this case, set the expandable region `accessibilityLabel` to the label of your choice.
    - To do this in Interface Builder, set the label using the Identity Inspector
  - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
  - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

- **SwiftUI**
  - If no visible label, use view modifier `accessibilityLabel(_:)`.


### Role
- When using non-native controls (custom controls), roles will need to be manually coded.

- **UIKit**
  -   Use `UIButton`

- **SwiftUI**
  - Use native `DisclosureGroup` view

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
  - Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new `accessibilityElement`.

### State 
- Append “expanded” or “collapsed” to the `accessibilityLabel` or `accessibilityValue` of the button (with logic)

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
- “Amenities, 2 Hotel amenities selected, collapsed, double tap to activate”  (Label, data, state, role/action)

## Android Developer Notes
### General Notes
- An expandable region is a view that shows items in a two-level list; groups which can individually be expanded to show its children.
- The expand/collapses indicator (caret) is not focused separately.  As part of a table row/list view, the label, images and other non-interactive content in the row are usually announced together. The caret shows the state, which should be announced as part of the whole row announcement.
- When the row is activated to expand, the focus stays on that row and does not automatically move to the new content.
- Name, Role, State must be stated in a single announcement when focus is on the control area (caret icon should not gain focus alone).

### Name
- Name describes the purpose of the control
- Programmatic name matches the visible text label (if any)

- **Android Views**
  - `android:text` XML attribute
  - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements (icons) without a visible label
  - `contentDescription` overrides `android:text`
  - Use `labelFor` attribute to associate the visible label with the control

- **Jetpack Compose**
  - Compose uses semantics properties to pass information to accessibility services.
  - Example specification of `contentDescription` in compose: `modifier = Modifier.semantics { contentDescription = "" }`

### Role
- When not using native controls (custom controls), roles will need to be manually coded.

- **Android Views**
  - use native `Button`

- **Jetpack Compose**
  - use foundation views to create an expandable list ([Source](https://proandroiddev.com/expandable-lists-in-jetpack-compose-b0b78c767b4))

### Groupings
- Group visible label with button, if applicable, to provide a programmatic name for the button.
- **Android Views**
  - `ViewGroup`
  - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.

- **Jetpack Compose**
  - `Modifier.semantics(mergeDescendants = true) {}` is equivalent to `importantForAccessibility` when compared to android views
  - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State

- **Android Views**
  - Use `AccessibilityNodeInfoCompat.ACTION_EXPAND` 
  - Use `AccessibilityNodeInfoCompat.ACTION_COLLAPSE`

- **Jetpack Compose**
  - `expandedState`

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

### Announcement examples
- “Amenities, 2 Hotel amenities selected, collapsed, double tap to activate”  (Label, data, state, role/action)

