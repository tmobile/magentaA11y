---
layout: entry
title:  "Date Picker"
categories: controls

keyboard:
  tab, arrow keys or Ctl+tab: |
      Focus visibly moves to the picker
  spacebar: |
      Selects and opens the picker/spinner on iOS and Android
  enter: |
      Selects and opens the picker/spinner on Android
        
mobile:
  swipe: |
      Focus moves to the element, expresses its name, role, value & state (if applicable)
  doubletap: |
     Selects and opens picker/spinner

screenreader:
  name:  |
      Purpose is clear and matches any visible label
  role:  |
      Identifies itself as a button in iOS and "double tap to activate" in Android
  group: |
      Visible label is grouped or associated with the picker in a single swipe
  state: |
      Expresses its state (disabled/dimmed)

settings:
  text resize: |
    Text can resize up to 200% without losing information
---


## Android

### Developer notes
- Date pickers can display past, present, or future dates. Clearly indicate important dates, such as current and selected days. Follow common patterns, like a calendar view

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
  - See native date pickers in Gmail or Settings to determine the specific device's swipe order and behavior (Ex: Gmail-Compose-Menu-Schedule send-Pick date & time)
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
  - Disabled: `android:enabled=false`. Announcement: disabled
- **Jetpack Compose**
  - Active: default state is active and enabled. Use `Tab(enabled = true)` to specify explicitly
  - Disabled:  `Tab(enabled = false)` announces as disabled
  - Alternatively can use `modifier = Modifier.semantics { disabled() }` to announce as disabled

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
Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    val state = rememberDatePickerState(initialDisplayMode = DisplayMode.Input)
    DatePicker(state = state, modifier = Modifier.padding(16.dp))
}
{% endhighlight %}

### Announcement examples
