---
layout: how-to-test
title: Color & contrast
permalink: /how-to-test/color-contrast/
---

Testing color contrast is a simple yet crucial step in ensuring content is perceivable for users with low vision and color blindness. 

## <step-number>1</step-number> General requirements
{: .divider }
The Web Content Accessibility Guidelines (WCAG) provide very specific color contrast requirements:
- Normal text (up to 18pt/24px or 14pt/18.5px if bold) must have a contrast ratio of at least 4.5:1 between the text color and background color.
- Large text (at least 18pt/24px or 14pt/18.5px if bold) must have a contrast ratio of at least 3:1 between the text color and background color.
- Meaningful graphics, user interface components and their various states, as well as focus indicactors must have a contrast ratio of at least 3:1 with the background color. 
- <strong>Exceptions:</strong> Logos, incidental or decorative text and graphics, and disabled controls do not need to meet color contrast requirements. 

## <step-number>2</step-number> How to test
{: .divider }
### Automated scanning

Automated scanning tools, such as [WAVE](https://wave.webaim.org/), [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/), or [Deque's Axe DevTools](https://www.deque.com/blog/axe-devtools-extension-update-new-color-contrast-analyzer/) are a great starting point for color contrast testing. All of these tools can run page scans that quickly generate reports identifying color contrast issues. Scans are:

- <strong>Good</strong> at identifying simple issues like solid colored text on solid colored backgrounds that do not meet contrast ratios. 
- <strong>Bad</strong> at idenitfying anything more complex like text on background images, gradients, and different states for user interface components (like hover or focus) that do not meet contrast ratios.

### Manual testing

Automated scanning must be complemented with a manual review of the page.  

#### <strong>Getting started</strong>
- Open DevTools in your browser window (<span class="keyboard-key">F12</span>)
- Right-click and select "Inspect" on the different color combinations that you see as you move from the top of the page on down
- Find the hexidecimal color values in the "Styles" tab of your DevTools window (see example image below)
- Enter the hex values into a contrast checking tool (like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [Deque's Color Contrast Analyzer](https://dequeuniversity.com/color-contrast)) to see if they meet contrast requirments.



{::nomarkdown}
<example>
  <img
    src="/assets/images/examples/hex-codes-for-contrast.png"
    alt="Inspecting an element in chrome to find hex codes">
</example>
{:/}

#### <strong>Hover to inspect</strong>
- Chrome has an "Inspect Element by Mouse" DevTools feature that is useful for checking contrast
- Click the button located in the upper left-hand corner of your DevTools window to enable the feature
- Hover over elements on the page with your cursor
- A popup will appear that often indicates whether the element passes contrast by displaying a green check mark within a circle (see example image below)

{::nomarkdown}
<example>
  <img
    src="/assets/images/examples/chrome-contrast-inspector.png"
    alt="using Chrome's inspect element by mouse feature to see if element meets contrast requirmenets">
</example>
{:/}

#### <strong>Background images and gradients</strong>

- Identify instances of text and user insterface elements that sit on top of background images or color gradients
- Use a color picker tool to get representative hex codes from the background
- In Chrome's DevTools, under the "Styles" tab you can click on any of the color boxes to bring up the Color Picker popup 
- Within the popup, activate the eyedropper icon
- Hover over the desired area on the background image with your cursor and click
- The hex value will be displayed in the Color Picker (see example image below)

{::nomarkdown}
<example>
  <img
    src="/assets/images/examples/chrome-color-picker.png"
    alt="using Chrome's color picker and eyedropper tool to get hex codes for background images.">
</example>
{:/}

#### <strong>State changes</strong>
- Identify interactive elements that change color based on their states, such as focus or hover
- Ensure that the state changes meet contrast requirements
- You can force some state changes to persist, which makes them easier to check
- Inspect the desired element 
- In Chrome's DevTools, under the "Styles" tab, activate the ":hov" toggle button
- Select the checkbox with desired state
- This will force a persistent state and allow you to check for contrast on the element (see example image below) 

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
   <tr>
    <td>
      <p style="color:#009999; font-size: 18pt">This text is large enough that it only has to meet a 3:1 color ratio</p>
    </td>
    <td>
      <p style="color:#009999">This text is the same color but smaller, and fails to meet a 4.5:1 color ratio</p>
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
src="/assets/images/examples/accessible-pie-chart-example.png" 
alt="pie chart example with each slice labeled so it is accessible to color blind users"/>
    </td>   
    <td>
  <img
    src="/assets/images/examples/inaccessible-pie-chart-example.png"
    alt="pie chart example that is inaccessible to color blind users because it uses a side legend to label the slices">
    </td>
  </tr>  
  </tbody>
</table>

## Related WCAG
- 1.4.3 Contrast
- 1.4.11 Non-text Contrast
- 1.4.1 Use of Color

## Resources
- [WebAIM Color Contrast](https://webaim.org/articles/contrast/evaluating)