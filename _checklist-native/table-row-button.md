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


## Android

### Name

- Name describes the purpose of the control and matches the visible label, which can all be grouped together in the table row in an accessibility label

### Role

- Add header trait to table rows that describe a section if needed and do not make header row interactive
- **Android View**
  - Use an interactive RecyclerView
  - Should be coded as a list, if more than one row
- **Android Compose**
  - Use regular `Column` for a table row with short list, and `LazyColumn` for the long list of items. For the row to behave as button role, use `modifier.clickable` with role of `role.Button`

### Groupings

- Group text label/ images/controls together in one swipe
- Only one interactive control can be in the swipe    
- **Android View**
  - ViewGroup
  - Set the container object's android:screenReaderFocusable attribute to true, and each inner object's android:focusable attribute to false. In doing so, accessibility services can present the inner elements' content descriptions/names, one after the other, in a single announcement.
- **Android Compose**
  - In `item` or `items` composable of the table, the `modifier.clickable` with the role of button will group the internal components automatically.

### State

- **Android View**  
  - Active: android:enabled=true
  - Disabled" android:enabled=false. Announcement: disabled
  - Announcement: Selected/ "not selected" for row with a checkmark
- **Android Compose**
  - Active: `enabled=true`
  - Disabled: `enabled=false`

### Focus

- Only manage focus when needed. Primarily, let the device manage default focus.  
- Consider how focus should be managed between child elements and their parent views.
- **Android View**
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
- **Android Compose**
  - `Modifier.focusTarget()` makes the component focusable
  - `Modifier.focusOrder()` needs to be used in combination with FocusRequesters to define focus order
  - `Modifier.onFocusEvent()`, `Modifier.onFocusChanged()` can be used to observe the changes to focus state
  - `FocusRequester` allows to request focus to individual elements with in a group of merged descendant views
  - *Example:* To customize the focus events behaviour
      - step 1: define the focus requester prior. `val (first, second) = FocusRequester.createRefs()`
      - step 2: update the modifier to set the order. `modifier = Modifier.focusOrder(first) { this.down = second }`
      - focus order accepts following values: up, down, left, right, previous, next, start, end
      - step 3: use `second.requestFocus()` to gain focus

### Announcement examples

TODO