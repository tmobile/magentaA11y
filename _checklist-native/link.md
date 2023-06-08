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
- Button: even if the control visibly looks like a link, code as a button to cue the screen reader the action will keep them within the app
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
  - Add a gesture recognizer to the text that is to become a link
  - Stylize the text to appear as a link
  - Add 

- **SwiftUI**
  - If no visible label, use view modifier `accessibilityLabel(_:)`.
  - If button has icon(s), hide the icon(s) from VoiceOver by using view modifier `accessibilityHidden(true)`.

### Role
- When using non-native controls (custom controls), roles will need to be manually coded.

- **UIKit**
  - Use `UIButton`
  - If necessary, set `accessibilityTraits` to `.button`.
  - If necessary, set `accessibilityTraits` to `.link`.
- **SwiftUI**
  - Use native `Link` view
  - If necessary, use view modifier `accessibilityAddTraits(.isLink)` to assign the role as Link.
  - If applicable, use view modifier `accessibilityRemoveTraits(:)` to remove unwanted traits.  

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
```kotlin
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

### Announcement examples
Options for announcements below depend on framework and versions. Announcement order can vary.  "Double tap to activate" hint announcement varies with implementation.

- "Label, link"
- "Label, link, double tap to activate"
- "Label, double tap to activate, links available, tap with three fingers to view"
- "All text in paragraph including link name, links available, tap with three fingers to view" (link in paragraph)
- "Text in sentence, link name, link, remainder of sentence, double tap to activate, links available, tap with three fingers to view" (link in sentence with separate link focus)
- "Label, disabled" (disabled)
