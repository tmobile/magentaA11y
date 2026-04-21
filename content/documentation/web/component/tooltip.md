## General Notes

How to test a tooltip

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a tooltip

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Focus visibly moves to the tooltip button, and the tooltip appears.
   - Spacebar: Activates the button (if applicable) or retains the tooltip visibility.
   - Enter: Activates the button (if applicable) or retains the tooltip visibility.

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the tooltip button, tooltip content is announced.
   - Doubletap: Activates the button (if applicable).

3. Listen to screenreader output on all devices

   - Name: The accessible name of the tooltip button is clear.
   - Role: It identifies as a button.
   - Tooltip: The tooltip content is read aloud (via `aria-describedby` or role="tooltip").
   - Action: It is clear whether the button performs an action or is static.

Full information: [https://www.magentaa11y.com/#/web-criteria/component/tooltip](https://www.magentaa11y.com/#/web-criteria/component/tooltip)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a tooltip

GIVEN THAT I am on a page with a tooltip button

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to a tooltip button
      - I SEE focus is strongly visually indicated  
        AND I SEE a tooltip appears after a short delay
   - THEN when I use the spacebar and/or enter key to activate the button  
     I SEE the intended action occurs OR the tooltip remains visible without triggering an action

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver)  
     AND I use the tab key to move focus to a tooltip button
      - I HEAR the accessible name of the button
      - I HEAR the tooltip content (if implemented using `aria-describedby` or role="tooltip")
      - I HEAR whether the button is actionable or static
   - THEN when I use the spacebar and/or enter key to activate the tooltip button  
     I HEAR the intended action occurs (if applicable)

3. Mobile screenreader

   - WHEN I use a mobile screenreader (TalkBack, VoiceOver)  
     AND I swipe to focus on a tooltip button
      - I HEAR the accessible name of the button
      - I HEAR the tooltip content (if implemented using `aria-describedby` or role="tooltip")
      - I HEAR whether the button is actionable or static
   - THEN when I doubletap with the tooltip button in focus  
     I HEAR the intended action occurs (if applicable)


Full information: [https://www.magentaa11y.com/#/web-criteria/component/tooltip](https://www.magentaa11y.com/#/web-criteria/component/tooltip)

## Developer Notes

### Recommendation: Avoid Tooltips When Possible
- Tooltips often create accessibility and usability challenges across devices and user groups.
- They can be hard to activate, especially on touch screens or for users with motor impairments.
- They increase cognitive load and may not be reliably read by all screen readers.
- Tooltips should never be the sole method of conveying essential information.
- Instead, use inline explanations, modals, toggletips, or accordions if possible.
- Supporting resources:
   - [WAI-ARIA Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
   - [Tooltips in WCAG 2.1 - Sarah Higley](https://sarahmhigley.com/writing/tooltips-in-wcag-21/#best-practices-summary)
   - [TPGi - Title Attribute Use and Abuse](https://www.tpgi.com/html5-accessibility-chops-title-attribute-use-and-abuse/)

### Name
- Tooltip button must have a clear, descriptive label using inner text or `aria-label`.
- If the button uses an icon only, use `aria-label` to describe the purpose.
- Avoid duplicating inner text and `aria-label` as screen readers may announce both.

### Role
- Use a native `<button>` element to benefit from built-in accessibility.
- If a custom element is used (e.g., `<div>`), apply `role="button"` and `tabindex="0"`.
- Tooltip content may use `role="tooltip"`, but this must be paired with proper focus or hover activation.

### Tooltip Content
- Tooltip must never contain interactive content (links, inputs, buttons, etc.).
- Tooltip content should be concise, non-essential, and provide alternate access to the same information elsewhere.
- Use `aria-describedby` to associate tooltip text with the control if tooltip is persistently available via focus.

### Activation & Behavior
- Tooltip should be triggered by `hover`, `focus`, or both.
- Tooltip must appear with a small delay and disappear on `blur`, `mouseout`, or `Escape` key.
- If tooltip appears on click (e.g., toggletip), ensure `aria-expanded` is managed and state is visually and programmatically indicated.

### Positioning & Visibility
- Tooltip must be visually connected to the triggering element.
- It must not obscure critical content.
- Tooltip must meet minimum color contrast requirements (4.5:1 for text).

### Focus
- Tooltip should not receive focus.
- Focus must remain on the triggering control.

### Mobile Considerations
- Tooltips are difficult to activate on mobile.
- Avoid tooltip use on mobile; use inline explanations or toggletips instead.
- If absolutely required, ensure tap reveals tooltip in an accessible way.

### Accessibility Attributes
- `aria-describedby` to link tooltip content (if focus-based)
- `aria-label` for icon-only buttons
- `role="tooltip"` only when used with appropriate ARIA practices
- `aria-expanded` for toggletip-style tooltip buttons
