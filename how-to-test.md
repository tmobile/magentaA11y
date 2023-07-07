---
layout: how-to-test-default
title: Websites
seoTitle: How to test accessibility
permalink: /how-to-test/
---

Accessibility testing is important because it helps to ensure that everyone can use a website or application, regardless of their disability. This includes people who are blind, deaf, have low vision, or have mobility impairments.

To thoroughly test web accessibility, a combination of manual and automated testing methods are performed against the [Web Content Accessibility Guidelines](https://www.w3.org/TR/WCAG21/)) (WCAG) 2.1 Level A and AA. Manual testing involves people navigating the site, using assistive technologies like screen readers or keyboard-only navigation, and verifying if all content is perceivable, operable, understandable. Automated testing utilizes specialized tools to scan for common accessibility issues, such as missing alternative text for images or improper heading structure.

By combining both approaches, we can identify and address accessibility barriers comprehensively, improving the overall user experience and inclusivity of our digital products.

## Tester reference guide
  <ul style="column-count: 3; column-gap: 20px;">
    <li>
      <a {% if page.url=="/how-to-test/keyboard-focus/" %} aria-current="page" {% endif %} {% if
        page.url=="/how-to-test/keyboard-focus/" %} class="current" {% endif %}
        href="{{ site.baseurl }}/how-to-test/keyboard-focus/">Keyboard & Focus
      </a>
    </li>
    <li>
      <a {% if page.url=="/how-to-test/screen-readers/" %} aria-current="page" {% endif %} {% if
        page.url=="/how-to-test/screen-readers/" %} class="current" {% endif %}
        href="{{ site.baseurl }}/how-to-test/screen-readers/">Screen Readers
      </a>
    </li>
    <li>
      <a {% if page.url=="/how-to-test/color-contrast/" %} aria-current="page" {% endif %} {% if
        page.url=="/how-to-test/color-contrast/" %} class="current" {% endif %}
        href="{{ site.baseurl }}/how-to-test/color-contrast/">Color & Contrast
      </a>
    </li>
    <li>
      <a href="#">Links & Buttons</a>
    </li>
    <!-- <li>
      <a href="#">Images</a>
    </li>
    <li>
      <a href="#">Multimedia</a>
    </li>
    <li>
      <a href="#">Content Structure</a>
    </li>
    -->
    <li>
      <a href="#">Forms</a>
    </li>
    <!-- 
    <li>
      <a href="#">Tables</a>
    </li>
    <li>
      <a href="#">Page Titles / Language</a>
    </li>
    <li>
      <a href="#">Dialogs</a>
    </li>
    --> 
    <li>
      <a href="/how-to-test/not-sure-if-it-is-an-issue/">Not sure if it is an issue?</a>
    </li>
    <!-- 
    <li>
      <a href="/testing-tools/">Testing Tools</a>
    </li>
    -->
  </ul>
