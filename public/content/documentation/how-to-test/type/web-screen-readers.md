## General Notes

Learn the basics of testing websites with mobile and desktop screen readers. 


## Developer Notes
Screen readers are an assistive technology tool, often used by people with vision impairments or reading disorders, that convert text, buttons, images, tables, and other screen elements into speech. **Manually testing with a screen reader is essential** to find accessibility issues that may not be caught by automated testing tools. 

Screen readers are all slightly different and all offer a slightly different experience. **Not having all screen readers available doesn't mean you can't test for accessibility**. 

1. ## Basics of testing with desktop screen readers
   Screen reader users may navigate line by line through the page or they may jump around or "scan" using the rotor or elements list (mentioned below in the keyboard shortcuts). 
   
   **Do not use a mouse** during screen reader testing. Instead, use a keyboard to navigate. 

   Utilize the testing scenarios here on MagentaA11y component and pattern pages for UI expected behavior. 

2. ## Screen reader options
   According to the <a href="https://webaim.org/projects/screenreadersurvey10/">WebAIM screen reader user survey</a>, the overwhelming **majority of screen reader users are on Windows** such as: <a href="https://www.freedomscientific.com/Products/software/JAWS/">JAWS (Job Access With Speech)</a> and <a href="https://www.nvaccess.org/">NVDA (NonVisual Desktop Access)</a>. They are followed in popularity by **Apple's built-in screen reader, VoiceOver**.

   Some browsers work best with certain screen readers and are specifically suggested by operating systems. 


   ### NVDA
   NVDA is a free screen reader available for download for Windows computers. For NVDA the recommended browsers are **Chrome, Firefox, or Edge**.Below is a quick-start guide of keyboard shortcuts. If needed, check out this more <a href="https://webaim.org/resources/shortcuts/nvda">expansive list of NVDA keyboard shortcuts from WebAIM</a>.

   #### Getting Started
   Disable “Automatic Say All on page load” in NVDA Settings: Browse Mode. This will increase the conformance of NVDA.

   #### NVDA differences
   - NVDA has 2 modes with different keyboard shortcuts.
      --  Browse (Red focus indicator)
         - Arrow keys will browse from element to element
      - Focus (Blue focus indicator)
         -  Arrow keys will only interact with the interactive element in focus
   - Only reads ~120 characters at at time
   - Reads “clickable” when it detects a click event listener on an element, even when it’s not clickable. (Note: If the element is not intended to be clickable, this is a defect to be remediated)
   - Will read a button with aria-haspopup="true" as “menu submenu”
   - Any element in focus like a dialog or section will be read in its entirety

   <table >
      <caption class="text-left">NVDA Basic Keyboard Shortcuts</caption>
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
            <span>Control + Alt + N</span>
         </th>
         <td>
            Turn NVDA on
         </td>
      </tr>  
      <tr>
         <th scope="row">
            <span>Insert + Q</span>
         </th>
         <td>
            Turn NVDA off
         </td>
      </tr>                   
      <tr>
         <th scope="row">
            <span>Arrows</span>
         </th>
         <td>
            Read next or previous item
         </td>
      </tr>
      <tr>
         <th scope="row">
            <span>Tab</span>
         </th>
         <td>
            Moves through the interface focusing on elements that are focusable. For example, buttons and links.
         </td>
      </tr>
      <tr>
         <th scope="row">
            <span>Shift + Tab</span>
         </th>
         <td>
            Moves in reverse through the interface focusing on elements that are focusable.
         </td>
      </tr>
      <tr>
         <th scope="row">
            <span>Enter</span>
         </th>
         <td>
            Activates links and buttons
         </td>
      </tr>
      <tr>
         <th scope="row">
            <span>Spacebar</span>
         </th>
         <td>
            Activates buttons and interacts with form elements
         </td>
      </tr>
      <tr>
         <th scope="row">
            <span>Escape</span>
         </th>
         <td>
            Should close or dismiss widgets like dialogs
         </td>
      </tr>  
      <tr>
         <th scope="row">
            <span>H</span>
         </th>
         <td>
            Go to next heading
         </td>
      </tr>          
      <tr>
         <th scope="row">
            <span>Insert + F7</span>
         </th>
         <td>
            Show list of all links, headings, form fields, buttons, and landmarks
         </td>
      </tr>           
      </tbody>
   </table>

---

   ### JAWS
   JAWS is not free and works well with **Chrome, Edge, Firefox, and Internet Explorer**. Below is a quick-start guide of keyboard shortcuts. If needed, check out this more <a href="https://webaim.org/resources/shortcuts/jaws">expansive list of JAWS keyboard shortcuts from WebAIM</a>.

   #### JAWS Differences
   - JAWS has 2 modes with different keyboard shortcuts
      - Browse
         - Arrow keys will browse from element to element
      - Forms
         - Arrow keys will only interact with the interactive element in focus
   - Can fake click events on elements, meaning it may work with the screen reader but not just the keyboard

   <table>
      <caption class="text-left">JAWS Basic Keyboard Shortcuts</caption>
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
            <span>(Select from application list)</span>
         </th>
         <td>
            Turn JAWS on
         </td>
      </tr>  
      <tr>
         <th scope="row">
            <span>Insert + F4</span>
         </th>
         <td>
            Turn NVDA off
         </td>
      </tr>                   
      <tr>
         <th scope="row">
            <span>Arrows</span>
         </th>
         <td>
            Read next or previous item
         </td>
      </tr>
      <tr>
         <th scope="row">
            <span>Tab</span>
         </th>
         <td>
            Moves through the interface focusing on elements that are focusable. For example, buttons and links.
         </td>
      </tr>
      <tr>
         <th scope="row">
            <span>Shift + Tab</span>
         </th>
         <td>
            Moves in reverse through the interface focusing on elements that are focusable.
         </td>
      </tr>
      <tr>
         <th scope="row">
            <span>Enter</span>
         </th>
         <td>
            Activates links and buttons
         </td>
      </tr>
      <tr>
         <th scope="row">
            <span>Spacebar</span>
         </th>
         <td>
            Activates buttons and interacts with form elements
         </td>
      </tr>
      <tr>
         <th scope="row">
            <span>Escape</span>
         </th>
         <td>
            Should close or dismiss widgets like dialogs
         </td>
      </tr>  
      <tr>
         <th scope="row">
            <span>H</span>
         </th>
         <td>
            Go to next heading
         </td>
      </tr>          
      <tr>
         <th scope="row">
            <span>Insert + F3</span>
         </th>
         <td>
            Show list of all links, headings, form fields, buttons, and landmarks
         </td>
      </tr>           
      </tbody>
   </table>

---

   ### VoiceOver
   VoiceOver is the built-in screenreader on Apple operating systems and works best with **Safari**. Below is a quick-start guide of keyboard shortcuts. If needed, check out this more <a href="https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts">expansive list of VoiceOver keyboard shortcuts from Deque</a>.

   #### VoiceOver Differences
   - Does not have multiple modes like NVDA or JAWS
   - Voiceover will say “dimmed” instead of “disabled”
   - It may say things in a different order than NVDA or JAWS but the core acceptance criteria are the same.

   <table>
      <caption class="text-left">VoiceOver Basic Keyboard Shortcuts</caption>
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
            <span>CAPS or Control+Option</span>
         </th>
         <td>
               VoiceOver (VO) key
         </td>
      </tr> 
      <tr>
         <th scope="row">
            <span>Command+F5</span>
         </th>
         <td>
            Turn VoiceOver on/off
         </td>
      </tr>                   
      <tr>
         <th scope="row">
            <span>VO+ Right/Left Arrows</span>
         </th>
         <td>
            Read next or previous item
         </td>
      </tr>
      <tr>
         <th scope="row">
            <span>Tab</span>
         </th>
         <td>
            Moves through the interface focusing on elements that are focusable. For example, buttons and links.
         </td>
      </tr>
      <tr>
         <th scope="row">
            <span>Shift + Tab</span>
         </th>
         <td>
            Moves in reverse through the interface focusing on elements that are focusable.
         </td>
      </tr>
      <tr>
         <th scope="row">
            <span>Enter or VO + Space Bar</span>
         </th>
         <td>
            Activates links and buttons
         </td>
      </tr>
      <tr>
         <th scope="row">
            <span>Spacebar</span>
         </th>
         <td>
            Activates buttons and interacts with form elements
         </td>
      </tr>
      <tr>
         <th scope="row">
            <span>Escape</span>
         </th>
         <td>
            Should close or dismiss widgets like dialogs
         </td>
      </tr>  
      <tr>
         <th scope="row">
            <span>VO + Command + H</span>
         </th>
         <td>
            Go to next heading
         </td>
      </tr>          
      <tr>
         <th scope="row">
            <span>VO + U</span>
         </th>
         <td>
            Show list of all links, headings, form fields, buttons, and landmarks (called the "rotor" in VoiceOver)
         </td>
      </tr>           
      </tbody>
   </table>



   <!-- 2. ## Test with mobile screen readers

      Because many websites have crossed the threshold to a majority of visits being from mobile devices this may be higher priority than desktop testing.

      - Follow the mobile gesture test instructions (swipe, tap, doubletap, etc.) described in MagentaA11y testing criteria.
      - **Do not tap** on elements to navigate, you must swipe to browse the content in a linear and logical pattern.

      ### Devices

      - Test in both Android and iOS devices
      - After testing using mobile gestures, test with a mobile device's built-in screen reader: VoiceOver for iOS and Talkback for Android. -->


## Related WCAG
- 1.1.1 Non-text Content
- 1.4.5 Images of Text
- 2.4.4 Link Purpose
- 2.5.3 Label in Name
- 4.1.2 Name, Role, Value

## Resources
- [W3C Images Tutorial](https://www.w3.org/WAI/tutorials/images/)
- [WebAIM Alternative Text](https://webaim.org/techniques/alttext/)

