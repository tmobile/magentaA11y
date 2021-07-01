---
layout: entry
title:  "Menu"
categories: controls

keyboard:
  tab or arrow keys: |
    Focus visibly moves, confined within the menu
  escape: |
    The menu closes and returns focus to the button that launched it
  space: |
    Any buttons or links are activated on iOS and Android
  enter: |
    Any buttons or links are activated on Android

mobile:
  swipe: |
    Focus moves, confined within the menu
  doubletap: |
    This typically activates most elements
  group: |
    n/a
    
screenreader:
  name:  |
    Purpose of menu is clear
  role:  |
    May identify itself as a menu, sidebar or panel. Confining the user within the menu communicates the context to the screen reader user that there is a menu or modal present
  state: |
    When open, other content is inert. Expands/collapses, closes/opens states are typically announced for a menu, sidebar or panel
---

## Developer notes


- A menu is a container for a list of items
- Use native menus when at all possible vs a custom element, as it will handle expected behavior without additional development effort
- Options to close the menu for the screen reader user:  An invisible close button announced for the screen reader only, can be in the swipe order after the last menu item.  Two/three finger swipe.  A close button.
- Tapping outside the modal to close can not be the only option for screen reader users

### Name

- Name describes the purpose of the control (Ex: opens menu or closes menu), with additional label description if needed
**iOS Tips**
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

-  Required: Screen reader user is confined inside a menu, communicating a modal is present 

- **iOS**
  - UIMenu
- **Android**
  - `android.view.Menu`  


### Groupings

- Visible label, if any, is grouped with the menu button in a single swipe  
  
-- **iOS**
  - `accessibilityFrame`
  - `accessibilityFrameInContainerSpace`
  - GroupView
- **Android**
  - ViewGroup

### State

- **Expandable menus**
  - State must be announced- expands/collapses, opens/closes. Add logic and announcement to the programmatic name for the state
  - If "opens" or "closes" is not included in the name, the expands/collapses state must be announced
 **iOS**
  - Active: `isEnabled property`
  - Disabled: `UIAccessibilityTraitNotEnabled`. Announcement: dimmed  
- **Android**  
  - Active: `android:enabled=true`
  - Disabled: `android:enabled=false`. Announcement: disabled
  
### Focus

Screen reader focus  **must**  be confined within the menu, which can include the button that opened it
Focus can remain on the menu button or move to the first item in the menu. 

 **iOS**
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
