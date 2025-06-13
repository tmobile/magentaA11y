## General Notes

How to test a calendar date picker

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a calendar date picker

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Focus visibly moves to the picker
   - Spacebar: Selects and opens the picker on iOS and Android
   - Enter: Selects and opens the picker on Android

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the element, expresses its name, role, value & state (if applicable)
   - Doubletap: Selects and opens picker

3. Listen to screenreader output on all devices

   - Name: Purpose is clear and matches any visible label
   - Role: Identifies itself as a button in iOS and "double tap to activate" in Android
   - Group: Group visible label with control that opens picker
   - State: Expresses its state (disabled/dimmed)

4. Test device settings

   - Text resize: Text can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/calendar-date-picker](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/calendar-date-picker)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a calendar date picker

GIVEN THAT I am on a screen with a calendar date picker

1. Scenario: Test keyboard actions

   - WHEN the user presses "TAB", Arrow Keys, or "CTRL+TAB" 
      - THEN the focus visibly moves to the picker
   - WHEN the user presses "SPACEBAR" on iOS or Android 
      - THEN the picker is selected and opens 
   - WHEN the user presses "ENTER" on Android 
      - THEN the picker is selected and opens 

2. Scenario: Test mobile screen reader gestures

   - WHEN the user swipes to the picker element 
      - THEN focus moves to the element and announces its Name, Role, Value, and State (if applicable) 
   - WHEN the user performs a double-tap gesture 
      - THEN the picker is selected and opens 

3. Scenario: Test screen reader output on all devices

   - WHEN the user swipes to the picker element 
      - THEN the picker must be announced with the following attributes: 
         - AND the Name must clearly describe the purpose and match any visible label 
         - AND the Role must be identified as a "Button" in iOS and "Double tap to activate" in Android 
         - AND the Group must have the visible label grouped with the control that opens the picker 
         - AND the State must express its state (DISABLED/DIMMED) 

4. Scenario: Test device OS settings for text resize

   - WHEN a user adjusts text resizing settings up to 200% 
      - THEN all text must remain readable without loss of information 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/calendar-date-picker](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/calendar-date-picker)

## iOS Developer Notes
### General Notes

   - Use native app calendar date pickers when possible vs a custom element, as the native app picker will handle expected behavior without additional development effort
   - Calendar image often needs alt text and is sometimes grouped with the label of the field
   - The native calendar has a few circles for selected dates, but there are limitations in the colors resulting in insufficient color contrast minimum ratios, as well as the color for the days of the week
   - Natively, VoiceOver announces the disabled/unavailable dates as dimmed
   - The month is adjustable (swipe up or down to change) and can also be changed via the wheel picker with double tap
   - Arrow buttons to change the month and year and not in the swipe order for the screen reader, since there is an alternate way to change the dates

### Name

   - Programmatic name describes the purpose of the control.
   - It is the name of the element that opens the date picker.
   - If visible text label exists, the programmatic name should match the visible text label.
      - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.
   - Placeholder or value text is NOT the programmatic name

   - **UIKit**

      - You can programmatically set the visible label with `setTitle()`.
         - Setting the triggering element's title will overwrite its `accessibilityLabel`.
      - If a visible label is not applicable in this case, set the trigger's `accessibilityLabel` to the label of your choice.
         - To do this in Interface Builder, set the label using the Identity Inspector
      - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
      - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

   - **SwiftUI**

      - If no visible label, use view modifier `accessibilityLabel(_:)`

### Role

   - **UIKit**

      - Use `UIDatePicker` (It is a custom subclass of `UIPickerView` so the functionality and accessibility between the two will be similar)

   - **SwiftUI**

      - Use native `DatePicker` view
      - If applicable, use view modifier `accessibilityRemoveTraits(:)` to remove unwanted traits

### Groupings

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

   - By default, disabled or unavailable dates are announced as "dimmed"

   - **UIKit** 

      - For enabled trigger element: Set `isEnabled` to `true`.
      - For disabled trigger element: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
         - If necessary, you may change the accessibility trait of the button to `notEnabled`, but this may overwrite the current accessibility role of the button.

   - **SwiftUI**

      - For disabled, use view modifier `disabled()`.

### Focus

- Use the device's default focus functionality. 
- External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.
- Initial focus on a screen should land in a logical place, such as back button, screen title, close button, first text field, or first heading.
- When the date picker is closed, the focus should return to the triggering element.

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

   - “Double tap to dismiss pop up window” (First invisible element) (on later versions)
   - Header announces as "heading"
   - “Close, button” (Close X button)
   - “Month, button, adjustable, double tap to change month and year, swipe up or down with one finger to adjust the value” (Month and year button)
   - “Day, Date, button” (Each date)
   - “Selected, Day, Date, button” (Selected date)
   - “Day, Date, dimmed, button” (Disabled or unavailable date)

## Android Developer Notes
### General Notes

   - Date pickers can display past, present, or future dates. Clearly indicate important dates, such as current and selected days. Follow common patterns, like a calendar view
   - Time/Date pickers can be two types: dial and input
   - They are modals that cover the main content, where TalkBack users should be confined in them
   - Swipe order in the picker goes through the three months shown, the three days shown and the three years shown
   - Swiping up and down in each column rotates through the options in the column
   - Initial focus in modal can often be one of the first elements and not necessarily the heading.

### Name

   - Name describes the purpose of the control

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

### Role

   - Follow native component role

   - **Android Views**

      - DatePickerDialog 
      - See native date pickers in Gmail or Settings to determine the specific device's swipe order and behavior (Ex: Gmail-Compose-Menu-Schedule, send-Pick date & time)

   - **Jetpack Compose**

      - `DatePicker`
      - `DatePickerDialog`
      - `DateRangePicker`

### Groupings

   - N/A

   - **Android Views**

      - Follow native component grouping

   - **Jetpack Compose**

      - Follow native component grouping

### State

   - **Android Views**

      - Active: `android:enabled=true`
      - Disabled: `android:enabled=false`. Announcement: "disabled"

   - **Jetpack Compose**

      - Active: default state is active and enabled. Use `Tab(enabled = true)` to specify explicitly
      - Disabled: `Tab(enabled = false)` announces as "disabled"
      - Alternatively can use `modifier = Modifier.semantics { disabled() }` to announce as "disabled"

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

### Code Example

   - **Jetpack Compose**

```java
Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    val state = rememberDatePickerState(initialDisplayMode = DisplayMode.Input)
    DatePicker(state = state, modifier = Modifier.padding(16.dp))
}
```

### Announcement examples

   - “Name, edit box, Double-tap and hold to long press. Actions available, use Tap with 3 fingers to view” (On Edit box to open TalkBack Actions menu)
   - “Show date picker button, double tap to activate” (Down arrow to open picker)
   - “Day, date” (Title or heading)
   - “Option (day or date) button, Swipe up or swipe down to adjust. Double tap to activate. Double tap and hold to long press” (On each day/date in column) (Double tap and hold to long press will rotate quickly through the column)
   - “Cancel button, double tap to activate” (CTA with “Set” as the other action)
