## General Notes

How to test a select dropdown

## Videos

### iOS VoiceOver

<video controls>
  <source src="media/video/web/select/select-ios.mp4" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback

<video controls>
  <source src="media/video/web/select/select-android.mp4" type="video/webm">
  Your browser does not support the video tag.
</video>

### Windows JAWS Chrome

<video controls>
  <source src="media/video/web/select/select-jaws.mp4" type="video/webm">
  Your browser does not support the video tag.
</video>

### Windows NVDA Chrome

<video controls>
  <source src="media/video/web/select/select-nvda.mp4" type="video/webm">
  Your browser does not support the video tag.
</video>

### MacOS VoiceOver Safari

<video controls>
  <source src="media/video/web/select/select-macOS.mp4" type="video/webm">
  Your browser does not support the video tag.
</video>

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a select dropdown

1. Test keyboard only, then screen reader + keyboard actions

      - Tab: Focus moves visibly to the input

      - Arrow-keys: Moves focus to and chooses the next option. 

      - Escape: If the select options are displayed, collapses the select and moves focus to the select.
 
2. Test mobile screenreader gestures

      - Swipe: Focus moves to the input, traverses list

      - Double-tap: Opens select, chooses option

3. Listen to screenreader output on all devices

      - Name: Its purpose is clear

      - Role: It identifies itself as a select, popup, menu/submenu, listbox or combobox

      - Group: Hints or errors are read after the label and related inputs include a group name (ex: Account settings)

      - State: It indicates which option is selected and if disabled/dimmed/unavailable

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/select-dropdown](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/select-dropdown)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a select dropdown

GIVEN THAT I am on a page with a select dropdown 

1. Keyboard for mobile & desktop

      - WHEN I use the tab key to move focus to a select I SEE focus is strongly visually indicated

      - THEN when I use the arrow keys to select an option I SEE the selected option is changed

      - THEN when I use the escape key when the select is open  I SEE it collapses and focus moves to the select

2. Desktop screenreader

      - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 

      - I use the tab key to move focus to a select
         - I HEAR its purpose is clear
         - I HEAR it identifies itself as a select, popup, menu/submenu, listbox or combobox
         - I HEAR hints or errors are read after the label and related inputs include a group name (ex: Account settings)
         - I HEAR it indicates which option is selected and if disabled/dimmed/unavailable

      - THEN when I use the arrow keys to select an option I HEAR the selected option is changed

      - THEN when I use the escape key when the select is open  I HEAR it collapses and focus moves to the select

3. Mobile screenreader

      - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND

      - I swipe to focus on a select
         - I HEAR its purpose is clear
         - I HEAR it identifies itself as a select, popup, menu/submenu, listbox or combobox
         - I HEAR Hints or errors are read after the label and related inputs include a group name (ex: Account settings)
         - I HEAR it indicates which option is selected and if disabled/dimmed/unavailable

      - THEN when I doubletap with the select in focus I HEAR the options can be selected

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/select-dropdown](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/select-dropdown)

## Code examples

### Use the Semantic HTML `<select>`

This native select contains all the accessibility criteria for free.
<!-- TODO: add back in if we utilize pseudo attributes in examples
- It uses [CSS pseudo attributes](https://github.com/tmobile/magentaA11y/blob/main/_sass/modules/_input-select.scss) to create the arrow indicator, no Javascript.
-->

```html
<label for="nato">
  Select a Nato phonetic Letter
</label>
<select id="nato">
  <option value="None" selected disabled>Select a letter</option>
  <option value="A">Alpha</option>
  <option value="B">Bravo</option>
  <option value="C">Charlie</option>
</select>
```


<example>
<label for="nato">
  Select a Nato phonetic Letter
</label>
<select id="nato">
  <option value="None" selected disabled>Select a letter</option>
  <option value="A">Alpha</option>
  <option value="B">Bravo</option>
  <option value="C">Charlie</option>
</select>
</example>


### Focusable disabled select (preferred)

This select is focusable with all options disabled.

```html
<label for="nato-disabled-focusable">
  Select a Nato phonetic Letter
</label>
<select id="nato-disabled-focusable" aria-disabled="true">
  <option value="None" disabled>None</option>
  <option value="A" disabled selected>Alpha</option>
  <option value="B" disabled>Bravo</option>
  <option value="C" disabled>Charlie</option>
</select>
```

<example>
<label for="nato-disabled-focusable">
  Select a Nato phonetic Letter
</label>
<select id="nato-disabled-focusable" aria-disabled="true">
  <option value="None" disabled>None</option>
  <option value="A" disabled selected>Alpha</option>
  <option value="B" disabled>Bravo</option>
  <option value="C" disabled>Charlie</option>
</select>
</example>


### Disabled select

This select is completely disabled and not focusable, making it harder to discover for the screen reader.

```html
<label for="nato-disabled">
  Select a Nato phonetic Letter
</label>
<select id="nato-disabled" disabled>
  <option value="None">None</option>
  <option value="A">Alpha</option>
  <option value="B" selected>Bravo</option>
  <option value="C">Charlie</option>
</select>
```

<example>
<label for="nato-disabled">
  Select a Nato phonetic Letter
</label>
<select id="nato-disabled" disabled>
  <option value="None">None</option>
  <option value="A">Alpha</option>
  <option value="B" selected>Bravo</option>
  <option value="C">Charlie</option>
</select>
</example>

### Avoid custom select dropdown elements:

Custom dropdown selects are [notoriously difficult](https://www.24a11y.com/2019/select-your-poison/) to make screen reader accessible. 

> "…it is now thoroughly clear that recreating the native behavior of a `<select>` element is impossible: its underlying semantics differ across platforms; its keyboard behavior is inconsistent; its mobile presentation and behavior is entirely different from desktop. In making a custom UI control, we take upon ourselves what was the browser’s responsibility to define semantics, presentation, and behavior, and this means we must choose one single implementation to serve to everyone."

> — [Sarah Higley](https://www.24a11y.com/2019/select-your-poison/), Web Developer at Microsoft

Angular Material documentation says "The native `<select>` offers the best accessibility because it is supported directly by screen-readers."

Angular material custom listbox requires the Live Announcer overlay to be accessible, and [advises using a native `<select>` for accessibility](https://material.angular.io/components/select/overview).

> "Angular Material also supports use of the native `<select>` element inside of `<mat-form-field>`. The native control has several performance, accessibility, and usability advantages."

Before you attempt to use one of these, be certain a native `<select>` is not an option and you understand the commitment for coding and testing across all platforms.

## Further reading

- [24 Accessibility : Select your poison](https://www.24a11y.com/2019/select-your-poison/)
- [WebAxe.org: Accessible Custom Select Dropdowns](https://www.webaxe.org/accessible-custom-select-dropdowns/)
- [WAI-ARIA listbox examples](https://www.w3.org/TR/2021/NOTE-wai-aria-practices-1.2-20211129/examples/combobox/combobox-select-only.html)

### WCAG criteria
- [WCAG 1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)
- [WCAG 1.3.5 Identify Input Purpose (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose)
- [WCAG 2.1.1 Keyboard (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard)
- [WCAG 2.4.6 Headings and Labels (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html)
- [WCAG 3.3.1 Error Identification (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/error-identification)
- [WCAG 3.3.2 Labels or Instructions (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions) 
- [WCAG 3.3.3 Error Suggestion (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion)
- [WCAG 4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)
