---
layout: entry
title:  "Table row button"
categories: controls


keyboard:
  tab: |
    Focus visibly moves to the button
  spacebar: |
    Activates the button on iOS and Android
  enter: |
    Activates the button on Android
          
mobile:
  swipe: |
    Focus moves to the element, expresses its state, if applicable
  doubletap: |
    Activates the button
    
screenreader: 
  name:  |
    Purpose is clear and matches visible label
  role:  |
    Identifies as a button in iOS and "double tap to activate" in Android
  group: |
    Visible label (if any) is grouped or associated with the button in a single swipe
  state: |
    Expresses its state (disabled/dimmed)

settings:
  text resize: |
    Text can resize up to 200% without losing information
---

## Developer notes


- A scrolling, single-column row or list of rows that can be divided into sections or groups
- You should use a native component rather than custom, because it will announce the correct built-in screen reader output for free

### Name

- Name describes the purpose of the control and matches the visible label, which can all be grouped together in the tablerow in an accessibilityLabel

### Role

- **iOS**
  - UITableViewCell
  - Use Link Trait if the user is taken out of the app to a URL
- **Android**
  - Use an interactive RecyclerView
  - Should be coded as a list, if more than one row
- **Table Rows as headings**  
  - Add Header Trait to table rows that describe a section
  - Do not make row interactive

### Groupings

- Group text label/ images/controls together in one swipe
- Only one interactive control can be in the swipe  
  
- **iOS**
  - The table row is designated as a container
  - Only the container class is an accessible element
- **Android**
  - ViewGroup
  - Set the container object's android:screenReaderFocusable attribute to true, and each inner object's android:focusable attribute to false. In doing so, accessibility services can present the inner elements' content descriptions/names, one after the other, in a single announcement.

### State

- **iOS**  
  - Active: isEnabled property
  - Disabled: UIAccessibilityTraitNotEnabled. Announcement: dimmed
  - Announcement: Selected/"double tap to select" for row with a checkmark
- **Android**  
  - Active: android:enabled=true
  - Disabled" android:enabled=false. Announcement: disabled
  - Announcement: Selected/ "not selected" for row with a checkmark
- **Accordion/Collapsible rows**
  - Values are the future state - "expands"/"collapses" - iOS and Android
  - Android sometimes announces "double tap to expand list"  
    

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
