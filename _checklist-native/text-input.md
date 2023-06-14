---
layout: entry
title:  "Text input"
categories: controls

keyboard:
  tab or arrow keys: |
    Focus visibly moves to and from the text input. 
  space bar: |
    Starts input
          
mobile:
  swipe: |
    Focus moves to the element, expresses its name, role (state, if disabled)
  doubletap: |
    Keyboard appears

screenreader:
  name:  |
    Purpose is clear and matches visible label
  role:  |
    Identifies itself text field on iOS, edit box on Android
  group: |
    Visible label is grouped or associated with the text input in a single swipe
  state: |
    The input can be disabled/dimmed

settings:
  text resize: |
    Text can resize up to 200% without losing information
---

## Developer notes
- Lets users enter and edit text
- A text input field cannot be automatically focused from any other component or focus cannot be automatically moved to another component. The user must  control navigating to and from a text input.
- Placeholder text must meet color contrast minimum ratios
- Use a native control when at all possible vs a custom element, as it will automatically and correctly announce the role without additional development effort
- Name, Role, State must be announced when focus is on the control. Announcing the label before the input field does not meet this requirement.
- "text field" or "editbox" can be announced prior to "adjustable", picker item or other controls.

### Name

- Name describes what data is to be entered and matches a **required** label that is visible at all times.  
- Placeholders are not considered a visible label as they disappear when data is entered.
- Name must be announced with the role, when screen reader focus is on the text input field (Ex: "Amount due, 14.95, text field, double tap to edit")- iOS

- **iOS Options**
  - Set a label in Interface Builder in the Identity Inspector
  - Group visible text label and the control in the same view container: `accessibilityFrameInContainerSpace`
  - setTitle( ) method
  - Hint is used only if the results of interacting with it are not obvious from the control's label.
  - To hide labels from VoiceOver announcements, uncheck the Accessibility Enabled checkbox in the Identity Inspector
  - If hiding visible label from the screen reader, use accessibilityLabel on control
  - SWIFTUI: Controls can take a Text view (visible label) as part of their view builder, connecting the visible label or meaning to the control.  
- **Android Options**  
  - `android:text` XML attribute
  - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements without a visible label.
  - `contentDescription` overrides `android:text`  
  - Use `labelFor` attribute to associate the visible label to the control  

### Role
-   When not using native controls (custom controls), roles will need to be manually coded.

- **iOS**
  - TextField
- **Android**
  - EditBox

### Groupings

- Group text field and persistent visible text label together in one swipe.  
  
- **iOS**
  - `accessibilityFrame`
  - `accessibilityFrameInContainerSpace`
  - Only the container class is an accessible element
  - Create a wrapper as an accessible element
  - Define action upon double-tap
  - `shouldGroupAccessibilityElement` attribute: For a precise order if the native order should be disrupted.
  - `GroupView`
  - `shouldGroupAccessibilityChildren` attribute indicates whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page
  - SWIFTUI: `.accessibilityElement(children)` with argument of `.combine` 
  - SWIFTUI: `.ignore` property, then add accessibility attributes and traits to stack view
- **Android**
  - ViewGroup
  - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' content descriptions/names, one after the other, in a single announcement.
  - JETPACK COMPOSE: Composables can be merged together using the `semantics` modifier with its `mergeDescendants` property

### State

- **iOS**  
  - Active: `isEnabled property`
  -   Disabled: `UIAccessibilityTraitNotEnabled`.  Announcement: "dimmed"
  -   AccessibilityTrait: `selected`
  -   SWIFTUI: `.accessibility(addTraits: [.isSelected])`
- **Android**
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`. Announcement: disabled

### Focus

-   Only manage focus when needed. Primarily, let the device manage default focus
-   Consider how focus should be managed between child elements and their parent views
-   External keyboard tab order often follows the screen reader focus, but sometimes needs focus management
-   Initial focus on a screen should land in a logical place (back button, screen title, first text field, first heading)
-   When a bottom navigation bar element is activated, the next screen's initial focus should move to the top of the screen, not stay in the bottom nav bar.
-   When a menu, picker or modal is closed, the focus should return to the triggering element.

- **iOS**
   -   `accessibilityElementIsFocused`  
   -   `isAccessibilityElement` makes the element visible or not to the Accessibility API
   -   `accessibilityElementsHidden` indicates that the children elements of the target element are visible or not to the Accessibility API
   -   `accessibilityViewIsModal` contains the screen reader focus inside the Modal
   -   To move screen reader focus to newly revealed content: `UIAccessibilityLayoutChangedNotification`
   -   To NOT move focus, but dynamically announce new content: `UIAccessibilityAnnouncementNotification`
   -   `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements.  
- **Android**
   -   `importantForAccessibility` makes the element visible to the Accessibility API
   -   `android:focusable`
   -   `android=clickable`
   -   Implement an `onClick( )` event handler for keyboard, as well as `onTouch( )`
   -   `nextFocusDown`
   -   `nextFocusUp`
   -   `nextFocusRight`
   -   `nextFocusLeft`
   -   `accessibilityTraversalBefore` (or after)
   -   To move screen reader focus to newly revealed content: `Type_View_Focused`
   -   To NOT move focus, but dynamically announce new content: `accessibilityLiveRegion`(set to polite or assertive)
   -   To hide controls: `importantForAccessibility=false`
   -   For a `ViewGroup`, set `screenReaderFocusable=true` and each inner object’s attribute to keyboard focus (`focusable=false`)
