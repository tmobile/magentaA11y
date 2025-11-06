## General Notes

How to test an animation

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test an animation

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Where applicable, focus moves directly to pause/play/hide controls
   - Spacebar: Activates the control
   - Enter: Activates the control
   - Reduced motion settings: Animation is disabled or reduced

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the control
   - Doubletap: Activates the button

3. Listen to screenreader output on all devices

   - Name: The control's purpose (pause/play/hide) is clear
   - Role: It identifies its role of button
   - State: The control expresses its state if applicable (pressed, expanded)

4. Device OS Settings
   - Reduced motion: Large motion, animations or effects are reduced or eliminated

Full information: [https://www.magentaa11y.com/#/web-criteria/component/animation](/web-criteria/component/animation)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test an animation

GIVEN THAT I am on a page with an animation

1. Keyboard for mobile & desktop

   - WHEN I use tab key to move focus to the pause/play/hide controls I SEE the control is strongly visibly focused
   - THEN when I use the spacebar or enter key to activate the control I SEE the intended action occurs
   - THEN when I use the device's reduced motion settings I SEE the animation is disabled or reduced

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use tab key to move focus to the pause/play/hide controls
      - I HEAR the control's purpose (pause/play/hide) is clear
      - I HEAR it identifies its role of button
      - I HEAR the control expresses its state if applicable (pressed, expanded)
   - THEN when I use the spacebar or enter key to activate the control I HEAR the intended action occurs
   - THEN when I use the device's reduced motion settings I HEAR the animation is disabled or reduced

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to move focus to the pause/play/hide controls
      - I HEAR the control's purpose (pause/play/hide) is clear
      - I HEAR it identifies its role of button
      - I HEAR the control expresses its state if applicable (pressed, expanded)
   - THEN when I doubletap to activate control I HEAR the intended action occurs
   - THEN when an animation is focused I HEAR an alternative method of consumption or interaction is available

4. Device OS Settings

   - WHEN I use reduced motion THEN I see large motion, animations or effects are reduced or eliminated

Full information: [https://www.magentaa11y.com/#/web-criteria/component/animation](/web-criteria/component/animation)

## Developer Notes

### Animations (like animated gifs or animated SVG) can be accessible if:
- it automatically stops after 5 seconds or 
- if users are presented with an intuitive way to pause it
- it has `alt` text or an alternative method of consumption is available

## Code examples

### Allow animations to be disabled with CSS

People with vestibular disorders can be made ill by sweeping animations on screen.

It is important to change or disable animations when device reduce motion settings are activated.

This can be accomplished via CSS media query.

<!-- TODO: the colors displaying CSS code snippet needs updated styles to pass color contrast -->

```CSS
.animation-example {
   background-color: green;
   animation: bounce 2s linear infinite both;
   width: 100px;
   height: 100px;
   border-radius: 1em;

   /* detect user preference for reduced motion */
   @media (prefers-reduced-motion: reduce) {
      animation-name: dissolve;
   }

   /* basic bounce animation */
   @keyframes bounce {
      0% { transform: scale(1); }
      25% { transform: scale(.9); }
      50% { transform: scale(1); }
      75% { transform: scale(1.1); }
      100% { transform: scale(1); }
   }

   /* dissolve animation for reduced motion */
   @keyframes dissolve {
      0% { background-color: green; }
      50% { background-color: darkgreen; }
      100% { background-color: green; }
   }
}
``` 

```html
<div class="animation-example">
   <span class="hidden-visually">Animated element</span>
</div>
```

### Bouncy box
If your device is set to reduce motion, the animation will softly fade from one color to the next instead of bounce; otherwise it will bounce.

<example>
   <div class="animation-example-wrapper">
      <label for="reduce-motion">
         <input type="checkbox" id="reduce-motion"> Pause animation
      </label>
      <div class="animation-example">
         <span class="hidden-visually">Animated element</span>
      </div>
   </div>
</example> 

 ### Detecting with JavaScript
 User preferences for reduced motion can also be detected with JavaScript by using the `matchMedia` method. The method returns a `MediaQueryList` object that can be used to check for the user's preference for reduced motion.

```javascript
const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (isReduced) {
   // The user has requested reduced motion
} else {
   // The user has not requested reduced motion
}
```

## Further Reading
- [MDN - matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
- [MDN - prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- [WCAG 2.2.1 Timing Adjustable (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable)
- [WCAG 2.2.2 Pause, Stop, Hide (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- [WCAG 2.3.1 Three Flashes or Below Threshold (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold)
- [WCAG 2.3.3 Animation from Interactions (Level AAA)](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
