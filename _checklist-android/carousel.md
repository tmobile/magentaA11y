---
layout: entry
title:  "Carousel"
categories: containment

keyboard:
 tab or arrow keys: |
    Focus visibly moves to the next item
 spacebar: |
    Activates interactive slide on iOS and Android
 enter: |
    Activates interactive slide on Android
          
mobile:
  swipe rt: |
    Focus moves to the next slide (Android and iOS) 
  3 finger swipe: | 
    Focus moves to the next slide (iOS)
  2 finger swipe: | 
    Focus moves to the next slide (Android)
  1 finger swipe up or down or other custom actions: |
    Focus moves to the next slide
  doubletap: |
    Activates the button
    
screenreader: 
  name:  |
    Purpose of each item is clear and matches visible text. "In list" is often announced in Android.  Index is often announced in Android and iOS
  role:  |
    Identifies as a button in iOS and "double tap to activate" in Android
    Identifies as "adjustable" with custom actions (iOS)
  group: |
    n/a
  state: |
    Expresses its state (disabled/dimmed)

settings:
  text resize: |
    Text can resize up to 200% without losing information
---

## Developer notes

- A list of related content items as a horizontal slideshow
- There are a variety of implementation alternatives for a carousel. At least one of the options above for navigating through the elements/slides must be available
- Slides cannot automatically rotate through carousel unless there is a pause/stop button
- If there is a visible indication of what slide the user is on with pagination dots or tabs, each slide should announce the index of the slide (“1 of 3") and dots do not get focused or announced in the swipe order
- "In list" or "Showing slides x of y" are common announcements to give screen readers layout context
- Alternate implementation to swiping through carousel: Change the slides with interactive page control dots and dynamically announce all the content in the slide along with page index. 
- The implementation choice would depend on the number of carousel slides/elements.  Swiping right through the slides of a very large number of slides to get to the next element past the carousel would be a terrible user experience.  A container for the carousel and alternate gestures for navigation inside the container should be considered on large carousels
- Consider accessibility requirements when chosing a plug-in or widget
- If swiping with two or three fingers (Android and iOS, respectively) is used to rotate through the carousel, announce "page x of y" upon swiping to next screen.
 


### Name

- Each item in the carousel has a name that describes the purpose of the control and matches any visible label/all text and image descriptions within item.  
  
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
  - Optional: implement custom actions with `accessibilityTraits` set to `adjustable`.  Suggested for a carousel with a large number of slides.
- **Android**
  - ViewPager  or
  - CarouselView

### Groupings

n/a

### State

- **iOS**  
  - Active: `isEnabled` property
  - Disabled: `UIAccessibilityTraitNotEnabled`
  - Announcement: dimmed
- **Android**
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`
  - Announcement: disabled

### Focus
- External keyboard tab order often follows the screen reader focus, but sometimes needs focus management
- Each slide/element in the carousel should be in the view area when it is being announced

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
	- For a `ViewGroup`, set `screenReaderFocusable=true` and each inner object’s attribute to keyboard focus (`focusable=false`)
