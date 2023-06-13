---
layout: entry
title:  "Link"
categories: controls
order: 1

keyboard:
  tab or arrow keys: |
    Focus visibly moves to the link
  spacebar: |
    Activates on iOS and Android
  enter: |
    Activates on Android
          
mobile:
  swipe: |
    Focus moves to the element, expresses its name, role (state, if applicable)
  rotor/lcm: |
    Links can be navigated to and activated from the Rotor/Local Context Menu or by focus/double tap.  Only one way is required.
  doubletap: |
    Activates the link

screenreader:
  name:  |
    Purpose and destination is clear
  role:  |
    Identifies itself as a link
  group: |
    n/a
  state: |
    Expresses its state if applicable (disabled/dimmed)

settings:
  text resize: |
    Text can resize up to 200% without losing information
---


## Developer notes

- Clickable text that navigates the user outside the app (ex: opens a browser)
- If your framework does not have a native link, develop the element as a native button, even if the control visibly looks like a link. This will cue the screen reader the action will keep them within the app, specifically the in-app browser. 
- When accessing an in-line link that is inside a paragraph, the focus should be around the paragraph container. Double-tap to activate the link is an expected behavior. 
  - A link from within a paragraph does not have standalone focus. (There can be only one active link in the paragraph)
- Links can also be focused separately within a paragraph or sentence.  Since this would require 3 swipes to get through the sentence, this is not optimal.

## iOS

### Name
- Clickable text that describes the destination or purpose of the link
- Programmatic name matches the visible text label
    - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.

- **UIKit**
  - The link's visible text will overwrite the link's `accessibilityLabel`.
  - If necessary, change the element's `accessibilityLabel` property.
- **SwiftUI**
  - The link's visible text will overwrite the link's `accessibilityLabel`.
  - If necessary, use view modifier `accessibilityLabel(_:)` to change the `accessibilityLabel`.

### Role
- When using non-native controls (custom controls), roles will need to be manually coded.

- **UIKit**
  - Since UIKit does not have a native link, develop using `UIButton`
  - Set `accessibilityTraits` to `.link`.
  - Stylize the text to appear as a link
- **SwiftUI**
  - Use native `Link` view
  - If necessary, use view modifier `accessibilityAddTraits(.isLink)` to assign the role as Link.
  - If applicable, use view modifier `accessibilityRemoveTraits(:)` to remove unwanted traits.  

### Groupings
- Link text can be grouped with paragraph text to make a larger touch target, provided there is only one interactive link in view.

- **UIKit**
  1. Ensure that the child elements, such as the in-line link, of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
  2. Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
  - If frame does not exist due to custom development, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
    - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
  - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
  - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.
- **SwiftUI**
  - Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.
  - Check that if VoiceOver is running, attach the link action to the paragraph container

### State 
- **UIKit**  
  - For enabled: Set `isEnabled` to `true`.
  - For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
    - If necessary, you may change the accessibility trait of the link to `notEnabled`, but this may overwrite the current accessibility role of the link.
- **SwiftUI**
  - For disabled, use view modifier `disabled()`.

### Focus
- Use the device's default focus functionality. 
- External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.
- Initial focus on a screen should land in a logical place, such as back button, screen title, first text field, or first heading.
- When the in-app browser is closed, the focus should return to the triggering element.

- **UIKit**
  - Implement focus ring to be around the paragraph container, so that double-tapping the paragraph will activate the in-line link, given that there is one link inside the program.
  - If VoiceOver is not reaching a particular element, set the element's `isAccessibilityElement` to `true`
    - **Note:** You may need to adjust the programmatic name, role, state, and/or value after doing this, as this action may overwrite previously configured accessibility.
  - To move screen reader focus to newly revealed content, use `UIAccessibility.post(notification:argument:)` that takes in `.screenChanged` and the newly revealed content as the parameter arguments.
  - To NOT move focus, but dynamically announce new content: use `UIAccessibility.post(notification:argument:)` that takes in `.announcement` and the announcement text as the parameter arguments.
  - `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements.  
- **SwiftUI**
  - For general focus management that impacts both screen readers and non-screen readers, use the property wrapper `@FocusState` to assign an identity of a focus state.
    - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:)` to assign focus on a view with `@FocusState` as the source of truth.
    - Use the property wrapper `@FocusState`in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
  - If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.

### Announcement examples
- Announcement order can vary.

- "Label, link"
- "All text in paragraph including url, link" (link in paragraph)
- "Label, dimmed, link" (disabled)

## Android

### Name
- Clickable text that describes the destination or purpose of the link
- Programmatic name matches the visible text label

### Role
- Ensure screen reader users can navigate to links from the Local Context Menu and Rotor
- Role is automatically announced if a native component is used
- When using non-native controls (custom controls), roles will need to be manually coded.
- **Android Views**
  - TextView - Announces as “link”
  - URLSpan / ClickableSpan
  - Linkify Class
- **Android Compose**
  - Compose does not have native support on Link in Text, a customized linkable text need to be added into Text composable or use a `AndroidView` to bring the Android View with `Linkify` to build Compose composable

### Groupings
- Link text can be grouped with paragraph text automatically to make a larger touch target, provided there is only one interactive link in view.
- **Android Views**
  - `ViewGroup`
  - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.
- **Android Compose** 
  - `Modifier.semantics(mergeDescendants = true) {}` for the child elements grouping/merging
  - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State
- **Android Views**
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`
  - Announcement: disabled
- **Android Compose**
  - Active: default state is active and enabled. Use `RadioButton(enabled = true)` to specify explicitly
  - Disabled:  `RadioButton(enabled = false)` announces as disabled
  - Alternatively can use `modifier = Modifier.semantics { disabled() }` to announce as disabled
  - Use `modifier = Modifier.semantics { stateDescription = "" }` to have a customized state announcement

### Focus
- Only manage focus when needed. Primarily, let the device manage default focus order
- Consider how focus should be managed between child elements and their parent views or containers
- External keyboard tab order often follows the screen reader focus, but sometimes needs focus management
- Initial focus on a screen should land in a logical place, such as back button, screen title, first text field, or first heading
- When a menu, picker, or modal is closed, the focus should return to the triggering element
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
  - To hide controls: `Important_For_Accessibility_false`
  - For a `ViewGroup`, set `screenReaderFocusable=true` and each inner object’s attribute to keyboard focus (`focusable=false`)
- **Android Compose**
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
- **Android Compose**
{% highlight kotlin %}
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
{% endhighlight %}

### Announcement examples
Options for announcements below depend on framework and versions. Announcement order can vary.  "Double tap to activate" hint announcement varies with implementation.

- "Label, link"
- "Label, link, double tap to activate"
- "Label, double tap to activate, links available, tap with three fingers to view"
- "All text in paragraph including link name, links available, tap with three fingers to view" (link in paragraph)
- "Text in sentence, link name, link, remainder of sentence, double tap to activate, links available, tap with three fingers to view" (link in sentence with separate link focus)
- "Label, disabled" (disabled)