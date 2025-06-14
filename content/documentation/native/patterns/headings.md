## General Notes

How to test a heading

## Videos

### iOS VoiceOver

<video controls>
  <source src="media/video/native/headings/headings_IosVoiceOver.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback

<video controls>
  <source src="media/video/native/headings/headings_AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a heading

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: N/A

2. Test mobile screenreader gestures

   - Swipe: Focus moves to and from the heading

3. Listen to screenreader output on all devices

   - Text heading: “Heading” is announced following the heading text

4. Test device settings

   - Text resize: Text can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/headings](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/headings)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a heading

GIVEN THAT I am on a screen with a heading

1. Scenario: Test keyboard actions

   - WHEN the user presses Tab, Arrow Keys, or Ctrl+Tab
      - THEN keyboard navigation does not apply to headings as they are not interactive elements which receive focus (N/A) 

2. Scenario: Test mobile screen reader gestures

   - WHEN the user swipes to a heading 
      - THEN focus moves sequentially to the heading 
         - AND the screen reader must announce the text as a heading 

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader reads the heading 
      - THEN its text should clearly announce as a heading 
         - AND when the user navigates by swiping up or down, which focuses on headings through the rotor or controls,
      - THEN its focus should move from heading to heading and announce each text as such 

4. Scenario: Test device OS settings for text resize

   - WHEN text resizing settings are adjusted on the device 
      - THEN all previously noted functionality must be focusable and announced 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/headings](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/headings)

## iOS Developer Notes
### General Notes

   - Headings give the screen reader user context of the sections on the screen at a glance. By using the Rotor, the screen reader user can navigate just by headings for this quick glance, if it is coded correctly.
   - A heading should describe a section, not just look like a heading because it is large or bold font.
   - The title of a screen should announce as a heading by default
   - Text can announce as a heading as well as a button
   - Following Apple's guidelines for font sizes for headings, the maximum size for the larger size heading may be less than 200%
   - iOS supports multiple heading levels through the [accessibility API](https://developer.apple.com/documentation/swiftui/view/accessibilityheading(_:)); however, we recommend continuing to use the default heading level as noted below. 

### Accessibility Trait

   - **UIKit**

      - Use `isHeader: AccessibilityTraits` 

   - **SwiftUI**

      - Use `.accessibilityAddTraits(.isHeader)`

### Focus

   - Use the device's default focus functionality. 
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
      - To move screen reader focus to open or close custom dialogs, use `.accessibilityFocused`
      - If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.

### Announcement examples

   - "Categories, heading”

## Android Developer Notes
### General Notes

   - Headings give the screen reader user context of the sections on the screen at a glance. By using the TalkBack Menu, the screen reader user can navigate just by headings for this quick glance, if it is coded correctly.
   - A heading should describe a section, not just look like a heading because it is large or bold font.
   - Text can announce as a heading as well as a button

### Accessibility Trait

   - **Android Views**

      - `android:accessibilityHeading`

   - **Jetpack Compose**

      - `Modifier.semantics { heading() }`

### Focus

   - Only manage focus when needed. Primarily, let the device manage default focus
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

### Announcement examples

   - "Categories, heading”
