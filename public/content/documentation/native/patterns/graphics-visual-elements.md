## General Notes

How to test a graphic/visual element

## Videos

### iOS VoiceOver 

<video controls>
  <source src="media/video/native/graphics-visual-elements/graphics-visual-elements_IosVoiceOver.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback 

<video controls>
  <source src="media/video/native/graphics-visual-elements/graphics-visual-elements_AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a graphic/visual element

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Focus visibly moves to any interactive controls
   - Spacebar: Activates on iOS and Android
   - Enter: Activates on Android

2. Test mobile screenreader gestures

   - Swipe: Focus moves to any interactive control, expresses its name, role, or to graphic and expresses name
   - Doubletap: Activates most controls

3. Listen to screenreader output on all devices

   - Name: Purpose is clear and matches visible label for controls and announces all text and meaningful images
   - Role: CTA identifies as a button in iOS and button or "double tap to activate" in Android
   - Graphics: Only meaningful, non-decorative images and graphics should be focused and announced
   - State: Expresses the controls state (disabled/dimmed)

4. Test device settings

   - Text resize: Text can resize up to 200% without losing information. Text in images do not resize

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/graphics-visual-elements](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/graphics-visual-elements)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a graphic/visual element

GIVEN THAT I am on a screen with a graphic/visual element

1. Scenario: Test keyboard actions

   - WHEN I press the "TAB" key, "ARROW" keys, or "CTRL+TAB" 
      - THEN the focus should visibly move to any interactive controls 
   - WHEN I press the "SPACEBAR" key 
      - THEN the control should be activated on iOS and Android
   - WHEN I press the "ENTER" key 
      - THEN the control should be activated on Android 

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate 
      - THEN the focus should move to any interactive control and express its name and role 
         - AND if the focus moves to a graphic, it should express its name 
   - WHEN I double-tap a control 
      - THEN the control should be activated 

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader is active 
      - THEN the purpose should be clear and match the visible label for controls 
         - AND all text and meaningful images should be announced 
         - AND call-to-action (CTA) elements should be identified as a button in iOS 
         - AND CTA elements should be identified as a button or "double tap to activate" in Android 
         - AND only meaningful, non-decorative images and graphics should receive focus and be announced
         - AND the control's state (DISABLED/DIMMED) should be expressed

4. Scenario: Test device OS settings for text resize

   - WHEN I have increased text size in device settings
      - THEN text should resize up to 200% without losing information
         - AND text within images should not resize

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/graphics-visual-elements](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/graphics-visual-elements)

## iOS Developer Notes
### General Notes

   - Maps, charts and other graphics must have a text equivalent, if the graphic is not interactive for the screen reader. All information in the graphic must be conveyed to the screen reader user. This is often done with a list view. Adding a toggle between map and list view is a common text alternative for a graphic.
   - Even if it is not interactive, it is suggested to put the map in the swipe order and add a label/name to identify it to the screen reader user. For some screen reader users, identifying the graphic adds context and meaningful information
   - If the graphic is interactive to the screen reader user, consider the grouping of information and swipe order to make it understandable and logical
   - If an image does not convey meaning or is used for styling purposes, like a line separator, do not add alt text and skip it in the swipe order for the screen reader user.
   - Custom actions may be applicable in navigating a graphic
   - All interactive elements in a map or chart must be navigable by the external keyboard
   - Consider color contrast ratios between chart elements and their background as well as to each other

### Name

   - Programmatic name describes the purpose of the control.
   - If visible text label exists, the programmatic name should match the visible text label.
      - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognition.

   - **UIKit**

      - You can programmatically set the visible label with `setTitle()`.
         - The map title will overwrite the map’s `accessibilityLabel`.
      - If a visible label is not applicable in this case, set the map’s`accessibilityLabel` to the label of your choice.
         - To do this in Interface Builder, set the label using the Identity Inspector
      - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
      - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

   - **SwiftUI**

      - If no visible label, use view modifier `accessibilityLabel(_:)`

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
      - If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.

## Android Developer Notes
### General Notes

   - Maps, charts and other graphics must have a text equivalent, if the graphic is not interactive for the screen reader. All information in the graphic must be conveyed to the screen reader user
   - Even if it is not interactive, it is suggested to put the map in the swipe order and add a label/name to identify it to the screen reader user. For some screen reader users, identifying the graphic adds context and meaningful information
   - If the graphic is interactive to the screen reader user, consider the grouping of information and swipe order to make it understandable and logical
   - If an image does not convey meaning or is used for styling purposes, like a line separator, do not add alt text and skip it in the swipe order for the screen reader user.
   - Custom actions may be applicable in navigating a graphic
   - All interactive elements in a map or chart must be navigable by the external keyboard
   - Consider color contrast ratios between chart elements and their background as well as to each other

### Name

   - Name describes the purpose of the control
   - Programmatic name matches the visible text label (if any)

   - **Android Views**

      - `android:text` XML attribute
      - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements (icons) without a visible label
      - `contentDescription` overrides `android:text`
      - Use `labelFor` attribute to associate the visible label with the control

- **Jetpack Compose**

  - Compose uses semantics properties to pass information to accessibility services.
  - Example specification of contentDescription in compose: `modifier = Modifier.semantics { contentDescription = "" }`

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
