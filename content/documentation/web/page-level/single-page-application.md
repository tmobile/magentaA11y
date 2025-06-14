## General Notes

How to test a single page application (SPA)

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a single page application (SPA)

1. Test keyboard only, then screen reader + keyboard actions

   - Arrow-keys: Browsing starts consistently at top of new page content OR top of page
   - Tab: Focus starts consistently at the first interactive element in the content or top of page

2. Test mobile screenreader gestures

   - Swipe: Focus starts at top of new content or top of page

3. Listen to screenreader output on all devices

   - Name: New content is announced or indicated 
   - Group: Browsing and focus starts consistently at top of new page content or top of page

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/single-page-application](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/single-page-application)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a single page application (SPA)

GIVEN THAT I am on a page built with a SPA:

1. Keyboard for mobile & desktop

   - WHEN I use the application AND whole new dynamic page appears I SEE browsing and focus starts consistently at top of new page content or top of page
   - THEN when I use the tab key I SEE focus starts consistently at the first interactive element in the new page content or top of page

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) 
      - AND I use the application AND whole new dynamic page appears
      - AND I HEAR new content is announced or indicated 
      - AND I HEAR browsing and focus starts consistently at top of new page content or top of page
   - THEN when I use the tab key I HEAR focus starts consistently at the first interactive element in the new page content or top of page

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver)
      - AND I use the application AND new dynamic content page appears
      - I HEAR new content is announced or indicated 
      - I HEAR browsing and focus starts consistently at top of new page content or top of page

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/single-page-application](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/single-page-application)

## Focus management & consistency

- Focus must be **deliberately and consistently** placed at the
  - top of new page content or 
  - top of the HTML page
- Pick one or the other and **consistently** follow that pattern
- **DO NOT** place focus on the first input on page load

## How does dynamic `aria-live` content work?

- The screenreader expects content **within** an element with a `aria-live="polite"` attribute to change
- By default, **only the content that has changed** will be read
- To force the screenreader to read all contents even if it did not change within the element, add `aria-atomic="true"`
- **Rarely** must you use `aria-live="assertive"` as it will override every other message from the screenreader

## About alerts

- _By default_ an element using `role="alert"` has `aria-live="assertive"`

## Code example

This is one example of a dynamic content region. It is similar to the carousel example.

<!-- TODO mention how SPA works for our routing on current site -->

- It is not the only way to build a dynamic region, but it meets all the critieria:
  - New content is announced
  - Focus is consistently placed at the top of the content

```html
<div id="dynamic-app-container" 
     class="simp" 
     aria-live="polite" 
     tabindex="-1">

  <h2 class="h-bravo">
    Sesame Street Experience
  </h2>

  <ul class="slide-list">
    <li class="slide visible">
      <h3>
        Alpha
      </h3>
      <button class="next">
        Start
      </button>
    </li>

    <li class="slide inert">
      <h3>
        Big Bird
      </h3>
      <p>
        A large, yellow bird character
      </p>
      <button class="tertiary previous">
        Back
      </button>
      <button class="next">
        Next
      </button>
    </li>

    <li class="slide inert">
      <h3>
        Cookie Monster
      </h3>
      <p>
        A blue, cookie-eating character.
      </p>
      <button class="tertiary previous">
        Back
      </button>
      <button>
        Submit
      </button>
    </li>
  </ul>
</div>
```

<example>
   <div id="destination" 
      class="spa" 
      aria-live="polite" 
      tabindex="-1">
      <h2 class="h-bravo">
         Sesame Street Experience
      </h2>
      <ul class="slide-list">
         <li class="slide visible" id="current">
            <h3>
            Elmo
            </h3>
            <p>
            A red, fuzzy character.
            </p>
            <button data-fn="goToNext" class="Magentaa11y-button Magentaa11y-button--primary next">
            Start
            </button>
         </li>
         <li class="slide">
            <h3>
            Big Bird
            </h3>
            <p>
            A large, yellow bird character
            </p>
            <button data-fn="goToNext" class="Magentaa11y-button Magentaa11y-button--primary next">
            Next
            </button>
         </li>
         <li class="slide">
            <h3>
            Cookie Monster
            </h3>
            <p>
            A blue, cookie-eating character.
            </p>
            <button data-fn="goToNext" class="Magentaa11y-button Magentaa11y-button--primary next">
            Submit
            </button>
         </li>
      </ul>
   </div>
</example>