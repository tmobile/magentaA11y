---
layout: how-to-test
title: Forms
permalink: /how-to-test/form/
---

There are several types of HTML form fields and ensuring each type is accessible is crucial to enabling all users to fully engage with a site.

## <step-number>1</step-number> Input Fields
{: .divider }
Input fields allow users to provide information such as text, numbers and passwords. Keyboard and screen reader users should be able focus on each input field with their tab key, enter the relevant information, and tab away. 
<example>
{% include /examples/input-text.html %}
</example>

## <step-number>2</step-number> Checkboxes
{: .divider }
Checkboxes allow users to select one or more options from a list. Keyboard and screen reader users should be able to focus on each checkbox field with their tab key and use the enter or space keys to select or unselect the item. 
<example>
{% include /examples/input-checkbox.html %}
</example>

## <step-number>3</step-number> Radio Buttons
{: .divider }
Radio buttons allow users to select a single option from a list. Only one radio button in a group should be be selectable at a time. Keyboard and screen reader users should be able to focus on the group of radio buttons using the tab key. Arrow keys move focus between each radio option. Options can be automatically selected as they receive focus with the arrow keys, or they can be selected using the space key. Pressing tab navigates aways from the radio group. 
<example>
<fieldset>
  <legend>
    Choose a fruit
  </legend>
  <input type="radio" name="fruit" id="appleRadio">
  <label for="appleRadio">Apple</label>

  <input type="radio" name="fruit" id="bananaRadio">
  <label for="bananaRadio">Banana</label>

  <input type="radio" name="fruit" id="cherryRadio" checked>
  <label for="cherryRadio">Cherry</label>
</fieldset>
</example>

## <step-number>4</step-number> Select Fields
{: .divider }
Select fields allow users to select one or more options from an expandable list of options. Keyboard and screen reader users should be able to focus on the select using their tab key. The space key expands the list of options, the arrow keys traverse the options, and the space or enter keys make a selection. Escape collapses the list. 
<example>
{% include /examples/input-select.html %}
</example>

## <step-number>5</step-number> What to test for
{: .divider }

## ✓ Ensure forms have persistent visible labels
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
    <div style="display:inline-flex; align-items:center">
      <label style="margin-right:8px" for="persistentLabel">Persistent label</label>
      <input type="text" id="persistentLabel"/>
      </div>
    </td>
    <td>
    <div style="display:inline-flex; align-items:center">
      <input type="text" placeholder="Impersistent label"/>
      </div>
    </td>
  </tr>  
  </tbody>
</table>

## ✓ Ensure forms can receive tab focus and have focus indicators
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
     <div style="display:inline-flex; align-items:center">
        <input type="checkbox" id="accessibleCheckbox">
        <label for="accessibleCheckbox">Accessible Checkbox</label>
        </div>
    </td>
    <td>
    <div style="display:inline-flex; align-items:center">
        <input style="display:none" type="checkbox" id="inaccessibleCheckbox">
        <label for="inaccessibleCheckbox">Inaccessible Checkbox</label>
        </div>
    </td>
  </tr>  
  </tbody>
</table>

## ✓ Ensure forms meet color contrast requirements
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
  <div style="display:inline-flex; align-items:center">
      <label style="margin-right:8px" for="passContrast">My border passes contrast</label>
      <input type="text" id="passContrast"/>
      </div>
    </td>
    <td>
 <div style="display:inline-flex; align-items:center">
      <label style="margin-right:8px" for="failContrast">My border fails contrast</label>
      <input style="border:1px solid #00BD1F" type="text" id="failContrast"/>
      </div>
    </td>
  </tr>  
  </tbody>
</table>

## ✓ Ensure interating with a form doesn't automatically or unexpectedly change context on the page without informing users
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
    <div class="testSelects">
  <label for="selectPass">
    Select a number
  </label>
  <div class="select-button-group">
  <select id="selectPass">
    <option value="None" selected disabled>Select a number</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
<button aria-disabled="true" class="testSubmitButton" id="submitSelectPassSelection" type="submit">Submit</button>
  <div role="alert" id="messagePass" style="display: none;">This was an expected submission!</div>
  </div>
</div>
    </td>
    <td>
    <div class="testSelects">
  <label for="selectFail">
    Select a number
  </label>
  <select id="selectFail">
    <option value="None" selected disabled>Select a number</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
  <div id="messageFail" style="display: none;">This was an unexpected submission!</div>
  </div>
    </td>
  </tr>  
  </tbody>
</table>

## ✓ Ensure required and/or optional forms are clearly indicated and announced as such 
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
    <p style="text-align:left">* = required field</p>
    <div style="display:inline-flex; align-items:center">
      <label style="margin-right:8px" for="userLastnamePass">* Last name</label>
      <input aria-required="true" type="text" id="userLastnamePass"/>
      </div>
    </td>
    <td>
    <br>
    <div style="display:inline-flex; align-items:center">
      <label style="margin-right:8px; color: red;" for="userLastnameFail">Last name</label>
      <input type="text" id="userLastnameFail"/>
      </div>
    </td>
  </tr>  
  </tbody>
</table>

## ✓ Ensure related form fields are announced as grouped together
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
<fieldset>
  <legend>
    Choose a properly grouped day
  </legend>
  <div style="text-align:left">
  <input type="radio" name="dayPass" id="fridayRadioPass">
  <label for="fridayRadioPass">Friday</label>

  <input type="radio" name="dayPass" id="saturdayRadioPass">
  <label for="saturdayRadioPass">Saturday</label>

  <input type="radio" name="dayPass" id="sundayRadioPass" checked>
  <label for="sundayRadioPass">Sunday</label>
  </div>
</fieldset>
    </td>
    <td>
   <fieldset>
   <h3 style="1px dotted #ccc"> Choose an incorrectly grouped day</h3>
   <div style="text-align:left">
    <input type="radio" name="dayFail" id="fridayRadioFail">
  <label for="fridayRadioFail">Friday</label>

  <input type="radio" name="dayFail" id="saturdayRadioFail">
  <label for="saturdayRadioFail">Saturday</label>

  <input type="radio" name="dayFail" id="sundayRadioFail" checked>
  <label for="sundayRadioFail">Sunday</label>
  </div>
  </fieldset>
    </td>
  </tr>  
  </tbody>
</table>

## ✓ Ensure any associated instructions or helper text is announced when tabbing to a form
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
    <div style="text-align:left">
        <input type="checkbox"
           id="deltaCheckboxCard"
           aria-describedby="descDelta" >
    <label for="deltaCheckboxCard">
      Delta
    </label>
    <div class="extended-description"
         id="descDelta">
      Delta is the fourth letter of the NATO alphabet.
    </div>
    </div>
    </td>
    <td>
    <div style="text-align:left">
    <input type="checkbox"
           id="echoCheckboxCard">    
    <label for="echoCheckboxCard">Echo</label>
    <div class="extended-description"
         id="descriptionEcho">
      Echo is the fifth letter of the NATO alphabet.
    </div>
    </div>
    </td>
  </tr>  
  </tbody>
</table>

## ✓ Ensure there is proper error handling for required fields
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
    <div style="text-align:left">
      <label for="goodErrorInput">Submit for a good error</label>
      <input aria-describedby="goodErrorInputError" type="text" id="goodErrorInput"/>
      <div id="goodErrorInputError" style="display: none; color: #E02D00;">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
    <path fill="#E02D00" d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0l-6.7 11.667c-.451.778.091 1.767.98 1.767h13.4c.889 0 1.43-.99.98-1.768L8.982 1.566z"/>
    <path fill="white" d="M9.002 6.99a1 1 0 0 0-2 0v2.012a1 1 0 0 0 2 0V6.99z"/>
    <path fill="white" d="M8.982 11.977a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg> I announce with the input</div>
      </div>
      <button style="margin-top: 5px;" id="goodErrorInputSubmit" class="testSubmitButton" type="submit">Submit</button>
    </td>
    <td>
    <div style="text-align:left">
      <label for="badErrorInput">Submit for a bad error</label>
      <input type="text" id="badErrorInput"/>
      <div id="badErrorInputError" style="display: none; color: #E02D00;"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
    <path fill="#E02D00" d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0l-6.7 11.667c-.451.778.091 1.767.98 1.767h13.4c.889 0 1.43-.99.98-1.768L8.982 1.566z"/>
    <path fill="white" d="M9.002 6.99a1 1 0 0 0-2 0v2.012a1 1 0 0 0 2 0V6.99z"/>
    <path fill="white" d="M8.982 11.977a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg> I do not announce with the input</div>
      </div>
      <button style="margin-top: 5px;" id="badErrorInputSubmit" class="testSubmitButton" type="submit">Submit</button>
    </td>
  </tr>  
  </tbody>
</table>

## Related WCAG
- 1.3.1 Info and Relationships
- 3.2.2 On Input
- 3.3.1 Error Identification
- 3.3.2 Labels or Instructions
- 3.3.3 Error Suggestion
- 3.3.4 Error Prevention
- 4.1.2 Name, Role, Value

## Resources
- [WebAIM: Creating Accessible Forms](https://webaim.org/techniques/forms/)
- [WebAIM: Accessible Form Validation and Error Recovery](https://webaim.org/techniques/formvalidation/)