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

settings:
  text resize: |
    Text can resize up to 200% without losing information
---

## Developer notes
-   A button is accessible by default prior to customization. Use the native button when at all possible to avoid additional development effort.
-   A button is a control that executes an action or navigates within the app. 
    -   **Note:** Links only navigate the user to a browser. 
-   Even if the control visibly looks like a link, implement the control as a button to cue the screen reader that the action will keep them within the app.
-   Name, Role, State must be stated in a single announcement when focus is on the control.

## **iOS**

### Name
-   Programmatic name describes the purpose of the control.
-   If visible text label exists, the programmatic name should match the visible text label.
-   When naming a button, do not add "button" to the programmatic name (label). Assigning "Button" as the role will handle this announcement.
    -   **Incorrect announcement:** "Submit button, Button"
    -   **Correct announcement:** "Submit, Button"
-   Placeholder text is NOT the programmatic name

-   **UIKit**
    -   You can programmatically set the visible label with `setTitle()`.
        -   The button’s title will overwrite the button’s `accessibilityLabel`.
    -   If a visible label is not applicable in this case, set the button's `accessibilityLabel` to the label of your choice.
    -   In Interface Builder, set the label in the Identity Inspector.
    -   In Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.

-   **SwiftUI**
    -   If no visible label, use view modifier `accessibilityLabel(_:)`.
    -   If button has icon(s), hide the icon(s) from VoiceOver by using view modifier `accessibilityHidden(true)`.
        

### Role
-   When using non-native controls (custom controls), roles will need to be manually coded.

-   **UIKit**
    -   Use `UIButton`
    -   If necessary, set `accessibilityTraits` to `.button`.
-   **SwiftUI**
    -   Use native `Button` view
    -   If necessary, use view modifier `accessibilityAddTraits(.isButton)` to assign the role as Button.
    -   If applicable, use view modifier `accessibilityRemoveTraits(:)` to remove unwanted traits.
        

### Groupings
-   Group visible label with button, if applicable, to provide a programmatic name for the button.
-   Group label with data to ensure reading order is logical. (Not label, label, data, data).


-   **UIKit**
    1.   Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
    2.  Set `isAccessibilityElement` to `true` for the parent view.
        -   Assign `accessibilityLabel` and `accessibilityTraits` accordingly.
    -   If frame does not exist due to custom button, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
        -   You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
    -   Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
    -   Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.
-   **SwiftUI**
    -   Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.


### State 

-   **UIKit**  
    -   For enabled: Set `isEnabled` to `true`.
    -   For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
        -   If necessary, you may change the accessibility trait of the button to `notEnabled`, but this may overrwrite the current accessibility role of the button.
-   **SwiftUI**
    -   For selected, use `accessibilityAddTraits(.isSelected)`.
    -   For disabled, use view modifier `disabled()`.


### Focus
-   Use the device's default focus functionality. 
-   Consider how focus should be managed between child elements and their parent views.
-   External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.
-   Initial focus on a screen should land in a logical place, such as back button, screen title, first text field, or first heading.
-   When a bottom navigation bar element is activated, the next screen's initial focus should move to the top of the screen. It should not stay in the bottom navigation bar.
-   When a menu, picker, or modal is closed, the focus should return to the triggering element.


-   **UIKit**
    -   If VoiceOver is not reaching a particular element, set the element's `isAccessibilityElement` to `true`
        -   **Note:** You may need to adjust the programmatic name, role, state, and/or value after doing this, as this action may overwrite previously configured accessibility.
    -   Use `accessibilityViewIsModal` to contain the screen reader focus inside the modal.
    -   To move screen reader focus to newly revealed content, use `UIAccessibility.post(notification:argument:)` that takes in `.screenChanged` and the newly revealed content as the parameter arguments.
    -   To NOT move focus, but dynamically announce new content: use `UIAccessibility.post(notification:argument:)` that takes in `.announcement` and the announcement text as the parameter arguments.
    -   `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements.  
-   **SwiftUI**
    -   For general focus management that impacts both screen readers and non-screen readers, use the property wrapper `@FocusState` to assign an identity of a focus state.
        -   Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:)` to assign focus on a view with `@FocusState` as the source of truth.
        -   Use the property wrapper `@FocusState`in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
    -   If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.