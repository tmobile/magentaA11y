## General Notes

Testing in Native Apps is essential to ensuring the app is accessible and functional for all users.

## Developer Notes

Contains developer-specific information, including expected behaviors, implementation details, and
best practices.

1. **How to test with your screen reader**

   ### Test with your screen reader

   Use a screen reader, such as [TalkBack](https://support.google.com/accessibility/android/topic/3529932?hl=en&ref_topic=9078845&sjid=10047972329698138905-NC) (for Android) or [VoiceOver](https://support.apple.com/guide/iphone/turn-on-and-practice-voiceover-iph3e2e415f/ios) (for iOS)

   - Swipe with one finger anywhere on the screen to the right to navigate through the screen. Swipe left navigates backwards.
   - If custom actions are implemented, swipe up or down with one finger anywhere on the screen to perform action.
   - Scroll with two fingers for Android 
   - Scroll with three fingers for iOS
   - Double tap to activate when the link is focused
   - Activate Rotor or TalkBack menu to access a list of links to activate with double tap. (Only one way of accessing links is required: Focus within screen or in the context menus)
   - Note: Currently a known bug in iOS – links cannot be accessed from the Rotor using SwiftUI.

   #### Screen reader shortcut one-time setup

   ##### iOS VoiceOver

   1. Open Settings
   2. Choose Accessibility
   3. Choose Accessibility Shortcut
   4. Select VoiceOver
   5. To start or stop VoiceOver, press the power button three times (no need to go to Settings each time to turn the screen reader on and off)

   ##### TalkBack

   1. Open Settings
   2. Choose Accessibility
   3. Choose Advanced Settings
   4. Choose Volume up and down keys
   5. Enable the toggle
   6. To start or stop TalkBack, press both volume keys for 2-3 seconds (no need to go to Settings each time to turn the screen reader on and off)

   ### iOS Rotor and Android TalkBack Menu
   
   #### iOS Rotor setup

   1. With VoiceOver on, using two fingers on the screen (many prefer to make a pinching-gesture and rotate on the screen), rotate fingers to hear the options available in the rotor
   2. Keep rotating to cycle through the options, such as “headings”
   3. With the rotor set to this option, you will be able to ues the single-finger swipe up or down to navigate through all the headings found on the screen. Note: (1) sing the single-finger swipe left or right is still available at any time. (2) Setting the rotor to other options will allow for the single-finger swipe up or down to navigate the user to that respective option.

   #### Android TalkBack Menu (formally the Local Context Menu) setup
   
   1. Tap once with three-fingers to access the TalkBack Menu
   2. Actions and Links are the most common options to use, but others such as Activate Links, Expand Accordions, Navigate through a Carousel, and Delete Elements are available, too. 

   ##### Lastly, test for enlarged text:

      - Go to Settings on your device and increase text size to 200%
         - In iOS, with "Larger Accessibility Sizes" toggled ON, move the text-size slider to the 9th tick from the left.
            - Ensure no text in the app is cut off, overlaps, truncates, or disappears 
         - Android, move the slide to the last tick to the right, the "largest" or "Huge" setting
      - Ensure functionality works as expected; review accessibility acceptance criteria found on each component's individual page for testing steps 
         - In iOS, Larger headings should adjust to Apple font size guidance
      - This does not apply to images of text or logos 
      - Text in the top and bottom navigation bars **do not** increase in size 
      - Text in a WebView on iOS does not increase in size

   ###### Developer note for Large Text

   - Ensure containers enlarge as text enlarges (view constraints are set correctly)
   - Set labels to textwrap
   - Specify font weight when needed
   - Specify font size and font scale when needed
   - Do not disable scrolling
   - Use preferred fonts for the platform when possible (designers will give the developers the font styles and sizes)

2. **How to test with your BlueTooth External keyboard**

   ### Test with BlueTooth External keyboard

   Test with the BlueTooth external keyboard (without the screen reader turned on).

   #### Setting up your BlueTooth external keyboard

   Pair the external keyboard with your device as you would a computer. 

   For iOS setup only:

   1. Open Settings
   2. Choose Accessibility
   3. Choose Keyboards
   4. Toggle on "Full Keyboard Access" 
   
   #### Navigating using your BlueTooth external keyboard

   - Turn OFF Screen Reader when testing with keyboard
   - Pair the external keyboard with the phone as you would a computer
   - iOS – Turn on Full Keyboard Access toggle in Accessibility settings or keyboard will not work properly
   - The focus ring for keyboard, which is different from the screen reader focus must be visible. Sometimes, this is just a slight change or shadow.

   ##### How to test with your BlueTooth external keyboard

   - Use tab key OR arrow keys to navigate through the screen
      - There are other key combinations that are acceptable to use besides Tab, Shift-Tab and Arrow keys. CTRL+Tab is one that is also acceptable.
   - Only interactive elements must be focused. If text or images area also focused, it is not a defect
   - Check that the element is functional with the keyboard
      - iOS: Only Space bar activates element
      - Android: Space bar and/or Enter key activates an element

   ##### What is a defect with your BlueTooth external keyboard

   - Tab or arrow keys do not focus an interactive element
   - Tab order of elements are not logical or do not match the reading order
   - Enter and space bar does not activate the element on Android
   - Space bar does not activate the element on iOS

   ##### Notes for using your BlueTooth external keyboard

   - Hybrid screens or WebViews in the native app can be buggy
   - Test the issue on computer in a web page to verify that the bug is also on the web. If it is ok on the web, do not log as a defect in the app. App screen readers trying to interpret web code do not always get it right.
   - Know issue on both platforms: Not being able to tab or arrow into the main part of a hybrid screen in a native app.

2. **How to test for links**

   ### How to test links

   #### Navigate through the screen with iOS 

   - Links can be activated through the Rotor (twist with two fingers to access the Rotor)
   - Or Double Tap to activate when they are focused on the screen

   #### Navigate through the screen with Android 

   - Links can be activated from the TalkBack menu (tap once with three fingers to access the menu)
   - Or Double Tap to activate when they are focused on the screen

   #### Navigate through the screen using one of the following keys to reach all links: 

   - The `tab` and `shift tab` keys
   - The `arrow` keys
   - The `Ctrl+tab` and `Ctrl+shift tab` keys
   - Ensure links can be activated with the `space` key on iOS and for Android, `enter` key and `space` key both work separately.

   <div class="how-to-test-checklist-item">
   <h3>✓ Ensure each link receives focus and has a visible focus indicator – the indicator is slightly different for the screen reader and keyboard</h3>
   <div class="table-wrapper">
   <table>
   <thead>
   <th scope="col">
   Pass
   </th>
   <th scope="col">
   Fail
   </th>
   </thead>
   <tbody>
   <tr>
   <td>
   <button class="Magentaa11y-button Magentaa11y-button--primary">I get focus!</button>
   </td>
   <td>
   <div class="Magentaa11y-button Magentaa11y-button--primary">I do NOT get focus</div>
   </td>
   </tr>
   </tbody>
   </table>
   </div>
   </div>

   <div class="how-to-test-checklist-item">
   <h3>✓ Ensure all links have clear labels and that all graphical controls have accurate programmatic names and roles</h3>
   <p><strong>For example:</strong> "See details" as a link label</p>
   <div class="table-wrapper">
   <table>
   <thead>
   <th scope="col">
      Pass
   </th>
   <th scope="col">
      Fail
   </th>
   </thead>
   <tbody>
   <tr>
   <td>
   "See details for the iPhone14"
   </td>
   <td>
   "Get additional info on the sepcs for iPhone 14"
   </td>
   </tr>
   </tbody>
   </table>
   </div>
   </div>

   <div class="how-to-test-checklist-item">
   <h3>Ensure screen readers accurately announce any link state that is conveyed visually </h3>
   <p><strong>Disabled link:</strong> 
   - iOS: Learn more, dimmed, link
   - Android: Learn more, disabled
   </p>
   </div>

3. **What's the difference between a link and a button**

   ### If it opens a browser (ie: outside the app), it's a link.
   - A link can look like a big shiny button but it must be coded as a link.

   ### If the user stays within the app, it's a button
   - A button can look like a link, but it must be coded as a button.

   <div class="how-to-test-checklist-item">
   <h3>✓ Ensure controls are announced correctly as links based on their function and purpose regardless of visual design</h3>
   <p>Note: The role of “link” communicates to screen reader users that they will be navigated outside the app once they interact with it. </p>
   <div class="table-wrapper">
   <table class="column-2">
   <thead>
   <tr><th scope="col">
      Pass
   </th>
   <th scope="col">
      Fail
   </th>
   </tr></thead>
   <tbody>
   <tr>
   <td>
   Upon activation, the user is navigated to a browser, outside the app
   </td>
   <td>
   Upon activation, the user stays within the app.
   </td>
   </tr> 
   </tbody>
   </table>
   </div>
   </div>

   ## Related WCAG

   - 2.4.4 Link Purpose (In Context)
   - 2.5.3 Label in Name
   - 3.2.4 Consistent Identification
   - 4.1.2 Name, Role, Value

   ## Resources

   - [Apple Developer SwiftUI - Link](https://developer.apple.com/documentation/swiftui/link)
   - [Apple Developer SwiftUI - Button](https://developer.apple.com/documentation/swiftui/button)
   - [Android Developer Button](https://developer.android.com/reference/android/widget/Button)
   - [Android Developer App Links](https://developer.android.com/training/app-links)
