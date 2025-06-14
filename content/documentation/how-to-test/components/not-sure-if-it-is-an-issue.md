## General Notes

When conducting accessibility testing, testers may come across barriers that could be accessibility-related issues, or they could be unrelated. If you're unsure whether the problem you've identified is a genuine accessibility issue, the following steps can help you verify it.

## Developer Notes

Accessibility testing is important because it helps to ensure that everyone can use a website or application, regardless of their disability. This includes people who are blind, deaf, have low vision, or have mobility impairments.

To thoroughly test web accessibility, a combination of manual and automated testing methods are performed against the [Web Content Accessibility Guidelines (WCAG) 2.2 Level A and AA](https://www.w3.org/TR/WCAG22/). Manual testing involves people navigating the site, using assistive technologies like screen readers or keyboard-only navigation, and verifying if all content is perceivable, operable, understandable. Automated testing utilizes specialized tools to scan for common accessibility issues, such as missing alternative text for images or improper heading structure.

By combining both approaches, we can identify and address accessibility barriers comprehensively, improving the overall user experience and inclusivity of our digital products.

1. ## Test against MagentaA11y.com

      A good first step is to test against MagentaA11y.com patterns. Each pattern includes a How to Test section, code samples, notes about expected functionality, and clear acceptance criteria.

      <div class="MagentaA11y-accordion">
      <h2 class="MagentaA11y-accordion__heading">
      <button
        class="MagentaA11y-accordion__headline"
        aria-expanded="false"
        data-fn="toggleAccordionState"
        aria-controls="list">
        <span class="MagentaA11y-accordion__headline--text">Example: Toggle Switch</span>
      </button>
      </h2>
      <div class="MagentaA11y-accordion__body" id="list">
      <h3>Scenario</h3>
      On the web page you are testing you encounter a toggle switch that does not work with the left and right arrow keys like you believe it should.

      <h3>What to do</h3>
      To verify if arrow key support is expected for toggles on the web, you can first check MagentaA11y. Locate the <a href="https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/toggle-switch">Toggle Switch</a> component page and review the How to test section. Arrow key support is not mentioned so this is not a requirement for toggle Switch components and so this is not an accessibility issue. 
      </div>
      </div>

2. ## Design System

      If you are testing an experience that is created from a formal design system, you can reference that design system’s documentation. Design systems will provide functional components and detailed information on how components should be implemented and function. 

      <div class="MagentaA11y-accordion">
      <h2 class="MagentaA11y-accordion__heading">
      <button
        class="MagentaA11y-accordion__headline"
        aria-expanded="false"
        data-fn="toggleAccordionState"
        aria-controls="list">
        <span class="MagentaA11y-accordion__headline--text">Example: Interactive Table</span>
      </button>
      </h2>
      <div class="MagentaA11y-accordion__body" id="list">
      <h3>Scenario</h3>
      You are testing a page that consists of an interactive table. When you send keyboard focus to the table, focus skips the table headers and jumps to the second row. You are not sure if this is a focus order issue.

      <h3>What to do</h3>
      You know this project uses the brand-new design system, so you check the documentation for the interactive table. You learn that the table is implemented as an ARIA Grid and learn that this is the expected behavior, so this is not an accessibility issue. 
      </div>
      </div>

3. ## Automated testing

      Often, accessibility barriers are related to code issues. Automated testing can quickly detect code-related issues that may create barriers for assistive technology users. 

      <div class="MagentaA11y-accordion">
      <h2 class="MagentaA11y-accordion__heading">
      <button
        class="MagentaA11y-accordion__headline"
        aria-expanded="false"
        data-fn="toggleAccordionState"
        aria-controls="list">
        <span class="MagentaA11y-accordion__headline--text">Example: Nested Buttons</span>
      </button>
      </h2>
      <div class="MagentaA11y-accordion__body" id="list">
      <h3>Scenario</h3>
      You are testing a button that when activated, presents a list of options. For some reason, the screen reader will not interact with the button correctly. 

      <h3>What to do</h3>
      You have ran some automated accessibility tests and in the results there is an issue identified that indicates the author has nested a button element inside of another button element and that is not only invalid HTML, it is creating the barrier with the screen reader so this is an issue.

      ```html
      <div role="button" tabindex="0">
        <button>Click Me</button>
      </div>
      ```

      </div>
      </div>

4. ## Code Inspection

      Automated testing does not catch everything. You can have code that is “correct” or valid and it can still create accessibility issues. Manual inpsection of code can often identify what the issue is.

      <div class="MagentaA11y-accordion">
      <h2 class="MagentaA11y-accordion__heading">
      <button
        class="MagentaA11y-accordion__headline"
        aria-expanded="false"
        data-fn="toggleAccordionState"
        aria-controls="list">
        <span class="MagentaA11y-accordion__headline--text">Example: Nested Dialogs</span>
      </button>
      </h2>
      <div class="MagentaA11y-accordion__body" id="list">
      <h3>Scenario</h3>
      On the web page you are testing you encounter a dialog that is not being announced by the NVDA screen reader for some reason.

      <h3>What to do</h3>
      After opening Chrome DevTools and inspecting the code, you notice higher up in the DOM that there is a dialog element nested inside of another dialog element. While this may be valid HTML, it has created a barrier for NVDA users because it is not a standard implementation of a dialog, so this is an accessibility issue.
      </div>
      </div>

5. ## HTML Validation

      Code validity and proper use of HTML is an important factor with accessibility. You can use the Nu Html Checker to validate code. You can also reference the HTML Living Standard for guidelines on proper HTML use.

      <div class="MagentaA11y-accordion">
      <h2 class="MagentaA11y-accordion__heading">
      <button
        class="MagentaA11y-accordion__headline"
        aria-expanded="false"
        data-fn="toggleAccordionState"
        aria-controls="list">
        <span class="MagentaA11y-accordion__headline--text">Example: Label not announced</span>
      </button>
      </h2>
      <div class="MagentaA11y-accordion__body" id="list">
      <h3>Scenario</h3>
      An ARIA Combobox has a nearby text label, but this label is not announced by the screen reader when the widget receives focus. 

      <h3>What to do</h3>
      Using the Nu Html Checker, validate an isolated fragment of code to see if there are any code validity issues. Improper use of HTML or even spelling errors can cause accessibility barriers. For example, <code>aria-labeledby</code> is misspelled and should be <code>aria-labelledby</code>. Code validation would detect this code issue. 
      </div>
      </div>

6. ## Verify you are correctly using the screen reader or keyboard

      <!-- TODO: When the folder structure for "how to test" is updated, these two links will need to be updated -->

      Before you log an issue, make sure that you have tested it correctly. Refer to the MagentaAlly sections on How to test [Keyboard & focus](https://www.magentaa11y.com/MagentaA11yV2#/how-to-test/page-level/keyboard-&-focus/) and [Screen readers](https://www.magentaa11y.com/MagentaA11yV2#/how-to-test/page-level/screen-readers/) for guidance on system settings and methodology. 

      <div class="MagentaA11y-accordion">
      <h2 class="MagentaA11y-accordion__heading">
      <button
        class="MagentaA11y-accordion__headline"
        aria-expanded="false"
        data-fn="toggleAccordionState"
        aria-controls="list">
        <span class="MagentaA11y-accordion__headline--text">Example: Unable to navigate with Tab</span>
      </button>
      </h2>
      <div class="MagentaA11y-accordion__body" id="list">
      <h3>Scenario</h3>
      You are attempting to test a web page on your Mac with your keyboard, but are unable to focus on elements you think should be focusable with the Tab Key.

      <h3>What to do</h3>
      On your MacOS, you go into the "Keyboard" section of your "System Settings" and see that "Keyboard navigation" has not been turned on. Once you turn it on, you are able to tab through the page as expected so this is not an issue. 
      </div>
      </div>

7. ## Verify with other screen reader and browser combinations

      Sometimes there are bugs that exist with different screen reader and browser combinations, so it is important to test with several browsers and, ideally, different screen readers.

      <div class="MagentaA11y-accordion">
      <h2 class="MagentaA11y-accordion__heading">
      <button
        class="MagentaA11y-accordion__headline"
        aria-expanded="false"
        data-fn="toggleAccordionState"
        aria-controls="list">
        <span class="MagentaA11y-accordion__headline--text">Example: Accordion not annoucing as expanded</span>
      </button>
      </h2>
      <div class="MagentaA11y-accordion__body" id="list">
      <h3>Scenario</h3>
      You are testing a page in Chrome with NVDA. On page load there is an expanded accordion button, but it is not annoucing as expanded with NVDA.

      <h3>What to do</h3>
      You inspect the code and see the appropriate <code>aria-expanded="true"</code> attribute, so you test the same page in Firefox with NVDA and JAWS, as well as in Safari with VoiceOver. The button is announcing as expected in all environments so you determine there is a bug with NVDA/Chrome and do not need to mark it as an accessibility issue. 
      </div>
      </div>

8. ## Document the accessibility issue

      Make it easy for others to review and fix your issue. 

      <div class="MagentaA11y-accordion">
      <h2 class="MagentaA11y-accordion__heading">
      <button
        class="MagentaA11y-accordion__headline"
        aria-expanded="false"
        data-fn="toggleAccordionState"
        aria-controls="list">
        <span class="MagentaA11y-accordion__headline--text">Example: Image not announcing</span>
      </button>
      </h2>
      <div class="MagentaA11y-accordion__body" id="list">
      <h3>Scenario</h3>
      You discovered an image of a product that is not announcing for screen readers on the home page because it is missing an <code>alt</code> attribute.

      <h3>What to do</h3>
      You want to clearly capture the exact steps to recreate the issue in your organizations bug tracking system:

      <ul>
        <li>The URL where the image is located</li>
        <li>A description of the image and its location on the page</li>
        <li>The accessibility concern (ex: "missing <code>alt</code> attribute")</li>
        <li>Who it impacts - which users are impacted by the barrier and why</li>
        <li>A snippet of the corresponding code</li>
        <li>Screenshots of the images (ensure the screenshot has context - don't crop too tight)</li>
        <li>A good/fixed snippet of the corresponding code</li>
      </ul>

      While it is always helpful to provide screenshots, your issue should be written clear enough that they are not needed by someone reading the details of the bug.
      </div>
      </div>
