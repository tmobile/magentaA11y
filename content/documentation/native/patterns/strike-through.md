## General Notes

How to test a strike-through text

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a strike-through text

1. Test keyboard only, then screen reader + keyboard actions

   - Keyboard interaction: N/A

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the strike-through text

3. Listen to screenreader output on all devices

   - Strike though text: Expresses the previous and current data 
   - Group: Group the previous and current data together for context

4. Test device settings

   - Text resize: Text can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/strike-through](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/strike-through)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a strike-through text

GIVEN THAT I am on a screen with a strike-through text

1. Scenario: Test keyboard actions

   - WHEN I am using keyboard navigation 
      - THEN keyboard interaction is N/A 

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate
      - THEN the focus should move to the strike-through text 

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader is active 
      - THEN the previous and current data should be expressed 
         - AND the previous and current data should be grouped together for context 

4. Scenario: Test device OS settings for text resize

   - WHEN I have increased text size in device settings 
      - THEN text should resize up to 200% without losing information 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/strike-through](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/strike-through)

## iOS Developer Notes
### General Notes

   - A strike-through is a style that indicates something is removed, deleted, unavailable or canceled, but the original text is meaningful enough and remains visible
   - The strike-through must not be ignored by the screen reader. Adding an accessibility label to the strike-through text will convey its meaning. This can be done by grouping the new price with the strike-through price and strike-through accessibility label and announce together.

### Groupings

   - Group strike-through text with the strike-through accessibility label and updated text

   - **UIKit**

      - Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
      - Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
         - If frame does not exist due to custom button, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
            - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
         - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
         - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.

   - **SwiftUI**

      - Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement. 

### Focus

   - Use the device's default focus functionality. 

   - **UIKit**

      - If VoiceOver is not reaching a particular element, set the element's `isAccessibilityElement` to `true`
         - **Note:** You may need to adjust the programmatic name, role, state, and/or value after doing this, as this action may overwrite previously configured accessibility.
      - Use `accessibilityViewIsModal` to contain the screen reader focus inside the modal.
      - To move screenreader focus to newly revealed content, use `UIAccessibility.post(notification:argument:)` that takes in `.screenChanged` and the newly revealed content as the parameter arguments.
      - To NOT move focus, but dynamically announce new content: use `UIAccessibility.post(notification:argument:)` that takes in `.announcement` and the announcement text as the parameter arguments.
      - `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements. 

   - **SwiftUI**

      - For general focus management that impacts both screen readers and non-screen readers, use the property wrapper `@FocusState` to assign an identity of a focus state.
         - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:)` to assign focus on a view with `@FocusState` as the source of truth.
         - Use the property wrapper `@FocusState`in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
      - If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.

### Announcement examples

   - "Amount was $57 and is now $27" (Strike-through on $57 grouped with updated price of $27)"

## Android Developer Notes
### General Notes

   - A strike-through is a style that indicates something is removed, deleted, unavailable or canceled, but the original text is meaningful enough and remains visible
   - The strike-through must not be ignored by the screen reader. Adding an accessibility label to the strike-through text will convey its meaning. This can be done by grouping the new price with the strike-through price and strike-through accessibility label and announce together for context

### Groupings

   - **Android Views**

      - `ViewGroup`
      - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.

   - **Jetpack Compose**

      - `Modifier.semantics(mergeDescendants = true) {}` is equivalent to `importantForAccessibility` when compared to android views
      - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### Focus

   - Only manage focus when needed. Primarily, let the device manage default focus

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
      - `FocusRequester` allows to request focus to individual elements with in a group of merged descendant    - Example: To customize the focus events
         - step 1: define the focus requester prior. `val (first, second) = FocusRequester.createRefs()`
         - step 2: update the modifier to set the order. `modifier = Modifier.focusOrder(first) { this.down = second }`
         - focus order accepts following values: up, down, left, right, previous, next, start, end
         - step 3: use `second.requestFocus()` to gain focus

### Announcement examples

   - "Amount was $57 and is now $27" (Strike-through on $57 grouped with updated price of $27)"
