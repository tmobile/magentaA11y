---
layout: entry
title:  "Text input"
categories: controls

keyboard:
  tab or arrow keys: |
    Focus visibly moves to and from the text input. 
  enter: |
    Starts input
          
mobile:
  swipe: |
    Focus moves to the element, expresses its name, role (state, if disabled)
  doubletap: |
    Keyboard appears

screenreader:
  name:  |
    Purpose is clear and matches visible label
  role:  |
    Identifies itself text field on iOS, edit box on Android
  group: |
    Visible label is grouped or associated with the text input in a single swipe
  state: |
    The input can be disabled/dimmed

settings:
  text resize: |
    Text can resize up to 200% without losing information
---

## Developer notes
- The text input field allows users to enter and edit text.
- A text input field cannot be automatically focused from any other component, or focus cannot be automatically moved to another component. The user must control navigating to and from a text input.
- Placeholder text must meet color contrast minimum ratios.
- Use a native control when at all possible vs a custom element, as it will automatically and correctly announce the role without additional development effort.
- Name, Role, State must be announced when focus is on the control. Just announcing the label before the input field does not meet this requirement.
- "text field" or "editbox" can be announced prior to "adjustable", picker item or other controls.

## iOS

### Name
- Programmatic name describes the purpose of the control.
- If visible text label exists, the programmatic name should match the visible text label.
    - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.
- Placeholder text is NOT the programmatic name

- **UIKit**
  - You can programmatically set the visible label with `setTitle()`.
    - The text input field's title will overwrite the button’s `accessibilityLabel`.
  - If a visible label is not applicable in this case, set the button's `accessibilityLabel` to the label of your choice.
    - To do this in Interface Builder, set the label using the Identity Inspector
  - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
  - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.
- **SwiftUI**
  - `TextField` has a built-in label parameter, but it is inside the field itself, which may not be ideal for some use cases. In this case, you may create a separate label and combine it with the `TextField` to create a new accessibility element. Then, apply the programmatic name with `accessibilityLabel(_:)`.
  - If there is no built-in label parameter, such as with `TextEditor`, combine the separate label with the `TextEditor` into a new accessibility element, and apply the programmatic name with `accessibilityLabel(_:)` to the entire element as a whole.

### Role
- When using non-native controls (custom controls), roles will need to be manually coded.

- **UIKit**
  - Use `UITextField`
  - If necessary, append the role to the programmatic name or accessibility value
- **SwiftUI**
  - Use native `TextField` or `TextEditor` view
  - If applicable, use view modifier `accessibilityRemoveTraits(:)` to remove unwanted traits.  

### Groupings
- Group visible label with text input field, if applicable, to provide a programmatic name for the field.
- Group label with data to ensure reading order is logical. (Not label, label, data, data).

- **UIKit**
  1. Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
  2. Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
  - If frame does not exist due to custom text input field, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
    - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
  - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
  - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.
- **SwiftUI**
  - Use view modifier `accessibilityElement(children: .combine)` to merge label and field into a new accessibilityElement.

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
- Focus MUST return back to the text input field after the user is done editing the field and dismissing the keyboard.
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
TBD

## Android


### Name

- Name describes what data is to be entered and matches a required label that is visible at all times.
- Placeholders are not considered a visible label as they disappear when data is entered.
- Name must be announced with the role, when screen reader focus is on the text input field (Ex: “EditBox, first name, double tap to edit text, double tap and hold to long press”)
- **Android Views**
  - `android:text` XML attribute
  - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements without a visible label.
  - `contentDescription` overrides `android:text`  
  - Use `labelFor` attribute to associate the visible label to the control  
- **Android Compose**
  - Compose Material Component `TextField` has a default `label` parameter built for displaying as both hint (placeholder) and floating label when the user tap on the TextField, the semantics uses this label value for programmatic name.
  - If no `label` parameter designed in your `TextField`, like a search TextField with a search icon as the placeholder, in this case, use modifier semantics to setup `contendescription` value for programmatic name

### Role
- When not using native controls (custom controls), roles will need to be manually coded.
- **Android View**
  - EditBox
- **Android View**
  - Standard `TextField` Composable

### Groupings
- Group text field and persistent visible text label together in one swipe.  
- **Android View**
  - ViewGroup
  - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' content descriptions/names, one after the other, in a single announcement.
  - JETPACK COMPOSE: Composables can be merged together using the `semantics` modifier with its `mergeDescendants` property
- **Android Compose**
  - `Modifier.semantics(mergeDescendants = true) {}` is equivalent to importantForAccessibility when compared to android views.
  - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State
- **Android View**
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`. Announcement: disabled
- **Android Compose**
  - Active: Set `enabled = true` in `TextField` composable
  - Disabled: Set `enabled = false` in `TextField` composable



### Focus
-   Only manage focus when needed. Primarily, let the device manage default focus
-   Consider how focus should be managed between child elements and their parent views
-   External keyboard tab order often follows the screen reader focus, but sometimes needs focus management
-   Initial focus on a screen should land in a logical place (back button, screen title, first text field, first heading)
-   When a bottom navigation bar element is activated, the next screen's initial focus should move to the top of the screen, not stay in the bottom nav bar.
-   When a menu, picker or modal is closed, the focus should return to the triggering element.
- **Android View**
   -   `importantForAccessibility` makes the element visible to the Accessibility API
   -   `android:focusable`
   -   `android=clickable`
   -   Implement an `onClick( )` event handler for keyboard, as well as `onTouch( )`
   -   `nextFocusDown`
   -   `nextFocusUp`
   -   `nextFocusRight`
   -   `nextFocusLeft`
   -   `accessibilityTraversalBefore` (or after)
   -   To move screen reader focus to newly revealed content: `Type_View_Focused`
   -   To NOT move focus, but dynamically announce new content: `accessibilityLiveRegion`(set to polite or assertive)
   -   To hide controls: `importantForAccessibility=false`
   -   For a `ViewGroup`, set `screenReaderFocusable=true` and each inner object’s attribute to keyboard focus (`focusable=false`)
- **Android Compose**
  - `Modifier.focusTarget()` makes the component focusable
  - `Modifier.focusOrder()` needs to be used in combination with FocusRequesters to define focus order
  - `Modifier.onFocusEvent()`, `Modifier.onFocusChanged()` can be used to observe the changes to focus state
  - `FocusRequester` allows to request focus to individual elements with in a group of merged descendant views
  - *Example:* To customize the focus events behaviour
      - step 1: define the focus requester prior. `val (first, second) = FocusRequester.createRefs()`
      - step 2: update the modifier to set the order. `modifier = Modifier.focusOrder(first) { this.down = second }`
      - focus order accepts following values: up, down, left, right, previous, next, start, end
      - step 3: use `second.requestFocus()` to gain focus

### Announcement examples
TBD