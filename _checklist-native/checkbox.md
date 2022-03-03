---
layout: entry
title:  "Checkbox"
categories: controls

keyboard:
  tab or arrow keys: |
    Focus visibly moves to the checkbox
  spacebar: |
    Activates on iOS and Android
  enter: |
    Activates on Android
      
mobile:
  swipe: |
    Focus moves to the element, expresses its name, role, state
  doubletap: |
    Checkbox toggles between checked and unchecked states.

screenreader:
  name:  |
    Name describes the purpose of the control and matches the visible label
  role:  |
    Identifies itself as a Check box in Android and a Button in iOS
  group: |
    Visible label can be grouped with the check box in a single swipe
  state: |
    Expresses its state (disabled/dimmed, checked, not checked)

---


## Developer notes
- A check box lets the user choose between two opposite states, actions or values  
- You should use a native control when at all possible vs a custom element, as it will automatically and correctly announce the role without additional development effort
- A check box should just toggle between checked and unchecked.  It should not automatically navigate the user to another field or screen when activated, as that may cause a change of context.  Revealing new information on the same screen as a result of activating a checkbox is usually not a change of context.
- Name, Role, State must be announced when focus is on the control. Announcing the label before the checkbox does not meet this requirement.

### Name

-   Programmatic name describes the purpose of the control
-   Programmatic name matches the visible text label 

- **iOS Tips**
  - Set a label in Interface Builder in the Identity Inspector
  - Group visible text label and the control in the same view container: `accessibilityFrameInContainerSpace`
  - `setTitle( )` method
  - If no visible label, use `accessibilityLabel` on control
  - `Hint` is used sparingly and if the results of interacting with it are not obvious from the control's label
  - Match visible label
  - To hide labels from VoiceOver announcements, uncheck the Accessibility Enabled checkbox in the Identity Inspector
  - If hiding visible label from screen reader, use `accessibilityLabel` on control
- **Android Tips**  
  - `android:text` XML attribute
  - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements (icons) without a visible label
  - `contentDescription` overrides `android:text`  
  - Use `labelFor` attribute to associate the visible label with the control (Best practice)

### Role
-   When not using native controls (custom controls), roles will need to be manually coded.

- **iOS**
  - UISwitch or other custom checkbox
  - Announced as "button" or "checkbox"
- **Android**
  - CheckBox Class
  - Announced as "checkbox"

### Groupings

-   Group visible label with button (if applicable) to provide a programmatic name for the button 
-   Or use `labelFor` (Android)

- **iOS**
  -   `accessibilityFrame`
  -   `accessibilityFrameInContainerSpace`
  -   Create a wrapper as an accessible element
  -   Define action upon double-tap
  -   `shouldGroupAccessibilityElement` attribute: For a precise order if the native order should be disrupted.
  -   `GroupView`
  -   `shouldGroupAccessibilityChildren` attribute indicates whether VoiceOver must group it's children views. This allows making unique vocalizations or define a particular reading order for a part of the page
- **Android**
  - ViewGroup
  - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.

### State
-   When native code is not available for a state, add the state to the programmatic name (label).  Add logic when needed. 

- **iOS**
  - `UIControlState` or `isSelected`, `UIAccessibilityTraitNotEnabled`
  - Selected: Announced as "checked"
  - Not selected: Announced as "not checked" (optional)
  - Active: `isEnabled property`
  - Disabled: `UIAccessibilityTraitNotEnabled`. Announced as "dimmed"
- **Android**
  - Active: `android:enabled=true`, `isChecked`, `setChecked`
  - Disabled: `android:enabled=false`. Announced as: "disabled"

### Focus

  - Only manage focus when needed. Primarily, let the device manage default focus
  - Consider how focus should be managed between child elements and their parent views
  - External keyboard tab order often follows the screen reader focus, but sometimes needs focus management

- **iOS**
   - `accessibilityElementIsFocused`  
   - `isAccessibilityElement` makes the element visible or not to the Accessibility API
   - `accessibilityElementsHidden` indicates that the children elements of the target element are visible or not to the Accessibility API
   - `accessibilityViewIsModal` contains the screen reader focus inside the Modal
   - To move screen reader focus to newly revealed content: `UIAccessibilityLayoutChangedNotification`
   - To NOT move focus, but dynamically announce new content: `UIAccessibilityAnnouncementNotification`
   - `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements.  
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
