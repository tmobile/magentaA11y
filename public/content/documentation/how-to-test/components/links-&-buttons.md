## General Notes

Testing links and buttons is essential to ensuring a site is accessible and functional for all
users.

## Developer Notes

Contains developer-specific information, including expected behaviors, implementation details, and
best practices.

1.  **How to test**

    **Test with your keyboard first**

    Navigate through the page using only the tab and shift + tab keys on your keyboard to reach all
    links and buttons.

    **Test with screen readers second**

    Use a screen reader, such as NVDA (for Windows) or VoiceOver (for macOS) and browse the page
    using your arrow keys to reach all links and buttons.

2.  **What to test for**

      <div class="how-to-test-checklist-item">
        <h3>✓ Ensure each link and button receives focus and has a visible focus indicator</h3>
        <div class="table-wrapper">
          <table>
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
                <button class="Magentaa11y-button Magentaa11y-button--primary">I get focus!</button>
                </td>
                <td>
                <div class="Magentaa11y-button Magentaa11y-button--primary">I do NOT get focus</div>
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
        </div>
      </div>

      <div class="how-to-test-checklist-item">
        <h3>✓ Ensure buttons and links can be activated with the <code>enter</code> key and that buttons can also be activated with the <code>space</code> key</h3>
        <div class="table-wrapper">
          <table>
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
                  <button class="Magentaa11y-button Magentaa11y-button--primary" data-fn="showAlert">Show alert</button>
              </td>
              <td>
                  <div class="Magentaa11y-button Magentaa11y-button--primary" type="button" tabindex="0" data-fn="showMouseAlert" data-event="onMouseDown">
                  Show alert
                  </div>
              </td>
              </tr>
                  <tr>
              <td>
                  <a href="/home">Magentaa11y home</a>
              </td>
              <td>
                  <a tabindex="0" data-fn="goToHome" data-event="onMouseUp" >Magentaa11y home</a>
              </td>
              </tr>
              </tbody>
          </table>
        </div>
      </div>

      <div class="how-to-test-checklist-item">
          <h3>✓ Ensure disabled controls are focusable but not actionable, and have an <code>aria-disabled="true"</code> attribute</h3>
          <p><strong>Note:</strong> A control that is disabled should not be interactive to any users. Nothing should happen when activated.</p>
          <div class="table-wrapper">
            <table >
                <thead>
                <th scope="col">
                    Preferred
                </th>
                <th scope="col">
                    Visually disabled but actionable
                </th>
                </thead>
                <tbody>
                <tr>
                <td>
                    <button class="Magentaa11y-button Magentaa11y-button--primary" aria-disabled="true">Save</button>
                </td>
                <td>
                    <button class="Magentaa11y-button Magentaa11y-button--primary visually-disabled" tabindex="-1" data-fn="showAlertWhenDisabled">Save</button>
                </td>
                </tr>
                </tbody>
            </table>
          </div>
      </div>

      <div class="how-to-test-checklist-item">
          <h3>✓ Ensure all links and buttons have clear labels and that all graphical controls have accurate <code>aria-label</code> attributes</h3>
          <div class="table-wrapper">
            <table>
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
                  <button data-icon="playCircleOutlined" aria-label="Play video" />
              </td>
              <td>
                  <button data-icon="playCircleOutlined">
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
        </div>
      </div>

      <div class="how-to-test-checklist-item">
          <h3>✓ Ensure all CTA buttons or links have appropriate <code>aria-label</code> values.</h3>
          <p><strong>Note:</strong> If a control has <code>aria-label</code>, the <code>aria-label</code> must contain the text that is presented visually. The text should not be broken up and be the first part of the label.</p>
          <div class="table-wrapper">
            <table>
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
                  <h2>iPhone 14</h2>
                  <p>I am the product information.</p>
                  <button class="Magentaa11y-button Magentaa11y-button--primary" aria-label="Buy now, iPhone 14">Buy Now</button>
                  </td>
                  <td>
                  <h2>iPhone 14</h2>
                  <p>I am the product information.</p>
                  <button class="Magentaa11y-button Magentaa11y-button--primary" aria-label="Learn more about our specials">Buy Now</button>
                  </td>
              </tr>
              <tr>
                  <td>
                  <code>aria-label="Buy now, iPhone 14"</code>
                  </td>
                  <td>
                  <code>aria-label="Learn more about our specials"</code>
                  </td>
              </tr>
              </tbody>
            </table>
          </div>
      </div>

      <div class="how-to-test-checklist-item">
        <h3>✓ Ensure screen readers accurately announce any button or link state that is conveyed visually</h3>
        <p><strong>Note:</strong> States such as expanded,collapsed, or current can be communicated to screen reader users.</p>
        <div class="table-wrapper">
          <table>
            <thead>
              <th scope="col">Pass</th>
              <th scope="col">Fail</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="MagentaA11y-accordion">
                    <h2 class="MagentaA11y-accordion__heading">
                      <button
                        class="MagentaA11y-accordion__headline"
                        aria-expanded="false"
                        data-fn="toggleAccordionState"
                        aria-controls="list">
                        <span class="MagentaA11y-accordion__headline--text">More details</span>
                      </button>
                    </h2>
                    <div class="MagentaA11y-accordion__body" id="list">
                      This button expressed its state as expanded or collapsed
                    </div>
                  </div>
                </td>
                <td>
                  <!--  -->
                  <div class="MagentaA11y-accordion">
                    <h2 class="MagentaA11y-accordion__heading">
                      <button class="MagentaA11y-accordion__headline" aria-controls="listB">
                        <span class="MagentaA11y-accordion__headline--text">More details</span>
                      </button>
                    </h2>
                    <div class="MagentaA11y-accordion__body" id="listB">
                      This button is not conveying it's state.
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="how-to-test-checklist-item">
        <h3>✓ Ensure skip to &amp; same-page links move focus for screen reader and keyboard users</h3>
        <div class="table-wrapper">
          <table class="column-2">
            <thead>
              <tr><th scope="col">
                Pass
              </th>
              <th scope="col">
                Fail
              </th>
            </tr></thead>
            <tbody>
            <tr>
              <td>
              <a id="return-to-top-link" data-fn="scrollAndFocusMain" href="#">Return to top</a>
              </td>
              <td>
              <a href="#" data-fn="scrollToTopOnly">
              Return to top</a>
              </td>
            </tr> 
            </tbody>
          </table>
        </div>
      </div>

3.  **What's the difference between a link and a button**

    ### If it goes somewhere, it's `<a>` link.

    - When the user clicks a link, they are taken to a different location in the site.
      - Either another page or even another area of the same page
    - A link can look like a big shiny button but it must be coded as `<a>` link
    - An interactive link should have a valid href value so it can receive keyboard focus.<br>For
      example `<a href="/some-page">...</a>`.

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

    [WebAIM: Links and Hypertext](https://webaim.org/techniques/hypertext/)

    [WebAIM: Buttons](https://webaim.org/techniques/forms/controls#button)
