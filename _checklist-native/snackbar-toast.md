---
layout: entry
title:  "Toast snackbar banner"
categories: notifications

keyboard:
  tab: |
    Focus visibly moves in logical order to the toast
  space: |
    Any elements inside are activated on iOS and Android
  enter: |
    Any elements inside are activated on Android

mobile:
  swipe: |
    Focus moves within the toast
  doubletap: |
    Activates elements within the toast

screenreader:
  name:  |
    The element announces its purpose or title
  role:  |
    Identifies itself as a button in iOS and "double tap to activate" in Android
  group: |
    When closed, focus returns to a logical place in the page
  state: |
    Toast remains open until closed by user
---

## Developer notes


- A snack bar or toast must not be timed to disappear.  
- An element to close it must be available.  
- A message that appears after the user has arrived on the screen must be announced dynamically, but focus shouldn't move to it.
- A message that is present when screen is launched must be in the swipe order for the screen reader user and tab order for the keyboard user.
- Push notifications that have a place where they are stored and users can access them at a later time, can be timed to disappear  
  

### Name

- Name describes the purpose of the Close X or CTA  
- **iOS Options**
  - Set a label in Interface Builder in the Identity Inspector
  - Use accessibilityLabel on control
- **Android Options**  
  - android:text XML attribute
  - Use contentDescription for elements without a visible label.
  - contentDescription overrides android:text  

### Role

- **iOS**
  - Standard UIButton for the Close X or CTA
- **Android**
  - Standard button or ImageButton  

### Groupings

n/a

### State

n/a

### Focus

- **iOS Options**
  - accessibilityElementIsFocused  
  - isAccessibilityElement - Yes, if the element can respond to user input
  - To move screen reader focus to newly revealed content: UIAccessibilityLayoutChangedNotification
  - **To NOT move focus, but announce new content: UIAccessibilityAnnouncementNotification**
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
  - **To NOT move focus, but announce new content: accessibilityLiveRegion**
  - To hide controls: Important_For _Accessibility_NO