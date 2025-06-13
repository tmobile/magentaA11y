## General Notes

How to test a toggle switch

## Videos

### iOS VoiceOver

<video controls>
  <source src="media/video/native/toggle-switch/toggle-switch_IosVoiceover.mp4" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback

<video controls>
  <source src="media/video/native/toggle-switch/toggle-switch_AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a toggle switch

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Focus visibly moves to the switch or table row with switch
   - Spacebar: Activates on iOS and Android
   - Enter: Activates on Android

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the element, expresses its name, role, state
   - Doubletap: Element toggles between states

3. Listen to screenreader output on all devices

   - Name: Purpose is clear and matches any visible label
   - Role: Identifies itself as a switch button in iOS and switch in Android
   - Group: Visible label is grouped or associated with the switch in a single swipe
   - State: Express its state (disabled/dimmed, on/off)

4. Test device settings

   - Text resize: Text can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/toggle-switch](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/toggle-switch)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a toggle switch

GIVEN THAT I am on a screen with a toggle switch

1. Scenario: Test keyboard actions

   - WHEN I press the "TAB" key, "ARROW" keys, or "CTRL+TAB" keys 
      - THEN the focus should visibly move to the toggle switch or table row with a toggle switch 
   - WHEN I press the "SPACEBAR" key 
      - THEN the toggle switch or table row with a toggle switch should be activated on iOS and Android 
   - WHEN I press the "ENTER" key 
      - THEN the toggle switch or table row with a toggle switch should be activated on Android 

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate to the toggle switch or table row with a toggle switch 
      - THEN the focus should move to the toggle switch or table row with a toggle switch 
         - AND its state should be expressed 
   - WHEN I double-tap the toggle switch or table row with a toggle switch 
      - THEN the toggle switch or table row with a toggle switch should toggle between the two states (OFF/ON, DISABLED/DIMMED, ENABLED/DISABLED, CHECKED/NOT CHECKED) 

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader reads the toggle switch or table row with a toggle switch 
      - THEN its name should clearly describe its purpose and match the visible label 
         - AND its role should be identified as "switch button" on iOS, it should instruct "double tap to toggle/activate setting" 
         - AND its role should be identified as "switch" on Android, it should instruct "double tap to activate/toggle" 
         - AND the visible label should be grouped or associated with the toggle switch in a single swipe 
         - AND its state (OFF/ON, DISABLED/DIMMED, ENABLED/DISABLED, CHECKED/NOT CHECKED) should be expressed

4. Scenario: Test device OS settings for text resize

   - WHEN the text resize setting is increased up to 200% 
      - THEN the text within the toggle switch or table row with a toggle switch should remain readable without losing information or functionality 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/toggle-switch](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/toggle-switch)

## iOS Developer Notes
### General Notes

   - A switch, or toggle, has two mutually exclusive states — on and off
   - You should implement a native switch when at all possible vs a custom switch, as it will automatically and correctly announce the role without additional development effort
   - Name, Role, State must be announced by the screen reader when focus is on the control, if it is isolated in the table row. Announcing the label in the swipe before the switch and not on the switch does not meet this requirement
   - In a table row, the label, any images, and switch are grouped together in one swipe

### Name

   - Programmatic name describes the purpose of the control.
   - If visible text label exists, the programmatic name should match the visible text label.
      - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.
   - When naming a switch, do not add "switch" or "button" to the programmatic name.

   - **UIKit**

      - You can programmatically set the visible label with `setTitle()`.
         - The switch's title will overwrite its `accessibilityLabel`.
      - If a visible label is not applicable in this case, set the switch's `accessibilityLabel` to the label of your choice.
         - To do this in Interface Builder, set the label using the Identity Inspector
      - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
      - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

   - **SwiftUI**

      - If no visible label, use view modifier `accessibilityLabel(_:)`.
      - If table row of switch has icon(s), hide the icon(s) from VoiceOver by using view modifier `accessibilityHidden(true)`.

### Role

   - When using non-native controls (custom controls), roles will need to be manually coded.

   - **UIKit**

      - Use `UIButton` or `UISwitch`
      - If necessary, set `accessibilityTraits` to `.button`

   - **SwiftUI**

      - Use native `Toggle` view
      - Native behavior does not announce role, but the role is implied by announcing the current state

### Groupings

   - Group visible label with switch, if applicable, to provide a programmatic name for the switch.

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

      - For checked state: Set `accessibilityValue` to "On"
         - For unchecked state: Optionally, set `accessibilityValue` to "Off"
      - For enabled: Set `isEnabled` to `true`.
      - For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
         - If necessary, you may change the accessibility trait of the button to `notEnabled`, but this may overwrite the current accessibility role of the button.

   - **SwiftUI**

      - By default, the `Toggle` view announces "On" or "Off"
      - For disabled, use view modifier `disabled()`.

### Focus

   - Use the device's default focus functionality.
   - Screen reader focus should be around the entire tablerow/blade when there is one interactive element (switch) 
   - Consider how focus should be managed between child elements and their parent views.
   - External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.

   - **UIKit**

      - Focus should be around the entire row that has the switch
      - If VoiceOver is not reaching a particular element, set the element's `isAccessibilityElement` to `true`
         - **Note:** You may need to adjust the programmatic name, role, state, and/or value after doing this, as this action may overwrite previously configured accessibility.
      - Use `accessibilityViewIsModal` to contain the screen reader focus inside the modal.
      - To move screen reader focus to newly revealed content, use `UIAccessibility.post(notification:argument:)` that takes in `.screenChanged` and the newly revealed content as the parameter arguments.
      - To NOT move focus, but dynamically announce new content: use `UIAccessibility.post(notification:argument:)` that takes in `.announcement` and the announcement text as the parameter arguments.
      - `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements. 

   - **SwiftUI**

      - Focus should be around the entire row that has the switch
      - For general focus management that impacts both screen readers and non-screen readers, use the property wrapper `@FocusState` to assign an identity of a focus state.
         - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:)` to assign focus on a view with `@FocusState` as the source of truth.
         - Use the property wrapper `@FocusState`in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
      - If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.

### Announcement examples

   - “Label, off, double tap to toggle setting” (On or off)
   - “Label, off, switch button, double tap to toggle setting” (On or off)
   - “Label, dimmed, switch button, off” (Disabled state)

## Android Developer Notes
### General Notes

   - A switch, or toggle, has two mutually exclusive states — on and off
   - You should implement a native switch when at all possible vs a custom switch, as it will automatically and correctly announce the role without additional development effort
   - Name, Role, State must be announced by the screen reader when focus is on the control, if it is isolated in the table row. Announcing the label in the swipe before the switch and not on the switch does not meet this requirement
   - In a table row, the label, any images, and switch are grouped together in one swipe

### Name

   - Name describes purpose while focus is on the control (or on the whole table row)
   - Name should match the visible label, if any, or text in the table row

   - **Android View** 

      - `android:text` XML attribute
      - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements without a visible label
      - `contentDescription` overrides `android:text` 
      - Use `labelFor` attribute to associate the visible label with the control (Best practice)

   - **Jetpack Compose**

      - Use material3 `Switch` composable for the toggle switch and add the modifier `contentDescription` value for providing the content description if no separate text view for the switch.
      - When there is a text view in the row for the toggle switch, then group them as single composable, use the modifier `toggleable` with the role of `Switch`, then the accessibility focus can focus on the whole table row and pronounce the correct programmatic name and content description.

### Role

   - Role is automatically announced if a native component is used
   - When not using native controls (custom controls), roles will need to be manually coded.

   - **Android View**

      - Standard Switch widget when applicable
      - "double tap to activate" or "double tap to toggle" is expected announcement

   - **Jetpack Compose**

      - Standart material `Switch` composable
      - Row with Switch and text view, use `Modifier.toggleable()` with role of `Switch`

### Groupings

   - Group visible label/text with switch (label and switch can be grouped together in a tableview/row/blade - all in one swipe)

   - **Android View**

      - `ViewGroup`
      - Set the container objects `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement

   - **Jetpack Compose**

      - Use with `Modifier.toggleable()` in the container will perform the grouping for the inside components automatically

### State

   - States can be selected, dimmed/disabled, on/off, checked/unchecked

   - **Android View**

      - Active: `android:enabled=true`
      - Disabled: `android:enabled=false`
      - on/off: `isChecked`, `setChecked`
      - Announcement: "disabled", "on"/"off", "double tap to activate" or "double tap to toggle"

   - **Jetpack Compose**

      - Active: `enabled=true`
      - Disabled: `enabled=false`
      - on: `checked=true` 
      - off: `checked=false` 

### Focus

   - Only manage focus when needed. Primarily, let the device manage default focus order
   - Screen reader focus should be around the entire tablerow/blade when there is one interactive element (switch) 
   - Consider how focus should be managed between child elements and their parent views or containers
   - External keyboard tab order often follows the screen reader focus, but sometimes needs focus management

   - **Android View**

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

### Code Examples

   - **Jetpack Compose**

```java
@Composable
Row(
    modifier = Modifier .toggleable(
        value = <Switch On-Off>,
        role = Role.Switch,
        onValueChange = <onValueChange>
    )
) {
    Switch(
        checked = <Switch On-Off>,
        onCheckedChange = null
    )
    Text(text = <Switch Content Text>)
}
```

### Announcement examples

   - “On, label, Switch, double tap to toggle” (On or Off)
   - “Off, label, Switch, disabled” (Disabled state)
