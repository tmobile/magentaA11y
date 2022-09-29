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

- Clickable textview that navigates the user outside the app (Ex: opens a browser)
- Button: even if the control visibly looks like a link, code as a button to cue the screen reader the action will keep them within the app
- Focus around an entire paragraph and activating an in-line link with double tap is an expected behavior.  The link does not have isolated focus.  (There can be only one active link in the paragraph)

### Name

- Clickable text describes the destination or purpose of the link
- Programmatic name matches the visible text

### Role

- Ensure screen reader users can navigate to links from the Local Context Menu and Rotor  
  
- **iOS**
  - Use TextView with `UIAccessibilityTraitLink`
  - Announces as "link"
- **Android**  
  - TextView - Announces as "link"  
  - `URLSpan` / `ClickableSpan`
  - Linkify Class

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
