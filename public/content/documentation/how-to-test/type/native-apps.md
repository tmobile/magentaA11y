## General Notes

Testing in Native Apps is essential to ensuring the app is accessible and functional for all users.

## Developer Notes

Contains developer-specific information, including expected behaviors, implementation details, and
best practices.

1. **How to test for links**

   **Test with your screen reader first**

   Use a screen reader, such as [TalkBack](https://www.nvaccess.org/) (for Android) or [VoiceOver](https://www.apple.com/accessibility/mac/vision/) (for iOS)

   - Swipe with one finger anywhere on the screen to the right to navigate through the screen. Swipe left navigates backwards.
   - If custom actions are implemented, swipe up or down with one finger anywhere on the screen to perform action.
   - Scroll with two fingers for Android 
   - Scroll with three fingers for iOS
   - Double tap to activate when the link is focused
   - Activate Rotor or TalkBack menu to access a list of links to activate with double tap. (Only one way of accessing links is required: Focus within screen or in the context menus)
   - Note: Currently a known bug in iOS – links cannot be accessed from the Rotor using SwiftUI.

   **Test with BlueTooth External keyboard second**

    Next, test with the BlueTooth external keyboard (without the screen reader turnedo on).
    Navigate through the page using one of the following keys to reach all links: 

   - The `tab` and `shift tab` keys
   - The `arrow` keys
   - The `Ctrl+tab` and `Ctrl+shift tab` keys
   - Ensure links can be activated with the `space` key on iOS and for Android, `enter` key and `space` key both work separately.

   **Test with BlueTooth External keyboard second**

   Lastly, test for enlarged text:
   - Go to Settings on your device and increase text size to 200%. 
   - Refer to this document for instructions ( [suggested resource is an internal TMO link](https://tmobileusa.sharepoint.com/sites/arc/SitePages/Native-App-Testers.aspx#large-text) - what do we need/want out of this info that we also want open to the public? )
   - Ensure no text is cut off, overlaps, truncates or disappears 
   - Ensure functionality works as expected 
   - This does not apply to images of text or logos 
   - Text in the top and bottom navigation bars do not increase in size 
   - Text in a web view on iOS does not increase in size

2. **What to test for**

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
