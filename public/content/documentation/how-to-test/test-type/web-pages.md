## General Notes

Guidelines for testing standard web pages.  

## Developer Notes

A foundational overview of testing methods and tools for testing standard web pages.  

1. ## Test with a Keyboard

    All functionality must be usable with the keyboard. Many users with motor disabilities may not be able to use a mouse. Hence, testers must ensure that all content on a page is operable with a keyboard and has a visible focus indicator. [Read more about testing with a keyboard](/how-to-test-criteria/test-type/keyboard-&-focus). 

2. ## Test with Screen Readers.

     Screen Readers convey what is on screen via  speech or as braille on a refreshable braille display. Manually testing with a screen reader is essential to find accessibility issues that may not be caught by automated testing tools. [Read more about testing with screen readers](/how-to-test-criteria/test-type/web-screen-readers).

3. ## Automated Scans

      Including automated accessibility testing can help quickly catch many accessibility defects. 

      There are many Tools and Plugins available which can be used to run automated scans in a browser, such as: Deque’s axe devtools, WebAIM’s WAVE, Google Lighthouse, or the ARC Toolkit.

      Although automated accessibility testing is helpful, it can never replace manual testing which is the most reliable method to assess for accessibility. Estimates still put automated testing at only find 13-50% of defects. For more information on what automated testing can and cannot detect, you can read the following articles:

      - [Automated accessibility test tools find even less than expected](https://www.linkedin.com/pulse/automated-accessibility-test-tools-find-even-less-than-robert-dodd-pk7be/)
      - [Mind the WCAG automation gap](https://html5accessibility.com/stuff/2025/03/27/mind-the-wcag-automation-gap/)

4. ## Color Contrast  

      Contrast and color use are essential to accessibility testing. People with low contrast sensitivity and people with color blindness who cannot distinguish between certain colors would require color choices that adhere with the WCAG standards. [Read more about testing color contrast](/how-to-test-criteria/test-type/color-contrast).

## Demo accessibility pages 
Use these demo pages as general examples for accessible and inaccessible web pages. 

- [Accessible Demo](/basic-accessible-webpage) 
- [Inaccessible Demo](/basic-inaccessible-webpage) 