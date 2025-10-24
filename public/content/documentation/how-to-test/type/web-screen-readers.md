## General Notes

Learn the basics of testing websites with mobile and desktop screen readers.

## Developer Notes

1. ## Test with desktop screen readers
   ### Using the tab key

   The tab key is not the only key the screen readers use to browse content. Before you test, learn the difference between **interactive elements that should receive focus** with the tab key and **content that should not**.

   - Arrow keys browse content for reading
   - The tab key focuses interactive controls
   - screen readers can also consume content automatically, starting reading at the top with no keyboard interaction

   ### Do not use a mouse

   - **Do not use the mouse** for screen reader testing.
2. ## Test with mobile screen readers

   Because many websites have crossed the threshold to a majority of visits being from mobile devices this may be higher priority than desktop testing.

   - Follow the mobile gesture test instructions (swipe, tap, doubletap, etc.) described in MagentaA11y testing criteria.
   - **Do not tap** on elements to navigate, you must swipe to browse the content in a linear and logical pattern.

   ### Devices

   - Test in both Android and iOS devices
   - After testing using mobile gestures, test with a mobile device 

   ### Browsers

   Follow the [screen reader browser pairings table](#screen-readers-are-all-slightly-different)

## About screen readers
<!-- {: .divider } -->

### Screen readers are all slightly different

- Screen readers all offer a slightly different experience.
- Not having all 5 screen readers available doesn't mean you can't test for accessibility.
- Most of the major accessibility defects you're likely to encounter will show up in any screen reader.

### NVDA + Windows

 <div class="MagentaA11y-accordion">
   <h2 class="MagentaA11y-accordion__heading">
      <button
      class="MagentaA11y-accordion__headline"
      aria-expanded="false"
      data-fn="toggleAccordionState"
      aria-controls="sr">
      <span class="MagentaA11y-accordion__headline--text">More details</span>
      </button>
   </h2>
   <div class="MagentaA11y-accordion__body" id="sr">
      <table >
         <caption class="text-left">
         NVDA Basics
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
   </div>
</div>

3. **Informative Images**
   - Check that the image owns an `alt` attribute.
   - Ensure that the `alt` attribute is present and not empty.
   - The `alt` attribute value / description of the image should be accurate and succinct. The image alternative should not consist of information that duplicates nearby text content.
   ```html
   <svg role="img" aria-label="I am the alt text">...</svg>
   ```
4. **Decorative Images**
   - Ensure that the `alt` attribute is present and owns an empty or null value: `alt=""`.
   - **Note:** `aria-hidden="true"` is not needed if an image has `alt=""`.
   ```html
   <img alt="" src="../some-image.png" ... />
   ```
5. **Functional Images**
   - Ensure the `alt` attribute is present and owns a value that includes **all** of the text found in the image.
   - Functional images are typically links or buttons so the alt text should define the purpose of the link instead of describing the image.
   - **Note:** Functional images can have `alt=""` if the text alternative is conveyed in the parent control's label, e.g. `aria-label="Download on the Apple App Store"`.
   ```html
   <button aria-label="Download on the Apple App Store">
     <img src="apple.png" alt="" />
   </button>
   ```
6. **Images of Text**
   - Ensure the `alt` attribute includes **all** of the text in the image.
   - Consider logging a defect for [WCAG 1.4.5 Images of Text](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html) if HTML/CSS text could be used instead.
   ```html
   <img src="apple-iphone-15-pro.png" alt="Titanium Apple iPhone 15 Pro" />
   ```
7. **Complex Images**
   - Ensure the image has an `alt` attribute that conveys general purpose.
   - If more detail is needed, provide supporting text nearby or downloadable files (e.g., Excel, HTML table).

8. **What to test for**
   <div class="how-to-test-checklist-item">
   <h3>✓ Ensure meaningful images have alt text</h3>
   <p><strong>Note:</strong> The passing example has alt text that matches the image content. The failing example uses a meaningless filename as alt text.</p>
   <table>
       <thead>
           <tr>
               <th scope="col">Pass</th>
               <th scope="col">Fail</th>
           </tr>
       </thead>
       <tbody>
           <tr>
               <td>
                   <img src="media/images/how-to-test/how-to-test-example-iphone.png" alt="Titanium Apple iPhone 15 Pro"/>
               </td>
               <td>
                   <img src="media/images/how-to-test/how-to-test-example-iphone.png" alt="234@@4-JWKK##KK4442221-11-phone-apple-prod.png"/>
               </td>
           </tr>
       </tbody>
   </table>
   </div>
## Related WCAG
- 1.1.1 Non-text Content
- 1.4.5 Images of Text
- 2.4.4 Link Purpose
- 2.5.3 Label in Name
- 4.1.2 Name, Role, Value

## Resources
- [W3C Images Tutorial](https://www.w3.org/WAI/tutorials/images/)
- [WebAIM Alternative Text](https://webaim.org/techniques/alttext/)

