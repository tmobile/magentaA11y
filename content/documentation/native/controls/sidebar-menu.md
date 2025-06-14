## General Notes

How to test a sidebar navigation menu

## Videos

### iOS VoiceOver

<video controls>
  <source src="media/video/native/sidebar-menu/sidebar-menu_IosVoiceOver.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback

<video controls>
  <source src="media/video/native/sidebar-menu/sidebar-menu_AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a sidebar navigation menu

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Focus visibly moves to the first interactive element in the menu
   - Spacebar: Activates on iOS and Android
   - Enter: Activates on Android
   - If close button present: Activate the close button and focus should return to the triggering element

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the element, expresses its name, role (state, if applicable)
   - Doubletap: Activates the menu item
   - Two-finger swipe to the left anywhere on the screen closes the menu: Activates close on Android
   - If close button present: Double tap to activate the close button and focus should return to the triggering element

3. Listen to screenreader output on all devices

   - Name: Purpose is clear and matches visible label
   - Role: Usually identifies as a button in iOS and button or "double tap to activate" in Android
   - Group: Visible label is grouped or associated with the button in a single swipe
   - State: Expresses its state (disabled/dimmed)


4. Test device settings

   - Text resize: Text can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/sidebar-menu](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/sidebar-menu)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a sidebar navigation menu

GIVEN THAT I am on a screen with a sidebar navigation menu

1. Scenario: Test keyboard actions

   - WHEN I press the "TAB", "ARROW KEYS", or "CTRL+TAB" keys 
      - THEN the focus should visibly move to the first interactive element in the menu 
   - WHEN I press the "SPACEBAR" key 
      - THEN the menu item should be activated on iOS and Android 
   - WHEN I press the "ENTER" key 
      - THEN the menu item should be activated on Android 
   - WHEN a close button is present 
      - THEN I activate the close button 
         - AND the menu should close and the focus should return to the triggering element 

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate through the menu 
      - THEN the focus should move to each menu item 
         - AND the item's name, role, and state (if applicable) should be expressed 
   - WHEN I double-tap a menu item 
      - THEN the menu item should be activated 
   - WHEN I perform a two-finger swipe to the left anywhere on the screen 
      - THEN the menu should close (Android only) 
   - WHEN a close button is present 
      - AND I double-tap the close button 
      - THEN the menu should close and the focus should return to the triggering element 

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader reads the menu items 
      - THEN their name should clearly describe their purpose and match the visible label 
         - AND their role should be identified as a button in iOS and as a button or "double tap to activate" in Android 
         - AND their visible label should be grouped or associated with the menu item in a single swipe 
         - AND their state (DISABLED/DIMMED) should be expressed, if applicable 

4. Scenario: Test device OS settings for text resize

   - WHEN I adjust the device text resize setting to 200%
      - THEN the text should resize up to 200% without losing information 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/sidebar-menu](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/sidebar-menu)

## iOS Developer Notes
### General Notes

   - A sidebar can help people navigate your app, providing quick access to top-level collections of content
   - Consider using a tab bar instead of a sidebar for a phone app, as it can require a lot of horizontal space, especially in Portrait orientation
   - Name, Role, State must be stated in a single announcement when focus is on any button in the menu
   - Inform the screen reader user of the open/close actions on the elements that perform those actions
   - Ensure the screen reader user can close the menu
   - If the secondary pane of the split view is not available to the non-screen reader user, the screen reader user should be confined in the menu
   - Ensure focus order is logical
   - Use headings when appropriate
   - If dropdowns are a part of the menu, group the label with the caret
   - Images don’t usually need alt text, if their meaning is in the text label next to them


### Name

   - Name describes the purpose of the control
   - Programmatic name matches the visible text label
   - Name sometimes includes the state (opens menu), state being currently closed
      - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognition.

   - **UIKit**

      - You can programmatically set the visible label with `setTitle()`.
         - The button title will overwrite the button `accessibilityLabel`.
      - If a visible label is not applicable in this case, set the button `accessibilityLabel` to the label of your choice.
         - To do this in Interface Builder, set the label using the Identity Inspector
      - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
      - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

   - **SwiftUI**

      - If no visible label, use view modifier `accessibilityLabel(_:)`.


### Role

   - When using non-native controls (custom controls), roles will need to be manually coded.

   - **UIKit**

      - Use `UISplitViewController`
      - Use `UICollectionLayoutListConfiguration.Appearance` 
      - For other elements in a menu, follow guidance for Buttons or Dropdowns

   - **SwiftUI**

      - Use a list inside a `NavigationView` 
      - For other elements in a menu, follow guidance for Buttons or Dropdowns

### Groupings

   - Group visible label with button or dropdown, if applicable, to provide a programmatic name for the control

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

   - Inform the screen reader of the state of opens and closes on the button that performs this action

   - **UIKit** 

      - For enabled: Set `isEnabled` to `true`.
      - For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
         - If necessary, you may change the accessibility trait of the button to `notEnabled`, but this may overwrite the current accessibility role of the button.

   - **SwiftUI**

      - For selected, use `accessibilityAddTraits(.isSelected)`
      - For disabled, use view modifier `disabled()`


### Focus

   - Use the device's default focus functionality 
   - Consider how focus should be managed between child elements and their parent views
   - External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus to interactive elements
   - Initial focus on a screen should land in a logical place, such as back button, screen title, first text field, or first heading
   - When a menu or modal is closed, the focus should return to the triggering element

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


### Announcement example for Google Meet

   - “More options, button” (Image label, action)
   - “Close menu, button” (Invisible button label, action)

## Android Developer Notes
### General Notes

   - The navigation drawer component is a slide-in menu that lets users navigate to various sections of your app
   - The navigation drawer can appear as a modal, over the top of content. Ensure the screen reader user is confined in the modal
   - Two finger swipe to the left anywhere on the screen closes menu
   - Name, Role, State must be stated in a single announcement when focus is on any button in the menu
   - Inform the screen reader user of the open/close actions on the elements that perform those actions
   - Ensure focus order is logical
   - Use headings when appropriate
   - If dropdowns are a part of the menu, group the label with the caret
   - Images don’t usually need alt text, if their meaning is in the text label next to them

### Name

   - Name describes the purpose of the control
   - Programmatic name matches the visible text label
   - Name sometimes includes the state (opens menu), state being currently closed

   - **Android Views**

      - `android:text` XML attribute
      - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements (icons) without a visible label
      - `contentDescription` overrides `android:text`
      - Use `labelFor` attribute to associate the visible label with the control

   - **Jetpack Compose**

      - Compose uses semantics properties to pass information to accessibility services.
      - Example specification of contentDescription in compose: `modifier = Modifier.semantics { contentDescription = "" }`

### Role

   - When not using native controls (custom controls), roles will need to be manually coded.

   - **Android Views**

      - Use `DrawerLayout` with two child views: a `NavHostFragment` to contain the main content and a `NavigationView` for the contents of the navigation drawer

   - **Jetpack Compose**

      - Use `ModalNavigationDrawer` composable

### Groupings

   - Group visible label with button or dropdown, if applicable, to provide a programmatic name for the control

   - **Android Views**

      - `ViewGroup`
      - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.

   - **Jetpack Compose**

      - `Modifier.semantics(mergeDescendants = true) {}` is equivalent to `importantForAccessibility` when compared to android views
      - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State

   - Inform the screen reader of the state of opens and closes the on the button that performs this action

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
   - External keyboard tab order often follows the screen reader focus, but sometimes needs focus management to interactive elements
   - Initial focus on a screen should land in a logical place (back button, screen title, first text field, first heading)
   - When a menu or modal is closed, the focus should return to the triggering element.

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

### Announcement example for Google Meet Navigation Drawer

   - “Open navigation menu, button, double tap to activate” (menu button collapsed)
   - “Google Meet, in list, 3 items” (Menu label, list announcement, number of items in list)
   - Left swipe with two fingers anywhere on screen to dismiss menu
