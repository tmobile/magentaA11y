---
layout: entry
title:  "Button"
categories: controls


keyboard:
  tab: |
    Focus visibly moves to the button
  arrow keys: |
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

---

## Developer notes
-   A button is a control that executes an action or navigates within the app.
-   You should use a native button element rather than a custom element because it will announce the correct built-in screen reader announcements without additional development effort.

### Name

-   Name describes the purpose of the control
-   **iOS Options**
    -   Set a label in Interface Builder in the Identity Inspector
    -   Group visible text label and the control in the same view container: accessibilityFrameInContainerSpace
    -   setTitle( ) method
    -   If no visible label, use accessibilityLabel on control
    -   Hint is used only if the results of interacting with it are not obvious from the control's label.
    -   Match visible label, if any
    -   To hide labels from VoiceOver announcements, uncheck the Accessibility Enabled checkbox in the Identity Inspector
    -   If hiding visible label, use accessibilityLabel on control
-   **Android Options**  
    -   android:text XML attribute
    -   Optional: use contentDescription for a more descriptive name, depending on type of view and for elements without a visible label.
    -   contentDescription overrides android:text  
        
    -   Use labelFor attribute to connect the visible label to the control  
        

### Role

-   **iOS**
    -   Standard UIButton
-   **Android**
    -   Standard button or ImageButton  
        

### Groupings

-   Group visible label with button (if applicable)
-   **iOS**
    -   accessibilityFrame
    -   accessibilityFrameInContainerSpace
    -   GroupView
    -   Only the container class is an accessible element
-   **Android**
    -   ViewGroup
    -   Set the container object's android:screenReaderFocusable attribute to true, and each inner object's android:focusable attribute to false. In doing so, accessibility services can present the inner elements' content descriptions/names, one after the other, in a single announcement.

### State

-   **iOS**
    -   Active: isEnabled property
    -   Disabled: UIAccessibilityTraitNotEnabled
    -   Announcement: dimmed
-   **Android**
    -   Active: android:enabled=true
    -   Disabled" android:enabled=false
    -   Announcement: disabled

### Focus

-   Only manage focus when needed. Primarily, let the device manage default focus.  
-   Consider how focus should be managed between child elements and their parent views.
-   **iOS Options**
    -   accessibilityElementIsFocused  
    -   isAccessibilityElement - Yes, if the element can respond to user input
    -   To move screen reader focus to newly revealed content: UIAccessibilityLayoutChangedNotification
    -   To NOT move focus, but announce new content: UIAccessibilityAnnouncementNotification
-   **Android Options**
    -   android:focusable=true
    -   android=clickable=true
    -   Implement an onClick( ) event handler for keyboard, not onTouch( )
    -   nextFocusDown
    -   nextFocusUp
    -   nextFocusRight
    -   nextFocusLeft
    -   accessibilityTraversalBefore (or after)
    -   To move screen reader focus to newly revealed content: Type_View_Focused
    -   To NOT move focus, but announce new content: accessibilityLiveRegion
    -   To hide controls: Important_For _Accessibility_NO

