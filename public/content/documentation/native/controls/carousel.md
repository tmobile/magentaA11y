## General Notes

How to test a carousel

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a carousel

1. Test keyboard only, then screen reader + keyboard actions

      - Tab, arrow keys or ctl+tab: Focus visibly moves to the next item

      - Spacebar: Activates button or interactive slide on iOS and Android

      - Enter: Activates button or interactive slide on Android

2. Test mobile screenreader gestures

      - Swipe right: Focus moves to the next element 

      - 3 finger swipe: Focus moves to the next slide (iOS)

      - 2 finger swipe: Focus moves to the next slide (Android)

      - 1 finger swipe up or down or other custom actions: Focus 
      moves to the next slide on iOS

      - Doubletap: Activates the button

3. Listen to screenreader output on all devices

      - Name: Purpose of each item is clear and matches visible text.  Index should be announced in Android and iOS

      - Role: Identifies as a button in iOS and "double tap to activate" in Android

      - Role: Identifies as "adjustable" with custom actions (iOS)

      - Group: n/a

      - State: Expresses a button's state (disabled/dimmed)

4. Test device settings

      - Text resize: Text can resize up to 200% without losing information


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/carousel](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/carousel)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a carousel

GIVEN THAT I am on a screen with a carousel

1. Scenario: Test keyboard actions

    - WHEN the user presses "TAB", Arrow Keys, or "CTRL+TAB" 
        - THEN the focus must visibly move to the next carousel item 
    - WHEN the user presses "SPACEBAR" on iOS or Android 
        - THEN the button or interactive slide must activate 
    - WHEN the user presses "ENTER" on Android 
        - THEN the button or interactive slide must activate 

2. Scenario: Test mobile screen reader gestures

    - WHEN the user swipes right 
        - THEN focus must move to the next interactive element 
    - WHEN the user performs a 3-finger swipe on iOS 
        - THEN focus must move to the next slide 
    - WHEN the user performs a 2-finger swipe on Android 
        - THEN focus must move to the next slide 
    - WHEN the user performs a 1-finger swipe up or down or a custom action on iOS 
        - THEN focus must move to the next slide 
    - WHEN the user performs a double-tap 
        - THEN the button must activate 

3. Scenario: Test screen reader output on all devices

    - WHEN the user swipes through the elements 
        - THEN each item must be announced with the following attributes: 
          - AND the Name must clearly describe the purpose and match the visible text 
          - AND the Role must be identified as "Button" in iOS and "Double tap to activate" in Android 
          - AND the Role must be identified as "Adjustable" with custom actions in iOS 
          - AND the Group must be marked as not applicable (N/A) 
          - AND the State must announce the button’s state (e.g., DISABLED/DIMMED) 

4. Scenario: Test device OS settings for text resize

    - WHEN a user adjusts text resizing settings up to 200% 
        - THEN all text must remain readable without loss of information 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/carousel](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/controls/carousel)

## iOS Developer Notes
### General Notes
- A carousel is a list of related content items as a horizontal slideshow
- There are a variety of implementation alternatives for a carousel. At least one of the options in the above success criteria for navigating through the elements/slides must be available
- Slides cannot automatically start rotating through carousel unless there is a pause/stop button
- Consider the number of slides/elements in carousel when choosing implementation.  Swiping right through the slides of a very large number of slides to get to the next element past the carousel would not be a good user experience. Custom actions/gestures for navigation through the slides should be considered on large carousels on iOS.  Then, if the user wants to bypass all the slides, they would simply swipe right to the next element past the carousel
- Alternate implementation to swiping through carousel: Change the slides with interactive page control dots and dynamically announce all the content in the slide along with page index (without focus on slides, only on the dots)


### Name
- Programmatic name of any interactive element describes it's purpose
- Append ", Carousel" to the programmatic name to announce the role, since the carousel is custom and does not have a native role assigned
- If visible text label exists for an interactive component, the programmatic name should match the visible text label.
    - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.

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
  - Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
  - Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
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

### Custom Gestures
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
### Announcements
  - “Showing slides x of y” are common announcements to give screen readers context of layout
  - “Custom actions available.  Swipe up or down to change slides” – common custom actions announcement


## Android Developer Notes
### General Notes
- A carousel is a list of related content items as a horizontal slideshow
- There are a variety of implementation alternatives for a carousel. At least one of the options in the above success criteria for navigating through the elements/slides must be available
- Slides cannot automatically start rotating through carousel unless there is a pause/stop button
- Consider the number of slides/elements in carousel when choosing implementation.  Swiping right through the slides of a very large number of slides to get to the next element past the carousel would not be a good user experience.
- The container around the carousel on Android can be an alternative for the user to bypass all the slides.  The user can enter the container to navigate through the slides, or swipe to the next element past the container.
  - When navigating to a carousel with the screen reader, it should first focus on the entire carousel container
  - Each carousel may have a different number of items, so the label includes the total amount of items and the current item in focus
  - Then, activating the carousel container focuses on the first carousel item
  - Two finger swipe rt or left navigates through the slides putting focus on the next slide in the order
- Alternate implementation to swiping through carousel: Change the slides with interactive page control dots and dynamically announce all the content in the slide along with page index (without focus on slides, just on the dots)




### Name
- Programmatic name of any interactive element describes it's purpose.
- Each item in the carousel, if interactive, has a name that describes the purpose of the control and matches any visible label/all text and image descriptions within item.  

- **Android View**  
  - `android:text` XML attribute
  - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements without a visible label.
  - `contentDescription` overrides `android:text`    
  - Use `labelFor` attribute to associate the visible label to the control

- **Jetpack Compose**
  - If no visible label, use compose modifier semantics `contentDescription`.
  - If any icons or images need to be hidden for accessibility talkback, use compose modifier semantics `invisibleToUser()`

### Role 
- The native Pager component will handle the built-in accessibility behavior
- Each item in the carousel can have the independent role and accessibility trait. For example, if the item is clickable, the role should be `button`.

- **Android View**
  - ViewPager
  - CarouselView
- **Jetpack Compose**
  - Compose foundation `HorizontalPager` and `VerticalPager`

### Groupings
- Group visible label with the carousel, if applicable.
- Group the title and any description with each item in the carousel
- If the item in carousel is clickable, use compose modifier `clickable` which will group the child elements automatically.
- If the item in carousel has multi-actions, then spilt the action out of the group with proper focus order on each actions.
- **Android View**
  - `ViewGroup`
  - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.
- **Jetpack Compose** 
  - `Modifier.semantics(mergeDescendants = true) {}` for the child elements grouping/merging
  - `FocusRequester.createRefs()` helps to request focus to inner elements with in the group

### State
- Indicate where the item is in the carousel by announcing the position/index out of the total number of items. (see Announcements below)
- Indicate the action state if applicable

- **Android View**
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`
  - Announcement: disabled
- **Jetpack Compose** 
  - Active: default state is active and enabled. Use `Button(enabled = true)` or `clickable {enabled = true}` to specify explicitly
  - Disabled:  `Button(enabled = false)` or `clickable {enabled = false}` announces as disabled
  - Alternatively can use `modifier = Modifier.semantics { disabled() }` to announce as disabled

### Focus
- Each slide/element in the carousel should be in the view area when it is being announced
- Consider how focus should be managed between child elements and their parent views.
- External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.

- **Android View**
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
- **Jetpack Compose**
  - `Modifier.focusTarget()` makes the component focusable
  - `Modifier.focusOrder()` needs to be used in combination with FocusRequesters to define focus order
  - `Modifier.onFocusEvent()`, `Modifier.onFocusChanged()` can be used to observe the changes to focus state
  - `FocusRequester` allows to request focus to individual elements with in a group of merged descendant views
  - *Example:* To customize the focus events behaviour
      - step 1: define the focus requester prior. `val (first, second) = FocusRequester.createRefs()`
      - step 2: update the modifier to set the order. `modifier = Modifier.focusOrder(first) { this.down = second }`
      - focus order accepts following values: up, down, left, right, previous, next, start, end
      - step 3: use `second.requestFocus()` to gain focus

### Code Example
- **Jetpack Compose**
```java
// Example of Compose horizontal pager with single page snapping
val state = rememberPagerState { 10 }
HorizontalPager(
    state = state,
    modifier = Modifier.fillMaxSize(),
) { pageIndex ->
    Box(
        modifier = Modifier
            .padding(10.dp)
            .background(Color.Blue)
            .fillMaxWidth()
            .aspectRatio(1f),
        contentAlignment = Alignment.Center
    ) {
        Text(text = pageIndex.toString(), fontSize = 32.sp)
    }
}
```


### Announcements
  - “In list” or “Showing slides x of y” are common announcements to give screen readers layout context when landing on carousel container
  - “Swipe right with two fingers to change slides” – common navigation announcement
