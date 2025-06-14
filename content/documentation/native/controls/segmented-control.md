## General Notes

How to test a segemented control / tabs

## Videos

### iOS VoiceOver

<video controls>
  <source src="media/video/native/segmented-control/segmented-control_IosVoiceOver.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback

<video controls>
  <source src="media/video/native/segmented-control/segmented-control_AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a segemented control / tabs

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Focus visibly moves to the button
   - Arrow keys: Navigate through group
   - Spacebar: Activates the button on iOS and Android
   - Enter: Activates the button on Android

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the element, expresses its state, if applicable
   - Doubletap: Activates the button

3. Listen to screenreader output on all devices

   - Name: Purpose is clear and matches visible label
   - Role: Identifies as a button in iOS and "double tap to activate" in Android
   - Group: Visible label (if any) is grouped or associated with the button in a single swipe
   - State: Expresses its state (selected/disabled/dimmed)

4. Test device settings

   - Text resize: This element is exempt from text resizing requirements

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/segmented-control](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/segmented-control)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a segemented control / tabs

GIVEN THAT I am on a screen with a segemented control / tabs

1. Scenario: Test keyboard actions

   - WHEN I press the "TAB", "ARROW KEYS", or "CTRL+TAB" keys 
      - THEN the focus should visibly move to the button
   - WHEN I press the "ARROW KEYS" 
      - THEN I should navigate through the group
   - WHEN I press the "SPACEBAR" key 
      - THEN the button should be activated on iOS and Android 
   - WHEN I press the "ENTER" key 
      - THEN the button should be activated on Android 

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate to the button 
      - THEN the focus should move to the button 
         - AND the button's state (if applicable) should be expressed
   - WHEN I double-tap the button 
      - THEN the button should be activated 

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader reads the button 
      - THEN its name should clearly describe its purpose and match the visible label 
         - AND its role should be identified as a button in iOS and as "double tap to activate" in Android 
         - AND its visible label (if any) should be grouped or associated with the button in a single swipe 
         - AND its state (SELECTED, DISABLED, DIMMED) should be expressed 

4. Scenario: Test device OS settings for text resize

   - WHEN I adjust the device text resize setting 
      - THEN this element remains exempt from text resizing requirements 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/segmented-control](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/segmented-control)

## iOS Developer Notes
### General Notes

   - A segmented control is a horizontal set of two or more segments presented, each of which functions as a mutually exclusive button
   - Once a tab has been selected, the focus should remain in the tab group on the selected tab. The user swipes through the tab group and the content revealed by the tab action should be the first swipe out of the tab group.

### Name

   - A programmatic name is assigned to each segment title and tab
   - If visible text label exists, the programmatic name should match the visible text label

   - **UIKit**

   - You can programmatically set the visible label with `setTitle()`
      - The segment's title will overwrite the segment’s `accessibilityLabel`

   - **SwiftUI**
      - By default, the programmatic name is the visible text label of the segment/tab
      - If necessary, use view modifier `accessibilityLabel(_:)`.
      - Use `.accessibilityLabel(label for group)` to announce the group label for the tabs when the first tab is in focus
      - If a segment has decorative icon(s), hide the icon(s) from VoiceOver by using view modifier `accessibilityHidden(true)`

### Role

   - Since picker items are interactive, it must be indicated to the user that they are interactive such as indicating that it is a button or it can be double-tapped to be selected.
   - "Tab" or "Button" usually indicate the role 

   - **UIKit**

      - Use `UISegmentedControl`

   - **SwiftUI**

      - Use native `Picker` view
      - Use `SegmentedPickerStyle`

### Groupings

   - N/A

   - **UIKit**

      - Follow native grouping and order
   - **SwiftUI**

      - Follow native grouping and order

### State

   - A state of the individual segments themselves are announced, which is either "Selected" or "Unselected"
   - The position of the segment out of the entire set (index) must be announced.

   - **UIKit**

      - Segments should be announced whether they are selected/unselected. Often, the button announcement and the absence of "unselected" is assumed to be unselected
      - For disabled menu items: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
         - If necessary, you may change the accessibility trait of the menu item to `notEnabled`, but this may overwrite the current accessibility role of the segmented control.

   - **SwiftUI**

      - By default, the "selected" state is announced and the position of the segment out of the set.
      - For disabled, use view modifier `disabled()`.

### Focus

   - Use the device's default focus functionality
   - Focus should be confined within the segmented control
   - External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus

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

### Announcement examples

   - Options for announcements below depend on framework and versions. Announcement order can vary. Index in label is recommended.
   - "Favorite apps" (Group label)
   - "Favorite apps, Selected, Weather, button, one of three" (Group label, state, button label, role, index) (Selected, on first tab only)
   - "Photos, button, 2 of 3" (Button label, role, index) (not selected)
   - "Clock, dimmed, button, 3 of 3" (Button label, disabled state, role, index)

## Android Developer Notes
### General Notes

   - A segmented control is a horizontal set of two or more segments presented, each of which functions as a mutually exclusive button
   - Once a tab has been selected, the focus should remain in the tab group on the selected tab. The user swipes through the tab group and the content revealed by the tab action should be the first swipe out of the tab group.

### Name

   - A programmatic name is assigned to each segment title and tab
   - If visible text label exists, the programmatic name should match the visible text label.

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

   - Since the segmented control items are interactive, it must indicate the interaction of double-tap for segment selecting.
   - When not using native controls, roles will need to be manually coded

   - **Android Views**

      - Tabs
      - Button or Image Button

   - **Jetpack Compose**

      - `TabRow`, `Tab`
      - `Chip`

### Groupings

   - N/A

   - **Android Views**

      - Follow native component grouping

   - **Jetpack Compose**

      - Follow native component grouping

### State

   - Selected state is announced as either "Selected" or "Unselected" for the control in group that is focused
   - The position of the segment out of the entire segment list must be announced

   - **Android Views**

      - Active: `android:enabled=true`
      - Disabled: `android:enabled=false`. Announcement: "disabled"
      - Selected: Announced as "selected"

   - **Jetpack Compose**

      - Active: default state is active and enabled. Use `Tab(enabled = true)` to specify explicitly
      - Disabled: `Tab(enabled = false)` announces as "disabled"
      - Alternatively can use `modifier = Modifier.semantics { disabled() }` to announce as "disabled"
      - Use `Tab(selected = <condition logic>)` to define selected state

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
var tabIndex by remember { mutableStateOf(0) }
val titles = listOf("Tab 1", "Tab 2", "Tab 3")
Column {
    TabRow(selectedTabIndex = tabIndex) {
        titles.forEachIndexed { index, title ->
            Tab(
                selected = tabIndex == index,
                onClick = { tabIndex = index },
                text = { Text(text = title) }
            )
        }
    }
    Box(modifier = Modifier
        .fillMaxWidth()
        .background(MaterialTheme.colorScheme.background)) {
        Text(
            modifier = Modifier.align(Alignment.Center),
            text = "Tab ${tabIndex + 1} selected",
            style = MaterialTheme.typography.titleMedium,
            color = MaterialTheme.colorScheme.primary
        )
    }
}
```

### Announcement examples

   - Options for announcements below depend on device framework and versions. Announcement order can vary.
   - "Top apps, Selected, Kids, tab, 1 of 4" (Group label, state, button label, role, index) (Selected)
   - "Weather, tab, 2 of 4, double tap to activate" (Button label, role, index, hint) (Not selected)
