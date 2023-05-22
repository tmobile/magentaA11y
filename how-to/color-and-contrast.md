---
layout: two-column-how-to-test
title: How to test - Color and Contrast
permalink: /how-to-test/color-and-contrast/
---
# Color and Contrast
Testing color contrast is a simple yet crucial step in ensuring content is perceivable for users with low vision and color blindness. 

## <step-number>1</step-number> General Requirements
{: .divider }
The Web Content Accessibility Guidelines (WCAG) provide very specific color contrast requirements:
- Normal text (up to 18pt or 14 pt if bold) must have a contrast ratio of at least 4.5:1 between the text color and background color.
- Large text (at least 18pt or 14 pt if bold) must have a contrast ratio of at least 3:1 between the text color and background color.
- Meaningful graphics, user interface components and their various states, as well as focus indicactors must have a contrast ratio of at least 3:1 with the background color. 
- <strong>Exceptions:</strong> Logos, incidental or decorative text and graphics, and disabled controls do not need to meet color contrast requirements.  

## <step-number>2</step-number> How to test
{: .divider }
### Automated scanning

Automated scanning tools, such as [WAVE](https://wave.webaim.org/) or [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/), are a great starting point for color contrast testing.  

You can use these tools to run scans on your pages and quickly generate reports that identify content that does not meet color contrast requirments. However, it is important to remember that automated tools are limited to calling out simple contrast issues. They are not effective at finding more complex issues involving text on background images, gradients, and different states for user interface components (like hover or focus).

### Manual testing

Automated scanning must be complemented with a manual review of the page. You can still use tools such as the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to enter colors in hexadecimal format and check if they meet or fail contrast requirments. 

Open DevTools in your browser window and inspect different color combinations that you see as you move from the top of the page and work your way down. You can find hex color values in the "Styles" tab of your DevTools window (see example image below). Enter those hex values into the WebAIM tool to check if minium thresholds are met. 

{::nomarkdown}
<example>
  <img
    src="/assets/images/examples/hex-codes-for-contrast.png"
    alt="Inspecting an element in chrome to find hex codes">
</example>
{:/}

In Chrome, you can also enable the "Inspect Element by Mouse" feature in DevTools by clicking on the button located in the upper left-hand corner. Once activated, hover over the elements on the page with your cursor. A popup will appear that often indicates whether the element passes contrast by displaying a green check mark within a circle (see example image below).

{::nomarkdown}
<example>
  <img
    src="/assets/images/examples/chrome-contrast-inspector.png"
    alt="using Chrome's inspect element by mouse feature to see if element meets contrast requirmenets">
</example>
{:/}

When you come across text that sits on top of a background image, you can use a color picker tool to get representative hex codes from the image. In Chrome's DevTools, under the "Styles" tab you can click on any of the color boxes to bring up the Color Picker popup. Within the popup there is an eyedropper icon that you can activate which allows you to capture colors on the page by hovering them with your curser. Click on the desired area of the background image to capture the color. The hex value will be displayed in the Color Picker (see example image below).

{::nomarkdown}
<example>
  <img
    src="/assets/images/examples/chrome-color-picker.png"
    alt="using Chrome's color picker and eyedropper tool to get hex codes for background images.">
</example>
{:/}

Some interactive elements change color based on their states, like focus or hover. These state changes also need to meet contrast requirements. You can force states on some elements through Chrome's DevTools. Inspect the desired element and activate the ":hov" (Toggle Element State) button from the "Styles" tab in DevTools. Then select the checkbox with the desired state. This will force a persistent state on the element and allow you to capture the color associated with it (see example image below). 

{::nomarkdown}
<example>
  <img
    src="/assets/images/examples/set-hover-state.png"
    alt="using Chrome's DevTools to force hover state on a link.">
</example>
{:/}

### Browsers

- Any major browser (Chrome, Safari, Firefox) is acceptable for color contrast testing.

## <step-number>3</step-number> What to test for
{: .divider }

## ✓ Ensure text has sufficient contrast to the background color
<table class="comparison">
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
      <p>This text passes contrast</p>
    </td>
    <td>
      <p style="color:#0FE000">This text does NOT pass contrast</p>
    </td>
  </tr>  
  </tbody>
</table>

## ✓ Ensure text over images and color gradients has sufficient contrast
<table class="comparison" style="background: /assets/images/background/assistive-technology-bg.png">
  <thead>
    <th scope="col">
      Pass
    </th>
    <th scope="col">
      Fail
    </th>
  </thead>
  <tbody>
  <tr style="background-image: linear-gradient(
  90deg,
  hsl(329deg 100% 44%) 0%,
  hsl(329deg 100% 44%) 7%,
  hsl(329deg 100% 44%) 13%,
  hsl(329deg 100% 44%) 20%,
  hsl(329deg 100% 44%) 27%,
  hsl(329deg 100% 44%) 33%,
  hsl(329deg 100% 44%) 40%,
  hsl(329deg 100% 44%) 47%,
  hsl(333deg 78% 52%) 53%,
  hsl(335deg 79% 60%) 60%,
  hsl(335deg 81% 66%) 67%,
  hsl(334deg 82% 71%) 73%,
  hsl(333deg 84% 76%) 80%,
  hsl(332deg 86% 80%) 87%,
  hsl(331deg 88% 85%) 93%,
  hsl(329deg 93% 89%) 100%
); color: #FFFFFF">
    <td>
      <p>This text passes contrast</p>
    </td>
    <td>
      <p>This text does NOT pass contrast</p>
    </td>
  </tr>  
  </tbody>
</table>

## ✓ Ensure that the different states of user interface components have sufficient contrast
<table class="comparison">
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
      <button>This button passes on hover</button>
    </td>
    <td>
      <button class="bad-contrast-button">This button does NOT pass on hover</button>
    </td>
  </tr>  
  </tbody>
</table>

## ✓ Ensure meaningful graphical objects have sufficient contrast to their background
<table class="comparison">
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
      <span style="font-size:54px;">↻</span>
    </td>
    <td>
      <span style="color:#0FE000; font-size:54px;">↻</span>
    </td>
  </tr>  
  </tbody>
</table>

## ✓ Ensure color alone is not used to convey information
<table class="comparison">
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
src="/assets/images/examples/color-swatch-with-label.png" 
alt="color swatch radio set with text labels"/>
    </td>   
    <td>
  <img
    src="/assets/images/examples/color-swatch-no-label.png"
    alt="color swatch radio set with no text labels">
    </td>
  </tr>  
  </tbody>
</table>

## Related WCAG
- 1.4.3 Contrast (Minimum)
- 1.4.6 Contrast (Enhanced)
- 1.4.11 Non-text Contrast
- 1.4.1 Use of Color

## Resources
- [WebAIM Color Contrast](https://webaim.org/articles/contrast/evaluating)