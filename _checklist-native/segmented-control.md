---
layout: entry
title:  "Segmented Control / Tab"
categories: controls

keyboard:
  tab: |
    Focus visibly moves to the button
  arrow keys: |
    Navigate through group
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
    Expresses its state (selected/disabled/dimmed)

settings:
  text resize: |
    This element is exempt from text resizing requirements
---

## Developer notes
- A segmented control is a linear set of two or more segments, each of which functions as a mutually exclusive button

## iOS

### Name
- Name matches the inside tab text
- setTitle( ) method
- Set a label in Interface Builder in the Identity Inspector
- accessibilityLabel
- _(accessibilityLabel overrides setTitle)_  

### Role
- UISegmentedControl  

### State
- Selected state is announced for the control in group that is focused
- Active: isEnabled property
- Disabled: UIAccessibilityTraitNotEnabled. Announcement: dimmed
- UIControlState or isSelected, UIAccessibilityTraitNotEnabled

### Focus
- Only manage focus when needed. Primarily, let the device manage default focus.  
- Consider how focus should be managed between child elements and their parent views.
- accessibilityElementIsFocused  
- isAccessibilityElement - Yes, if the element can respond to user input
- To move screen reader focus to newly revealed content: UIAccessibilityLayoutChangedNotification
- To NOT move focus, but announce new content: UIAccessibilityAnnouncementNotification

### Announcements
- "Selected, Label, Button, x of x"
- "Label, Button, x of x"
- - optional, Not selected: Announced as "double tap to select" as hint

## Android

### Name
- Name matches the inside tab text
- android:text XML attribute
- contentDescription
- _(contentDescription overrides android:text)_

### Role
- Tabs
- Button or Image Button

### State
- Selected state is announced for the control in group that is focused
- Active: android:enabled=true
- Disabled: android:enabled=false. Announcement: disabled
- setSelected
- Selected: Announced as "selected"

### Focus
- Only manage focus when needed. Primarily, let the device manage default focus.  
- Consider how focus should be managed between child elements and their parent views.
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

### Announcements
- "Selected, Label, Tab, x of x"
- "Label, Tab, x of x, Double tap to activte"