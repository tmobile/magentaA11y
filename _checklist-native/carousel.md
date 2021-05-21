---
layout: entry
title:  "Carousel"
categories: controls

keyboard:
  tab: |
    Focus visibly moves to each item in Android
  arrow keys: |
    Focus visibly moves to items in list after the first item in Android and all items in list in iOS
          
mobile:
  swipe: |
    Focus moves to the element, expresses its state, if applicable
  3 finger swipe: | 
    Focus moves to the element on iOS, expresses its state, if applicable
  doubletap: |
    Activates the button
    
screenreader: 
  name:  |
    Purpose of each item is clear and matches visible label
  role:  |
    Identifies as a button in iOS and "double tap to activate" in Android
  group: |
    n/a
  state: |
    Expresses its state (disabled/dimmed)
---

## Developer notes


A list of related content items, presented in panels as a horizontal slideshow. The slideshow is usually navigated by “next” and “previous” arrow keys.

### Name

- Each item in the carousel has a name that describes the purpose of the control or matches the visible label/text of item.  
  
- **iOS Options**
  - Set a label in Interface Builder in the Identity Inspector
  - Group visible text label and the control in the same view container: accessibilityFrameInContainerSpace
  - setTitle( ) method
  - If no visible label, use accessibilityLabel on control
  - Hint is used only if the results of interacting with it are not obvious from the control's label.
  - Match visible label, if any
  - To hide labels from VoiceOver announcements, uncheck the Accessibility Enabled checkbox in the Identity Inspector
  - If hiding visible label, use accessibilityLabel on control
- **Android Options**  
  - android:text XML attribute
  - Optional: use contentDescription for a more descriptive name, depending on type of view and for elements without a visible label.
  - contentDescription overrides android:text  
    
  - Use labelFor attribute to connect the visible label to the control

### Role

- **iOS**
  - Button
  - Custom class CarouselAccessibilityElement with its accessibilityTraits set to adjustable.
- **Android**
  - ViewPager  or
  - CarouselView

### Groupings

n/a

### State

- **iOS**  
  - Active: isEnabled property
  - Disabled: UIAccessibilityTraitNotEnabled
- **Android**
  - Active: android:enabled=true
  - Disabled: android:enabled=false

### Focus

- ****iOS**** (depending on implementation)
  - Three finger swipe rt/left to navigate to next/previous item
  - Or swipe rt/left to navigate to next/previous item
  - Or accessibilityScrollForward( ) Swipe up to navigate forward
  - Or accessibilityScrollBackward( ) Swipe down to navigate backward
  - accessibilityElementIsFocused ( )
  - isAccessibilityElement
- ****Android**** (depending on implementation)
  - Swipe rt/left to navigate to next/previous item
  - Or Swipe rt then left to navigate forward  
    
  - Or Swipe left then right to navigate backward
  - android:focusable=true
  - android=clickable=true
  - Implement an onClick( ) event handler for keyboard, not onTouch( )
  - nextFocusDown
  - nextFocusUp
  - nextFocusRight
  - nextFocusLeft
  - accessibilityTraversalBefore (or after)