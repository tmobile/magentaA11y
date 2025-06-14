## General Notes

How to test a sticky element

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a sticky element

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Controls are visibly focusable in a logical order in relation to the whole page

2. Test mobile screenreader gestures

    - Swipe: Content and controls within the sticky element appear in a logical order in relation to the whole page

3. Listen to screenreader output on all devices

   - Group: Interactive elements are read in logical order in relation to the whole page


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/sticky-element](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/sticky-element)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a sticky element

GIVEN THAT I am on a page with a sticky element

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to interactive elements inside the sticky element I SEE focus is visually indicated in a logical order in relation to the whole page

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND

   - I use the tab key to move focus to interactive elements inside the sticky element
      - I HEAR interactive elements are read in logical order in relation to the whole page

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND

   - I swipe to the sticky element
      - I HEAR Interactive elements are read in logical order in relation to the whole page


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/sticky-element](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/sticky-element)

<!-- ## Developer Notes

### Name

- Typically doesn’t have a name or description since there must be only one instance per page. -->

## Videos

### Android Talkback
<video controls>
  <source src="media/video/web/sticky/Android Talkback-sticky-content.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### iOS Voiceover
<video controls>
  <source src="media/video/web/sticky/iOS Voiceover-sticky-content.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### MacOS Voiceover Safari
<video controls>
  <source src="media/video/web/sticky/MacOS-Voiceover-Safari-sticky-content.webm" type="video/webm">
  Your browser does not support the video tag.
</video>



## Pitfalls of sticky content

Unless you have a really good reason, it's best to avoid sticking content to the bottom (or top) of the page. While it seems like an obvious solution, without user testing in production environments you won't know how people are really going to interact with it.

### Ask the following questions first

- Where will this appear in the actual DOM (code) order?
  - If it's injected at the top or bottom of the content, will it be cumbersome or impossible for someone using a keyboard or screen reader to locate it?
- Is it preferable to place this content in multiple locations on the page?
  - A "Buy now" button can appear more than once in the page.
- Will this content be perceived as an ad and thus ignored by the customer?
  - We've trained people for years to ignore sticky content in their browser offering app downloads and other ads. Why is your popup sticky content any different?

## Code examples

### Place the element in logical DOM order

This semantic HTML appears in logical order in the page. 

It uses only CSS (no JavaScript) to float content as desired.

```html

<div class="sticky-wrapper">
  <div class="promo-bar sticky tops">
    <button>Upgrade today</button>
    <p>Content that sticks to the top</p>
  </div>
  <div class="vertical-spacer">
    <p><a href="/checklist-web/html/">Web page content</a> 
    and <a href="/checklist-web/link/">links</a>
    or <a href="/checklist-web/button/">buttons</a>
    will be <a href="/how-to-test/">read</a>  
    in <a href="/checklist-web/html/">DOM (code) order</a>.</p>
  </div>
</div>
<div class="promo-bar">
  <button class="secondary">See more</button>
  <p>Content that is <em>not</em> sticky</p>
</div>
<div class="vertical-spacer vertical-spacer--less">
</div>
<div class="sticky-wrapper">
  <div class="vertical-spacer">
    <p><a href="/checklist-web/html/">Web page content</a>
    and <a href="/checklist-web/link/">links</a>
    or <a href="/checklist-web/button/">buttons</a>
    will be <a href="/how-to-test/">read</a>  
    in <a href="/checklist-web/html/">DOM (code) order</a>.</p>
  </div>
  <div class="promo-bar sticky">
    <button>Buy now</button>
    <p>Content that sticks to the bottom</p>
  </div>
</div>
```


<example>
<div class="sticky-wrapper">
  <div class="promo-bar sticky top">
    <button class="Magentaa11y-button Magentaa11y-button--primary">Upgrade today</button>
    <p>Content that sticks to the top</p>
  </div>
  <div class="vertical-spacer">
    <p><a href="/checklist-web/html/">Web page content</a> 
    and <a href="/checklist-web/link/">links</a>
    or <a href="/checklist-web/button/">buttons</a>
    will be <a href="/how-to-test/">read</a>  
    in <a href="/checklist-web/html/">DOM (code) order</a>.</p>
  </div>
</div>
<div class="promo-bar">
  <button class="Magentaa11y-button Magentaa11y-button--primary">See more</button>
  <p>Content that is <em>not</em> sticky</p>
</div>
<div class="vertical-spacer vertical-spacer--less">
</div>
<div class="sticky-wrapper">
  <div class="vertical-spacer">
    <p><a href="/checklist-web/html/">Web page content</a>
    and <a href="/checklist-web/link/">links</a>
    or <a href="/checklist-web/button/">buttons</a>
    will be <a href="/how-to-test/">read</a>  
    in <a href="/checklist-web/html/">DOM (code) order</a>.</p>
  </div>
  <div class="promo-bar sticky">
    <button class="Magentaa11y-button Magentaa11y-button--primary">Buy now</button>
    <p>Content that sticks to the bottom</p>
  </div>
</div>
</example>


## Developer notes

### Group

- Must appear in logical page order within the page.
- Do not place it at the actual end or beginning of the DOM
- To ensure that controls which receive keyboard focus are not concealed by a sticky container, utilize CSS [scroll-padding](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding) or [scroll-margin](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin).