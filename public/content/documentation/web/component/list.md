## General Notes

How to test a list

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a list

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Nothing, list items must not be focusable
   - Arrow-keys: Browses list items (when using screen reader)

2. Test mobile screenreader gestures

   - Swipe: The screenreader reads the list content

3. Listen to screenreader output on all devices

   - Role: It identifies itself as a list
   - Group: It declares the number of items in the list

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/list](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/list)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a list

GIVEN THAT I am on a page with a list

1. Keyboard for mobile & desktop

   - WHEN I use the arrow key to browse to a list I SEE the list comes into view
   - WHEN I use the tab key I SEE nothing happens to the list itself because lists must NOT be focusable

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use the arrow key to browse to a list
      - I HEAR it identifies itself as a list
      - I HEAR it declares the number of items in the list
   - WHEN I use the tab key I HEAR nothing happens to the list itself because lists must NOT be focusable

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to browse a list
      - I HEAR it identifies itself as a list
      - I HEAR it declares the number of items in the list

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/list](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/list)

## Developer Notes

### Lists are not focusable with the tab key

   - When using a screen reader, the **arrow keys** are used to browse non-focusable content
   - The tab key only focuses interactive elements (ex: buttons, links or inputs) inside the list item.

### Code examples

#### Unordered list

This semantic HTML contains all accessibility features by default.

```html
<ul>
  <li>Sugar</li>
  <li>Flour</li>
  <li>Butter</li>
  <li>Oil</li>
  <li>Eggs</li>
</ul>
```

<example>
<h4>Common household pantry items</h4>
<ul>
  <li>Sugar</li>
  <li>Flour</li>
  <li>Butter</li>
  <li>Oil</li>
  <li>Eggs</li>
</ul>
</example>

#### Ordered list

```html
<ol>
  <li>Elmo</li>
  <li>Big Bird</li>
  <li>Cookie Monster</li>
</ol>
```

<example>
<h4>Top three Sesame Street characters</h4>
<ol>
  <li>Elmo</li>
  <li>Big Bird</li>
  <li>Cookie Monster</li>
</ol>
</example>

#### When you can't use semantic HTML

As a **last resort**, this custom list uses extra attributes if it's not possible to edit the markup structure.

```html
<!-- Top three Sesame Street characters, according to some -->
<div role="list">
  <div role="listitem">Elmo</div>
  <div role="listitem">Big Bird</div>
  <div role="listitem">Cookie Monster</div>
</div>
```

### Do not interrupt the list

The `<ul>` or `<ol>` list must only contain `<li>` list items.

<h4 class="bad-example"> Bad example</h4>

```html
<!-- Were they or weren't they? -->
<ul>
  <li>Ross</li>
  <div>
    <a href="#">Stream it all over again and decide</a>
  </div>
  <li>Rachel</li>
</ul>
```

### Do not create fake lists

Adding returns or generic markup does not produce a list navigable by screen reader.

<h4 class="bad-example"> Bad example</h4>

```html
Sugar <br/>
Flour <br/>
Butter <br/>

<div>Sugar</div>
<div>Flour</div>
<div>Butter</div>
```
