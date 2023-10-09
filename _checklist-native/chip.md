---
layout: entry
title:  "Chip"
categories: controls

keyboard:
  tab: |
    Focus visibly moves to the chip
  space: |
    Any elements inside are activated on Android
  enter: |
    Any elements inside are activated on Android

mobile:
  swipe: |
    Focus moves to the element, expresses its state, if applicable
  doubletap: |
    Activates the chip

screenreader:
  name:  |
    Purpose is clear and matches visible label
  role:  |
    Identifies as a button and "double tap to activate" in Android
  group: |
    Visible label (if any) is grouped or associated with the button in a single swipe
  state: |
    Expresses its state (selected/disabled/dimmed)

settings:
  text resize: |
    This element is exempt from text resizing requirements
---

## Android

### Developer notes

### Focus
- For Jetpack Compose Snackbar, when there is an action available, the default accessibility behavior allows screen reader to dynamically read the message and the action
- Only manage focus when needed. Primarily, let the device manage default focus
- Consider how focus should be managed between child elements and their parent views
- External keyboard tab order often follows the screen reader focus, but sometimes needs focus management
- Initial focus on a screen should land in a logical place (back button, screen title, first text field, first heading)

- **Android Views**
  - `importantForAccessibility` makes the element visible to the Accessibility API
  - `android:focusable`
  - `android=clickable`
  - Implement an `onClick( )` event handler for keyboard, as well as `onTouch( )`
  - `nextFocusDown`
  - `nextFocusUp`
  - `nextFocusRight`
  - `nextFocusLeft`
  - `accessibilityTraversalBefore` (or after)
  - To move screen reader focus to newly revealed content: `Type_View_Focused`
  - To NOT move focus, but dynamically announce new content: `accessibilityLiveRegion`(set to polite or assertive)
  - To hide controls: `importantForAccessibility=false`
  - For a `ViewGroup`, set `screenReaderFocusable=true` and each inner object’s attribute to keyboard focus (`focusable=false`)
- **Jetpack Compose**
  - `Modifier.focusTarget()` makes the component focusable
  - `Modifier.focusOrder()` needs to be used in combination with FocusRequesters to define focus order
  - `Modifier.onFocusEvent()`, `Modifier.onFocusChanged()` can be used to observe the changes to focus state
  - `FocusRequester` allows to request focus to individual elements with in a group of merged descendant views
  - Example: To customize the focus events
    - step 1: define the focus requester prior. `val (first, second) = FocusRequester.createRefs()`
    - step 2: update the modifier to set the order. `modifier = Modifier.focusOrder(first) { this.down = second }`
    - focus order accepts following values: up, down, left, right, previous, next, start, end
    - step 3: use `second.requestFocus()` to gain focus
  
### Code Example
- **Jetpack Compose**
{% highlight kotlin %}
{% endhighlight %}
