## General Notes

How to test a figure: maps, charts, and graphics

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

1. Keyboard & screen reader actions
   - Arrow-keys: Browse to content
   - Tab: Interactive figure controls are focusable
   - Enter: Activates controls
   - Space: Activates controls

2. Test mobile screenreader gestures
   - Swipe: Focus visibly moves to each control
   - Doubletap: Activates the control

3. Listen to screenreader output on all devices
   - Name: Content is described by a heading, alt text or named on focus
   - Role: It identifies as a common HTML element (image, list, table)
   - Group: An alternative method of consumption or interaction is available

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/figure](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/figure)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

GIVEN THAT I am on a page with a figure: maps, charts, and graphics

1. Keyboard for mobile & desktop

   - WHEN I use the arrow key to browse to a figure I SEE the figure comes into view.
   - THEN when I use the tab key to move focus to figure controls (toggle, show/hide, etc) I SEE the control is in focus
   - THEN when I use the spacebar or enter key I SEE the intended action occurs

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND I use the arrow key to browse to a figure.
      - I HEAR Content is described by a heading, alt text or named on focus
     - I HEAR it identifies as a common HTML element (image, list, table)
     - I HEAR an alternative method of consumption or interaction is available
   - THEN when I use the tab key to move focus to figure controls (toggle, show/hide, etc) I HEAR the control is in focus 
   - THEN when I use the spacebar or enter key I HEAR the intended action occurs

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND I swipe to browse to an image
     - I HEAR Content is described by a heading, alt text or named on focus
     - I HEAR it identifies as a common HTML element (image, list, table)
     - I HEAR an alternative method of consumption or interaction is available


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/figure](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/figure)

## Developer Notes

### Name

- Use `alt="Descriptive figure content"` for images
- Supply a heading for interactive figures or `aria-label="Figure name"` can be used as well

### Role

- Wrap charts and tables in a `<figure>` element where applicable
- Include `<figcaption>` to describe the figure
- Use `<cite>` to label sources

### Group

- Provide alternative ways to consume content
    - Examples:
        - A map of phone coverage areas includes a search function
        - A chart embedded as an image includes a table of the data
        - A graphic showing phone plan benefits is followed by an unordered list of the benefits below a plan name heading.

## Code examples
### Consider making simple charts from semantic markup

```html
<dl class="bar-chart">
  <dt>Monthly usage</dt>
  <dd class="percentage-57">
    <span class="date">March</span>
    <span class="value">57%</span>
  </dd>
  <dd class="percentage-42">
    <span class="date">April</span>
    <span class="value">42%</span>
  </dd>
  <dd class="percentage-91">
    <span class="date">May</span>
    <span class="value">91%</span>
  </dd>
</dl>
```

<example>
   <dl class="bar-chart">
     <dt>Monthly usage</dt>
     <dd class="percentage-57">
       <span class="date">March</span>
       <span class="value">57%</span>
     </dd>
     <dd class="percentage-42">
       <span class="date">April</span>
       <span class="value">42%</span>
     </dd>
     <dd class="percentage-91">
       <span class="date">May</span>
       <span class="value">91%</span>
     </dd>
   </dl>
</example>


### Provide alternative ways to consume visual content
If there is one primary message for an chart that is displayed as an image file, describe it in the `alt` attribute.

```html
<img src="media/images/web/figure/pie-chart.png" 
     alt="Usage shows a large jump in May to 91%">
```
### Provide alternative ways to consume data
If you have a figure that can’t be described by `alt` text, place the content in a different format.

<example>
<figure>
  <img src="/media/images/web/figure/pie-chart.png" alt="2020 sales by item">

  <details>
    <summary>
      2020 sales
    </summary>
    <table id="sales-breakdown">
        <caption>
          Breakdown of 2020 sales percentages by item
        </caption>
        <thead>
          <tr>
            <th scope="column">
              Toilet paper
            </th>
            <th scope="column">
              Bread makers
            </th>
            <th scope="column">
              Moving boxes
            </th>
            <th scope="column">
              Exercise mats
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              38%
            </td>
            <td>
              18%
            </td>
            <td>
              12%
            </td>
            <td>
              32%
            </td>
          </tr>
        </tbody>
      </table>
  </details>
</figure>
</example>

```html
<figure>
  <img
          src="/media/images/web/figure/pie-chart.png"     alt="2020 sales by item">

  <details>
    <summary>
      2020 sales
    </summary>

    <table id="sales-breakdown">
        <caption>
          Breakdown of 2020 sales percentages by item
        </caption>
        <thead>
          <tr>
            <th scope="column">
              Toilet paper
            </th>
            <th scope="column">
              Bread makers
            </th>
            <th scope="column">
              Moving boxes
            </th>
            <th scope="column">
              Exercise mats
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              38%
            </td>
            <td>
              18%
            </td>
            <td>
              12%
            </td>
            <td>
              32%
            </td>
          </tr>
        </tbody>
      </table>
  </details>
</figure>
```
### Provide alternative interactions with dynamic figures
When building maps, add a search or filtering feature for those who can’t use a mouse.

```html
<map-embed></map-embed>

<form role="search" 
      aria-label="Location search">
  <label for="search">
    Search for a location
  </label>
  <input type="search" id="search">
  <button type="submit">
    Search
  </button>
</form>
```
