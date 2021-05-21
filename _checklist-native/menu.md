---
layout: entry
title:  "Menu"
categories: controls

keyboard:
  tab: |
    Focus moves to buttons within the menu on iOS
  arrow keys: |
    Focus moves to buttons within the menu on iOS
          
mobile:
  swipe: |
    Focus moves, confined within the menu
  doubletap: |
    Activates most elements

screenreader:
  name:  |
    Name describes the purpose of the control (opens menu or closes menu)
  role:  |
    Identifies itself as a button or menu button
  group: |
    Visible label, if any, is grouped with the menu button in a single swipe
  state: |
    State options: disabled/dimmed, expands/collapses, if opens/closes is not in name
---

## Developer notes


- A menu is a container for a list of items

### Name

- Name describes the purpose of the control (Ex: opens menu or closes menu), with additional label description if needed
- **iOS Options**
  - Set a label in Interface Builder in the Identity Inspector
  - setTitle( ) method
  - If no visible text label, use accessibilityLabel  
  - Hint is used only if the results of interacting with it are not obvious from the control's label.
- **Android Options**  
  - android:text XML attribute
  - Optional: use contentDescription for a more descriptive name, depending on type of view and for elements without a visible label.
  - contentDescription overrides android:text  

### Role

- **iOS**
  - UIMenu
- **Android**
  - android.view.Menu  


### Groupings

Group visible label, if any, is grouped with the menu button in a single swipe  
  
- **iOS**
  - accessibilityFrame
  - accessibilityFrameInContainerSpace
  - GroupView
  - Only the container class is an accessible element
- **Android**
  - ViewGroup
  - Set the container object's android:screenReaderFocusable attribute to true, and each inner object's android:focusable attribute to false. In doing so, accessibility services can present the inner elements' content descriptions/names, one after the other, in a single announcement.

### State

- **Expandable menus**
  - Values are the future state - "expands"/"collapses"
  - If "opens" or "closes" is not included in the name, the expands/collapses state must be announced
- **iOS**
  - UIControlState, UIAccessibilityTraitEnabled  
  - Disabled: UIAccessibilityTraitNotEnabled. Announced as "dimmed"
- **Android**
  - Active: android:enabled=true  
  - Disabled: android:enabled=false. Announced as: "disabled"

### Focus

Screen reader focus  **must**  be confined within the menu, which can include the button that opened it. Focus can remain on the button or moved to the first item in the menu. Swipe to navigate within the menu.  

- **iOS Options**
  - accessibilityElementIsFocused  
  - isAccessibilityElement - Yes, if the element can respond to user input
  - To move screen reader focus to newly revealed content: UIAccessibilityLayoutChangedNotification
  - To NOT move focus, but announce new content: UIAccessibilityAnnouncementNotification
- **Android Options**
  - android:focusable=true
  - android=clickable=true
  - Implement an onClick( ) event handler for keyboard, not onTouch( )
  - nextFocusDown
  - nextFocusUp
  - nextFocusRight
  - nextFocusLeft
  - accessibilityTraversalBefore (or after)
  - To move screen reader focus to newly revealed content: Type_View_Focused
  - To NOT move focus, but announce new content: accessibilityLiveRegion
  - To hide controls: Important_For _Accessibility_NO
