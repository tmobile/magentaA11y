---
layout: entry
title:  "Alert / Modal Dialog"
categories: notifications

keyboard:
  tab or arrow keys: |
    Focus visibly moves, confined within the dialog
  escape: |
    The dialog closes and returns focus to the button that launched it
  space: |
    Any buttons or links are activated on iOS and Android
  enter: |
    Any buttons or links are activated on Android

mobile:
  swipe: |
    Focus moves, confined within the dialog
  doubletap: |
    This typically activates most elements (alternative custom actions may be implemented)
  group: |
    n/a
    
screenreader:
  name:  |
    The dialog describes its purpose or title if any (On launch with iOS. Often with first swipe on Android or intial focus is on CTA)
  role:  |
    May identify itself as a modal, dialog, drawer, sidebar, panel, popover, menu or alert. Confining the user within the modal communicates the context to the screen reader user that there is a modal present
  state: |
    When open, other content is inert. Expands/collapses, closes/opens states are typically announced for a menu, drawer, sidebar, panel or popover

settings:
  text resize: |
    Text can resize up to 200% without losing information
---


## Native Element

- Modal dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks, usually appearing over an existing screen
- Use native alerts when at all possible vs a custom element, as it will handle expected behavior without additional development effort
- Options to close the modal for the screen reader user:  An invisible close button announced for the screen reader only, can be in the swipe order after the last menu item.  Two/three finger swipe.  A close button.
- Drawers usually have a handle or button to be focused by the screen reader to expand and collapse them. Tapping outside the modal to close can not be the only option for screen reader users

### Name

- Title (optional) of alert/modal matches the visible text title in the alert, if any

### Role

- "alert" role is optional. Haptics are optional.   
- Required: Screen reader user is confined inside a modal, communicating an alert/modal is present  
  

### Groupings

- Group alert text to make the announcements logical.
- **iOS**
  - `accessibilityFrame`
  - `accessibilityFrameInContainerSpace`
  - GroupView
- **Android**
  - ViewGroup

### State

- Follow button state guidance if applicable
- Modals that have an open/close or expands/collapses state must be announced. Add logic and announcement to the programmatic name for the state
- **iOS**
  - Active: `isEnabled property`
  - Disabled: `UIAccessibilityTraitNotEnabled`. Announcement: dimmed  
- **Android**  
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`. Announcement: disabled

### Focus

- The screen reader focus **must** be confined within the modal /alert /dialog/ drawer. When the alert appears, the initial focus should be to a logical place or to where the default focus is for the device within the modal
- Android  _sometimes_  initially focuses on the CTAs in the alert, not the text or title
- Android often takes one swipe to bring focus inside the modal

- **iOS**
	- `accessibilityViewIsModal` contains the screen reader focus inside the Modal
  - `accessibilityElementIsFocused`  
	- `isAccessibilityElement` makes the element visible or not to the Accessibility API
	- `accessibilityElementsHidden` indicates that the children elements of the target element are visible or not to the Accessibility API
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
