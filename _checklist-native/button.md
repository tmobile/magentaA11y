---
layout: entry
title:  "Button"
categories: controls


keyboard:
  tab or arrow keys: |
    Focus visibly moves to the button
  spacebar: |
    Activates on iOS and Android
  enter: |
    Activates on Android
          
mobile:
  swipe: |
    Focus moves to the element, expresses its name, role (state, if applicable)
  doubletap: |
    Activates the button
    
screenreader: 
  name:  |
    Purpose is clear and matches visible label
  role:  |
    Identifies as a button in iOS and "double tap to activate" in Android
  group: |
    Visible label is grouped or associated with the button in a single swipe
  state: |
    Expresses its state (disabled/dimmed)

---

## Developer notes
-   A button is a control that executes an action or navigates within the app 
-   Even if the control visibly looks like a link, code as a button to cue the screen reader the action will keep them within the app
-   You should use a native control when at all possible vs a custom element, as it will automatically and correctly announce the role without additional development effort

### Name

-   Name describes the purpose of the control
-   **iOS Tips**
    -   Set a label in Interface Builder in the Identity Inspector
    -   Group visible text label and the control in the same view container: `accessibilityFrameInContainerSpace`
    -   `setTitle( ) method`
    -   If no visible label, use `accessibilityLabel` on control
    -   `Hint` is used sparingly and if the results of interacting with it are not obvious from the control's label
    -   Match visible label
    -   To hide labels from VoiceOver announcements, uncheck the Accessibility Enabled checkbox in the Identity Inspector
    -   If hiding visible label from screen reader, use `accessibilityLabel` on control
-   **Android Tips**  
    -   `android:text` XML attribute
    -   Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements (icons) without a visible label
    -   `contentDescription` overrides `android:text`          
    -   Use `labelFor` attribute to associate the visible label with the control  
        

### Role

-   **iOS**
    -   Standard UIButton
-   **Android**
    -   Standard button or ImageButton  
        

### Groupings

-   Group visible label with button (if applicable)
-   **iOS**
    -   `accessibilityFrame`
    -   `accessibilityFrameInContainerSpace`
    -   GroupView
    -   Only the container class is an accessible element
-   **Android**
    -   ViewGroup
    -   Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.

### State

-   **iOS**
    -   Active: `isEnabled property`
    -   Disabled: `UIAccessibilityTraitNotEnabled`
    -   Announcement: dimmed
-   **Android**
    -   Active: `android:enabled=true`
    -   Disabled" `android:enabled=false`
    -   Announcement: disabled

### Focus

-   Only manage focus when needed. Primarily, let the device manage default focus
-   Consider how focus should be managed between child elements and their parent views

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
