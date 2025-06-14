## General Notes

Manual testing is not difficult or time consuming once a team understands keyboard interactions.

## Developer Notes

1.  **Test with the keyboard only**

    It is crucial to **test with only the keyboard first**, without the screen reader activated.

    **Why keyboard testing is so important**

    - Keyboard accessibility is **prerequisite** to screen reader accessibility.

      - If it doesn't work with only the keyboard, it won't work with a screen reader.

    - screen reader applications will sometimes cover missing functionality that the sighted keyboard user won't be able to use.

    **Devices**

    - Test with a mobile device and a bluetooth keyboard
    - Test with a desktop device and a keyboard

    **Browsers**

    - Any major browser (Chrome, Safari, Firefox) is acceptable for keyboard testing.

    - Note: In Safari, you'll have to activate tab in Preferences » Advanced » Press Tab

2.  **How to test**

    Keyboard testing consists of a few keyboard commands to interact with web experiences.

    <table >
      <caption class="text-left">
        Keyboard basics
      </caption>
      <thead>
        <tr>
          <th scope="col">
            Key
          </th>
          <th scope="col">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">
            <span >Arrows</span>
          </th>
          <td>
            Should scroll the screen or interact with form fields
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span >Tab</span>
          </th>
          <td>
            Moves through the interface focusing on elements that are focusable. For example, buttons and links.
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span >Shift + Tab</span>
          </th>
          <td>
            Moves in reverse through the interface focusing on elements that are focusable.
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span >Enter</span>
          </th>
          <td>
            Activates links and buttons
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span >Spacebar</span>
          </th>
          <td>
            Activates buttons and interacts with form elements
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span >Escape</span>
          </th>
          <td>
            Should close or dismiss widgets like dialogs
          </td>
        </tr>  
      </tbody>
    </table>

3.  **What to test for**

    - <div >
        <h3>✓ Ensure all mouse functionality is present for keyboard</h3>
        <p>Identify functionality within the experience that can be operated with a mouse or pointing device. Ensure this content can be accessed with they keyboard alone.</p>
      </div>
    - <div >
        <h3>✓ Ensure there is a highly visible visual indication of keyboard focus</h3>
        <p>Keyboard users need to understand where they are in the interface at all times. The visual indication of keyboard focus (focus ring) should be highly visible and have a color contrast ratio of 3:1 against the background. Verify that overlap items (e.g. cookie banners, sticky footers, sticky headers, and non-modal dialogs) do not obscure the visual indicator. </p>
      </div>
    - <div >
        <h3>✓ Ensure that there are no keyboard traps</h3>
        <p>Ensure that while navigating the experience, you do not encounter situations where you are not able to move forward or backward with the keyboard alone.</p>
      </div>
    - <div >
        <h3>✓ Verify that the focus order is logical</h3>
        <p>In an English-based experience, keyboard focus should move top-to-bottom and left-to-right in a logical order. Ensure focus is not jumping around the experience in a way that makes it hard to understand the content.</p>
      </div>
    - <div >
        <h3>✓ On focus does not create a change of context</h3>
        <p>Ensure that when an interactive element receives keyboard focus that a change of context is not initiated without warning of such behavoir. An example of change of context is a page load or web form submission.</p>
      </div>
    - <div >
        <h3>✓ Test for skip links</h3>
        <p>Where there are large chunks of repeated content, ensure that there are skip links present for keboard users. For example, on a site with a large site navigation system, the first focusable element in the page should be a link that allows users to jump to the main content of the site.</p>
      </div>

### Video Example

<video controls>
  <source src="media/video/how-to-test/how-to-keyboard.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

<hr>

### Related WCAG

- 1.4.11: Non-text Contrast
- 2.1.1 Keyboard
- 2.1.2 No Keyboard Trap
- 2.4.3 Focus Order
- 2.4.7 Focus Visible
- 3.2.1 On Focus

### Resources

[WebAIM Keyboard Accessibility](https://webaim.org/techniques/keyboard/)
