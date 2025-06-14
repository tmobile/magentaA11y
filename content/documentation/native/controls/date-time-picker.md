## General Notes

How to test a date time picker

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a date time picker

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Focus visibly moves to the picker
   - Spacebar: Selects and opens the picker on iOS and Android
   - Enter: Selects and opens the picker on Android

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the element, expresses its name, role, value
   - Doubletap: Selects and opens picker
   - Swipe up or down: Focus moves to next item in picker (iOS) or next item in column (Android), expresses its name, role 

3. Listen to screenreader output on all devices

   - Name: Purpose is clear and matches any visible label
   - Role: Identifies itself as a button/adjustable in iOS and button or "double tap to activate" in Android
   - Group: n/a
   - State: Expresses its state (disabled/dimmed)

4. Test device settings

   - Text resize: Text can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/inputs/date-time-picker](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/inputs/date-time-picker)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a date time picker

GIVEN THAT I am on a screen with a date time picker

1. Scenario: Test keyboard actions

   - WHEN the user presses "TAB", Arrow Keys, or "CTRL+TAB" 
      - THEN the focus must visibly move to the picker 
   - WHEN the user presses "SPACEBAR" on iOS or Android 
      - THEN the time/date picker must be selected and opened 
   - WHEN the user presses "ENTER" on Android 
      - THEN the time/date picker must be selected and opened 

2. Scenario: Test mobile screen reader gestures

   - WHEN the user swipes to the picker 
      - THEN the screen reader must announce the picker’s Name, Role, and Value 
   - WHEN the user performs a double-tap gesture 
      - THEN the time/date picker must be selected and opened 
   - WHEN the user swipes up or down on iOS or Android 
      - THEN the focus must move to the next item in the picker (iOS) or next item in the column (Android) 
         - AND the screen reader must announce the Name and Role of the next item 

3. Scenario: Test screen reader output on all devices

   - WHEN the user swipes to the picker 
      - THEN the time/date picker must be announced with the following attributes: 
         - AND the Name must clearly describe the purpose and match any visible label 
         - AND the Role must be identified as "Button/Adjustable" in iOS and "Button" or "Double tap to activate" in Android 
         - AND the Group must be marked as not applicable (N/A) 
         - AND the State must announce the picker’s state (e.g., DISABLED/DIMMED) 

4. Scenario: Test device OS settings for text resize

   - WHEN the user adjusts text resizing settings up to 200% 
      - THEN all text must remain readable without loss of information 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/inputs/date-time-picker](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/inputs/date-time-picker)

## iOS Developer Notes
### General Notes

   - For iOS, VoiceOver generally moves focus to the picker options when it opens
   - A "Done" button closes picker
   - Screen reader focus should move back to the button that opened the picker originally
   - At first swipe to the input, it may announce as a textfield, but once clicked on you will hear "adjustable" and now you will be inside the time/date picker

### Name

   - Programmatic name describes the purpose of the control that opens the picker.
   - If visible text label exists, the programmatic name should match the visible text label.
      - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.
   - Placeholder text is NOT the programmatic name

   - **UIKit**

      - You can programmatically set the visible label with `setTitle()`.
         - The triggering element's title will overwrite its's `accessibilityLabel`.
      - If a visible label is not applicable in this case, set the date picker's `accessibilityLabel` to the label of your choice.
         - To do this in Interface Builder, set the label using the Identity Inspector
      - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
      - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

   - **SwiftUI**

      - If no visible label is present, use view modifier `accessibilityLabel(_:)`.

#### Role

   - **UIKit**

      - Use `UIPickerView`

   - **SwiftUI**

      - Use native `Picker` view with `WheelPickerStyle`
      - If applicable, use view modifier `accessibilityRemoveTraits(:)` to remove unwanted traits.

#### Groupings

   - **UIKit**

      - Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
      - Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
         - If frame does not exist due to custom button, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
            - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
         - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
         - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.

   - **SwiftUI**

      - Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.

#### State 

   - **UIKit** 

      - For enabled: Set `isEnabled` to `true`.
      - For disabled: Set `isEnabled` to `false`.
         - If necessary, you may change the accessibility trait of the button to `notEnabled`, but this may overwrite the current accessibility role of the button.

**SwiftUI**

   - For disabled, use view modifier `disabled()`.

#### Focus

   - Use the device's default focus functionality. 
   - External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.
   - Initial focus on a screen should land in a logical place, such as back button, screen title, first text field, or first heading.
   - When the picker is closed, the focus should return to the triggering element.

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

#### Announcement examples
   - For button that opens time/date picker: "Birthday, button, activate to choose type, actions available"
   - Value is announced along with role when picker opens: "November, picker item, adjustable"
   - Announcement for disabled state is "dimmed"

## Android Developer Notes
### General Notes

   - Time pickers in Android are often created as a modal that covers over top of the main app content. Users can select hours, minutes, or periods of time. 
   - The clock or time picker toggles between two displays, the clock and a text input.
   - For this component, a TalkBack screen reader user should be confined inside the modal and not reach the content behind it.
   - The native component `TimePickerDialog` and `TimePicker` will supply the name, role, and state required for conformance.

#### Name

The name should describe the purpose of the control.

   - **Android Views**

      - `android:text` XML attribute
      - Use `contentDescription`, depending on type of view and for elements (icons) without a visible label
      - `contentDescription` overrides `android:text`
      - Use `labelFor` attribute to associate the visible label with the control

   - **Jetpack Compose**

      - By default, the programmatic name is the visible text label of the segment
      - Compose uses semantics properties to pass information to accessibility services
      - Optional: use `contentDescription` for a more descriptive name to override the default text label
      - Example specification of contentDescription in compose: `modifier = Modifier.semantics { contentDescription = "" }`

#### Role

Use the native component to give the appropriate role.

   - **Android Views**

      - `TimePickerDialog`

   - **Jetpack Compose**

      - `TimePicker`
      - `TimePickerDialog`

#### Groupings
Follow native component grouping.

#### State

   - **Android Views**

      - Active: `android:enabled=true`
      - Disabled: `android:enabled=false`. Announcement: "disabled"

   - **Jetpack Compose**

      - Active: default state is active and enabled. 
         - Use `Tab(enabled = true)` to specify explicitly
      - Disabled: `Tab(enabled = false)` announces as disabled.
         - Alternatively can use `modifier = Modifier.semantics { disabled() }` to announce as disabled.

#### Focus
   - Only manage focus when needed. Primarily, let the device manage default focus
   - Consider how focus should be managed between child elements and their parent views
   - External keyboard tab order often follows the screen reader focus, but sometimes needs focus management
   - When the time picker is closed, the focus should return to the triggering element.

**Android Views**

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
  
#### Code Example

   - **Jetpack Compose**

```java
var showTimePicker by remember { mutableStateOf(false) }
val state = rememberTimePickerState()
TimePickerDialog(
    onCancel = { showTimePicker = false },
    onConfirm = {
        val cal = Calendar.getInstance()
        cal.set(Calendar.HOUR_OF_DAY, state.hour)
        cal.set(Calendar.MINUTE, state.minute)
        cal.isLenient = false
        showTimePicker = false
    },
) {
    TimePicker(state = state)
}
```

#### Announcement examples

   - “Hour, Minutes and Period, Select Hours, Hour displayed, Double tap to select hours” Then swipe to the hours on the clock. Double tap on your selection. Swipe back to the minutes display
   - “Minute, Double tap to select minutes” Then swipe to the clock. Swipe around the clock to select the minute. Swipe back to the AM/PM display
   - “Selected, PM, Radio button, 2 of 2, Double tap to select” Selected PM option
   - “Not selected, AM, Radio button, 1 of 2, Double tap to select”
   - “Switch to text input mode for the time input, button, Double tap to activate” Set time modal is displayed (Toggled option is “clock mode”)
   - “Set time” Heading for the text input modal
   - “Type in time” Visible text label for hour/minute text input
   - “Hour, Edit box for hour, Double tap to edit text” Hour input. User explores by touch until the keyboard is found and enters the text for the minutes and hours
   - “Colon” Colon is announced to communicate a visible time display
   - “Minutes, Edit box for minute, Double tap to edit text" “Hour” and “Minute” are announced because it is visually displayed
   - “Dropdown list, PM, Double tap to change”
      - “Pop up window, checked, AM, In list, Double tap to select” Pop up list
   - “Cancel, button, double tap to activate” CTA (OK is other option)
