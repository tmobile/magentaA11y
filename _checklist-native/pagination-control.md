---
layout: entry
title:  "Pagination control"
categories: controls

keyboard:
  tab or arrow keys: |
    Focus visibly moves to control (when page control is focusable)
  arrow and space keys: |
    Brings next page into view when focus is on page control (iOS)
  arrow keys: |
    Moves focus to next page (Android)
          
mobile:
  swipe up/down, double tap or three finger horizontal swipe: |
    Brings next page into view when focus is on page control (iOS)
  two finger swipe: |
    Brings next page into view when focus is not on page control (Android)
  swipe and double tap: |
    Brings next page into view when focus is on page control (Android)
  
    
screenreader: 
  name:  |
    The page index (X of X)
  role:  |
    Identifies as "adjustable" in iOS, Android: double tap to activate
  group: |
    n/a
  state: |
    Expresses its state (disabled/dimmed)

settings:
  text resize: |
    Text can resize up to 200% without losing information
---


## Developer notes

- A control that displays a horizontal series of dots, each of which corresponds to a page in the app’s document 
- There are a variety of implementation alternatives for a page control  
- The screen reader focus usually remains on the pagination control when it is focused and the user interacts with it 
- Screen reader announcement depends on where focus is. If focus is not on the page control, other elements may be focused and announced, even if page has changed. (Android) 
- When a page control is part of a carousel, the page control does not have to be in the swipe order or be the control to change slides.  If the index of the slide (matches visible information in page control) is announced along with other slide information, the page control does not have to be in the swipe order    
- In Android, if a container around the entire screen is the page control, there is usually no programmatic name.  But it announces the page index and possibly "in page" or other information that tells the screen reader user they are within a page experience 
- With Next and Previous Buttons: Option 1: If a non-interactive page indicator is located in between a Next and Previous button, the index of where the user will be navigated to could be announced with the programmatic name and role of the button and the page indicator is not in the swipe order.  (Example: "Previous, 2 of 4, button" -swipe - "Next, 4 of 4, button" if user is on index 3 of 4).  Option 2: The non-interactive page indicator is in the swipe order and just announces the index of the current page. (Example: "Previous, button" - swipe to page dots- "3 of 3" - swipe to next button - "Next, button")

### Name

- Page X of X
- **iOS**
  - `setTitle( )` method
  - Set a label in Interface Builder in the Identity Inspector
  - `accessibilityLabel`
  - _(`accessibilityLabel` overrides setTitle)_  
- **Android**  
  - `android:text` XML attribute
  - `contentDescription`
  - _(`contentDescription` overrides `android:text`)_

### Role

- **iOS**
  - UIPageControl
  - Announcement: adjustable
  - Custom actions are implemented for swipe up or down with one finger gesture
  - Double tap also changes the page when focus is on page control
- **Android**
  - TabLayout with ViewPager
  - Announcement: 1) Double tap to activate is one option.  2) When whole page acts as the page control, no role is announced. Hearing Page x of x in the name tells the screen reader user it is adjustable with two finger swipe. Role and Name are the same in this case.

### Groupings

- n/a

### State

- **iOS**  
  - Active: `isEnabled property`
  - Disabled: `UIAccessibilityTraitNotEnabled`. Announcement: dimmed
- **Android**
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`. Announcement: disabled  

### Focus

- Only manage focus when needed. Primarily, let the device manage default focus  

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
