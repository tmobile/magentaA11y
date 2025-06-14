## General Notes

How to test a chip

## Videos

### Andriod Talkback
<video controls>
  <source src="media/video/native/chip/chip-AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a chip

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Focus visibly moves to the chip
   - Space: Any elements inside are activated on iOS and Android
   - Enter: Any elements inside are activated on Android
2. Test mobile screenreader gestures

   - Swipe: Focus moves to the element, expresses its state, if applicable
   - Doubletap: Activates the chip

3. Listen to screenreader output on all devices

   - Name: Purpose is clear and matches the group visible label or chip label
   - Role: Identifies as a button in iOS and "double tap to activate" or checkbox in Android
   - Group: n/a
   - State: Expresses its state (selected/disabled/dimmed)

4. Test device settings

   - Text resize: Text can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/chip](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/chip)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a chip

GIVEN THAT I am on a screen with a chip

1. Scenario: Test keyboard actions

   - WHEN I press the "TAB", "ARROW KEYS", or "CTRL+TAB" 
      - THEN the focus should visibly move to the chip 
   - WHEN I press the "SPACEBAR" key 
      - THEN any elements inside the chip should be activated on iOS and Android 
   - WHEN I press the "ENTER" key 
      - THEN any elements inside the chip should be activated on Android

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate to the chip 
      - THEN the focus should move to the chip 
         - AND the chip's state should be expressed, if applicable 
   - WHEN I double-tap the chip 
      - THEN the chip should be activated

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader reads the chip 
      - THEN its name should clearly describe its purpose and match the group visible label or chip label 
         - AND its role should be identified as a button in iOS and as "double tap to activate" or checkbox in Android 
         - AND its state (SELECTED, DISABLED, DIMMED) should be expressed if applicable 

4. Scenario: Test device OS settings for text resize

   - WHEN I adjust the device text resize setting to 200% 
      - THEN the text label should resize up to 200% without losing information 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/chip](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/chip)

## iOS Developer Notes
There is no native chip element for iOS.  The notes below are suggestions and accessibility guidance.

### General Notes
- Chips are compact elements that represent an input, attribute, or small actions on a current screen
- Often, a list of chips/filters has one label identifying the purpose of the group
- Because the group label conveys the purpose, the value text label for a chip that is a dropdown, identifies the chip
- The chip can announce as a checkbox, button or dropdown
- Touch target for each chip should meet a minimum of 48 x 48px

### Role
- See Button, Dropdown or checkbox components for guidance
  
### Announcement example  (will vary with implementation)
- "Selected, label, filter, button, list start" (selected state)
- "Not selected, label, filter, button" (unselected state) 

## Android Developer Notes
### General Notes
- Chips are compact elements that represent an input, attribute, or small actions on a current screen
- Often, a list of chips/filters has one label identifying the purpose of the group
- Because the group label conveys the purpose, the value or choice text label identifies the chip
- The chip can announce as a checkbox, button or dropdown
- Touch target for each chip should meet a minimum of 48 x 48px

### Name
-   Programmatic name describes the purpose of the control and matches the visible label, if there is one

**Android Views**
  - `android:text` XML attribute
  - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements (icons) without a visible label
  - `contentDescription` overrides `android:text`
  - Use `labelFor` attribute to associate the visible label with the control
**Jetpack Compose**
  - Compose uses semantics properties to pass information to accessibility services.
  - The built-in Chip composable will fill the semantics properties with information inferred from the composable by default.
  - Optional: use `contentDescription` for a more descriptive name to override the default visible label of the Chip text.
  - Example specification of contentDescription in compose: `modifier = Modifier.semantics { contentDescription = "" }`

### Role
- When not using native controls (custom controls), roles will need to be manually coded.
- By default the role is button for chips with actions like AssistChip and SuggestionChip. If the chips are selectable as FilterChip or InputChip, the role is checkbox
**Android Views**
  - Material `Chip`
**Jetpack Compose**
  - `AssistChip`, `ElevatedAssistChip`
  - `FilterChip`, `ElevatedFilterChip`
  - `InputChip`
  - `SuggestionChip`, `ElevatedSuggestionChip`

### Groupings
- Sometimes a visible label is provided.  Associate or group label with chip to provide a programmatic name

**Android Views**
  - `ViewGroup`
  - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.
**Jetpack Compose**
  - `Modifier.semantics(mergeDescendants = true) {}` is equivalent to `importantForAccessibility` when compared to android views
  - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State
**Android Views**
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`. Announcement: disabled
**Jetpack Compose**
  - Active: default state is active and enabled. Use `AssistChip(enabled = true)` to specify explicitly
  - Disabled:  `AssistChip(enabled = false)` announces as disabled
  - Alternatively can use `modifier = Modifier.semantics { disabled() }` to announce as disabled
  - Use `modifier = Modifier.semantics { stateDescription = "" }` to have a customized state announcement

### Focus
- Only manage focus when needed. Primarily, let the device manage default focus
- Consider how focus should be managed between child elements and their parent views
- External keyboard tab order often follows the screen reader focus, but sometimes needs focus management

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
**Jetpack Compose**
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
**Jetpack Compose**
```java
AssistChip(
    onClick = { /* Do something! */ },
    label = { Text("Assist Chip") },
    leadingIcon = {
        Icon(
            Icons.Filled.Settings,
            contentDescription = "Localized description",
            Modifier.size(AssistChipDefaults.IconSize)
        )
    }
)
```


### Announcement example  (will vary with implementation, version and device)
- "Selected, label, index, checkbox"   (selected state)
- "Not selected, label, double tap to select filter, checkbox, double tap to toggle"   (unselected state) 
- “In-list filters” does not always get announced on each chip
