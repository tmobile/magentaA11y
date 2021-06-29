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
    Focus moves to the element
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
---


## Developer notes

- Clickable textview that navigates the user outside the app (Ex: to a browser)
- Even if the link looks like a button, if the user is navigated to a browser, it must be coded as a link

### Name

- Clickable text describes the destination or purpose of the link

### Role

- Ensure links appear in the Local Context Menu and Rotor  
  
- **iOS  
  **
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
  
 **iOS**
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
