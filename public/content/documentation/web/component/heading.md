## General Notes

How to test a heading: h1, h2, h3, h4, h5, h6

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a heading

1. Test keyboard only, then screen reader + keyboard actions

      - Tab: Nothing, headings must not be focusable
      - Arrow-keys: Browses headings (when using screen reader)

2. Test mobile screenreader gestures

      - Swipe: The screenreader reads the heading and its level

3. Listen to screenreader output on all devices

      - Name: The heading's purpose and level must be clear
      - Role: It identifies itself as a heading and its level
      - Group: It is logically ordered, starting with a single h1, sections titled by h2, and subsections with h3

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/heading](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/heading)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a heading

GIVEN THAT I am on a page with a heading

1. Keyboard for mobile & desktop

      - WHEN I use the arrow key to browse to a heading I SEE the heading comes into view
      - WHEN I use the tab key I SEE nothing happens to the heading because headings must NOT be focusable

2. Desktop screenreader

      - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
      - I use the arrow key to browse to a heading
         - I HEAR the heading's purpose and level must be clear
         - I HEAR it identifies itself as a heading and its level
         - I HEAR it is logically ordered, starting with a single h1, sections titled by h2, and subsections with h3
      - WHEN when I use the tab key I HEAR nothing happens to the heading because headings must NOT be focusable

3. Mobile screenreader

      - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
      - I swipe to browse to a heading
         - I HEAR the heading's purpose and level must be clear
         - I HEAR it identifies itself as a heading and its level
         - I HEAR it is logically ordered, starting with a single h1, sections titled by h2, and subsections with h3


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/heading](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/heading)

## Headings are not focusable with the tab key

- When people use a screen reader, the arrow keys are used to browse non-focusable content
- The tab key only focuses interactive elements (ex: buttons, links or inputs)

## Code examples

### Use semantic HTML
This semantic HTML contains all accessibility features by default.

```html
<h1>My favorite taco recipe</h1>
  <!-- Author's entire life story 
   as it relates to tacos -->

  <h2>Ingredients</h2>
  <!-- List of ingredients -->

  <h2>Steps</h2>

    <h3>Preparing the protein</h3>
    <!-- List of instructions -->

    <h3>Preparing the vegetables</h3>
    <!-- List of instructions -->
    
    <h3>Assembly and plating</h3>
    <!-- List of instructions -->
  
  <h2>Nutrition information</h2>
  <!-- List of nutrition info -->
  
  <h2>Related receipes</h2>
  <!-- List of related recipes -->
```

### Complex headings

- When multiple styles exist inside a heading use spans and css to achieve the desired result.
- Do not use multiple headings.

```html
<h1>
  <span class="brand">Apple</span> 
  <span class="model">iPhone XVI</span> 
</h1>
```

### When you can't use semantic HTML

This custom heading requires extra attributes.

```html
<div role="heading" aria-level="1">
  About our company
</div>
```

## Developer notes

### Name
- Inner text describes the heading

### Role
- Semantic headings `<h1>` `<h2>` `<h3>` identify themselves as headings and express the level
- Use `role="heading" aria-level="1"` to for custom elements

### Group
- Headings must be logically ordered.
- Start with a single `<h1>` per page.
  - Title major sections with `<h2>`
    - Subsections with `<h3>`
      - It should be rare that `<h4>` and beyond is required.
      - Repeating patterns of headings are allowed so long as they follow a logical sequence  (example: `<h2>`,`<h3>`,`<h2>`,`<h3>`)
      - Avoid increasing heading levels by more than one level at a time (e.g., do not skip from `<h2>` to `<h4>`)



### Focus
- Headings must not receive focus
- Arrow keys will browse headings (not the tab key)

## Further Reading
- [WCAG 1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)
- [WCAG 2.4.6 Headings and Labels (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)

## Videos

### Windows NVDA Chrome

<video controls>
  <source src="media/video/web/heading/headingNVDA.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Windows JAWS Chrome

<video controls>
  <source src="media/video/web/heading/headingJAWS.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### MacOS Voiceover Safari

<video controls>
  <source src="media/video/web/heading/headingMacOS.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback

<video controls>
  <source src="media/video/web/heading/headingAndroid.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### iOS VoiceOver

<video controls>
  <source src="media/video/web/heading/headingiOS.webm" type="video/webm">
  Your browser does not support the video tag.
</video>


