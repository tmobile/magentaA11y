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
-   A button is a control that executes an action or navigates within the app.  Note: Links only navigate the user to a browser. 
-   Even if the control visibly looks like a link, code as a button to cue the screen reader the action will keep them within the app
-   When naming a button, do not add "button" to the programmatic name (label).  "Button" will be announced as the role.  Avoid duplication: "Submit button, button"
-   You should use a native control when at all possible vs a custom element, as it will automatically and correctly announce the role without additional development effort
-   Name, Role, State must be announced when focus is on the control. Announcing the label before the input field does not meet this requirement.
-   Placeholder text is NOT the programmatic name (unless the placeholder for a field moves up as a floating label)

### Name
-   Name describes the purpose of the control
-   Programmatic name matches the visible text label (if any)

-   **iOS Tips**
    -   Set a label in Interface Builder in the Identity Inspector
    -   Group visible text label and the control in the same view container: `accessibilityFrameInContainerSpace`
    -   `setTitle( ) method`
    -   If no visible label, use `accessibilityLabel` on control
    -   `Hint` is used sparingly and if the results of interacting with it are not obvious from the control's label
    -   To hide labels from VoiceOver announcements, uncheck the Accessibility Enabled checkbox in the Identity Inspector
    -   If hiding visible label from screen reader, use `accessibilityLabel` on control
-   **Android Tips**  
    -   `android:text` XML attribute
    -   Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements (icons) without a visible label
    -   `contentDescription` overrides `android:text`          
    -   Use `labelFor` attribute to associate the visible label with the control  
        

### Role
-   When not using native controls (custom controls), roles will need to be manually coded.

-   **iOS**
    -   Standard UIButton
-   **Android**
    -   Standard button or ImageButton  
        

### Groupings
-   Group visible label with button (if applicable) to provide a programmatic name for the button
-   Group label with data to ensure reading order is logical. (Not label, label, data, data)


-   **iOS**
    -   `accessibilityFrame`
    -   `accessibilityFrameInContainerSpace`
    -   Create a wrapper as an accessible element
    -   Define action upon double-tap
    -   `shouldGroupAccessibilityElement` attribute: For a precise order if the native order should be disrupted.
    -   `GroupView`
    -   `shouldGroupAccessibilityChildren` attribute indicates whether VoiceOver must group it's children views. This allows making unique vocalizations or define a particular reading order for a part of the page
-   **Android**
    -   `ViewGroup`
    -   Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.


### State
-   When native code is not available for a state, add the state to the programmatic name (label).  Add logic when needed. 

-   **iOS**
    -   Active: `isEnabled property`
    -   Disabled: `UIAccessibilityTraitNotEnabled`
    -   Expands/Collapses
    -   Announcement: dimmed
-   **Android**
    -   Active: `android:enabled=true`
    -   Disabled" `android:enabled=false`
    -   Expands/Collapses
    -   Announcement: disabled

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
