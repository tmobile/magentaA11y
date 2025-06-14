## General Notes

How to test a tidbit

## Condensed

### #a11y - Native App Accessibility Acceptance Criteria

How to test a tidbit

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Focus visibly moves to the tidbit if there is a Call To Action (CTA)
   - Spacebar: Activates CTA on iOS and Android
   - Enter: Activates CTA on Android

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the tidbit or tidbit CTA, expresses its name, role
   - Doubletap: Activates the tidbit CTA

3. Listen to screenreader output on all devices

   - Name: Purpose is clear and matches visible label for CTA and announces all text and meaningful images
   - Role: CTA identifies as a button in iOS and button or "double tap to activate" in Android
   - Group: n/a
   - State: Expresses the CTA's state (disabled/dimmed)

4. Device OS Settings

   - Text resize: Text can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/tidbit](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/tidbit)

## Gherkin

### #a11y - Native App Accessibility Acceptance Criteria

How to test a tidbit

GIVEN THAT I am on a screen with a tidbit

1. Scenario: Test keyboard actions 

   - WHEN I press the "TAB" key, "ARROW" keys, or "CTRL+TAB"
        - THEN the focus should visibly move to the tidbit if there is a call-to-action (CTA)
   - WHEN I press the "SPACEBAR" key
        - THEN the CTA should be activated on iOS and Android
   - WHEN I press the "ENTER" key 
        - THEN the CTA should be activated on Android 

2. Scenario: Test mobile screen reader gestures 

   - WHEN I swipe to navigate
        - THEN the focus should move to the tidbit or tidbit CTA
            - AND the name and role should be expressed
   - WHEN I double-tap the tidbit CTA
        - THEN the CTA should be activated

3. Scenario: Test screen reader output on all devices 

   - WHEN a screen reader is active
        - THEN the purpose should be clear and match the visible label for the CTA
            - AND all text and meaningful images should be announced
            - AND the CTA should be identified as a button in iOS
            - AND the CTA should be identified as a button or "double tap to activate" in Android
            - AND the CTA’s state (DISABLED/DIMMED) should be expressed

4. Scenario: Test device OS settings for text resize 

   - WHEN I have increased text size up to 200% in the device settings
        - THEN text should resize up to 200% without losing information 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/tidbit](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/tidbit)

## Videos

### iOS VoiceOver

<video controls>
  <source src="media/video/native/tidbit/tidbit_IosVoiceOver.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback
<video controls>
  <source src="media/video/native/tidbit/tidbit_AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## iOS Developer Notes

   - Initial screen reader focus can be on the entire tidbit and announce everything with or without a Call To Action (CTA). Or, the text and CTA can have separate focus.
   - Meaningful images should have an accessibility label
  
### Name

   - Programmatic name describes the purpose of the control (if CTA is available)
   - If visible text label exists, the programmatic name should match the visible text label.
        - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognition.

#### UIKit

   - You can programmatically set the visible label with `setTitle()`.
        - The _component title will overwrite the _component `accessibilityLabel`.
   - If a visible label is not applicable in this case, set the _component `accessibilityLabel` to the label of your choice.
        - To do this in Interface Builder, set the label using the Identity Inspector
   - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
   - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

#### SwiftUI

   - If no visible label, use view modifier `accessibilityLabel(_:)`

### Role

   - Please use guidance for the [Button control](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/control/button) if a CTA is applicable

### Groupings

   - Group visible label with button, if applicable, to provide a programmatic name for the button.

#### UIKit

   - Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
   - Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
        - If frame does not exist due to custom button, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
            - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
        - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
        - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.

#### SwiftUI

   - Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new `accessibilityElement`

### State 

#### UIKit

   - For enabled: Set `isEnabled` to `true`.
   - For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed"
        - If necessary, you may change the accessibility trait of the _component to `notEnabled`, but this may overwrite the current accessibility role of the _component

#### SwiftUI

   - For selected, use `accessibilityAddTraits(.isSelected)`.
   - For disabled, use view modifier `disabled()`.

### Focus

   - Use the device's default focus functionality. 
   - External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.

#### UIKit

   - If VoiceOver is not reaching a particular element, set the element's `isAccessibilityElement` to `true`
        - **Note:** You may need to adjust the programmatic name, role, state, and/or value after doing this, as this action may overwrite previously configured accessibility.
   - Use `accessibilityViewIsModal` to contain the screen reader focus inside the modal.
   - To move screen reader focus to newly revealed content, use `UIAccessibility.post(notification:argument:)` that takes in `.screenChanged` and the newly revealed content as the parameter arguments.
   - To NOT move focus, but dynamically announce new content: use `UIAccessibility.post(notification:argument:)` that takes in `.announcement` and the announcement text as the parameter arguments.
   - `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements. 

<!-- 
Enter information for iOS Focus using SwiftUI, update below with appropriate details
--> 

### SwiftUI

   - For general focus management that impacts both screen readers and non-screen readers, use the property wrapper `@FocusState` to assign an identity of a focus state.
        - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:)` to assign focus on a view with `@FocusState` as the source of truth.
        - Use the property wrapper `@FocusState`in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
   - If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.

### Announcement examples

   - "Important" (Exclamation point image) (grouped with text)
   - All text is announced
   - "Learn more, button" (Learn more CTA)

## Android Developer Notes

   - Initial screen reader focus can be on the entire tidbit and announce everything with or without a Call To Action (CTA). Or, the text and CTA can have separate focus.
   - Meaningful images should have an accessibility label

### Name

   - Name describes the purpose of the control
   - Programmatic name matches the visible text label (if any)

#### Android Views

   - `android:text` XML attribute
   - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements (icons) without a visible label
   - `contentDescription` overrides `android:text`
   - Use `labelFor` attribute to associate the visible label with the control

#### Jetpack Compose

   - Compose uses semantics properties to pass information to accessibility services.
   - Example specification of `contentDescription` in compose: `modifier = Modifier.semantics { contentDescription = "" }`

### Role

   - Please use guidance for the [Button control](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/control/button) if a CTA is applicable

### Groupings

   - Group visible label with button, if applicable, to provide a programmatic name for the button.

#### Android Views

   - `ViewGroup`
   - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.

#### Jetpack Compose

   - `Modifier.semantics(mergeDescendants = true) {}` is equivalent to `importantForAccessibility` when compared to android views
   - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State

#### Android Views

   - Active: `android:enabled=true`
   - Disabled: `android:enabled=false`. Announcement: "disabled"

#### Jetpack Compose

   - Active: default state is active and enabled. Use `Button(enabled = true)` to specify explicitly
   - Disabled: `Button(enabled = false)` announces as "disabled"
   - Alternatively can use `modifier = Modifier.semantics { disabled() }` to announce as "disabled"
   - Use `modifier = Modifier.semantics { stateDescription = "" }` to have a customized state announcement

### Focus

   - Only manage focus when needed. Primarily, let the device manage default focus
   - External keyboard tab order often follows the screen reader focus, but sometimes needs focus management

#### Android Views

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

#### Jetpack Compose

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

   - "Important" (Exclamation point image) (grouped with text)
   - All text is announced
   - "Learn more, button, double tap to activate" (Learn more CTA)
