## General Notes

How to test a captcha

## Condensed

### #a11y - Native App Accessibility Acceptance Criteria

How to test a captcha

1. Test keyboard only, then screen reader + keyboard actions

    - Tab, arrow keys or ctl+tab: Focus visibly moves to the captcha button
    - Spacebar: Activates the captcha on iOS and Android
    - Enter: Activates the button on Android

2. Test mobile screenreader gestures

    - Swipe: Focus moves to the interactive elements, expresses its state, if applicable
    - Doubletap: Activates the button

3. Listen to screenreader output on all devices

    - Name: Purpose is clear (ex: "Captcha")
    - Role: Identifies itself as a button or image button, if interactive
    - Group: n/a
    - State: Expresses its state (disabled/dimmed)

4. Device OS Settings

    - Text resize: n/a

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/captcha](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/captcha)

## Gherkin

### #a11y - Native App Accessibility Acceptance Criteria

How to test a captcha

GIVEN THAT I am on a screen with a captcha

1. Scenario: Test keyboard actions 

    - WHEN the user presses Tab, Arrow Keys, or Ctrl+Tab 
        - THEN the focus must visibly move to the captcha button 
    - WHEN the user presses Spacebar and or Enter 
        - THEN the button is activated 

2. Scenario: Test mobile screen reader gestures 

    - WHEN the user swipes to interactive elements 
        - THEN focus must move sequentially to the captcha button 
             - AND the screen reader must announce the state of the captcha button (e.g., enabled or disabled) 
    - WHEN the user performs a double-tap gesture 
        - THEN the captcha button must activate 

3. Scenario: Test screen reader output on all devices 

    - WHEN a screen reader reads the button 
        - THEN its name should clearly describe its purpose, captcha 
            - AND its role should be identified as a button or image button in iOS and as a button or "double tap to activate" in Android 
            - AND its state (DISABLED/DIMMED) should be expressed if applicable 

4. Scenario: Test device OS settings for text resize 

    - WHEN a user adjusts text resizing settings up to 200% 
        - THEN text resizing does not apply to the captcha functionality (n/a) 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/captcha](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/captcha)

## iOS Developer Notes

- Here are just a few experiences for Captcha:  
    1. A non-interactive image in a table row, where the whole table row acts like a button.  
    2. A single interactive element, like an image button
    3. An audio challenge as an equivalent experience to the image challenge
- When selecting the type of Captcha, do not limit the options to only <a href="https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html#dfn-cognitive-function-test">cognitive function tests</a> (e.g. remembering or transcribing a word, or recognizing a picture the website provided). When possible, leverage <a href="https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-enhanced.html#examples">recommended techniques recommended by the W3C</a> such as email link authentication, 3rd party authentication, or 2 factor authentication.
- Captcha is not common in native apps, as there are other options for authentication

### Name

- Experiences (refer to number above):  
    1. Alt text on the image that describes its purpose.
    2. Name describes the purpose of the control and matches any visible text in image
    3. Programmatic name of each interactive component in audio challenge is announced
 
#### **UIKit**
- Programmatic name describes the purpose of the control
- You can programmatically set the visible label with `setTitle()`
    - The button’s title will overwrite the button’s `accessibilityLabel`
- If a visible label is not applicable in this case, set the button's `accessibilityLabel` to the label of your choice
    - To do this in Interface Builder, set the label using the Identity Inspector
- To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
- To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector
    
#### **SwiftUI**
- If no visible label, use view modifier `accessibilityLabel(_:)`
- If button has icon(s), hide the icon(s) from VoiceOver by using view modifier `accessibilityHidden(true)`

### Role

- Experiences (refer to number above):  
    1. Identifies as an image
    2. Identifies as an image button
    3. Each interactive component in audio challenge identifies as a button or text field

#### **UIKit**
- Use `UIButton`
- If necessary, set `accessibilityTraits` to `.button`

#### **SwiftUI**
- Use native `Button` view
- If necessary, use view modifier `accessibilityAddTraits(.isButton)` to assign the role as Button
- If applicable, use view modifier `accessibilityRemoveTraits(:)` to remove unwanted traits

### Groupings

#### **UIKit**
- Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
- Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
    - If frame does not exist due to custom button, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
        - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
    - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
    - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.

#### **SwiftUI**
- Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.

### State

- Experiences (refer to number above):  
    1. If grouped in table row, it's possible for the whole row to have a dimmed/disabled state, or the captcha button disabled separately
    2. Image button can have a disabled state (dimmed)
    3. Buttons in audio challenge can have a disabled state (dimmed)

#### **UIKit**  
- For enabled: Set `isEnabled` to `true`.
- For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
    - If necessary, you may change the accessibility trait of the button to `notEnabled`, but this may overwrite the current accessibility role of the button.

#### **SwiftUI**
- For selected, use `accessibilityAddTraits(.isSelected)`
- For disabled, use view modifier `disabled()`

### Focus

- Experiences (refer to number above):  
    1. Focus is on the whole table row. There should be no focus on any single element, if the whole table row is grouped together, as long as there is only one interactive element per row.
    2. The image button receives focus by swipe or touch
    3. Each element in audio challenge receives focus by swipe or touch. User is confined inside a modal, if presented
- Use the device's default focus functionality. 
- Consider how focus should be managed between child elements and their parent views.
- Initial focus on a screen should land in a logical place, such as back button, screen title, first text field, or first heading.

#### **UIKit**
- If VoiceOver is not reaching a particular element, set the element's `isAccessibilityElement` to `true`
    - **Note:** You may need to adjust the programmatic name, role, state, and/or value after doing this, as this action may overwrite previously configured accessibility.
- Use `accessibilityViewIsModal` to contain the screen reader focus inside the modal.
- To move screen reader focus to newly revealed content, use `UIAccessibility.post(notification:argument:)` that takes in `.screenChanged` and the newly revealed content as the parameter arguments.
- To NOT move focus, but dynamically announce new content: use `UIAccessibility.post(notification:argument:)` that takes in `.announcement` and the announcement text as the parameter arguments.
- `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements.

#### **SwiftUI**
- For general focus management that impacts both screen readers and non-screen readers, use the property wrapper `@FocusState` to assign an identity of a focus state.
    - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:)` to assign focus on a view with `@FocusState` as the source of truth.
    - Use the property wrapper `@FocusState`in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
- If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.

## Android Developer Notes

- There are several experiences for Captcha:  
    1. A non-interactive image in a table row, where the whole table row acts like a button.  
    2. A single interactive element, like an image button
    3. An audio challenge as an equivalent experience to the image challenge
- When selecting the type of Captcha, do not limit the options to only <a href="https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html#dfn-cognitive-function-test"> cognitive function tests</a> (e.g. remembering or transcribing a word, or recognizing a picture the website provided). When possible, leverage <a href="https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-enhanced.html#examples"> recommended techniques recommended by the W3C</a> such as email link authentication, 3rd party authentication, or 2 factor authentication.
- Captcha is not common in apps, as there are other options for authentication
  
### Name  

- Experiences (refer to number above):  
    1. Alt text on the image that describes its purpose.
    2. Name describes the purpose of the control and matches any visible text in image
    3. Programmatic name of each interactive component in audio challenge is announced

#### **Android Views**  
- `android:text` XML attribute
- Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements (icons) without a visible label
- `contentDescription` overrides `android:text`
- Use `labelFor` attribute to associate any visible label with the control
    
#### **Jetpack Compose**
- Compose uses semantics properties to pass information to accessibility services.
- The built-in Button composable will fill the semantics properties with information inferred from the composable by default.
- Optional: use `contentDescription` for a more descriptive name to override the default visible label of the button text.
- Example specification of contentDescription in compose: `modifier = Modifier.semantics { contentDescription = "" }`

### Role

- Experiences (refer to number above):
    1. Identifies as an image
    2. Identifies as an image button
    3. Each interactive component in audio challenge identifies as a button or edit box

#### **Android Views**
- When not using native controls (ie, custom controls), roles will need to be manually coded.
- Standard button or ImageButton

#### **Jetpack Compose**
- Standard `Button` composable

### Groupings

#### **Android Views**
- `ViewGroup`
- Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.
#### **Jetpack Compose**
- `Modifier.semantics(mergeDescendants = true) {}` is equivalent to `importantForAccessibility` when compared to android views
- `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State

- Experiences (refer to number above):  
    1. If grouped in table row, it's possible for the whole row to have a disabled state, or the captcha button disabled separately
    2. Image button can have a disabled state (disabled)
    3. Buttons in audio challenge can have a disabled state (disabled)

#### **Android Views**
- Active: `android:enabled=true`
- Disabled: `android:enabled=false`. Announcement: disabled

#### **Jetpack Compose**
- Active: default state is active and enabled. Use `Button(enabled = true)` to specify explicitly
- Disabled: `Button(enabled = false)` announces as disabled
- Alternatively can use `modifier = Modifier.semantics { disabled() }` to announce as disabled
- Use `modifier = Modifier.semantics { stateDescription = "" }` to have a customized state announcement

### Focus

- Experiences (refer to number above):  
    1. Focus is on the whole table row. There should be no focus on any single element, if the whole table row is grouped together, as long as there is only one interactive element per row.
    2. The image button receives focus by swipe or touch
    3. Each element in audio challenge receives focus by swipe or touch. User is confined inside a modal, if presented
- Only manage focus when needed. Primarily, let the device manage default focus
- Consider how focus should be managed between child elements and their parent views
- Initial focus on a screen should land in a logical place (back button, screen title, first text field, first heading)

#### **Android Views**
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

#### **Jetpack Compose**
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

#### **Android Views**
- step 1: Create an accessibility service
- step 2: Add the `FLAG_REQUEST_ACCESSIBILITY_BUTTON` flag in an AccessibilityServiceInfo object's `android:accessibilityFlags` attribute
- step 3: To have a custom service register for the button's custom action callbacks, use `registerAccessibilityButtonCallback()`

#### **Jetpack Compose**
- List of custom accessibility actions can be defined relatively easily in compose compared to Views using customActions. 
- Example: `modifier = Modifier.semantics { customActions = listOf(CustomAccessibilityAction(label = "", action = { true }))}`
