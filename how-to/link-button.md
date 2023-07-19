---
layout: how-to-test
title: Links & Buttons
permalink: /how-to-test/link-button/
---

<span tabindex="-1" id="top-text">Testing links and buttons is essential to ensuring a site is accessible and functional for all users.</span>

## <step-number>1</step-number> How to test
{: .divider }
### Test with your keyboard first
Navigate through the page using only the `tab` and `shift + tab` keys on your keyboard to reach all links and buttons.

### Test with screen readers second
Use a screen reader, such as [NVDA](https://www.nvaccess.org/) (for Windows) or [VoiceOver](https://www.apple.com/accessibility/mac/vision/) (for macOS) and browse the page using your arrow keys to reach all links and buttons.

## <step-number>2</step-number> What to test for
{: .divider }
## ✓ Ensure each link and button receives focus and has a visible focus indicator
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
      <button>I get focus!</button>
    </td>
    <td>
      <button tabindex="-1">I do NOT get focus</button>
    </td>
  </tr>  
    <tr>
    <td>
      <a href="#">I get focus!</a>
    </td>
    <td>
      <a>I do NOT get focus</a>
    </td>
  </tr> 
  </tbody>
</table>
## ✓ Ensure buttons and links can be activated with the `enter` key and that buttons can also be activated with the `space` key
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
      <button onclick="alert('I work!')">Try me!</button>
    </td>
    <td>
      <div class="button" type="button" tabindex="0">Try me!</div>
    </td>
  </tr>  
      <tr>
    <td>
      <a href="https://www.magentaa11y.com/">Magentaa11y home</a>
    </td>
    <td>
      <a tabindex="0">Magentaa11y home</a>
    </td>
  </tr> 
  </tbody>
</table>
## ✓ Ensure disabled controls are focusable but not actionable, and have an `aria-disabled="true"` attribute
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
      <button aria-disabled="true">I am disabled and focusable</button>
    </td>
    <td>
      <button disabled>I am disabled and NOT focusable</button>
    </td>
  </tr>  
  </tbody>
</table>
## ✓ Ensure all links and buttons have clear labels and that all graphical controls have accurate `aria-label` attributes 
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
<button class="play-button" aria-label="play">
<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
  <circle cx="25" cy="25" r="23" fill="none" stroke="#000"/>
  <polygon points="20,15 35,25 20,35" fill="#000"/>
</svg>
</button>
    </td>
    <td>
<button class="play-button">
<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
  <circle cx="25" cy="25" r="23" fill="none" stroke="#000"/>
  <polygon points="20,15 35,25 20,35" fill="#000"/>
</svg>
</button>
    </td>
  </tr> 
  <tr>
    <td>
       <a href="https://www.magentaa11y.com/checklist-web/link/">
  Learn more about links
</a>
    </td>
    <td>
      <a href="https://www.magentaa11y.com/checklist-web/link/">
  Learn more
</a>
    </td>
  </tr>  
  </tbody>
</table>
## ✓ Ensure screen readers accurately announce any button or link state that is conveyed visually 
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
<div class="expander-group">
  <button class="expander-toggle-pass" aria-expanded="false">
    I announce my state
  </button>
  <div class="expander-content">
    Did you hear "expanded" or "collapsed"?
  </div>
</div>
    </td>
    <td>
<div class="expander-group">
  <button class="expander-toggle-fail">
    I do NOT announce my state
  </button>
  <div class="expander-content">
    This button is not conveying it's state at all.
  </div>
</div>
    </td>
  </tr> 
    <tr>
    <td>
<nav class="breadcrumbs" aria-label="Breadcrumb pass example">
  <ol>
    <li>
      <a href="/">
        Home
      </a>
    </li>
    <li>
      <a href="/how-to-test/">
        How to Test
      </a>
    </li>
    <li>
      <a style="font-weight:bolder; text-shadow: 1px 0;" href="/how-to-test/link-button/" 
         aria-current="page">
        Links & Buttons
      </a>
    </li>
  </ol>
</nav>
    </td>
    <td>
<nav class="breadcrumbs" aria-label="Breadcrumb fail example">
  <ol>
    <li>
      <a href="/">
        Home
      </a>
    </li>
    <li>
      <a href="/how-to-test/">
        How to Test
      </a>
    </li>
    <li>
      <a style="font-weight:bolder; text-shadow: 1px 0" href="/how-to-test/link-button/">
        Links & Buttons
      </a>
    </li>
  </ol>
</nav>
    </td>
  </tr> 
  </tbody>
</table>

## ✓ Ensure jump links or same-page links move focus correctly for screen reader and keyboard users
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
    <a id="return-to-top-link" href="#top-text">Return to top</a>
    </td>
    <td>
    <a href="#" onclick="window.scrollTo({ top: 0, behavior: 'smooth' }); return false;">Return to top</a>
    </td>
  </tr> 
  </tbody>
</table>

## ✓ Ensure controls are programmed and announced correctly as links OR buttons based on their function and purpose regardless of visual design
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
    <button onclick = "location.href='https://www.magentaa11y.com/'" role="link">Home</button>
    </td>
    <td>
    <button onclick = "location.href='https://www.magentaa11y.com/'">Home</button>
    </td>
  </tr> 
  <tr>
    <td>
    <a href="#" role="button" id="modalFromLinkPass">Open a modal</a>
  <div class="modal" id="passModal" role="dialog" aria-modal="true" aria-labelledby="passModalTitle" tabindex="-1">
    <div class="modal-content">
      <button class="close-modal" id="closePassModal">Close</button>
      <h2 id="passModalTitle">I am a modal</h2>
      <p id="passModalDescription">And I was correctly triggered by a button even though it looked like a link!</p>
    </div>
  </div>
    </td>
    <td>
    <a href="#" id="modalFromLinkFail">Open a modal</a>
      <div class="modal" id="failModal" role="dialog" aria-modal="true" aria-labelledby="failModalTitle" tabindex="-1">
    <div class="modal-content">
      <button class="close-modal" id="closeFailModal">Close</button>
      <h2 id="failModalTitle">I am a modal</h2>
      <p id="failModalDescription">But I was triggered by a link which is unexpected!</p>
    </div>
  </div>
    </td>
  </tr> 
  </tbody>
</table>


## <step-number>3</step-number> What's the difference between a link and a button?
{: .divider }
### If it goes somewhere, it's `<a>` link.

- When the user clicks a link, they are taken to a different location in the site.
  - Either another page or even another area of the same page
- A link can look like a big shiny button but it must be coded as `<a>` link

### If it does something, it's a `<button>`

- Buttons cause an action to occur on the same page
  - Submit a form (even when submission takes you to a new page)
  - Open a menu
  - Launch a modal
  - Expand details
- A button can look like a link, but it must be coded as a `<button>`

## Related WCAG
- 2.4.4 Link Purpose (In Context)
- 2.5.3 Label in Name
- 3.2.4 Consistent Identification
- 4.1.2 Name, Role, Value

## Resources
- [WebAIM: Links and Hypertext](https://webaim.org/techniques/hypertext/)
- [WebAIM: Buttons](https://webaim.org/techniques/buttons/)

