## General Notes

How to test an animation

## Videos

<!-- TODO: add in an iOS example! -->

### Android Talkback

<video controls>
  <source src="media/video/native/animation/animation_AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test an animation

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: N/A

2. Test mobile screenreader gestures

   - Swipe: Focus moves to and from the animation if in the swipe order

3. Listen to screenreader output on all devices

   - Focus: If meaningful, animation is focused and its meaning announced via alt text

4. Test device settings

   - Text resize: N/A

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/animation](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/animation)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test an animation

GIVEN THAT I am on a screen with an animation

1. Scenario: Test keyboard actions

   - WHEN I am using keyboard navigation
      - THEN keyboard interaction is N/A

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate
      - THEN focus should move to and from the animation, if it is in the swipe order 

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader is active 
      - THEN if the animation is meaningful, it should receive focus
         - AND its meaning should be announced via alt text 

4. Scenario: Test device OS settings for text resize

   - WHEN I have increased text size in device settings
      - THEN text resize interaction is N/A 
 
Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/animation](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/animation)

## iOS Developer Notes
### General Notes

   - A non-interactive animation is a technique by which still images are manipulated to create moving images 
   - Animations can affect users with motion disabilities. Guidance is to keep animations to 5 seconds or less
   - Animations that flash can also have a deadly affect to users with epilepsy. Guidance is to keep flashing to no more than 3 times per second
   - Ensure animations that are meaningful have alt text assigned
   - Animations cannot stop and start again unless screen is refreshed or similar
   - If a stop/pause button next to the animation is provided, the animation can run more than 5 seconds
   - Loading icon animation is exempt from the 5 second guidance

### Name

   - Programmatic name describes the meaning of the animation.
   - If visible text label exists, the programmatic name should match the visible text label.

   - **UIKit**

      - You can programmatically set the visible label with `setTitle()`.
         - The `_component` title will overwrite the `_component` `accessibilityLabel`.
      - If a visible label is not applicable in this case, set the `_component` `accessibilityLabel` to the label of your choice.
         - To do this in Interface Builder, set the label using the Identity Inspector
      - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
      - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

   - **SwiftUI**

      - If no visible label, use view modifier `accessibilityLabel(_:)`.

### Focus

   - Use the device's default focus functionality. 
   - Consider how focus should be managed between child elements and their parent views.
   - Initial focus on a screen should land in a logical place, such as back button, screen title, first text field, or first heading.

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

## Android Developer Notes
### General Notes

   - A non-interactive animation is a technique by which still images are manipulated to create moving images 
   - Animations can affect users with motion disabilities. Guidance is to keep animations to 5 seconds or less
   - Animations that flash can also have a deadly affect to users with epilepsy. Guidance is to keep flashing to no more than 3 times per second
   - Ensure animations that are meaningful have alt text assigned
   - Animations cannot stop and start again unless screen is refreshed or similar
   - If a stop/pause button next to the animation is provided, the animation can run more than 5 seconds
   - Loading icon animation is exempt from the 5 second guidance

### Name

   - Name describes the meaning of the animation

   - **Android Views**

      - `android:text` XML attribute
      - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements (icons) without a visible label
      - `contentDescription` overrides `android:text`
      - Use `labelFor` attribute to associate the visible label with the element

   - **Jetpack Compose**

      - Compose uses semantics properties to pass information to accessibility services.
      - Example specification of contentDescription in compose: `modifier = Modifier.semantics { contentDescription = "" }`

### Focus

   - Only manage focus when needed. Primarily, let the device manage default focus
   - Consider how focus should be managed between child elements and their parent views
   - Initial focus on a screen should land in a logical place (back button, screen title, first text field, first heading)

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
      - `Modifier.focusOrder()` needs to be used in combination with `FocusRequester` to define focus order
      - `Modifier.onFocusEvent()`, `Modifier.onFocusChanged()` can be used to observe the changes to focus state
      - `FocusRequester` allows to request focus to individual elements with in a group of merged descendant views
      - Example: To customize the focus events
         - step 1: define the focus requester prior. `val (first, second) = FocusRequester.createRefs()`
         - step 2: update the modifier to set the order. `modifier = Modifier.focusOrder(first) { this.down = second }`
         - focus order accepts following values: up, down, left, right, previous, next, start, end
         - step 3: use `second.requestFocus()` to gain focus
