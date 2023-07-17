---
layout: entry
title:  "Alert / Modal Dialog"
categories: notifications

keyboard:
  tab or arrow keys: |
    Focus visibly moves, confined within the dialog
  escape: |
    The dialog closes and returns focus to the button that launched it
  space: |
    Any buttons or links are activated on iOS and Android
  enter: |
    Any buttons or links are activated on Android

mobile:
  swipe: |
    Focus moves, confined within the dialog
  doubletap: |
    This typically activates most elements (alternative custom actions may be implemented)
  group: |
    n/a
    
screenreader:
  name:  |
    The dialog describes its purpose or title if any (On launch with iOS. Often with first swipe on Android or intial focus is on CTA)
  role:  |
    May identify itself as a modal, dialog, drawer, sidebar, panel, popover, menu or alert. Confining the user within the modal communicates the context to the screen reader user that there is a modal present
  state: |
    When open, other content is inert. Expands/collapses, closes/opens states are typically announced for a menu, drawer, sidebar, panel or popover

settings:
  text resize: |
    Text can resize up to 200% without losing information
---


## Native Element

- Modal dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks, usually appearing over an existing screen
- Use native alerts when at all possible vs a custom element, as it will handle expected behavior without additional development effort
- Options to close the modal for the screen reader user:  
  - An invisible close button announced for the screen reader only, which can be in the swipe order after the last menu item
  - Two/three finger swipe
  - A close button
- Drawers usually have a handle or button to be focused by the screen reader to expand and collapse them. Tapping outside the modal to close can not be the only option for screen reader users

## iOS

### Name
- Programmatic name describes the purpose of the alert.
- For alerts and modals, the programmatic name is the title of the alert/modal.
- If visible text label exists, the programmatic name should match the visible text label.
    - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.

- **UIKit**
  - The visible label is the programmatic name of the alert.
  - If a visible label is not applicable in your case, set the alert's `accessibilityLabel` to the label of your choice.
    - To do this in Interface Builder, set the label using the Identity Inspector
  - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
  - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.
- **SwiftUI**
  - The visible label is the programmatic name of the alert.
  - If no visible label, use view modifier `accessibilityLabel(_:)`.
  - If button has icon(s), hide the icon(s) from VoiceOver by using view modifier `accessibilityHidden(true)`.

### Role
- Required: Screen reader user is confined inside the modal, communicating an alert/modal is present

- **UIKit**
  - Use `UIAlertController` and add actions per your use case
- **SwiftUI**
  - Use view modifier `alert(_:isPresented:presenting:actions:message:)`
  - If applicable, use view modifier `accessibilityRemoveTraits(:)` to remove unwanted traits.  

### Groupings
- If you are implementing a native alert, do not modify native grouping logic
- If you require a custom alert, follow the steps below.

- **UIKit**
  1. Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
  2. Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
  - If frame does not exist due to custom alert, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
    - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
  - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
  - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.
- **SwiftUI**
  - Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.

### State 
- Modals, or action sheets in iOS, that have an open/close or expands/collapses state must be announced. Add logic and announcement to the programmatic name for the state
- Usually no one button is disabled in native alerts and action sheets.

- **UIKit**  
  - For custom alerts or action sheets, follow below.
  - For enabled: Set `isEnabled` to `true`.
  - For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
- **SwiftUI**
  - For custom alerts or action sheets, follow below.
  - For selected, use `accessibilityAddTraits(.isSelected)`.
  - For disabled, use view modifier `disabled()`.

### Focus
- Use the default focus functionality of the native alert or modal
- The screen reader focus **must** be confined within the alert or modal. When the alert appears, the initial focus should be to a logical place or to where the default focus is for the device within the modal.
- If implementing a custom alert, follow below.

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

### Announcement examples


## Android

