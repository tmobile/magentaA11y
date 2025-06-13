## General Notes

How to test a webview

## Videos

### iOS VoiceOver 

<video controls>
  <source src="media/video/native/webview/webview_IosVoiceOver.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback 

<video controls>
  <source src="media/video/native/webview/webview_AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a webview

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Moves to all interactive elements in navigation bar and webview
   - Spacebar: Activates on iOS and Android
   - Enter: Activates on Android

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the element, expresses its name, role (state, if applicable)
   - Doubletap: Activates the interactive element

3. Listen to screenreader output on all devices

   - Focus: Initial focus should go to all elements in the navigation bars
   - Navigation: Native and webview elements are all in the swipe order

4. Test device settings

   - Text resize: N/A only for webview sections and native navigation bar text

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/webview](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/webview)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a webview

GIVEN THAT I am on a screen with a webview

1. Scenario: Test keyboard actions

   - WHEN I press the "TAB" key, "ARROW" keys, or "CTRL+TAB" 
      - THEN the focus should move to all interactive elements in the navigation bar and webview 
   - WHEN I press the "SPACEBAR" key 
      - THEN the interactive element should be activated on iOS and Android 
   - WHEN I press the "ENTER" key 
      - THEN the interactive element should be activated on Android 

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate 
      - THEN the focus should move to each element 
         - AND express its name and role 
         - AND express its state if applicable 
   - WHEN I double-tap an interactive element 
      - THEN the element should be activated 

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader is active 
      - THEN the initial focus should move to all elements in the navigation bars 
         - AND native and webview elements should be included in the swipe order 

4. Scenario: Test device OS settings for text resize

   - WHEN I have increased text size in device settings
      - THEN text resize is N/A for webview sections and native navigation bar text 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/webview](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/webview)

## iOS Developer Notes
### General Notes

   - A webview is a portion of a webpage, usually html code, incorporated seamlessly into the app’s UI
   - Sometimes a hidden web element is announced 
   - An obvious sign that you are in a webview is web-only accessibility announcements such as a “landmark” or a heading level
   - A common use for webviews is if the content changes often
   - Sometimes the container that includes the webview may announce seperately, which is usually ok
   - A “Link” announcement in webviews usually navigates the user to a new screen. In a native app “link” usually means the action will open a browser on your phone
   - External Blue Tooth keyboard testing can be erratic and inconsistent on webviews, which is a known issue
   - Enlarging text from Accessibility settings does not work on the webview sections of the screen

### Role

   - **UIKit and SwiftUI**

      - `WKWebView`

### Focus

   - Use the device's default focus functionality. 
   - Consider how focus should be managed between child elements and their parent views.
   - External keyboard tab order often follows the screen reader focus, but sometimes this functionality requires additional development to manage focus.
   - Initial focus on a screen should land in a logical place, such as the nav bar back button, screen title, or first text field

   - **UIKit**

      - If VoiceOver is not reaching a particular element, set the element's `isAccessibilityElement` to `true`
         - **Note:** You may need to adjust the programmatic name, role, state, and/or value after doing this, as this action may overwrite previously configured accessibility.
      - Use `accessibilityViewIsModal` to contain the screen reader focus inside the modal.
      - To move screen reader focus to newly revealed content, use `UIAccessibility.post(notification:argument:)` that takes in `.screenChanged` and the newly revealed content as the parameter arguments.
      - To NOT move focus, but dynamically announce new content: use `UIAccessibility.post(notification:argument:)` that takes in `.announcement` and the announcement text as the parameter arguments.
      - `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements. 

   - **SwiftUI**

      - For general focus management that impacts both screen readers and non-screen readers, use the property wrapper `@FocusState` to assign an identity of a focus state.
         - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:)` to assign focus on a view with `@FocusState` as the source of truth.
         - Use the property wrapper `@FocusState`in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
      - If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.

## Android Developer Notes
### General Notes

   - A webview is a portion of a webpage, usually html code, incorporated seamlessly into the app’s UI
   - Sometimes a hidden web element is announced 
   - An obvious sign that you are in a webview is web-only accessibility announcements such as a “landmark” or a heading level
   - A common use for webviews is if the content changes often
   - Sometimes the container that includes the webview may announce seperately, which is usually ok 
   - A “Link” announcement in webviews usually navigates the user to a new screen. In a native app “link” usually means the action will open a browser on your phone
   - External Blue Tooth keyboard testing can be erratic and inconsistent on webviews
   - Enlarging text from Accessibility settings does not work on the webview sections of the screen

### Role

   - **Android Views**

      - `public class WebView`

   - **JetPack Compose**

      - `AndroidView():` To embed Android views in your Compose layouts
      - `Factory:` Function that creates an instance of the Android view


### Focus

   - Only manage focus when needed. Primarily, let the device manage default focus
   - Consider how focus should be managed between child elements and their parent views
   - External keyboard tab order often follows the screen reader focus, but sometimes needs focus management
   - Initial focus on a screen should land in a logical place (back button, screen title, first text field, first heading)
   - When a menu, picker or modal is closed, the focus should return to the triggering element.

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
