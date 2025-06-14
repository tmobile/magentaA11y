## General Notes

How to test a strikethrough element

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a strikethrough element

1. Test keyboard only, then screen reader + keyboard actions

      - Arrow: Browses the content

2. Test mobile screenreader gestures

      - Swipe: The content makes sense and is in a logical order

3. Listen to screenreader output on all devices

      - Name: The content makes sense and is in a logical order

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/strikethrough-content](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/strikethrough-content)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a strikethrough element

GIVEN THAT I am on a page with strikethrough content

1. Keyboard for mobile & desktop

      - WHEN I use the arrow key to browse the content I SEE the content comes into view

2. Desktop screenreader

      - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
      - I use the arrow key to browse the content
         - I HEAR the content makes sense and is in a logical order

3. Mobile screenreader

      - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
      - I swipe to browse the content
         - I HEAR the content makes sense and is in a logical order

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/strikethrough-content](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/strikethrough-content)

## Developer notes

- Do not use `aria-label` to add context. Some screenreaders will not read `aria-label` from non-interactive components.

## Code examples

```html
<p>Get a $10/mo discount with autopay</p>
<s class="h-bravo">
  <!-- Give context to the first number -->
  <span class="hidden-visually">
    Original price:
  </span>
  $50
  <!-- Give context to the first number -->
  <span class="hidden-visually">
    /mo
  </span>
</s>
<span class="h-bravo">
  <!-- Give context to the second number -->
  <span class="hidden-visually">
    Price with $10 autopay discount
  </span>
  $40/mo
</span>
```

<example>
<p>Get a $10/mo discount with autopay</p>
<s class="h-bravo">
  <!-- Give context to the first number -->
  <span class="hidden-visually">
    Original price:
  </span>
  $50
  <!-- Give context to the first number -->
  <span class="hidden-visually">
    /mo
  </span>
</s>
<span class="h-bravo">
  <!-- Give context to the second number -->
  <span class="hidden-visually">
    Price with $10 autopay discount
  </span>
  $40/mo
</span>
</example>
