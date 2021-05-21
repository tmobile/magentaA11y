---
layout: entry
title:  "Pagination control"
categories: controls

keyboard:
  tab: |
    Focus visibly moves to control
  arrow keys: |
    Navigate through the pages
          
mobile:
  swipe up/down: |
    Select pages on iOS
  two finger swipe: |
    Select pages on Android
    
screenreader: 
  name:  |
    The page index (Ex: Page 1 of 3)
  role:  |
    Identifies as "adjustable" in iOS, Android: n/a -name communicates it is a page control
  group: |
    n/a
  state: |
    Expresses its state (disabled/dimmed)
---


## Developer notes

A control that displays a horizontal series of dots, each of which corresponds to a page in the app’s document  

### Name

- Page X of X
- **iOS**
  - setTitle( ) method
  - Set a label in Interface Builder in the Identity Inspector
  - accessibilityLabel
  - _(accessibilityLabel overrides setTitle)_  
- **Android**  
  - android:text XML attribute
  - contentDescription
  - _(contentDescription overrides android:text_

### Role

- **iOS**
  - UIPageControl
  - Announcement: adjustable
- **Android**
  - TabLayout with ViewPager
  - Announcement: no role is announced. Hearing Page x of x in the name tells the screen reader user it is adjustable with two finger swipe. Role and Name are the same for this component.

### Groupings

- n/a

### State

- **iOS**  
  - Active: isEnabled property
  - Disabled: UIAccessibilityTraitNotEnabled. Announcement: dimmed
- **Android**
  - Active: android:enabled=true
  - Disabled: android:enabled=false. Announcement: disabled  

### Focus

- Only manage focus when needed. Primarily, let the device manage default focus.  
  
- Consider how focus should be managed between child elements and their parent views.
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