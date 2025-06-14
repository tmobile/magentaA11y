## General Notes

How to test a search

## Videos

### iOS VoiceOver

<video controls>
  <source src="media/video/native/search/search_IosVoiceover.mp4" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback

<video controls>
  <source src="media/video/native/search/search_AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a search

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Focus visibly moves to the search field
   - Spacebar: Activates on iOS and Android
   - Enter: Activates on Android

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the search field, expresses its name, role, state (if applicable)
   - Doubletap: Activates the search field

3. Listen to screenreader output on all devices

   - Name: Purpose is clear and matches visible label or icon (search) meaning
   - Role: Input field identifies as a search field or text field in iOS and edit box in Android
   - State: Expresses the search field state (disabled/dimmed)

4. Test device settings

   - Text resize: Text can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/search](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/search)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a search

GIVEN THAT I am on a screen with a search

1. Scenario: Test keyboard actions

   - WHEN I press the "TAB", "ARROW KEYS", or "CTRL+TAB" keys 
      - THEN the focus should visibly move to the search field 
   - WHEN I press the "SPACEBAR" key 
      - THEN the search field should be activated on iOS and Android 
   - WHEN I press the "ENTER" key 
      - THEN the search field should be activated on Android

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate to the search field 
      - THEN the focus should move to the search field 
         - AND the search field's name, role, and state (if applicable) should be expressed 
   - WHEN I double-tap the search field 
      - THEN the search field should be activated

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader reads the search field 
      - THEN its name should clearly describe its purpose and match the visible label or icon meaning (e.g., search icon) 
         - AND its role should identify as a search field or text field in iOS and as an edit box in Android 
         - AND its state (DISABLED/DIMMED) should be expressed, if applicable 

4. Scenario: Test device OS settings for text resize

   - WHEN I adjust the device text resize setting to 200% 
      - THEN the text within the search field should resize up to 200% without losing information 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/search](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/search)

## iOS Developer Notes
### General Notes

   - A search field lets people search a collection of content for specific terms they enter
   - A search field should behave similar to a typical input field
   - Ensure the placeholder does not take the place of the programmatic name for the search field
   - If auto results populate, an optional announcement can be added to the programmatic name so the user knows there are options to choose from below
   - Search icon can be the persistent visible label instead of a text label

### Name

   - Programmatic name describes the purpose of the control.
   - If visible text label exists, the programmatic name should match the visible text label or search icon meaning
      - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognition.
   - Placeholder text is not the programmatic name

   - **UIKit**

      - You can programmatically set the visible label with `setTitle()`.
         - The search field title will overwrite the search field `accessibilityLabel`.
      - If a visible label is not applicable in this case, set the search filed `accessibilityLabel` to the label of your choice.
         - To do this in Interface Builder, set the label using the Identity Inspector
      - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
      - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

   - **SwiftUI**

      - If no visible label, use view modifier `accessibilityLabel(_:)`

### Role

   - When using non-native controls (custom controls), roles will need to be manually coded.

   - **UIKit**

      - Use `UISearchTextField`

   - **SwiftUI**

      - `searchable(text:placement:)`

### Groupings

   - Group visible label or icon with the input field, if applicable, to provide a programmatic name for the search field.

   - **UIKit**

      - Ensure that the child elements of the overarching view you want to group has their `isAccessibilityElement` properties set to `false`.
      - Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
         - If the frame does not exist due to implmenting a custom text input field, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
            - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
      - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
      - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.

   - **SwiftUI**

      - Use view modifier `accessibilityElement(children: .combine)` to merge label and field into a new accessibilityElement.

### State 

   - **UIKit** 

      - For enabled: Set `isEnabled` to `true`.
      - For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
         - If necessary, you may change the accessibility trait of the _component to `notEnabled`, but this may overwrite the current accessibility role of the search field.

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

### Announcement examples

   - "Search, Search field, double tap to edit" (Name, role, hint)
   - "Auto search results below" (Added when auto-populated search results are shown - optional)

## Android Developer Notes
### General Notes

   - A search field lets people search a collection of content for specific terms they enter
   - A search field should behave similar to a typical input field
   - Ensure the placeholder does not take the place of the programmatic name for the search field
   - If auto results populate, an optional announcement can be added to the programmatic name so the user knows there are options to choose from below
   - Search icon can be the persistent visible label instead of a text label 

### Name

   - Name describes the purpose of the control
   - Programmatic name matches the visible text label or search icon meaning

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

      - `searchable`
      - Search dialog
      - Search widget

   - **Jetpack Compose**

      - `SearchBar`

### Groupings

   - Group visible label or icon with the input field, if applicable, to provide a programmatic name for the search field.

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

      - Active: Set `enabled = true` in `SearchBar` composable
      - Disabled: Set `enabled = false` in `SearchBar` composable 

### Focus

   - Only manage focus when needed. Primarily, let the device manage default focus
   - Consider how focus should be managed between child elements and their parent views
   - External keyboard tab order often follows the screen reader focus, but sometimes needs focus management
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
      - `Modifier.focusOrder()` needs to be used in combination with FocusRequesters to define focus order
      - `Modifier.onFocusEvent()`, `Modifier.onFocusChanged()` can be used to observe the changes to focus state
      - `FocusRequester` allows to request focus to individual elements with in a group of merged descendant views
      - Example: To customize the focus events
         - step 1: define the focus requester prior. `val (first, second) = FocusRequester.createRefs()`
         - step 2: update the modifier to set the order. `modifier = Modifier.focusOrder(first) { this.down = second }`
         - focus order accepts following values: up, down, left, right, previous, next, start, end
         - step 3: use `second.requestFocus()` to gain focus

### Announcement examples

   - "Search, Search for files, edit box, double tap to edit text" (name, placeholder, role, hint)
   - "Auto search results below" (Added when auto-populated search results are shown - optional)
