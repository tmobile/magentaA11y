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
- Options to close the modal for the screen reader user:  An invisible close button announced for the screen reader only, can be in the swipe order after the last menu item.  Two/three finger swipe.  A close button.
- Drawers usually have a handle or button to be focused by the screen reader to expand and collapse them. Tapping outside the modal to close can not be the only option for screen reader users

## iOS

### Name
- Programmatic name describes the purpose of the control.
- If visible text label exists, the programmatic name should match the visible text label.
    - **Note:** Setting a programmatic name while a visible text label exists may cause VoiceOver to duplicate the announcement of the name. If this happens, hide the visible text label from VoiceOver recognization.
- When naming a button, do not add "button" to the programmatic name (label). Assigning "Button" as the role will handle this announcement.
  - **Incorrect announcement:** "Submit button, Button"
  - **Correct announcement:** "Submit, Button"
- Placeholder text is NOT the programmatic name

- **UIKit**
  - You can programmatically set the visible label with `setTitle()`.
    - The button’s title will overwrite the button’s `accessibilityLabel`.
  - If a visible label is not applicable in this case, set the button's `accessibilityLabel` to the label of your choice.
    - To do this in Interface Builder, set the label using the Identity Inspector
  - To hide labels from VoiceOver programmatically, set the label's `isAccessibilityElement` property to `false`
  - To hide labels from VoiceOver using Interface Builder, uncheck `Accessibility Enabled` in the Identity Inspector.
- **SwiftUI**
  - If no visible label, use view modifier `accessibilityLabel(_:)`.
  - If button has icon(s), hide the icon(s) from VoiceOver by using view modifier `accessibilityHidden(true)`.

### Role
- When using non-native controls (custom controls), roles will need to be manually coded.

- **UIKit**
  - Use `UIButton`
  - If necessary, set `accessibilityTraits` to `.button`.
- **SwiftUI**
  - Use native `Button` view
  - If necessary, use view modifier `accessibilityAddTraits(.isButton)` to assign the role as Button.
  - If applicable, use view modifier `accessibilityRemoveTraits(:)` to remove unwanted traits.  

### Groupings
- Group visible label with button, if applicable, to provide a programmatic name for the button.
- Group label with data to ensure reading order is logical. (Not label, label, data, data).

- **UIKit**
  1. Ensure that the child elements of the overarching view you want to group in has their `isAccessibilityElement` properties set to false.
  2. Set `isAccessibilityElement` to `true` for the parent view. Then, adjust `accessibilityLabel` and `accessibilityTraits` accordingly.
  - If frame does not exist due to custom button, use `accessibilityFrameInContainer` to set the custom control’s frame to the parent view’s container or view of your choice.
    - You can also unionize two frames with `frame.union` (i.e. `titleLabel.frame.union(subtitleLabel.frame)`).
  - Use `shouldGroupAccessibilityElement` for a precise order if the native order should be disrupted.
  - Use `shouldGroupAccessibilityChildren` to indicate whether VoiceOver must group its children views. This allows making unique vocalizations or define a particular reading order for a part of the page.
- **SwiftUI**
  - Use view modifier `accessibilityElement(children: .combine)` to merge the child accessibility element’s properties into the new accessibilityElement.

### State 
- **UIKit**  
  - For enabled: Set `isEnabled` to `true`.
  - For disabled: Set `isEnabled` to `false`. Announcement for disabled is "Dimmed".
    - If necessary, you may change the accessibility trait of the button to `notEnabled`, but this may overwrite the current accessibility role of the button.
- **SwiftUI**
  - For selected, use `accessibilityAddTraits(.isSelected)`.
  - For disabled, use view modifier `disabled()`.

### Focus
- Use the device's default focus functionality. 
- Consider how focus should be managed between child elements and their parent views.
- External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.
- Initial focus on a screen should land in a logical place, such as back button, screen title, first text field, or first heading.
- When a menu, picker, or modal is closed, the focus should return to the triggering element.

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
- "button" in announcements below comes from the accessibility services most of the time when a native component is used, not from the label. Options for announcements below depend on framework and versions. Announcement order can vary.

- "Label, button"
- "Label, (other content in cell), button" (grouping)
- "Label, button, selected" (selected state)
- "Label, selected" (selected state)
- "Label, dimmed" (disabled state)

## Android

