---
layout: how-to-test
title: Not sure if it is an issue?
permalink: /how-to-test/not-sure-if-it-is-an-issue/
---

When conducting accessibility testing, testers may come across barriers that could be accessibility-related issues, or they could be unrelated. If you're unsure whether the problem you've identified is a genuine accessibility issue, the following steps can help you verify it.

## <step-number>1</step-number> Test against Magentaa11y.com
{: .divider }
A good first step is to test against MagentaA11y.com patterns.  Each pattern includes a How to Test section and detailed notes about code and expected functionality. 

<details>
  <summary>
    Example: Toggle Switch
  </summary>
  <h3>Scenario</h3>
  On the web page you are testing you encounter a toggle switch that does not work with the left and right arrow keys like you believe it should.

  <h3>What to do</h3>
  To verify if arrow key support is expected for toggles on the web, you can first check MagentaA11y. Locate the <a href="/checklist-web/toggle-switch/">Toggle Switch</a> component page and review the How to test section. Arrow key support is not mentioned so this is not a requirement for toggle switches and so this is not an accessibility issue.  
</details>

## <step-number>2</step-number> Design System 
{: .divider }
If you are testing an experience that is created from a formal design system, you can reference that design system’s documentation. Design systems will provide functional components and detailed information on how components should be implemented and function. 

<details>
  <summary>
    Example: Interactive Table
  </summary>
  <h3>Scenario</h3>
  You are testing a page that consists of an interactive table. When you send keyboard focus to the table, focus skips the table headers and jumps to the 2nd row. You are not sure if this is a focus order issue.

  <h3>What to do</h3>
  You know this project uses the brand-new design system, so you check the documentation for the interactive table. You learn that the table is implemented as an ARIA Grid and learn that this is the expected behavior, so this is not an accessibility issue.  
</details>


## <step-number>3</step-number> Automated testing 
{: .divider }
Often, accessibility barriers are related to code issues. Automated testing can quickly detect code-related issues that may create barriers for assistive technology users. 

<details>
  <summary>
    Example: Nested Buttons
  </summary>
  <h3>Scenario</h3>
  You are testing a button that when activated, presents a list of options. For some reason, the screen reader will not interact with the button correctly. 

  <h3>What to do</h3>
  You have ran some automated accessibility tests and in the results there is an issue identified that indicates the author has nested a button element inside of another button element and that is no only invalid HTML, it is creating the barrier with the screen reader so this is an issue. 
</details>

## <step-number>4</step-number> Code Inspection 
{: .divider }
Automated testing does not catch everything. You can have code that is “correct” or valid and it can still create accessibility issues. Manual inpsection of code can often identify what the issue is.

<details>
  <summary>
    Example: Nested Dialogs
  </summary>
  <h3>Scenario</h3>
  On the web page you are testing you encounter a dialog that its contents are not announced by the NVDA screen reader for some reason.

  <h3>What to do</h3>
  After opening Chrome DevTools and inspection of the code you notice up higher in the DOM that there is actually a dialog element nested inside of another dialog element. While this may be valid HTML, it has created a barrier for NVDA users because it is not a standard implementation of a dialog. 
</details>

## <step-number>5</step-number> HTML Validation
{: .divider }
Code validity and proper use of HTML is an important factor with accessibility.   You can use the Nu Html Checker to validate code. You can also reference the HTML Living Standard for guidelines on proper HTML use.  

<details>
  <summary>
    Example: Label not announced
  </summary>
  <h3>Scenario</h3>
  An ARIA Combobox has a nearby text label, but this label is not announced by the screen reader when the widget receives focus. 

  <h3>What to do</h3>
  Using the Nu Html Checker, validate an isolated fragment of code to see if there are any code validity issues. Improper use of HTML or even spelling errors can cause accessibility barriers. For example, `aria-labeledby` is misspelled and should be `aria-labelledby`. Code validation would detect this code issue. 
</details>

## <step-number>6</step-number> ARIA Authoring Practices Guidance  
{: .divider }
For ARIA widgets, refer to the APG to check code and expected keyboard functionality  
 
## <step-number>7</step-number> Verify you are correctly using the screen reader or keyboard
{: .divider } 
Some components may provide keyboard functionality ….  

## <step-number>8</step-number> Capture Steps to Recreate 
{: .divider }
Clearly capture the exact steps to recreate the issue to note in the issue logged.... 