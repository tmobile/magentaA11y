## General Notes

How to test a link

## Condensed

### #a11y - Native App Accessibility Acceptance Criteria

How to test a link

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys, or ctrl+tab: Focus visibly moves to the link
   - Spacebar: Activates on iOS and Android
   - Enter: Activates on Android

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the element, expresses its name, role (state, if applicable)
   - Rotor/talkback menu: Links can be navigated to and activated from the Rotor/TalkBack menu or by focus/double tap. Only one way is required. Known issue: Links do not currently appear in iOS Rotor using SwiftUI. 
   - Doubletap: Activates the link

3. Listen to screenreader output on all devices

   - Name: Purpose and destination is clear
   - Role: Identifies itself as a link
   - Group: n/a
   - State: Expresses its state if applicable (disabled/dimmed)

4. Device OS settings

   - Text resize: Text can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/link](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/link)

## Gherkin

### #a11y - Native App Accessibility Acceptance Criteria

How to test a link

GIVEN THAT I am on a screen with a link

1. Scenario: Test keyboard actions 

   - WHEN I press the "TAB", "ARROW KEYS", or "CTRL+TAB" keys 
      - THEN the focus should visibly move to the link 
   - WHEN I press the "SPACEBAR" key 
      - THEN the link should be activated on iOS and Android 
   - WHEN I press the "ENTER" key 
      - THEN the link should be activated on Android  

2. Scenario: Test mobile screen reader gestures 

   - WHEN I swipe to navigate to the link 
      - THEN the focus should move to the link 
         - AND the link's name, role, and state (if applicable) should be expressed 
   - WHEN I use the Rotor/TalkBack menu 
      - THEN the link should be navigable and activatable from the Rotor/TalkBack menu or by focus and double-tap 
         - AND at least one method should work 
   - WHEN I double-tap the link 
      - THEN the link should be activated 
          - AND KNOWN ISSUE: Links do not currently appear in iOS Rotor using SwiftUI 

3. Scenario: Test screen reader output on all devices 

   - WHEN a screen reader reads the link 
      - THEN its name should clearly describe its purpose and destination 
         - AND its role should be identified as a link 
         - AND its state (DISABLED/DIMMED) should be expressed, if applicable  

4. Scenario: Test device OS settings for text resize 

   - WHEN I adjust the device text resize setting to 200% 
      - THEN the text of the link should resize up to 200% without losing information 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/link](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/link)

## Videos

### iOS Voiceover

<video controls>
  <source src="media/video/native/link/linkIosVoiceOver.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback

<video controls>
  <source src="media/video/native/link/linkAndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## iOS Developer Notes

### **Developer Notes**

   - Actionable link that navigates the user outside of the app to a web page (ex: opens a web browser).
   - When accessing an in-line link that is inside a paragraph with a screen reader, the focus is usually around the paragraph container.
   - To activate a link, screen reader users can double tap both inline links and links outside of paragraphs.
   - There should only be a single inline link inside of a paragraph. Screen readers can only access the first link in the paragraph.
   - The correct execution of native app controls informs assistive technologies, such as voice control, screen readers, and switch access, that the element is interactive.

### Name
   - Interactive text that describes the destination or purpose of the link
   - Programmatic name matches the visible text label
      - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.
      - **Note:** If adding context to a generic link, ensure the visible text for the link is the first part of the label and it matches the visible text. For example, a link the has a visual label of "Learn more" that is not part of a paragraph may need a label with greater context in the code so it is announced by a screen reader as "Learn more about accessible controls".
      - **Note:** If adding context to a generic link, ensure the visible text for the link is the first part of the label and it matches the visible text. For example, a link the has a visual label of "Learn more" that is not part of a paragraph may need a label with greater context in the code so it is announced by a screen reader as "Learn more about accessible controls".

#### **UIKit**
   - The link's visible text will overwrite the link's `accessibilityLabel`.
   - If necessary, change the element's `accessibilityLabel` property.

#### **SwiftUI**
   - The link's visible text will overwrite the link's `accessibilityLabel`.
   - If necessary, use view modifier `accessibilityLabel(_:)` to change the `accessibilityLabel`.

### Role
   - When using non-native app controls (custom controls), roles will need to be manually coded.

#### **UIKit**
   - Since UIKit does not have a native link, develop using `UIButton`
      - If using a `UIButton` is not suitable for your use case, you may try the following strategies:
         - Use a `UITextView` with a `NSAttributedString` with a `.link` attribute, OR
         - Use a `UILabel` or related view and apply a `UITapGestureRecognizer`
         - **Note:** The more complex your custom control is, the more complex the accessibility implementation can be
   - Set `accessibilityTraits` to `.link`
   - Stylize the text to appear as a link

#### **SwiftUI**
   - Use native `Link` view
   - If necessary, use view modifier `accessibilityAddTraits(.isLink)` to assign the role as Link.
   - If applicable, use view modifier `accessibilityRemoveTraits(:)` to remove unwanted traits.  

### Groupings
   - Link text can be grouped with paragraph text to make a larger touch target, provided there is only one interactive link in view.

#### **UIKit**
   - Ensure that the child elements, such as the in-line link, of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
   - Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
      - If frame does not exist due to custom development, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
         - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
      - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
      - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.

#### **SwiftUI**
   - Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.
   - After grouping the paragraph and the in-line link to form a single accessibility element, bind the link action to it.
      - For the screen reader experience, focus will surround the paragraph container. Double-tapping the paragraph will activate the link.
      - For the non-screen reader experience, do not bind the link action to the paragraph container. Non-screen readers must tap on the link itself to activate the link.

### State 

#### **UIKit**  
   - For enabled: Set `isEnabled` to `true`.
   - For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
      - If necessary, you may change the accessibility trait of the link to `notEnabled`, but this may overwrite the current accessibility role of the link.

#### **SwiftUI**
   - For disabled, use view modifier `disabled()`.

### Focus
   - Use the device's default focus functionality. 
   - External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.
   - Initial focus on a screen should land in a logical place, such as back button, screen title, first text field, or first heading.
   - When a link is closed, the focus should return to the triggering element.

#### **UIKit**
   - Implement focus ring to be around the paragraph container, so that double-tapping the container will activate the in-line link, given that there is only one link inside the container.
   - If VoiceOver is not reaching a particular element, set the element's `isAccessibilityElement` to `true`
      - **Note:** You may need to adjust the programmatic name, role, state, and/or value after doing this, as this action may overwrite previously configured accessibility.
   - To move screen reader focus to newly revealed content, use `UIAccessibility.post(notification:argument:)` that takes in `.screenChanged` and the newly revealed content as the parameter arguments.
   - To NOT move focus, but dynamically announce new content: use `UIAccessibility.post(notification:argument:)` that takes in `.announcement` and the announcement text as the parameter arguments.
   - `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements.

#### **SwiftUI**
   - Implement focus ring to be around the paragraph container, so that double-tapping the container will activate the in-line link, given that there is only one link inside the container.
   - For general focus management that impacts both screen readers and non-screen readers, use the property wrapper `@FocusState` to assign an identity of a focus state.
      - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:)` to assign focus on a view with `@FocusState` as the source of truth.
      - Use the property wrapper `@FocusState`in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
   - If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.

### Announcement examples
   - Announcement order can vary
   - "Label, link"
   - "All text in paragraph including url, link" (link in paragraph)
   - "Label, dimmed, link" (disabled)

### Further reading

   - [UIAccessibilityTraits](https://developer.apple.com/documentation/uikit/uiaccessibilitytraits)

## Android Developer Notes

### **Developer Notes**

   - Actionable text that navigates the user outside of the app to a web page (ex: opens an web browser).
   - When accessing an in-line link that is inside a paragraph with a screen reader, the focus can be around the paragraph container.
   - To activate a link, screen reader users must double tap both inline links and links outside of paragraphs.
   - There should only be a single inline link inside of a paragraph. Screen readers can only access the first link in the paragraph.
   - The correct execution of native app controls informs assistive technologies, such as voice control, screen readers, and switch access, that the element is interactive.

### Name

   - Interactive text that describes the destination or purpose of the link
   - Programmatic name matches the visible text label
      - **Note:** If adding context to a generic link, ensure the visible text for the link is the first part of the label and it matches the visible text. For example, a link the has a visual label of “Learn more” that is not part of a paragraph may need a label with greater context in the code so it is announced by a screen reader as “Learn more about accessible controls".

### Role

   - Ensure screen reader users can navigate to links from the TalkBack menu
   - Role is automatically announced if a native app component is used
   - When using non-native controls (custom controls), roles will need to be manually coded.

#### **Android Views**
   - TextView - Announces as “link”
   - URLSpan / ClickableSpan
   - Linkify Class

#### **Android Compose**
   - Compose does not have native support on Link in Text, a customized linkable text need to be added into Text composable or use a `AndroidView` to bring the Android View with `Linkify` to build Compose composable

### Groupings

   - Link text can be grouped with paragraph text automatically to make a larger touch target, provided there is only one interactive link in view.

#### **Android Views**
   - `ViewGroup`
   - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.

#### **Android Compose** 
   - `Modifier.semantics(mergeDescendants = true) {}` for the child elements grouping/merging
   - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State

#### **Android Views**
   - Active: `android:enabled=true`
   - Disabled: `android:enabled=false`
   - Announcement: disabled

#### **Android Compose**
   - Active: default state is active and enabled. Use `RadioButton(enabled = true)` to specify explicitly
   - Disabled:  `RadioButton(enabled = false)` announces as disabled
   - Alternatively can use `modifier = Modifier.semantics { disabled() }` to announce as disabled
   - Use `modifier = Modifier.semantics { stateDescription = "" }` to have a customized state announcement

### Focus

   - Only manage focus when needed. Primarily, let the device manage default focus order
   - Consider how focus should be managed between child elements and their parent views or containers
   - External keyboard tab order often follows the screen reader focus, but sometimes needs focus management
   - Initial focus on a screen should land in a logical place, such as back button, screen title, first text field, or first heading
   - When a link is closed, the focus should return to the triggering element

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
   - To hide controls: `Important_For_Accessibility_false`
   - For a `ViewGroup`, set `screenReaderFocusable=true` and each inner object’s attribute to keyboard focus (`focusable=false`)
   
#### **Android Compose**
   - `Modifier.focusTarget()` makes the component focusable
   - `Modifier.focusOrder()` needs to be used in combination with FocusRequesters to define focus order
   - `Modifier.onFocusEvent()`, `Modifier.onFocusChanged()` can be used to observe the changes to focus state
   - `FocusRequester` allows to request focus to individual elements with in a group of merged descendant views
   - *Example:* To customize the focus events behaviour or the sequence of focus,
      - step 1: define the focus requester prior. `val (first, second) = FocusRequester.createRefs()`
      - step 2: update the modifier to set the order. `modifier = Modifier.focusOrder(first) { this.down = second }`
      - focus order accepts following values: up, down, left, right, previous, next, start, end
      - step 3: use `second.requestFocus()` to gain focus

### Code Example

#### **Jetpack Compose**
```java
   /**
   * Custom Composable with AndroidView to support link in textView and the links accessibility features from talkback menu
   */
   @Composable
   fun LinkText(
      modifier: Modifier = Modifier,
      textBody: String
   ) {
      AndroidView(
         modifier = modifier,
         factory = { context ->
               TextView(context).apply {
                  text = SpannableString(textBody)
                  LinkifyCompat.addLinks(this, Linkify.WEB_URLS)
                  movementMethod = LinkMovementMethod.getInstance()
               }
         }
      )
   }
```

### Further reading

- [Handling Android App Links](https://developer.android.com/training/app-links)

### Announcement examples
Options for announcements below depend on device framework and versions. Announcement order can vary. "Double tap to activate" hint announcement varies with implementation.

   - "Label, link"
   - "Label, link, double tap to activate"
   - "Label, double tap to activate, links available, tap with three fingers to view" (TalkBack menu appears)
   - "All text in paragraph including link name, links available, tap with three fingers to view" (link in paragraph)
   - "Text in sentence, link name, link, remainder of sentence, double tap to activate, links available, tap with three fingers to view" (link in sentence with separate link focus)
   - "Label, disabled" (disabled)
