## General Notes

How to test a search input

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Focus moves visibly to the search text input and search button
   - Space: Search button is activated
   - Enter: Search is activated

2. Test mobile screenreader gestures
   - Swipe: Focus moves to the search text input and search button
   - Doubletap: Search button is activated

3. Listen to screenreader output on all devices

   - Name: Its purpose is clear
   - Role: It identifies itself as a search input
   - Group: The form itself is discoverable with screenreader shortcuts as a search input

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/search](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/search)


## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a search input

GIVEN THAT I am on a page with a search input

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to a search input I SEE focus is strongly visually indicated
   - THEN when I use the tab key to move focus to the search submit button I SEE the button is focused
   - THEN when I use the enter or spacebar key I SEE the search results are presented

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use the tab key to move focus to a search input
      - I HEAR its purpose is clear
      - I HEAR it identifies itself as a search input
      - I HEAR the form itself is discoverable with screenreader shortcuts as a search input
   - THEN when I use the tab key to move focus to the search submit button I HEAR the button is focused
   - THEN when I use the enter or spacebar key I HEAR the search results are presented

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to focus on a search input
      - I HEAR its purpose is clear
      - I HEAR it identifies itself as a search input
      - I HEAR the form itself is discoverable with screenreader


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/search](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/search)


## Videos

### Android Talkback

<video controls>
  <source src="media/video/web/search/search-android.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### iOS VoiceOver

<video controls>
  <source src="media/video/web/search/search-ios.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Windows Jaws Chrome
<video controls>
  <source src="media/video/web/search/search-JAWS.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Windows NVDA Chrome
<video controls>
  <source src="media/video/web/search/search-NVDA.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### MacOS Voiceover Safari
<video controls>
  <source src="media/video/web/search/search-desktop-safari.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Code examples
### Use semantic HTML

- This semantic HTML contains all accessibility features by default. 
- Include a search button

### Search with autocomplete suggestions

- For search autocomplete see [Autocomplete input with listbox](/checklist-web/listbox-autocomplete/) 
<!-- TODO update link above -->

```html
<form role="search">
  <label for="search">
    Search this website:
  </label>
  <input list="components" type="search" id="search">
  <datalist id="components"> 
    <option value="Alert"> 
    <option value="Animation"> 
    <option value="Button"> 
    <option value="Checkbox">
    <option value="Date picker">
    <option value="Expander accordion">
    <option value="Footer / contentinfo">
    <option value="Form">
    <option value="Header / banner">
    <option value="Heading: h1, h2, h3">
  </datalist>

  <button type="submit" aria-label="search">
   <svg focusable="false" aria-hidden="true"></svg>
  </button>
</form>
```

<!-- TODO issues with focus when tabbing to search button -->
<!-- TODO Something funky is up with the search button here and I can't figure it out. It is submitting on focus when not using VoiceOver.  -->
<example>
   <form role="search">
      <label for="search" class="hidden-visually">
         Search this website:
      </label>
      <input list="components" type="search" id="search">
      <datalist id="components"> 
         <option value="Alert"> 
         <option value="Animation"> 
         <option value="Button"> 
         <option value="Checkbox">
         <option value="Date picker">
         <option value="Expander accordion">
         <option value="Footer / contentinfo">
         <option value="Form">
         <option value="Header / banner">
         <option value="Heading: h1, h2, h3">
      </datalist>
      <button data-icon="search" aria-label="Search"></button>
   </form>
</example>

## Developer notes

### Name
- Use a `label` with a `for="input-id` to describe the input
- Use `aria-label="Search this website"` if a `label` can't be used

### Role
- Use `role="search"` for the `<form>`
- Use `type="search"` for the text `<input>`

### Group
- Form identifies itself as `role="search"` 
- Include a search submit button.

### Focus
- Focus must be visible

## Further Reading
- [WCAG 1.1.1 Non-text Content (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html)
- [WCAG 1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html)
- [WCAG 1.3.5 Identify Input Purpose (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose)
- [WCAG 2.1.1 Keyboard (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html)
- [WCAG 3.2.3 Consistent Navigation (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html)
- [WCAG 3.3.2 Labels or Instructions (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html)
- [WCAG 4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)