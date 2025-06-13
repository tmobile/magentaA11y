## General Notes

How to test a radio button

## Condensed

### #a11y - Native App Accessibility Acceptance Criteria

How to test a radio button

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Focus visibly moves to the radio button
   - Spacebar: Activates on iOS and Android
   - Enter: Activates on Android

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the element, expresses its name, role, and state
   - Doubletap: Toggles the radio button state

3. Listen to screenreader output on all devices

   - Name: Purpose is clear and matches any visible label
   - Role: Identifies itself as a button in iOS and radio button in Android
   - Group: Visible label can be grouped or associated with the radio button in a single swipe
   - State: Expresses its state (disabled/dimmed, iOS: checked/unchecked, selected/unselected. Android: checked/not checked)

4. Device OS Settings

   - Text resize: Text label can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/radio-button](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/radio-button)

## Gherkin

### #a11y - Native App Accessibility Acceptance Criteria

How to test a radio button

GIVEN THAT I am on a screen with a radio button

1. Scenario: Test keyboard actions 

   - WHEN I press the "TAB", "ARROW KEYS", or "CTRL+TAB" 
      - THEN the focus should visibly move to the radio button 
   - WHEN I press the "SPACEBAR" key 
      - THEN the radio button should be activated on iOS and Android 
   - WHEN I press the "ENTER" key 
      - THEN the radio button should be activated on Android 

2. Scenario: Test mobile screen reader gestures 

   - WHEN I swipe to navigate to the radio button 
      - THEN the focus should move to the radio button 
         - AND the radio button's name, role, and state should be expressed 
   - WHEN I double-tap the radio button 
      - THEN the radio button state should toggle 

3. Scenario: Test screen reader output on all devices 

   - WHEN a screen reader reads the radio button 
      - THEN its name should clearly describe its purpose and match any visible label 
         - AND its role should be identified as a button in iOS and as a radio button in Android 
         - AND its visible label should be grouped or associated with the radio button in a single swipe 
         - AND its state (DISABLED/DIMMED, iOS: CHECKED/UNCHECKED, SELECTED/UNSELECTED, Android: CHECKED/NOT CHECKED) should be expressed 

4. Scenario: Test device OS settings for text resize 

   - WHEN I adjust the device text resize setting to 200% 
      - THEN the text label should resize up to 200% without losing information 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/radio-button](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/radio-button)

## Videos

### iOS VoiceOver

<video controls>
  <source src="media/video/native/radio-button/radioButtonIosVoiceover.mp4" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback
<video controls>
  <source src="media/video/native/radio-button/radioButtonAndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## iOS Developer Notes

   - Radio buttons allow a user to select one item from a predefined list of options
   - A radio button should toggle between selected and unselected states. It should not automatically navigate the user to another field or screen when selected, as that may cause a change of context. Revealing new information on the same screen as a result of activating a radio button is ok, as it is usually not a change of context
   - Name, Role, State must be announced when focus is on the control. Announcing the label in the swipe before the radio button does not meet this requirement

### Name

   - Programmatic name describes the purpose of the control.
   - If a visible text label exists, the programmatic name should match the visible text label.
      - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.
   - Placeholder text is NOT the programmatic name.

#### **UIKit**
   - You can programmatically set the visible label with `setTitle()`.
      - The radio button's title will overwrite its `accessibilityLabel`.
   - If a visible label is not applicable in this case, set the radio button's `accessibilityLabel` to the label of your choice.
      - To do this in Interface Builder, set the label using the Identity Inspector
   - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
   - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

#### **SwiftUI**
   - By default, the visible label of a radio group is the accessibility label of that radio group
      - The visible label of each radio button within a radio group is the accessibility label of that radio button
   - If no visible label, use view modifier `accessibilityLabel(_:)` and assign to the radio group and/or individual radio buttons accordingly.

### Role

   - When using non-native controls (custom controls), roles will need to be manually coded.

#### **UIKit**
   - Since there is no native radio button in UIKit, you can implement a custom radio button by using `UIButton`, `UISwitch`, `UIControl`, or another class.
   - If necessary, set `accessibilityTraits` to `.button`. Be sure to set the accessibility value to either "Selected"/"Checked" or "Unselected"/"Unchecked" to indicate that this control behaves as a radio button.
   - An alternative to setting the accessibility trait to `.button` is removing and hiding the accessibility trait using `accessibilityTraits.remove(:)`. Then, append ", Radio Button" or ", Button" to the programmatic name

#### **SwiftUI**
   - Use a native `Picker` view with `.pickerStyle(.radioGroup)` 

### Groupings

   - Group visible label with radio button, if applicable, to provide a programmatic name for the radio button.
   - Group the units such that the label, role, and state of the radio button is announced in a single announcement.

#### **UIKit**
   - Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
   - Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
      - If frame does not exist, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
         - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
      - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
      - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.

#### **SwiftUI**
   - Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.
   - If the tap gesture is removed due to grouping logic, restore the tap gesture functionality using bindings to bind the tap gesture of the container with the state of the checkbox.

### State 

#### **UIKit**
   - For checked state: Set `accessibilityValue` to "Selected" or "Checked"
   - For unchecked state: Optionally, set `accessibilityValue` to "Unselected" or "Unchecked"
   - For enabled state: Set `isEnabled` to `true`.
   - For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
      - If necessary, you may change the accessibility trait of the button to `notEnabled`, but this may overwrite the current accessibility role of the button.

#### **SwiftUI**
   - For checked state, if necessary: Set accessibility value to "Selected" or "Checked" with `accessibility(:)`
   - For unchecked state, if necessary: Set accessibility value to "Unselected" or "Unchecked" with `accessibilityValue(:)`
   - For disabled, use view modifier `disabled()`

### Focus

   - Use the device's default focus functionality. 
   - Consider how focus should be managed between child elements and their parent views.
   - External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.
   - When a bottom navigation bar element is activated, the next screen's initial focus should stay in the bottom navigation bar. 

#### **UIKit**
   - If VoiceOver is not reaching a particular element, set the element's `isAccessibilityElement` to `true`
      - **Note:** You may need to adjust the programmatic name, role, state, and/or value after doing this, as this action may overwrite previously configured accessibility.
   - Use `accessibilityViewIsModal` to contain the screen reader focus inside the modal.
   - To move screen reader focus to newly revealed content, use `UIAccessibility.post(notification:argument:)` that takes in `.screenChanged` and the newly revealed content as the parameter arguments.
   - To NOT move focus, but dynamically announce new content: use `UIAccessibility.post(notification:argument:)` that takes in `.announcement` and the announcement text as the parameter arguments.
   - `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements.  

#### **SwiftUI**
   - For general focus management that impacts both screen readers and non-screen readers, use the property wrapper `@FocusState` to assign an identity of a focus state.
      - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:)` to assign focus on a view with `@FocusState` as the source of truth.
      - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
   - If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.

### Announcement examples

   - "button" in announcements below comes from the accessibility services most of the time when a native component is used, not from the label. Options for announcements below depend on framework and versions. Announcement order can vary.
   - "Label, button"
   - "Label, button, selected" (selected state)
   - "Label, dimmed, button" (disabled state)

## Android Developer Notes

   - Radio buttons allow users to select an item from a predefined list of options
   - Use a native element rather than a custom element because it will announce the correct built-in screen reader announcements without additional development effort
   - A radio button should toggle between selected and unselected states. It should not automatically navigate the user to another field or screen when selected, as that may cause a change of context. Revealing new information on the same screen as a result of activating a radio button is ok, as it is usually not a change of context
   - Name, Role, State must be announced when focus is on the control. Announcing the label in the swipe before the radio button does not meet this requirement

### Name

   - Programmatic name describes purpose while focus is on the control (or on the whole table row/blade)
   - Programmatic name matches the visible text label

#### **Android Views**
   - `android:text` XML attribute
   - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements without a visible label
   - `contentDescription` overrides `android:text`
   - Use `labelFor` attribute to associate the visible label with the control (Best practice)

#### **Jetpack Compose**
   - Radiobutton compose class combined with Text is used
   - Recommended to use Row layout to allow for entire row to be selectable
   - Use the `click` on the row for selection event and nullify the `click` on the RadioButton.
   - Optional: use `contentDescription` for a more descriptive name to override the default visible label of the button text.
   - Example specification of contentDescription in compose: `modifier = Modifier.semantics { contentDescription = "" }`

### Role

   - Role is automatically announced if a native component is used
   - When not using native controls (custom controls), roles will need to be manually coded.

#### **Android Views**
   - Standard RadioButton with RadioGroup when applicable
   - Announced as: "Radio Button, double tap to toggle"

#### **Jetpack Compose**
   - Simple `RadioButton` composable.
   - In case of radio button group, use `Column(Modifier.selectableGroup())` to add radio buttons as child views.
   - Alternatively use checkbox composable in combination with `Row` or `Colum` and `toggleable(role = Role.RadioButton)`. Code example above.
   - Announced as "Radio Button, double tap to toggle"

### Groupings

   - Group visible label with radio button (label and radio button can be grouped together in a tableview/row/blade - one swipe) to provide a programmatic name for the button
   - Or use `labelFor` (Android)
   - Ensure that number of items in the group are announced, while grouping by default allows to make single selection from the set of radio buttons.   
   - Using `selectableGroup()` announces the number of items.

#### **Android Views**
   - ViewGroup
   - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. 
   - In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement

#### **Jetpack Compose**
   - Radiobutton can be combined with Text into either a Column or Row layout to get radio group-like behaviour so the entire layout is selectable.
   - To ensure correct accessibility behavior `Modifier.selectableGroup()` is essential.
   - `Modifier.semantics(mergeDescendants = true) {}` is equivalent to `importantForAccessibility` when compared to android views
   - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State

   - States can be selected, dimmed/disabled, checked/unchecked, on/off

#### **Android Views**
   - Active: `android:enabled=true`
   - Disabled: `android:enabled=false`
   - on/off: `isChecked`, `setChecked`
   - Announcement: disabled, checked/not checked

#### **Jetpack Compose**
   - Active: default state is active and enabled. Use `RadioButton(enabled = true)` to specify explicitly
   - Disabled:  `RadioButton(enabled = false)` announces as disabled
   - Alternatively can use `modifier = Modifier.semantics { disabled() }` to announce as disabled
   - Use `modifier = Modifier.semantics { stateDescription = "" }` to have a customized state announcement

### Focus

   - Only manage focus when needed. Primarily, let the device manage default focus order.
   - Consider how focus should be managed between child elements and their parent views or containers
   - External keyboard tab order often follows the screen reader focus, but sometimes needs focus management

#### **Android Views**
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

#### **Jetpack Compose**
   - `Modifier.focusTarget()` makes the component focusable
   - `Modifier.focusOrder()` needs to be used in combination with FocusRequesters to define focus order
   - `Modifier.onFocusEvent()`, `Modifier.onFocusChanged()` can be used to observe the changes to focus state
   - `FocusRequester` allows to request focus to individual elements with in a group of merged descendant views
   - *Example:* To customize the focus events behaviour or the sequence of focus,
      - step 1: define the focus requester prior. `val (first, second) = FocusRequester.createRefs()`
      - step 2: update the modifier to set the order. `modifier = Modifier.focusOrder(first) { this.down = second }`
      - focus order accepts following values: up, down, left, right, previous, next, start, end
      - step 3: use `second.requestFocus()` to gain focus


### Announcement examples 

- "button" in announcements below comes from the accessibility services most of the time when a native component is used, not from the label. Options for announcements below depend on framework and versions. Announcement order can vary.
- "Checked, label, radio button, double tap to toggle" (selected state)
- "Not checked, label, radio button, double tap to toggle" (unselected state)
- "Not checked, label, radio button, double tap to select" (unselected state)
