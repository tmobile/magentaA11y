## General Notes

How to test an expander accordion

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test an expander accordion

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Focus visibly moves to the expander
   - Spacebar: Toggles the expander
   - Enter: Toggles the expander

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the element, expresses its state (expanded/collapsed)
   - Doubletap: Toggles the expander

3. Listen to screenreader output on all devices

   - Name: Its purpose is clear
   - Role: It identifies its role of a button or details
   - State: It expresses its state (expanded/collapsed)

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/expander-accordion](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/expander-accordion)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test an expander accordion

GIVEN THAT I am on a page with an expander accordion

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to an expander I SEE focus is strongly visually indicated
   - THEN when I use the spacebar and/or enter key to activate the expander I SEE the hidden content is revealed

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use the tab key to move focus to an expander
      - I HEAR its purpose is clear
      - I HEAR it identifies its role of a button or details
      - I HEAR it expresses its state (expanded/collapsed)
   - THEN when I use the spacebar and/or enter key to activate the expander I HEAR the hidden content is revealed

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to focus on a button
      - I HEAR its purpose is clear
      - I HEAR it identifies its role of a button or details
      - I HEAR it expresses its state (expanded/collapsed)
   - THEN when I doubletap with the button in focus I HEAR the intended action occurs

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/expander-accordion](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/expander-accordion)

## Code examples

### Custom expander accordion (ARIA Disclosure Widget)
This custom expander uses a semantic button with `aria-expanded` with additional scripting to toggle content and states.

```html
<div class="expander-group">
  <button class="expander-toggle" aria-expanded="false">
    About Sesame Street
  </button>
  <div class="expander-content">
    Sesame Street is an American educational 
    children's television series that combines 
    live-action, sketch comedy, animation, and puppetry.
  </div>
</div>
```

<!-- TODO: This example needs more styles support

<example>
<div class="expander-group">
  <button class="expander-toggle" aria-expanded="false">
    About Sesame Street
  </button>
  <div class="expander-content">
    Sesame Street is an American educational 
    children's television series that combines 
    live-action, sketch comedy, animation, and puppetry.
  </div>
</div>
</example> -->

## Native HTML expander accordion (details/summary)
   - This semantic HTML contains all accessibility features by default with no scripting required.
   - It uses [CSS pseudo attributes](https://github.com/tmobile/magentaA11y/blob/main/_sass/modules/_details-summary.scss) to create the expanded/collapsed indicator, no Javascript.

**Note:** Due to known accessibility support issues in recent versions of iOS, `<details>` is not recommended for expander accordions. We recommend the use of an ARIA Disclosure Widget which has very robust support.

```html
<details>
  <summary>
    About Sesame Street
  </summary>
    Sesame Street is an American educational 
    children's television series that combines 
    live-action, sketch comedy, animation, and puppetry.
</details>
```

<example>
<details>
  <summary>
    About Sesame Street
  </summary>
    Sesame Street is an American educational 
    children's television series that combines 
    live-action, sketch comedy, animation, and puppetry.
</details>
</example>

## Developer notes

### Name
   - Inner text must describe the purpose.

### Role
   - Native button identifies as button by default.
   - If using custom elements, use `role="button"` and `tabindex="0"`.

### Group
   - You *can* use `aria-controls="popupId"`, but it is not well supported.

### State
   - Expander accordions use `aria-expanded` which toggles between "true" and "false" when the content is expanded or collapsed.

### Focus
   - Focus must be visible.

## Design notes

   - [Nielsen Norman Group study](https://www.nngroup.com/articles/accordion-icons/): The caret icon most clearly indicated to users that it would open an accordion in place, rather than linking directly to a new page.
   - Not all users will notice there is hidden content or understand how these work. For this reason, you should only use them in specific situations and if user research supports it.
   - [ARIA Disclosure Widget](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)

## Further Reading
   - [WCAG 2.1.1 Keyboard (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard)
   - [WCAG 4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)
