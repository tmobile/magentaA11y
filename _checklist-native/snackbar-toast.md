---
layout: entry
title:  "Snackbar/Toast"
categories: notifications

keyboard:
  tab, arrow keys or Ctl+tab: |
    Focus visibly moves in logical order to the snackbar, if there is an interactive element in the snackbar
  space: |
    Any elements inside are activated on iOS and Android
  enter: |
    Any elements inside are activated on Android
  When no interactive element is in the snackbar: |
    The snackbar/toast is dynamically announced, without moving focus to it

mobile:
  swipe: |
    Focus moves within the snackbar
  doubletap: |
    Activates any interactive elements within the snackbar
  When no interactive element is in the snackbar: |
    The snackbar/toast is dynamically announced, without moving focus to it

screenreader:
  name:  |
    Any interactive element announces its purpose or title
  role:  |
    Any interactive element identifies itself as a button in iOS and "double tap to activate" in Android
  group: |
    Group elements needed to ensure the content is understandable
  state: |
    n/a

settings:
  text resize: |
    Text can resize up to 200% without losing information
---
## iOS
- There is no native snackbar or toast element for iOS.  The notes below are suggestions and accessibility guidance.

### Developer notes

- Snackbars and Toasts provide lightweight feedback about an operation
- They show a brief non-critical message at the bottom of the screen on mobile
- Snackbar or toast must be dynamically announced by the screen reader without moving focus to it
- Display only one at a time
- A Snackbar or toast can be timed to disappear, since the message is not critical information
- If the Snackbar persists, it should be in the swipe order for the screen reader user and tab order for the keyboard user
- All text in the Snackbar and Toast must be announced by the screen reader
- A Snackbar can contain an interactive element. Please follow the Native Button guidance for the CTA
- Toasts do not contain an interactive element

### Dynamic Announcement example
- "Copied to clipboard"  (Non-critical information in timed-to-disappear snackbar)

## Android

### Developer notes

- Snackbars and Toasts provide lightweight feedback about an operation
- They show a brief non-critical message at the bottom of the screen on mobile
- Snackbar or toast must be dynamically announced by the screen reader without moving focus to it
- Display only one at a time
- A Snackbar or toast can be timed to disappear, since the message is not critical information
- If the Snackbar persists, it should be in the swipe order for the screen reader user and tab order for the keyboard user
- All text in the Snackbar and Toast must be announced by the screen reader
- A Snackbar can contain an interactive element. Please follow the Native Button guidance for the CTA
- Toasts do not contain an interactive element

### Focus
- For Jetpack Compose Snackbar, when there is an action available, the default accessibility behavior allows screen reader to dynamically read the message and the action
- External keyboard tab order often follows the screen reader focus, but sometimes needs focus management

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

### Dynamic Announcement example
- "Copied to clipboard"  (Non-critical information in timed-to-disappear snackbar)
