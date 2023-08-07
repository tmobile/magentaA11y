---
layout: entry
title:  "Snackbar/Toast"
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

settings:
  text resize: |
    Text can resize up to 200% without losing information
---

## Developer notes
  
- Snackbars provide lightweight feedback about an operation
- A brief message appears at the bottom of the screen on mobile
- Snackbars appear above all other elements on screen
- Display one at a time
- A snack bar or toast can be timed to disappear, since the message is not critical
- A message must be announced dynamically when it appears, but focus should not move to it
- If the snackbar persists, it should be in the swipe order for the screen reader user and tab order for the keyboard user
- All text in the snackbar must be announced by the screen reader

### Name
N/A

### Role
N/A

### Groupings
N/A

### State
N/A

### Focus
- For Jetpack Compose Snackbar, when there is action available, the default accessibility behavior let screen reader read the message and the action but no focus on either of them.
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
val snackbarHostState = remember { SnackbarHostState() }
val scope = rememberCoroutineScope()
Scaffold(
    snackbarHost = { SnackbarHost(snackbarHostState) },
    content = { innerPadding ->
        Button(
          modifier = Modifier.padding(innerPadding),
          onClick = {
            // show snackbar as a suspend function
            scope.launch {
                snackbarHostState.showSnackbar("Snackbar Message")
            }
          }) {
              Text(text = "Snackbar")
          }
    }
)
{% endhighlight %}