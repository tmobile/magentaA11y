---
layout: entry
title:  "Carousel"
categories: controls

 keyboard:
  tab or arrow keys: |
    Focus visibly moves to the next item
 spacebar: |
    Activates interactive slide on iOS and Android
 enter: |
    Activates interactive slide on Android
          
mobile:
  swipe: |
    Focus moves to the next slide (Android and iOS) 
  3 finger swipe: | 
    Focus moves to the next slide (iOS) 
  doubletap: |
    Activates the button
    
screenreader: 
  name:  |
    Purpose of each item is clear and matches visible text. "In list" is often announced in Android.  Index is often announced in Android and iOS
  role:  |
    Identifies as a button in iOS and "double tap to activate" in Android
  group: |
    n/a
  state: |
    Expresses its state (disabled/dimmed)
---

## Developer notes


- A list of related content items, presented in panels as a horizontal slideshow
- There are a variety of implementation alternatives for a carousel 
- Slides cannot automatically change unless there is a pause/stop button
- If there is a visible indication of what slide the user is on with the dots or tabs, each slide should announce the index of the slide (“1 of 3") and dots are not in the swipe order
- "In list" or "Showing slides x of x" are common announcements to give screen readers layout context
- Alternate implementation to swiping through carousel: Change the slides with interactive page control and dynamically announce all the content in the slide along with page index. If the slides are interactive, gestures must be unique to changing slides and activating slides 
 


### Name

- Each item in the carousel has a name that describes the purpose of the control or matches the visible label/all text and image descriptions within item.  
  
- **iOS Tips**
  - Set a label in Interface Builder in the Identity Inspector
  - Group visible text label and the control in the same view container: `accessibilityFrameInContainerSpace`
  - `setTitle( )` method
  - If no visible label, use `accessibilityLabel` on control
  - `Hint` is used sparingly and if the results of interacting with it are not obvious from the control's label.
  - Match visible label, if any
  - To hide labels from VoiceOver announcements, uncheck the Accessibility Enabled checkbox in the Identity Inspector
  - If hiding visible label, use `accessibilityLabel` on control
- **Android Tips**  
  - `android:text` XML attribute
  - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements without a visible label.
  - `contentDescription` overrides `android:text`    
  - Use `labelFor` attribute to associate the visible label to the control

### Role

- **iOS**
  - Button
  - Custom class `CarouselAccessibilityElement` 
  - Optional: implement custom actions with `accessibilityTraits` set to `adjustable`.
- **Android**
  - ViewPager  or
  - CarouselView

### Groupings

n/a

### State

- **iOS**  
  - Active: `isEnabled` property
  - Disabled: `UIAccessibilityTraitNotEnabled`
- **Android**
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`

### Focus

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
