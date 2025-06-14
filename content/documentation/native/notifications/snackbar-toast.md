## General Notes

How to test a snackbar/toast

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a snackbar/toast

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Focus visibly moves in logical order to the snackbar, if there is an interactive element in the snackbar
   - Space: Any elements inside are activated on iOS and Android
   - Enter: Any elements inside are activated on Android
   - When no interactive element is in the snackbar: The snackbar/toast is dynamically announced, without moving focus to it

2. Test mobile screenreader gestures

   - Swipe: Focus moves within the snackbar
   - Doubletap: Activates any interactive elements within the snackbar
   - When no interactive element is in the snackbar: The snackbar/toast is dynamically announced, without moving focus to it

3. Listen to screenreader output on all devices

   - Name: Any interactive element announces its purpose or title
   - Role: Any interactive element identifies itself as a button in iOS and "double tap to activate" in Android
   - Group: Group elements needed to ensure the content is understandable
   - State: n/a

4. Test device settings

   - Text resize: Text can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/notifications/snackbar-toast](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/notifications/snackbar-toast)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a snackbar/toast

GIVEN THAT I am on a screen with a snackbar/toast

1. Scenario: Test keyboard actions

   - WHEN I press the "TAB" key, an arrow key, or "CTRL+TAB" key 
      - THEN the focus should visibly move in logical order to the snackbar if there is an interactive element inside 
   - WHEN I press the "SPACEBAR" key 
      - THEN any interactive element inside the snackbar should be activated on iOS and Android 
   - WHEN I press the "ENTER" key 
      - THEN any interactive element inside the snackbar should be activated on Android 
   - WHEN there is no interactive element in the snackbar 
      - THEN the snackbar/toast should be dynamically announced without moving the focus to it 

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate within the snackbar 
      - THEN the focus should move to any interactive elements inside the snackbar 
   - WHEN I double-tap an interactive element
      - THEN the element should be activated 
   - WHEN there is no interactive element in the snackbar 
      - THEN the snackbar/toast should be dynamically announced without moving the focus to it 

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader reads any interactive elements inside the snackbar 
      - THEN their purpose or title should be announced 
         - AND their role should be identified as "button" in iOS 
         - AND on Android, they should instruct "double tap to activate" 
         - AND the elements within the snackbar should be grouped in a way that ensures the content is understandable 
         - AND state-related functionality is not applicable (N/A) 

4. Scenario: Test device OS settings for text resize

   - WHEN the user increases the text size setting up to 200% 
      - THEN all text within the snackbar should remain fully readable
         - AND no content or functionality should be lost or cut off 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/notifications/snackbar-toast](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/notifications/snackbar-toast)

## iOS Developer Notes

   - There is no native snackbar or toast element for iOS. The notes below are suggestions and accessibility guidance.

### Developer notes

   - Snackbars and Toasts provide lightweight feedback about an operation
   - They show a brief, non-critical message at the bottom of the screen on mobile
   - Snackbar or Toast must be dynamically announced by the screen reader without moving focus to it
   - Display only one Snackbar or Toast at a time
   - A Snackbar or toast can be timed to disappear, since the message is not critical information
   - If the Snackbar persists, it should be in the swipe order for the screen reader user and tab order for the keyboard user
   - All text in the Snackbar and Toast must be announced by the screen reader
   - A Snackbar may contain an interactive element. Please follow the Native Button guidance for the accessibility needs of a Call To Action (CTA).
   - Toasts do not contain an interactive element

### Dynamic Announcement example

   - "Copied to clipboard" (Non-critical information in timed-to-disappear snackbar)

## Android Developer Notes
### General Notes

   - Snackbars and Toasts provide lightweight feedback about an operation
   - They show a brief non-critical message at the bottom of the screen on mobile
   - Snackbar or Toast must be dynamically announced by the screen reader without moving focus to it
   - Display only one Snackbar or Toast at a time
   - A Snackbar or Ttoast can be timed to disappear, since the message is not critical information
   - If the Snackbar persists, it should be in the swipe order for the screen reader user and tab order for the keyboard user
   - All text in the Snackbar and Toast must be announced by the screen reader
   - A Snackbar may contain an interactive element. Please follow the Native Button guidance for the accessibility needs of a Call To Action (CTA).
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
      - `Modifier.focusOrder()` needs to be used in combination with `FocusRequester` to define focus order
      - `Modifier.onFocusEvent()`, `Modifier.onFocusChanged()` can be used to observe the changes to focus state
      - `FocusRequester` allows to request focus to individual elements with in a group of merged descendant views
      - Example: To customize the focus events
         - step 1: define the focus requester prior. `val (first, second) = FocusRequester.createRefs()`
         - step 2: update the modifier to set the order. `modifier = Modifier.focusOrder(first) { this.down = second }`
         - focus order accepts following values: up, down, left, right, previous, next, start, end
         - step 3: use `second.requestFocus()` to gain focus

### Code Example

   - **Jetpack Compose**

```java
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
```

### Dynamic Announcement example

   - "Copied to clipboard" (Non-critical information in timed-to-disappear snackbar)
