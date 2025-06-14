## General Notes

How to test a slider

## Videos

### iOS Voiceover
<video controls>
  <source src="media/video/native/slider/slider-iOSVoiceover.webm" type="video/webm">
  Your browser does not support the video tag.
</video>


### Android Talkback
<video controls>
  <source src="media/video/native/slider/slider-AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a slider

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, ctr+tab or arrow keys: Focus moves visibly to the input
   - Right and left arrow-keys: Increase / decrease value one step

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the input
   - Ios and android-swipe-up/down: Increase/decrease slider value one step
   - Android-volume or swipe up/down: Increase/decrease slider value one step


3. Listen to screenreader output on all devices

   - Name: Name describes the purpose of the control and matches the visible label
   - Role: Identifies itself as "adjustable" in iOS and "Slider" in Android
   - Group: Group label with control, when possible to give the slider a programmatic name
   - State: Expresses its current value, if applicable

4. Test device settings

   - Text resize: Text can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/slider](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/slider)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a slider

GIVEN THAT I am on a screen with a slider

1. Scenario: Test keyboard actions

   - WHEN I press the "TAB", "CTRL+TAB", or "ARROW KEYS" 
      - THEN the focus should visibly move to the slider input 
   - WHEN I press the "RIGHT ARROW" key 
      - THEN the slider value should increase by one step 
   - WHEN I press the "LEFT ARROW" key 
      - THEN the slider value should decrease by one step 

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate to the slider input 
      - THEN the focus should move to the slider input 
   - WHEN I swipe up or down on iOS or Android 
      - THEN the slider value should increase or decrease by one step 
   - WHEN I use the volume controls or swipe up/down on Android 
      - THEN the slider value should increase or decrease by one step 

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader reads the slider 

      - THEN its name should clearly describe its purpose and match the visible label 
         - AND its role should be identified as "adjustable" in iOS and as "Slider" in Android 
         - AND its label should be programmatically grouped with the control, if possible 
         - AND its current value should be expressed, if applicable 

4. Scenario: Test device OS settings for text resize

   - WHEN I adjust the device text resize setting to 200%
      - THEN the text label should resize up to 200% without losing information 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/slider](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/slider)

## iOS Developer Notes
### General Notes
- A slider is a horizontal track with a control called a thumb, which you  
  can slide with your finger to move between a minimum and maximum value (without using AT)
- If there are labels beneath the slider that adds more context than just the changing value, add this info to each value

### Name
- Programmatic name describes the purpose of the control.
- Since the slider has a native programmatic name, it is not necessary to group the slider with its visible text label (if it exists). It is fine to have the visible text label be read in a separate announcement from the slider's programmatic name.
- If visible text label exists, the programmatic name should match the visible text label.

**UIKit**
  - You can programmatically set the visible label with `setTitle()`.
    - The slider's title will overwrite the slider's `accessibilityLabel`.
  - If a visible label is not applicable in this case, set the slider's `accessibilityLabel` to the label of your choice.
    - To do this in Interface Builder, set the label using the Identity Inspector
  - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
  - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

**SwiftUI**
  - If no visible label, use view modifier `accessibilityLabel(_:)`.
  - If button has icon(s), hide the icon(s) from VoiceOver by using view modifier `accessibilityHidden(true)`.

### Role
- When using non-native controls (custom controls), roles will need to be manually coded.

**UIKit**
  - Use `UISlider`
  - If necessary, set `accessibilityTraits` to `.adjustable`.

**SwiftUI**
  - Use native `Slider` view
  - If applicable, use view modifier `accessibilityRemoveTraits(:)` to remove unwanted traits.  

### Groupings
- N/A
  
**UIKit**
  - As long as you set the `accessibilityLabel` of the slider itself, it is not necessary to group the visible text label and the slider. (This will cause duplicate announcement of the programmatic name)

**SwiftUI**
  - As long as you set the `accessibilityLabel` of the slider itself, it is not necessary to group the visible text label and the slider. (This will cause duplicate announcement of the programmatic name)

### State 
**UIKit**
  - By default, the value of the slider is announced. If not, set the `accessibilityValue` to the correct value.
  - For enabled: Set `isEnabled` to `true`.
  - For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
    - If necessary, you may change the accessibility trait of the slider to `notEnabled`, but this may overwrite the current accessibility role of the slider.

**SwiftUI**
  - By default, the value of the slider is announced. If not, set the `accessibilityValue` to the correct value.
  - For disabled, use view modifier `disabled()`.

### Focus
- Use the device's default focus functionality. 
- External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.
- Initial focus on a screen should land in a logical place, such as back button, screen title, first text field, or first heading.

**UIKit**
  - Natively, the visible text label has a separate focus from the slider itself.
  - If VoiceOver is not reaching a particular element, set the element's `isAccessibilityElement` to `true`
    - **Note:** You may need to adjust the programmatic name, role, state, and/or value after doing this, as this action may overwrite previously configured accessibility.
  - To move screen reader focus to newly revealed content, use `UIAccessibility.post(notification:argument:)` that takes in `.screenChanged` and the newly revealed content as the parameter arguments.
  - To NOT move focus, but dynamically announce new content: use `UIAccessibility.post(notification:argument:)` that takes in `.announcement` and the announcement text as the parameter arguments.
  - `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements.  

**SwiftUI**
  - Natively, the visible text label has a separate focus from the slider itself.
  - For general focus management that impacts both screen readers and non-screen readers, use the property wrapper `@FocusState` to assign an identity of a focus state.
    - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:)` to assign focus on a view with `@FocusState` as the source of truth.
    - Use the property wrapper `@FocusState`in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
  - If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.

### Announcement examples
- “name, value, adjustable, swipe one finger up or down to adjust the volume"

## Android Developer Notes
### General Notes
- A slider is a horizontal track with a control called a thumb, which you  
  can slide with your finger to move between a minimum and maximum value (without using AT)
- If there are labels beneath the slider that adds more context than just the changing value, add this info to each value


### Name
- Programmatic name describes the purpose of the control.
- Since the slider has a native programmatic name, it is not necessary to group the slider with its visible text label (if it exists). It is fine to have the visible text label be read in a separate announcement from the slider's programmatic name.
- If visible text label exists, the programmatic name should match the visible text label.

**Android Views**
  - `android:text` XML attribute
  - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements (icons) without a visible label
  - `contentDescription` overrides `android:text`
  - Use `labelFor` attribute to associate the visible label with the control

**Jetpack Compose**
  - Compose uses semantics properties to pass information to accessibility services.
  - The built-in Slider composable will fill the semantics properties with information inferred from the composable by default.
  - Example specification of contentDescription in compose: `modifier = Modifier.semantics { contentDescription = "" }`

### Role
- When not using native controls (custom controls), roles will need to be manually coded.

**Android Views**
  - Seekbar class
  - Slider class

**Jetpack Compose**
  - `Slider` composable
  - `RangeSlider` composable

### Groupings
- N/A

**Android Views**
  - `ViewGroup`
  - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.

**Jetpack Compose**
  - `Modifier.semantics(mergeDescendants = true) {}` is equivalent to `importantForAccessibility` when compared to android views
  - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State
**Android Views**
  - By default, the value of the slider is announced. If not, set the `contentDescription` to the correct value.
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`. Announcement: disabled

**Jetpack Compose**
  - By default, the value of the slider is announced. If not, set the `contentDescription` to the correct value.
  - Active: default state is active and enabled. Use `Slider(enabled = true)` to specify explicitly
  - Disabled:  `Slider(enabled = false)` announces as disabled
  - Alternatively can use `modifier = Modifier.semantics { disabled() }` to announce as disabled

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
- **Jetpack Compose**
```java
var sliderPosition by remember { mutableStateOf(0f) }
Column {
    Slider(
        modifier = Modifier.semantics { contentDescription = "Regular Slider Description" },
        value = sliderPosition,
        onValueChange = { sliderPosition = it })
}
```

### Announcement examples
- "Value, name, slider, swipe up or swipe down to adjust"