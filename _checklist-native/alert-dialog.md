---
layout: entry
title:  "Alert / Modal Dialog"
categories: notifications

keyboard:
  tab: |
    Focus visibly moves, confined within the dialog
  escape: |
    The dialog closes and returns focus to the button that launched it
  space: |
    Any buttons are activated on iOS and Android
  enter: |
    Any buttons or links are activated on Android

mobile:
  swipe: |
    Focus moves, confined within the dialog
  doubletap: |
    This typically activates most elements

screenreader:
  name:  |
    The dialog describes its purpose or title on launch
  role:  |
    Identifies itself as a modal or dialog
  group: |
    When closed, focus returns to the launch button
  state: |
    When open, other content is inert
---


## Native Element

- Modal dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks, usually appearing over an existing screen.

### Name

- Title of alert/modal matches the visible text title in the alert, if any

### Role

- "alert" role is optional. Haptics are optional.  
  
- Required: Screen reader user is confined inside a modal, communicating an alert/modal is present  
  

### Groupings

- Group text to make the announcements logical.
- **iOS**
  - accessibilityFrame
  - accessibilityFrameInContainerSpace
  - GroupView
  - Only the container class is an accessible element
- **Android**
  - ViewGroup
  - Set the container object's android:screenReaderFocusable attribute to true, and each inner object's android:focusable attribute to false. In doing so, accessibility services can present the inner elements' content descriptions/names, one after the other, in a single announcement.

### State

- n/a

### Focus

The screen reader focus  **must** be confined within the modal /alert /dialog. When the alert appears, the initial focus should be to a logical place or to where the default focus is for the device. (Android  _sometimes_  initially focuses on the CTAs in the alert, not the text or title)

- **iOS Options**
  - accessibilityViewIsModal property
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