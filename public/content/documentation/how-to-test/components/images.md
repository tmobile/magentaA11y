## Developer Notes

1. **Types of images**

    There are many types of images. The type of image can be determined by the context of the page being tested. These different types of images have different testing steps.

    -  **Informative Images:** These are visuals like pictures, photos, and illustrations that convey important information or concepts. To make them accessible, we need to include a brief description in text form that captures the key content of the image.

    -  **Decorative Images:** Sometimes, images are used purely for aesthetic purposes and don't convey meaningful information. In such cases, it's best to provide an empty text alternative `alt=""` to indicate that the image serves a decorative role and doesn't require a description.

    -  **Functional Images:** Images that serve as links or buttons should have text alternatives that describe their function rather than just their appearance. For example, if you have an image of a printer icon that initiates a printing action, the alt text should convey this functionality, like "Print."

    -  **Images of Text:** Images of text should be avoided whenever possible. In fact, some images of text can violate [WCAG 1.4.5 Images of Text](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html). However, if you must use images with text, ensure that the alt text contains the exact same words as the text within the image to maintain consistency.

    -  **Complex Images such as Graphs and Diagrams:** When using images to present complex data or detailed information, it's crucial to provide a comprehensive text description that conveys all the data and details found in the image. This allows individuals who cannot see the image to still access and understand its content.


2. **How to test**

    ### Automated Testing

    Automated scanning tools, such as [WAVE](https://wave.webaim.org/), [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/), or [Deque's Axe DevTools](https://www.deque.com/blog/axe-devtools-extension-update-new-color-contrast-analyzer/) are a great starting point for image testing. All of these tools can run page scans that quickly generate reports identifying some image issues. Scans are:

    - <strong>Good</strong> at identifying simple issues like missing <code>alt</code> attributes on images or empty alt attributes on functional images.
    - <strong>Bad</strong> at identifying issues related to alternative text quality or whether or not an image should be marked as decorative and hidden from screen readers.

    ### Manual testing

    Automated scanning must be complemented with a manual review of the page. Manual image testing can test for alt text quality, ensuring that decorative images are hidden from assistive technology, all text found in images of text are present in alt text, and that functional images have the appropriate alt text.

    #### <strong>Getting started</strong>
    - Open Chrome DevTools in your browser window <span class="keyboard-key">F12</span>
    - Right-click and select "Inspect" on the image in the page you want to test.

3. **Informative Images**

    - Check that the image owns an <code>alt</code> attribute.
    - Ensure that the <code>alt</code> attribute is present is not empty.
    - Ensure that the alt attribute is present is not empty, such as <code>alt</code> or <code>alt=""</code>
    - The <code>alt</code> attribute value / description of the image should be accurate and succinct. The image alternative should not consist of information that duplicates nearby text content.

    <img
    src="media/images/how-to-test/how-to-images-meaningful-1.png"
    alt="Inspecting an image in DevTools to check alt text, meaningful image"/>
  
    ### IMG

    ```html
    <img alt="A rear view of the iPhone 15 Pro in silver, along with a front view of the iPhone 15 Pro Max in silver." src="../iphone.png" ... >
    ```

    ### SVG

    Some images are implemented using inline <code>SVG</code>. Text alernatives for these images can be defined by use of <code>role="img"</code> and <code>aria-label="I am the alt text"</code>. The <code>alt</code> attribute should not be on an element whose <code>role</code> is <code>role="img"</code> this is instead handled by <code>aria-label</code>. 

    ```html
    <svg role="img" aria-label="I am the alt text">...</svg>
    ```

4. **Decorative Images**

    - Ensure that the <code>alt</code> attribute is present and owns an empty or null value. <code>alt=""</code>.
    - <strong>Note:</strong> <code>aria-hidden="true"</code> is not needed if an image has an empty or null alt attribute value <code>alt=""</code>.

    <img src="media/images/how-to-test/how-to-images-decorative-1.png" alt="Inspecting an image in DevTools to check alt text, decorative image">
   
    ```html
    <img alt="" src="../some-image.png" ...>
    ```

4. **Functional Images**

    - Ensure the <code>alt</code> attribute is present and owns a value that includes <strong>all</strong> of the text found in the image.
    - Functional images are typically links or buttons so the alt text should define the purpose of the link instead of describing the image.

    <img src="media/images/how-to-test/how-to-images-functional.png" alt="Inspecting an image in DevTools to check alt text, functional image">

    - **Note:** Functional images can have empty or null alt attribute values <code>alt=""</code> if the text alternative is conveyed in the parent control's label. For example, <code>aria-label="Download on the Apple App Store"</code>.

    ```html
    <button aria-label="Download on the Apple App Store">
        <img src="apple.png" alt="">
    </button>
    ```

5. **Images of Text**

    - Sometimes text can't be easily created with HTML and CSS and an image must contain text. In this case, ensure the <code>alt</code> attribute is present and owns a value that includes <strong>all</strong> of the text found in the image. 
    - Typically, the text is the most important part of the image. There is no need for the image itself to be described unless it adds value to the content of the page. 
    - Consider logging a defect for [WCAG 1.4.5 Images of Text](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html) if it seems like there might be a viable workaround to add real text to the page vs. an image of text.

    <img src="media/images/how-to-test/how-to-test-images-text.png" alt="Inspecting an image in DevTools to check alt text, image of text example">

    ```html
    <img src="apple-iphone-15-pro.png" alt="Titanium Apple iPhone 15 Pro">
    ```
6. **Complex Images**

    - Data visualizations, charts, and graphs can be very difficult to author alternative text for. Some features like charts and graphs may not be accessible themselves but there can be text alternatives nearby that can act as an accessible alternative.
    - For complex images that are <code>img</code> elements, ensure that the image has an <code>alt</code> attribute and that its value communicates the general purpose of the image. This alt text does not need to contain all of the visual information as that may be too long for an appropriate alt text value. If the alt text does not describe all content in the image ensure there is content nearby, or linked to, that does contain all of the visual information in text form. 
    - For charts and graphs, these features are typically not 100% accessible. Ensure there is content nearby, or linked to, that does contain all of the visual information in text form. For example, an accessible Excel download or HTML Table presenting the key visual information from the content found in the chart. 
    - <strong>Note:</strong> It is important that all text alternatives to complex images must be in an accessible format to qualify as an accessible alternative.

    <img src="media/images/how-to-test/how-to-test-images-complex-data.png" alt="Complex chart with nearby HTML table for text alternative">

    ```html
    <img src="/assets/images/examples/how-to-test-images-complex-data.png" alt="Complex chart with nearby HTML table for text alternative">

    <table>
        <caption>NASDAQ: TMUS</caption>
        <tr>
        <th>Date</th>
        <th>Price</th>
        <!-- ... -->
        </tr>
        <tr>
        <td>January 10</td>
        <td>122.20</td>
        <!-- ... -->
        </tr>
    </table>
    ```

7. **What to test for**

    <div class="how-to-test-checklist-item">
    <h3>✓ Ensure meaningful images have alt text</h3>
    <p><strong>Note:</strong> The passing example has alt text that matches the text found in the image. The failing example uses the filename for the <code>alt</code> attribute value. Screen readers will announce the filename <code>234@@4-JWKK##KK4442221-11-phone-apple-prod.png</code> which will create a confusing experience.</p>
    <table >
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
                    <img src="media/images/how-to-test/how-to-test-example-iphone.png" alt="Titanium Apple iPhone 15 Pro"/>
                </td>   
                <td>
                    <img src="media/images/how-to-test/how-to-test-example-iphone.png" alt="234@@4-JWKK##KK4442221-11-phone-apple-prod.png"/>
                </td>
            </tr>  
        </tbody>
    </table>
    </div>

    <div class="how-to-test-checklist-item">
    <h3>✓ Ensure decorative images are hidden from assistive technology</h3>
    <p><strong>Note:</strong> Passing example image has an empty <code>alt</code> attribute value. The failing example has a very long redundant description of the image. Not only is it too verbose, it has the same text as the nearby text content.</p>
    <table >
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
                    <div style="text-align: center;">
                        <a href="#">
                            <img src="media/images/how-to-test/how-to-test-images-decorative-example.jpg" alt="" style="max-width: 200px; margin: 0 auto;" />
                            <span style="display: block;">Home Internet</span>
                        </a>
                    </div>
                </td>   
                <td>
                    <div style="text-align: center;">
                        <a href="#">
                            <img src="media/images/how-to-test/how-to-test-images-decorative-example.jpg" alt="Home internet. Picture of a magenta colored gateway device inside of an open box, icon" style="max-width: 200px; margin: 0 auto;" />
                            <span style="display: block;">Home Internet</span>
                        </a>
                    </div>
                </td>
            </tr>  
        </tbody>
    </table>
    </div>

    <div class="how-to-test-checklist-item">
    <h3>✓ Ensure complex images have a text alternative</h3>
    <p><strong>Note:</strong> The passing chart has a general text alternative describing what the image is but also references nearby text data for reference. <code>alt="Fruit chart, data below"</code>. The failing example owns an empty alt attribute value which hides the image from screen reader users and does not provide an alternative.</p>
    <table >
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
                    <img src="media/images/how-to-test/accessible-pie-chart-example.png" 
                    alt="Fruit chart, data below"/>
                    <ul>
                        <li>Watermelons 20%</li>
                        <li>Grapes 10%</li>
                        <li>Oranges 24%</li>
                        <li>Apples 30%</li>
                        <li>Bananas 16%</li>
                    </ul>
                    </td>   
                    <td>
                    <img src="media/images/how-to-test/accessible-pie-chart-example.png" 
                    alt=""/>
                </td>
            </tr>  
        </tbody>
    </table>
    </div>

    ### Related WCAG
    - 1.1.1 Non-text Content
    - 1.4.5 Images of Text
    - 2.4.4 Link Purpose
    - 2.5.3 Label in Name
    - 4.1.2 Name, Role, Value

    ### Resources
    - [W3C Images Tutorial](https://www.w3.org/WAI/tutorials/images/)
    - [WebAIM Alternative Text](https://webaim.org/techniques/alttext/)


## General Notes

Learn how to test and provide appropriate alternative text for different image types—including informative, decorative, and complex images.