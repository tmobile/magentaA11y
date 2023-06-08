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

### Name

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

- Link text can be grouped with paragraph text to make a larger touch target, provided there is only one interactive link in view.


### State

- **iOS**
  - Active: `isEnabled property`
  - Disabled: `UIAccessibilityTraitNotEnabled`. Announcement: dimmed  
- **Android**  
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`. Announcement: disabled

### Focus

- Only manage focus when needed. Primarily, let the device manage default focus.  
  
- **iOS**
  - `accessibilityElementIsFocused`  
	- `isAccessibilityElement` makes the element visible or not to the Accessibility API
	- `accessibilityElementsHidden` indicates that the children elements of the target element are visible or not to the Accessibility API
	- `accessibilityViewIsModal` contains the screen reader focus inside the Modal
	- To move screen reader focus to newly revealed content: `UIAccessibilityLayoutChangedNotification`
	- To NOT move focus, but dynamically announce new content: `UIAccessibilityAnnouncementNotification`
- **Android**
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
