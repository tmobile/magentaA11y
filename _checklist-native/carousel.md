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
 
## iOS

### Name
- Programmatic name describes the purpose of the carousel.
- Append ", Carousel" to the programmatic name to announce the role, since the carousel is custom and does not have a native role assigned
- If visible text label exists, the programmatic name should match the visible text label.
    - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.
- Placeholder text is NOT the programmatic name

- **UIKit**
  - You can programmatically set the visible label with `setTitle()`.
    - The carousel's title will overwrite the carousel's `accessibilityLabel`.
  - If a visible label is not applicable in this case, set the carousel's `accessibilityLabel` to the label of your choice.
    - To do this in Interface Builder, set the label using the Identity Inspector
  - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
  - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.
- **SwiftUI**
  - If no visible label, use view modifier `accessibilityLabel(_:)`.
  - If button has icon(s), hide the icon(s) from VoiceOver by using view modifier `accessibilityHidden(true)`.

### Role
- Since there is no native carousel component, a custom carousel must be implemented.
- The carousel itself has its own role indicated by appending ", Carousel" to the programmatic name.
- Each item in the carousel has its own independent role or accessibility trait. For example, if the item is interactive, the role will be `.button`.

- **UIKit**
  - A common method of implementing a carousel involves using `UICollectionView` and its corresponding protocols. Each item of the carousel is a `UICollectionViewCell`.
  - Set the `accessibilityTraits` of the overall carousel role to `.adjustable`, and then append ", Carousel" to the programmatic name to notify the user of the role
  - An individual item of the carousel will have its own role that is dependent on whether it is interactive. Assign the role that best fits your use case.
- **SwiftUI**
  - As there are different ways to implement a carousel, use your best judgment for your use case.
  - Append ", Carousel" to the programmatic name for the overall carousel
  - An individual item of the carousel will have its own role that is dependent on whether it is interactive. Assign the role that best fits your use case.
  - Use view modifier `accessibilityAddTraits(:)` to add traits.
  - If applicable, use view modifier `accessibilityRemoveTraits(:)` to remove unwanted traits.  

### Groupings
- Group visible label with the carousel, if applicable.
- Group the title and any description with each item in the carousel.

- **UIKit**
  1. Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
  2. Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
  - If frame does not exist due to custom button, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
    - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
  - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
  - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.
- **SwiftUI**
  - Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.

### State
- Indicate where the item is in the carousel by announcing the position/index out of the total number of items. (see Announcements below)

- **UIKit**
  - For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
- **SwiftUI**
  - For disabled, use view modifier `disabled()`.

### Focus
- Use the device's default focus functionality. 
- Consider how focus should be managed between child elements and their parent views.
- External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.

- **UIKit**
  - If VoiceOver is not reaching a particular element, set the element's `isAccessibilityElement` to `true`
    - **Note:** You may need to adjust the programmatic name, role, state, and/or value after doing this, as this action may overwrite previously configured accessibility.
  - Use `accessibilityViewIsModal` to contain the screen reader focus inside the modal.
  - To move screen reader focus to newly revealed content, use `UIAccessibility.post(notification:argument:)` that takes in `.screenChanged` and the newly revealed content as the parameter arguments.
  - To NOT move focus, but dynamically announce new content: use `UIAccessibility.post(notification:argument:)` that takes in `.announcement` and the announcement text as the parameter arguments.
  - `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements.  
- **SwiftUI**
  - For general focus management that impacts both screen readers and non-screen readers, use the property wrapper `@FocusState` to assign an identity of a focus state.
    - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:)` to assign focus on a view with `@FocusState` as the source of truth.
    - Use the property wrapper `@FocusState`in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
  - If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.

#### Custom Gestures
- The expected experience is that when users swipe left or right, they are navigating from one section of the screen to another. When users swipe up or down on the carousel, the user is scrolling through the carousel

- **UIKit**
  - First, ensure that the accessibility trait of the carousel is `.adjustable`.
  - Then, you are able to take advantage of the `accessibilityIncrement` and `accessibilityDecrement` methods

  ```swift
  override func accessibilityIncrement() {
      // Move forward one item

  }

  override func accessibilityDecrement() {
      // Move backward one item

  }
  ```

- **SwiftUI**
  - There are many approaches to applying custom gestures to a component
  - One suggestion is to use `.accessibilityAdjustableAction` with a `switch` statement for the `direction`, and changing the index of the cell depending on whether the direction is `.increment` or `.decrement`
    - "Incrementing" should move to the next item
    - "Decrementing" should move to the previous item

    ```swift
    .accessibilityAdjustableAction { direction in
        switch direction {
        case .increment:
            // Go to next page

        case .decrement:
            // Go to previous page

        }
    }
    ```