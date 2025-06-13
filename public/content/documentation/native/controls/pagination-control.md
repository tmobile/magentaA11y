## General Notes

How to test a pagination control

## Videos

### iOS VoiceOver

<video controls>
  <source src="media/video/native/pagination-control/pagination-control_IosVoiceover.mp4" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback

<video controls>
  <source src="media/video/native/pagination-control/pagination-control_AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a pagination control

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Focus visibly moves to interactive elements
   - Arrow and space keys: Brings next page into view when focus is on page control (iOS)
   - Arrow keys and space/enter: Moves focus to next page (Android)

2. Test mobile screenreader gestures

   - Swipe up/down with one finger, double tap, or three finger horizontal swipe: Brings next page into view when focus is on page control (iOS)
   - Two finger swipe: Brings next page into view when focus is not on page control (Android)
   - Swipe and double tap: Brings next page into view when focus is on page control (Android)

3. Listen to screenreader output on all devices

   - Name: The page index (X of X) and heading of slide
   - Role: Identifies as "adjustable" or button in iOS, "In horizontal pager" in Android
   - Group: n/a
   - State: Expresses its state (disabled/dimmed)

4. Test device settings

   - Text resize: n/a

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/pagination-control](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/pagination-control)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a pagination control

GIVEN THAT I am on a screen with a pagination control

1. Scenario: Test keyboard actions

   - WHEN I press the "TAB" key, "ARROW" keys, or "CTRL+TAB" 
      - THEN the focus should visibly move to interactive elements 
   - WHEN I press the "ARROW" keys or "SPACEBAR" key while focus is on the page control 
      - THEN the next page should come into view on iOS 
   - WHEN I press the "ARROW" keys and "SPACEBAR" or "ENTER" key 
      - THEN the focus should move to the next page on Android 

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe up or down with one finger, double-tap, or perform a three-finger horizontal swipe 
      - THEN the next page should come into view when focus is on the page control on iOS 
   - WHEN I perform a two-finger swipe 
      - THEN the next page should come into view when focus is not on the page control on Android 
   - WHEN I swipe and double-tap 
      - THEN the next page should come into view when focus is on the page control on Android 

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader is active 
      - THEN the page index (X of X) and heading of the slide should be announced 
         - AND the control should identify as "adjustable" or a button in iOS 
         - AND the control should identify as "In horizontal pager" in Android 
         - AND the control’s state (DISABLED/DIMMED) should be expressed

4. Scenario: Test device OS settings for text resize

   - WHEN I have increased text size in device settings 
      - THEN text resize interaction is N/A 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/pagination-control](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/pagination-control)

## iOS Developer Notes
### General Notes

   - A control that displays a horizontal series of dots, each of which corresponds to a screen/page or slide
   - There are a variety of implementation alternatives for a page control: 
      - The screen reader focus may remain on the page control when it is focused and the user interacts with it. Custom actions can be implemented on the dots so that the screen reader user can swipe right or left past the page control to navigate through the screen. If there are many pages, having to swipe through all of them to get to the rest of the screen may not be a good user experience
      - Swiping right or left to change the pages while focus is on the page control is acceptable, if there are not too many pages. Index of the page (2 of 4) must be announced
      - Navigating through the pages while focus is not on images or slides is acceptable. Index must be announced while on each slide. Then, pagination dots do not need to be focused by the screen reader, eliminating a redundant experience
   - Pagination control must not change automatically to the next page/dot
   - Ensure the external Blue tooth keyboard user can navigate through the slides/screens

### Name

   - **UIKit**

      - Programmatic name describes the purpose of the control.
      - You can programmatically set the visible label with `setTitle()`.
         - The button’s title will overwrite the button’s `accessibilityLabel`.
      - If a visible label is not applicable in this case, set the button's `accessibilityLabel` to the label of your choice.
         - To do this in Interface Builder, set the label using the Identity Inspector
      - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
      - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

   - **SwiftUI**

      - If no visible label, use view modifier `accessibilityLabel(_:)`.
      - If button has icon(s), hide the icon(s) from VoiceOver by using view modifier `accessibilityHidden(true)`.

### Role

   - When using non-native controls (custom controls), roles may need to be manually coded.

   - **UIKit**

      - Use UIPageControl
      - If necessary, set `accessibilityTraits` to `.adjustable`

   - **SwiftUI**

### Groupings

   - Group visible label with button, if applicable, to provide a programmatic name for the button

   - **UIKit**

      - Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
      - Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
         - If frame does not exist due to custom button, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
            - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
         - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
         - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.

   - **SwiftUI**

      - Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.

### State 

   - **UIKit** 

      - For enabled: Set `isEnabled` to `true`.
      - For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
         - If necessary, you may change the accessibility trait of the button to `notEnabled`, but this may overwrite the current accessibility role of the button.

   - **SwiftUI**

      - For selected, use `accessibilityAddTraits(.isSelected)`.
      - For disabled, use view modifier `disabled()`.

### Focus

   - Use the device's default focus functionality. 
   - Consider how focus should be managed between child elements and their parent views.
   - External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.
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

### Announcements

   - "Page three of three, adjustable, swipe up or down with one finger to adjust the value" (Focus is on pagination dots, custom actions have been implemented and the dots are interactive)
   - “Images, text, page 1 of 3, button” (Swipe right or left to navigate through slides and announcement includes meaningful content on the page and text, plus the index. Pagination dots are not focusable.)

## Android Developer Notes
### General Notes

   - A control that displays a horizontal series of dots, each of which corresponds to a screen/page or slide
   - There are a variety of implementation alternatives for a page control: 
      - The screen reader focus may remain on the page control when it is focused and the user interacts with it. Custom actions can be implemented on the dots so that the screen reader user can swipe right or left past the page control to navigate through the screen. If there are many pages, having to swipe through all of them to get to the rest of the screen may not be a good user experience
      - Swiping right or left to change the pages while focus is on the page control is acceptable, if there are not too many pages. Index of the page (2 of 4) must be announced
      - Navigating through the pages while focus is not on images or slides is acceptable. Index must be announced while on each slide. Then, pagination dots do not need to be focused by the screen reader, eliminating a redundant experience
   - If a container around the entire screen is the page control, there is usually no programmatic name. But it announces the page index and possibly "in horizontal pager" or other information that tells the screen reader user they are within a page experience. The focus should move to a logical place in the new content
   - Pagination control must not change automatically to the next page/dot
   - Ensure the external Blue tooth keyboard user can navigate through the slides/screens

### Name 

   - **Android Views** 

      - `android:text` XML attribute
      - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements (icons) without a visible label
      - `contentDescription` overrides `android:text`
      - Use `labelFor` attribute to associate any visible label with the control

   - **Jetpack Compose**

      - Compose uses semantics properties to pass information to accessibility services.
      - The built-in Button composable will fill the semantics properties with information inferred from the composable by default.
      - Optional: use `contentDescription` for a more descriptive name to override the default visible label of the button text.
      - Example specification of contentDescription in compose: `modifier = Modifier.semantics { contentDescription = "" }`

### Role

   - When not using native controls (custom controls), roles may need to be manually coded.

   - **Android Views**

      - TabLayout with ViewPager

   - **Jetpack Compose**

### Groupings

   - Group visible label with button (if applicable) to provide a programmatic name for the button
   - Group label with data to ensure reading order is logical. (Not label, label, data, data)

   - **Android Views**

      - `ViewGroup`
      - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.

   - **Jetpack Compose**

      - `Modifier.semantics(mergeDescendants = true) {}` is equivalent to `importantForAccessibility` when compared to android views
      - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State

   - **Android Views**

      - Active: `android:enabled=true`
      - Disabled: `android:enabled=false`. Announcement: "disabled"

   - **Jetpack Compose**

      - Active: default state is active and enabled. Use `Button(enabled = true)` to specify explicitly
      - Disabled: `Button(enabled = false)` announces as "disabled"
      - Alternatively can use `modifier = Modifier.semantics { disabled() }` to announce as "disabled"
      - Use `modifier = Modifier.semantics { stateDescription = "" }` to have a customized state announcement

### Focus

   - Only manage focus when needed. Primarily, let the device manage default focus
   - Consider how focus should be managed between child elements and their parent views
   - External keyboard tab order often follows the screen reader focus, but sometimes needs focus management
   - Initial focus on a screen should land in a logical place (back button, screen title, first text field, first heading)
   - When a menu, picker or modal is closed, the focus should return to the triggering element.

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

### Custom Accessibility Action

   - When UI elements are customized and coded to look like a specific component say button, to ensure that name, role, state and action are all intact might need to update accessibility service and semantics.
   - Disclaimer: This customization would not be needed unless it is required to modify/add gestures or actions.
   - The Button class by default supplies all the necessary semantics to make it fully accessible.

   - **Android Views**

      - step 1: Create an accessibility service
      - step 2: Add the `FLAG_REQUEST_ACCESSIBILITY_BUTTON` flag in an AccessibilityServiceInfo object's `android:accessibilityFlags` attribute
      - step 3: To have a custom service register for the button's custom action callbacks, use `registerAccessibilityButtonCallback()`

   - **Jetpack Compose**

      - List of custom accessibility actions can be defined relatively easily in compose compared to Views using customActions. 
      - Example: `modifier = Modifier.semantics { customActions = listOf(CustomAccessibilityAction(label = "", action = { true }))}`

### Announcements

   - "Label, page three of three, List, out of grid pager” (If focus is on pagination dots and they are not interactive)
   - “Text, images, in horizontal pager” (When focus is in body of page. Swipe up and right (or left) with two fingers to change page)
   - “Images, text, page 1 of 3, list, double tap to activate” (Swipe right or left to navigate through slides and announcement includes meaningful content on the page and text, plus the index. Pagination dots are not focusable.)
