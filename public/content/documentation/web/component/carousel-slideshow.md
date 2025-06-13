## General Notes

How to test a carousel/slideshow

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a carousel/slideshow

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Focus moves to carousel controls (forward, backward, pause/play, stop)
   - Spacebar: Activates the button
   - Enter: Activates the button

2. Test mobile screenreader gestures

   - Swipe: Focus moves within the carousel
   - Doubletap: This typically activates most elements

3. Listen to screenreader output on all devices

   - Name: Control name and purpose is clear
   - Role: Control identifies itself as a button
   - Group: The number of slides and current position in the carousel is indicated

4. Device OS settings
   - Reduced motion: Carousel does not auto-advance, motion transitions are disabled


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/carousel-slideshow](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/carousel-slideshow)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a header

GIVEN THAT I am on a page with a carousel/slideshow

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to carousel controls (forward, backward, pause/play, stop) I SEE focus is strongly visually indicated
      - THEN when I use the spacebar or enter key I SEE the intended action occurs

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND I use the tab key to move focus to carousel controls (forward, backward, pause/play, stop)
      - I HEAR Control name and purpose is clear
      - I HEAR Control identifies itself as a button
      - I HEAR The number of slides and current position in the carousel is indicated
      - THEN when I use the spacebar or enter key I HEAR the intended action occurs

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND I swipe to move focus to carousel controls (forward, backward, pause/play, stop)
      - I HEAR Control name and purpose is clear
      - I HEAR Control identifies itself as a button
      - I HEAR The number of slides and current position in the carousel is indicated
      - THEN when I doubletap I HEAR the intended action occurs

4. Device OS settings

   - WHEN I use reduced motion THEN I see Carousel does not auto-advance, motion transitions are disabled


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/carousel-slideshow](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/carousel-slideshow)

## Our General Advice

Think carefully before you use a carousel, slideshow, or multi-slide component. Consider another way to present the information.

### Carousels go against many usability and accessibility best practices

Wherever possible, do not use carousels. Consider whether you can present content in another way, such as a list. 

Carousels are complex components that are hard to make accessible, and by their nature, go against many usability and accessibility best practices, such as:

- Auto-advancing carousels are never allowed as it will violate [WCAG 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html). Additionally, auto-advancing can be incredibly distracting for many users, and can be disruptive for screen reader users.
- Carousels are a visual-first design that is complex to relay to screen readers the proper structure and information architecture.
- Studies have shown that most people do not interact with carousels, or advance any slides. (Source: [Norman Nielsen article](https://www.nngroup.com/articles/designing-effective-carousels/))

### Alternatives to Carousels

Some alternative components to a Carousel to consider are:

- A multi-step form
  - This can work because it helps people stay on task.
- A list of easily recognizable structure, like "US Presidents"
  - This can work because the scope and contents are predictable.
- Highlighted customer reviews
  - This can work to build trust because the contents are predictable and a motivated user seeking social proof may be willing to navigate the carousel.

## Code examples

### Use semantic HTML

This is one example of an accessible carousel that uses HTML semantics and ARIA:

   - The carousel is grouped and has a name
   - The ordered list structure provides context for how many slides and which number slide someone is on.
   - No focus management is happening. We have chosen to NOT move a user from the next/previous buttons and allow them to browse at their own pace.
   - This example does not make use of a live announcing region, but in some cases, that may be helpful.

```html
<h2 id="headingCarousel">Phones available</h2>
<section id="carousel" aria-label="Carousel" aria-labelledby="headingCarousel carousel" class="carousel">

  <div class="flex">
      <div>
         <button class="Magentaa11y-button Magentaa11y-button--primary button-control button-control--left"><span aria-hidden="true">&lt;&lt;</span>
            <span class="hidden-visually">Previous 3 slides</span>
         </button>
         <button class="Magentaa11y-button Magentaa11y-button--primary button-control button-control--right"><span aria-hidden="true">&gt;&gt;</span>
            <span class="hidden-visually">Next 3 slides</span>
         </button>
      </div>
    <ol class="list" role="list"> 
<!--  Need role="list" because of weird Voiceover bug: https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html      -->
      <li><img src="https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGlwaG9uZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" alt="iPhone 14" /></li>
      <li><img src="https://images.unsplash.com/photo-1583574333311-3a86605c76b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2068&q=80" alt="Samsung Galaxy phone" /></li>
      <li><img src="https://images.unsplash.com/photo-1612442443556-09b5b309e637?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" alt="Google Pixel phone" /></li>
    </ol>
  </div>
</section>
```

<example>
   <h2 id="headingCarousel">Phones available</h2>
   <section id="carousel" aria-label="Carousel" aria-labelledby="headingCarousel carousel" class="carousel">
      <div class="flex">
         <div class="button-container">
            <button class="Magentaa11y-button Magentaa11y-button--primary button-control button-control--left"><span aria-hidden="true">&lt;&lt;</span>
               <span class="hidden-visually">Previous 3 slides</span>
            </button>
            <button class="Magentaa11y-button Magentaa11y-button--primary button-control button-control--right"><span aria-hidden="true">&gt;&gt;</span>
               <span class="hidden-visually">Next 3 slides</span>
            </button>
         </div>
         <ol class="list" role="list"> 
      <!--  Need role="list" because of weird Voiceover bug: https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html      -->
            <li><img src="https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGlwaG9uZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" alt="iPhone 14" /></li>
            <li><img src="https://images.unsplash.com/photo-1583574333311-3a86605c76b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2068&q=80" alt="Samsung Galaxy phone" /></li>
            <li><img src="https://images.unsplash.com/photo-1612442443556-09b5b309e637?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" alt="Google Pixel phone" /></li>
         </ol>
      </div>
   </section>
</example>

## Related WCAG
- [WCAG 1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)
- [WCAG 2.1.1 Keyboard (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html)
- [WCAG 2.2.2 Pause, Stop, Hide (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html)
- [WCAG 4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value)
