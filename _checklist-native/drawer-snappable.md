---
layout: entry
title:  "Drawer / Snappable / Sheet"
categories: controls

keyboard:
  tab and arrow keys: |
      Focus visibly moves to the drawer grabber or first interactive element
  spacebar: |
      Activates on iOS and Android
  enter: |
      Activates on Android
        
mobile:
  swipe: |
      Focus moves to the element, expresses its name, role, value & state (if applicable)
  doubletap: |
     Activates interactive elements

screenreader:
  name:  |
      Purpose is clear and matches any visible label
  role:  |
      Identifies itself as a button in iOS and "double tap to activate" in Android
  group: |
      Visible label is grouped or associated with controls in a single swipe
  state: |
      Expresses its state (expands/collapses or disabled/dimmed)
---

## Developer notes
- A sheet helps people perform a distinct task that’s related to the parent view without taking them away from their current context
- Use native elements when at all possible vs a custom element, as it will handle expected behavior without additional development effort
- Most sheets appear as a card that partially covers the underlying content. 
- The screen reader should be confined in the sheet/drawer if it covers underlining content. If a sheet does not cover other content, the screen reader does not have to be confined in it
- Ensure there is a way to collapse or close the sheet for the screen reader (iOS)
- Move screen reader focus into sheet when opened
- A grabber is recommended but not required for Android if a two-finger swipe for the screen reader in any direction closes it


### Name

- Name describes the purpose of the control

- **iOS Tips**  
  - Set a label of grabber in Interface Builder in the Identity Inspector
  - `setTitle( ) method`
  - If no visible label, use `accessibilityLabel` on control

  - If hiding visible label, use `accessibilityLabel` on control
- **Android Tips**  
  - `android:text` XML attribute
  - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements without a visible label
  - `contentDescription` overrides `android:text`  
  - Use `labelFor` attribute to connect the visible text label to the control


### Role

- **iOS**
  - `UISheetPresentationController` 
  - Grabber announces as 'Button"
- **Android**
  - `ModalBottomSheet`
  - Grabber announces as "double tap to activate"


### Groupings

- Visible label and control are grouped together in one swipe
- Visible label and other non-interactive elements can be grouped together in one swipe in a table row
- **iOS**
  - `accessibilityFrame`
  - `accessibilityFrameInContainerSpace`
  - GroupView
  - Only the container class is an accessible element
- **Android**
  - ViewGroup
  - Set the container objects `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement

### State

- **iOS**  
  - Grabber announces as expands/collapses
  - Active: `isEnabled property`
  - Disabled: `UIAccessibilityTraitNotEnabled`. Announcement: dimmed
- **Android** 
  - Grabber, if any, announces as expands/collapses
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`. Announcement: disabled

### Focus

- Only manage focus when needed. Primarily, let the device manage default focus
- Consider how focus should be managed between child elements and their parent views
- Moving focus into the sheet when a button opens it makes it clear to the screen reader user that there is a sheet available


- **iOS**
  - `accessibilityViewIsModal` contains the screen reader focus inside the Modal
  - `accessibilityElementIsFocused`  
  - `isAccessibilityElement` makes the element visible or not to the Accessibility API
  - `accessibilityElementsHidden` indicates that the children elements of the target element are visible or not to the Accessibility API
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
