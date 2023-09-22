---
layout: how-to-test
title: Images
permalink: /how-to-test/images/
---

## <step-number>1</step-number> Types of images
{: .divider }
There are many types of images. The type of image can be determined by the context of the page being tested. These different types of images have different testing steps.

- **Informative Images:** These are visuals like pictures, photos, and illustrations that convey important information or concepts. To make them accessible, we need to include a brief description in text form that captures the key content of the image.

- **Decorative Images:** Sometimes, images are used purely for aesthetic purposes and don't convey meaningful information. In such cases, it's best to provide an empty text alternative (alt="") to indicate that the image serves a decorative role and doesn't require a description.

- **Functional Images:** Images that serve as links or buttons should have text alternatives that describe their function rather than just their appearance. For example, if you have an image of a printer icon that initiates a printing action, the alt text should convey this functionality, like "Print."

- **Images of Text:** It's generally recommended to avoid putting text within images because it can be challenging for some users. However, if you must use images with text, ensure that the alt text contains the exact same words as the text within the image to maintain consistency.

- **Complex Images such as Graphs and Diagrams:** When using images to present complex data or detailed information, it's crucial to provide a comprehensive text description that conveys all the data and details found in the image. This allows individuals who cannot see the image to still access and understand its content.


## <step-number>2</step-number> How to test
### Automated Testing
{: .divider }

Automated scanning tools, such as [WAVE](https://wave.webaim.org/), [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/), or [Deque's Axe DevTools](https://www.deque.com/blog/axe-devtools-extension-update-new-color-contrast-analyzer/) are a great starting point for image testing. All of these tools can run page scans that quickly generate reports identifying some image issues. Scans are:

- <strong>Good</strong> at identifying simple issues like missing <code>alt</code> attributes on images or empty alt attributes on functional images.
- <strong>Bad</strong> at identifying issues related to alternative text quality or whether or not an image should be marked as decorative and hidden from screen readers.

### Manual testing
{: .divider }
Automated scanning must be complemented with a manual review of the page. Manual image testing can test for alt text quality, ensuring that decorative images are hidden from assistive technology, all text found in images of text are present in alt text, and that functional images have the appropriate alt text.

#### <strong>Getting started</strong>
- Open DevTools in your browser window (<span class="keyboard-key">F12</span>)
- Right-click and select "Inspect" on the image in the page you want to test.

## <step-number>3</step-number> Meaningful Images
{: .divider }
- Check that the image owns an <code>alt</code> attribute.
- Ensure that the <code>alt</code> attribute is present is not empty.
- The <code>alt</code> attribute value / description of the image should be accurate and succinct. It should not consist of information that is not imnportant or duplicates nearby text content.

{::nomarkdown}
<example>
  <img
    src="/assets/images/examples/how-to-images-meaningful-1.png"
    alt="Inspecting an image in DevTools to check alt text, meaningful image">
</example>
{:/}

### IMG
{% highlight html %}
<img alt="A rear view of the iPhone 15 Pro in silver, along with a front view of the iPhone 15 Pro Max in silver." src="../iphone.png" ... >
{% endhighlight %}


### SVG
Some images are implemented using inline <code>SVG</code>. Text alernatives for these images can be defined by use of <code>role="img"</code> and <code>aria-label="I am the alt text"</code>. The <code>alt</code> attribute should not be on an element who's <code>role</code> is <code>role="img"</code> this is instead handled by <code>aria-label</code>. 

{% highlight html %}
<svg role="img" aria-label="I am the alt text">...</svg>
{% endhighlight %}

## <step-number>3</step-number> Decorative Images
{: .divider }
- Ensure that the <code>alt</code> attribute is present and owns an empty or null value. <code>alt=""</code>.
- <strong>Note:</strong> <code>aria-hidden="true"</code> is not needed if an image has an empty or null alt attribute value <code>alt=""</code>.

{::nomarkdown}
<example>
  <img
    src="/assets/images/examples/how-to-images-decorative-1.png"
    alt="Inspecting an image in DevTools to check alt text, decorative image">
</example>
{:/}

{% highlight html %}
<img alt="" src="../some-image.png" ...>
{% endhighlight %}

## <step-number>3</step-number> Functional Images
{: .divider }
- Ensure the <code>alt</code> attribute is present and owns a value that includes <strong>all</strong> of the text found in the image.
- Functional images are typically links or buttons so the alt text should define the purpose of the link instead of describing the image.

{::nomarkdown}
<example>
  <img
    src="/assets/images/examples/how-to-images-functional.png"
    alt="Inspecting an image in DevTools to check alt text, functional image">
</example>
{:/}

- **Note:** Sometimes functional images may have empty or null alt attribute value <code>alt=""</code> and this is ok **if** what text would be the text alternative is moved to the parent control's label. For example, <code>aria-label="Download on the Apple App Store"</code>.

{% highlight html %}
<button aria-label="Download on the Apple App Store">
    <img src="apple.png" alt="">
</button>
{% endhighlight %}


## <step-number>4</step-number> Images of Text
{: .divider }

- Sometimes text can't be easily created with HTML and CSS and an image must contain text. In this case, ensure the <code>alt</code> attribute is present and owns a value that includes <strong>all</strong> of the text found in the image. 
- Typically, the text is the most important part of the image. There is no need for the image itself to be described unless it adds value to the content of the page. 

{::nomarkdown}
<example>
  <img
    src="/assets/images/examples/how-to-test-images-text.png"
    alt="Inspecting an image in DevTools to check alt text, image of text example">
</example>
{:/}

## <step-number>5</step-number> Complex Images
{: .divider }

- Data visualizations, charts, and graphs can be very difficult to author alternative text for. Some features like charts and graphs may not be accessible themselves but there can be text alternatives nearby that can act as an accessible alternative.
- For complex images that are <code>img</code> elements, ensure that the image has an <code>alt</code> attribute and that its value communicates the general purpose of the image. This alt text does not need to contain all of the visual information as that may be too long for an appropriate alt text value. If the alt text does not describe all content in the image ensure there is content nearby, or linked to, that does contain all of the visual information in text form. 
- For charts and graphs, these features are typically not 100% accessible. Ensure there is content nearby, or linked to, that does contain all of the visual information in text form. For example, an accessible Excel download or HTML Table presenting the key visual information from the content found in the chart. 
- <strong>Note:</strong> It is important that all text alternatives to complex images must be in an accessible format to qualify as an accessible alternative.

{::nomarkdown}
<example>
  <img
    src="/assets/images/examples/how-to-test-images-complex-data.png"
    alt="Complex chart with nearby HTML table for text alternative">
</example>
{:/}

## <step-number>6</step-number> What to test for
{: .divider }

<div class="how-to-test-checklist-item">
  <h3>✓ Ensure meaningful images have alt text</h3>
  <p><strong>Note:</strong> The passing example has alt text that matches the text found in the image. The failing example uses the filename for the <code>alt</code> attribute value. Screen readers will announce the filename <code>234@@4-JWKK##KK4442221-11-phone-apple-prod.png</code> which will create a confusing experience.</p>
  <table class="column-2">
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
  <img 
  src="/assets/images/examples/how-to-test-example-iphone.png" 
  alt="Titanium Apple iPhone 15 Pro"/>
      </td>   
      <td>
  <img 
  src="/assets/images/examples/how-to-test-example-iphone.png" 
  alt="234@@4-JWKK##KK4442221-11-phone-apple-prod.png"/>
      </td>
    </tr>  
    </tbody>
  </table>
</div>

<div class="how-to-test-checklist-item">
  <h3>✓ Ensure decorative images are hidden from assistive technology</h3>
  <p><strong>Note:</strong> Passing example image has an empty <code>alt</code> attribute value. The failing example has a very long redundant description of the image. Not only is it too verbose, it has the same text as the nearby text content.</p>
  <table class="column-2">
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
            <img 
    src="/assets/images/how-to-test-images-decorative-example.jpg" 
    alt="" style="max-width: 200px; margin: 0 auto;" />
            <span style="display: block;">Home Internet</span>
          </a>
        </div>
      </td>   
      <td>
      <div style="text-align: center;">
        <a href="#">
          <img 
  src="/assets/images/how-to-test-images-decorative-example.jpg" 
  alt="Home internet. Picture of a magenta colored gateway device inside of an open box, icon" style="max-width: 200px; margin: 0 auto;" />
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
  <p><strong>Note:</strong> The passing chart has a general text alternative describing what the image is but also references nearby text data for reference. <code>alt="Fruit chart, data below"</code>. The failing example owns an mpty alt attribute value which hides the image from screen reader users and does not provide an alternative.</p>
  <table class="column-2">
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
  <img 
  src="/assets/images/examples/accessible-pie-chart-example.png" 
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
    <img 
  src="/assets/images/examples/accessible-pie-chart-example.png" 
  alt=""/>
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