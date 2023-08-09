---
layout: how-to-test
title: Links & Buttons
permalink: /how-to-test/link-button/
---

Testing links and buttons is essential to ensuring a site is accessible and functional for all users.

## <step-number>1</step-number> How to test
{: .divider }
### Test with your keyboard first
Navigate through the page using only the `tab` and `shift + tab` keys on your keyboard to reach all links and buttons.

### Test with screen readers second
Use a screen reader, such as [NVDA](https://www.nvaccess.org/) (for Windows) or [VoiceOver](https://www.apple.com/accessibility/mac/vision/) (for macOS) and browse the page using your arrow keys to reach all links and buttons.

## <step-number>2</step-number> What to test for
{: .divider }
### ✓ Ensure each link and button receives focus and has a visible focus indicator
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

### ✓ Ensure buttons and links can be activated with the `enter` key and that buttons can also be activated with the `space` key

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
      <button onclick="alert('This works with a keyboard and a mouse')">
        Show alert
      </button>
    </td>
    <td>
      <div class="button" type="button" tabindex="0" onmouseup="alert('This only works with a mouse')">
        Show alert
      </div>
    </td>
  </tr>  
      <tr>
    <td>
      <a href="https://www.magentaa11y.com/">Magentaa11y home</a>
    </td>
    <td>
      <a tabindex="0" onmouseup = "location.href='https://www.magentaa11y.com/'">Magentaa11y home</a>
    </td>
  </tr> 
  </tbody>
</table>

### ✓ Ensure disabled controls are focusable but not actionable, and have an `aria-disabled="true"` attribute

<table class="column-2">
  <thead>
    <th scope="col">
      Preferred
    </th>
    <th scope="col">
      Disabled but not focusable
    </th>
  </thead>
  <tbody>
  <tr>
    <td>
      <button aria-disabled="true">Save</button>
    </td>
    <td>
      <button disabled>Save</button>
    </td>
  </tr>  
  </tbody>
</table>

### ✓ Ensure all links and buttons have clear labels and that all graphical controls have accurate `aria-label` attributes 

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
      <button class="icon-button play" aria-label="play">
      </button>
    </td>
    <td>
      <button class="icon-button play">
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

### ✓ Ensure screen readers accurately announce any button or link state that is conveyed visually 

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
<div class="expander-group">
  <button class="expander-toggle" aria-expanded="false">
    More details
  </button>
  <div class="expander-content">
    This button expressed its state as expanded or collapsed
  </div>
</div>
    </td>
    <td>
<div class="expander-group">
  <button class="expander-toggle-fail">
    More details
  </button>
  <div class="expander-content">
    This button is not conveying it's state.
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
        Testing
      </a>
    </li>
    <li>
      <a href="/how-to-test/link-button/" 
         aria-current="page">
        Links
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
        Testing
      </a>
    </li>
    <li>
      <a href="/how-to-test/link-button/">
        Links
      </a>
    </li>
  </ol>
</nav>
    </td>
  </tr> 
  </tbody>
</table>

### ✓ Ensure skip to & same-page links move focus for screen reader and keyboard users

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
    <a id="return-to-top-link" href="#content">Return to top</a>
    </td>
    <td>
    <a href="#" onclick="window.scrollTo({ top: 0, behavior: 'smooth' }); return false;">Return to top</a>
    </td>
  </tr> 
  </tbody>
</table>

### ✓ Ensure controls are announced correctly as links OR buttons based on their function and purpose regardless of visual design

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
      <a href="https://www.magentaa11y.com/" class="button">Home</a>
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
- An interactive link should have a valid href value so it can receive keyboard focus.<br>For example `<a href="/some-page">...</a>`.

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

