## General Notes

How to test a table

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a table

1. Test keyboard only, then screen reader + keyboard actions

   - Arrow-keys: The table scrolls into view (and with a screenreader the cells become individually readable)

2. Test mobile screenreader gestures

   - Swipe: The table is browsed from cell to cell

3. Listen to screenreader output on all devices

   - Name: The table has a caption or a heading to describe its purpose
   - Role: It identifies itself as a table
   - Group: Column headers and row headers are identified with screenreader shortcuts

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/table](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/table)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a table

GIVEN THAT I am on a page with a table

1. Keyboard for mobile & desktop

   - WHEN I use the arrow keys I SEE the table scrolls into view (but is not focusable)

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver)
   - AND use the arrow keys
      - I HEAR the table has a caption or a heading to describe its purpose
      - I HEAR it identifies itself as a table
      - I HEAR column headers and row headers are identified with screenreader shortcuts

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver)
   - AND I swipe to focusable elements in the footer
      - I HEAR the table has a caption or a heading to describe its purpose
      - I HEAR it identifies itself as a table
      - I HEAR column headers and row headers are identified with screenreader shortcuts


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/table](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/table)


## Code examples
### Use semantic HTML
This semantic HTML contains all accessibility features by default.

Optional: The table is wrapped in a `<figure>` to indicate author and source.

```html
<table id="sesame-table">
   <caption>
      Sesame Street Characters
   </caption>
   <thead>
      <tr>
         <th scope="row">
         Letter
         </th>
         <th scope="col">
         E
         </th>
         <th scope="col">
         B
         </th>
         <th scope="col">
         C
         </th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <th scope="row">
         Name
         </th>
         <td>
         Elmo
         </td>
         <td>
         Big Bird
         </td>
         <td>
         Cookie Monster
         </td>
      </tr>
   </tbody>
</table>
```

<example>
   <div class="table-wrapper">
      <table id="sesame-table" class="text-center">
         <caption>
            Sesame Street Characters
         </caption>
         <thead>
            <tr>
               <th scope="row">
               Letter
               </th>
               <th scope="col">
               E
               </th>
               <th scope="col">
               B
               </th>
               <th scope="col">
               C
               </th>
            </tr>
         </thead>
         <tbody>
            <tr>
               <th scope="row">
               Name
               </th>
               <td>
               Elmo
               </td>
               <td>
               Big Bird
               </td>
               <td>
               Cookie Monster
               </td>
            </tr>
         </tbody>
      </table>
   </div>
</example>

<!-- TODO broken image references -->
<example class="example example--contains-icon">
   <div class="table-wrapper">
      <table class="comparison text-center">
         <caption>
            Screen reader and browser pairings
         </caption>
         <thead>
         <tr><th scope="col">
            Platform
         </th>
         <th scope="col">
            Screenreader
         </th>
         <th scope="col">
            Browser
         </th>
         </tr></thead>
         <tbody>
         <tr>
            <th scope="row">
               <img src="media/images/icons/logo-apple.svg" role="img" alt="Apple" class="icon">
               iOS
            </th>
            <td>
               <img src="media/images/icons/logo-apple.svg" role="img" alt="Apple" class="icon">
               VoiceOver
            </td>
            <td>
               <img src="media/images/icons/logo-safari.svg" role="img" alt="Apple" class="icon">
               Safari
            </td>
         </tr>
         <tr>
            <th scope="row">
               <img src="media/images/icons/logo-android.svg" role="img" alt="" class="icon">
               Android
            </th>
            <td>
               <img src="media/images/icons/logo-talkback.svg" role="img" alt="" class="icon">
               Talkback
            </td>
            <td>
               <img src="media/images/icons/logo-chrome.svg" role="img" alt="" class="icon">
               Chrome
            </td>
         </tr>
         <tr>
            <th scope="row">
               <img src="media/images/icons/logo-windows.svg" role="img" alt="" class="icon">
               Windows
            </th>
            <td>
               <img src="media/images/icons/logo-jaws.svg" role="img" alt="" class="icon">
               JAWS
            </td>
            <td>
               <img src="media/images/icons/logo-chrome.svg" role="img" alt="" class="icon">
               Chrome
            </td>
         </tr>
         <tr>
            <th scope="row">
               <img src="media/images/icons/logo-windows.svg" role="img" alt="" class="icon">
               Windows
            </th>
            <td>
               <img src="media/images/icons/logo-nvda.svg" role="img" alt="" class="icon">
               NVDA
            </td>
            <td>
               <img src="media/images/icons/logo-chrome.svg" role="img" alt="" class="icon">
               Chrome
            </td>
         </tr>
         <tr>
            <th scope="row">
               <img src="media/images/icons/logo-apple.svg" role="img" alt="Apple" class="icon">
               MacOS
            </th>
            <td>
               <img src="media/images/icons/logo-apple.svg" role="img" alt="Apple" class="icon">
               VoiceOver
            </td>
            <td>
               <img src="media/images/icons/logo-safari.svg" role="img" alt="Apple" class="icon">
               Safari
            </td>
            </tr>
         </tbody>
      </table>
   </div>
</example>

### When you can’t use semantic HTML
If it’s required to display tabular data without using a `<table>` element, attributes will have to added.

```html
<div role="table" aria-describedby="table-desc">
  <div id="table-desc">
    Sesame Street Characters
  </div>
  <div role="rowgroup">
    <div role="row">
      <span role="columnheader">Letter</span>
      <span role="columnheader">Name</span>
    </div>
  </div>
  <div role="rowgroup">
    <div role="row">
      <span role="cell">E</span>
      <span role="cell">Elmo</span>
    </div>
    <div role="row">
      <span role="cell">B</span>
      <span role="cell">Big Bird</span>
    </div>
    <div role="row">
      <span role="cell">C</span>
      <span role="cell">Cookie Monster</span>
    </div>
  </div>
</div>
```

## Developer notes
Don't use tables purely for layout. Only use tables to structure tabular data. 

### Name
- The table can be named by a heading above or a `<caption>`

### Role
- Semantic `<table>` structures identify headers appropriately and honors screen reader keyboard shortcuts.

### Group
- Wrapping a table in a [`<figure>` element](/OpenA11yEngineer/checklist-web/figure/) can be used to build a relationship to `<figcaption>` and `<cite>`

### State
- Sortable tables can use `aria-sort` to indicate state.

## Documentation
- [MSDN Web Docs - ARIA: table role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Table_Role)
- [WAI-ARIA table example](https://www.w3.org/TR/wai-aria-practices/examples/table/table.html)

## Videos

### Android Talkback

<video controls>
  <source src="media/video/web/table/table_android.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### iOS VoiceOver

<video controls>
  <source src="media/video/web/table/table_ios.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Windows NVDA Chrome

<video controls>
  <source src="media/video/web/table/table_nvda.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### MacOS VoiceOver Safari

<video controls>
  <source src="media/video/web/table/table_macos.webm" type="video/webm">
  Your browser does not support the video tag.
</video>