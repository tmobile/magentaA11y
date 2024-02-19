---
layout: entry
title:  "Chip"
categories: controls

keyboard:
  tab, arrow keys or Ctl+tab: |
    Focus visibly moves to the chip
  space: |
    Any elements inside are activated on iOS and Android
  enter: |
    Any elements inside are activated on Android

mobile:
  swipe: |
    Focus moves to the element, expresses its state, if applicable
  doubletap: |
    Activates the chip

screenreader:
  name:  |
    Purpose is clear and matches the group visible label or chip label
  role:  |
    Identifies as a button in iOS and "double tap to activate" or checkbox in Android
  group: |
    n/a
  state: |
    Expresses its state (selected/disabled/dimmed)

settings:
  text resize: |
    Text label can resize up to 200% without losing information
---
## iOS
There is no native chip element for iOS.  The notes below are suggestions and accessibility guidance.

### Developer notes
- Chips are compact elements that represent an input, attribute, or small actions on a current screen
- Often, a list of chips/filters has one label identifying the purpose of the group
- Because the group label conveys the purpose, the value text label for a chip that is a dropdown, identifies the chip
- The chip can announce as a checkbox, button or dropdown
- Touch target for each chip should meet a minimum of 48 x 48px

### Role
- See Button, Dropdown or checkbox components for guidance
  
### Announcement example  (will vary with implementation)
- "Selected, label, filter, button, list start"   (selected state)
- "Not selected, label, filter, button"   (unselected state) 

## Android

### Developer notes
- Chips are compact elements that represent an input, attribute, or small actions on a current screen
- Often, a list of chips/filters has one label identifying the purpose of the group
- Because the group label conveys the purpose, the value or choice text label identifies the chip
- The chip can announce as a checkbox, button or dropdown
- Touch target for each chip should meet a minimum of 48 x 48px

### Name
-   Programmatic name describes the purpose of the control and matches the visible label, if there is one

- **Android Views**
  - `android:text` XML attribute
  - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements (icons) without a visible label
  - `contentDescription` overrides `android:text`
  - Use `labelFor` attribute to associate the visible label with the control
- **Jetpack Compose**
  - Compose uses semantics properties to pass information to accessibility services.
  - The built-in Chip composable will fill the semantics properties with information inferred from the composable by default.
  - Optional: use `contentDescription` for a more descriptive name to override the default visible label of the Chip text.
  - Example specification of contentDescription in compose: `modifier = Modifier.semantics { contentDescription = "" }`

### Role
- When not using native controls (custom controls), roles will need to be manually coded.
- By default the role is button for chips with actions like AssistChip and SuggestionChip. If the chips are selectable as FilterChip or InputChip, the role is checkbox
- **Android Views**
  - Material `Chip`
- **Jetpack Compose**
  - `AssistChip`, `ElevatedAssistChip`
  - `FilterChip`, `ElevatedFilterChip`
  - `InputChip`
  - `SuggestionChip`, `ElevatedSuggestionChip`

### Groupings
- Sometimes a visible label is provided.  Associate or group label with chip to provide a programmatic name

- **Android Views**
  - `ViewGroup`
  - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.
- **Jetpack Compose**
  - `Modifier.semantics(mergeDescendants = true) {}` is equivalent to `importantForAccessibility` when compared to android views
  - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State
- **Android Views**
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`. Announcement: disabled
- **Jetpack Compose**
  - Active: default state is active and enabled. Use `AssistChip(enabled = true)` to specify explicitly
  - Disabled:  `AssistChip(enabled = false)` announces as disabled
  - Alternatively can use `modifier = Modifier.semantics { disabled() }` to announce as disabled
  - Use `modifier = Modifier.semantics { stateDescription = "" }` to have a customized state announcement

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
{% highlight kotlin %}
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
{% endhighlight %}


### Announcement example  (will vary with implementation, version and device)
- "Selected, label, index, checkbox"   (selected state)
- "Not selected, label, double tap to select filter, checkbox, double tap to toggle"   (unselected state) 
- “In-list filters” does not always get announced on each chip
