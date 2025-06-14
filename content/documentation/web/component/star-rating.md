## General Notes

How to test a star rating input

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a star rating input

1. Test keyboard only, then screen reader + keyboard actions

      - Tab: Focus visibly moves to the checked radio button in the group. If a radio button is not checked, focus moves to the first radio button in the group.
      - Spacebar: If the radio button with focus is not checked, changes the state to checked.  Otherwise, does nothing.
      - Arrow-keys: Moves focus to and checks the previous or next radio button in the group

2. Test mobile screenreader gestures

      - Swipe: Focus moves to the element, expresses its state
      - Doubletap: If the radio button with focus is not checked, changes the state to checked. Otherwise, does nothing.

3. Listen to screenreader output on all devices

      - Name: Its label and purpose is clear
      - Role: It identifies itself as a radio option
      - Group: Each option has an associated label and the radio group name
      - State: It expresses its state (selected, checked, disabled)

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/star-rating](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/star-rating)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a star rating input

GIVEN THAT I am on a star rating input

1. Keyboard for mobile & desktop

      - WHEN I use the tab key to move focus to a radio group I SEE focus is strongly visually indicated on the first unselected option or the selected option
      - THEN when I use the spacebar to activate the radio button I SEE the radio button with focus change state to selected.
      - THEN when I use the arrow keys to focus radio button I SEE the state is changed

2. Desktop screenreader

      - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
      - I use the tab key to move focus to a radio group
        - I HEAR its label and purpose is clear
        - I HEAR it identifies itself as a radio option
        - I HEAR each option has an associated label and the radio group name
        - I HEAR it expresses its state (selected, checked, disabled)
      - THEN when I use the spacebar to activate the radio button I HEAR the radio button with focus change state to selected.
      - THEN when I use the arrow keys to focus radio button I HEAR the state is changed

3. Mobile screenreader

      - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
      - I swipe to focus on a radio button
         - I HEAR its label and purpose is clear
         - I HEAR it identifies itself as a radio option
         - I HEAR each option has an associated label and the radio group name
         - I HEAR it expresses its state (selected, checked, disabled)
      - Then when I doubletap with the radio in focus I HEAR the state is changed


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/star-rating](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/star-rating)




## Code examples

### Use semantic HTML
This semantic HTML contains all accessibility features by default.





### As radio group

This radio group uses CSS to reverse the visual order of the radio inputs while preserving accessibility.

```html
<fieldset>
  <legend>
    Rate this product
  </legend>
  <div class="star-rating">
    <input type="radio" class="star" name="star" id="star-1">
    <label for="star-1">
      <span class="hidden">1 star</span>
    </label>
    <input type="radio" class="hidden-visually star" name="star" id="star-2">
    <label for="star-2">
      <span class="hidden">2 star</span>
    </label>
    <input type="radio" class="star" name="star" id="star-3">
    <label for="star-3">
      <span class="hidden">3 star</span>
    </label>
    <input type="radio" class="star" name="star" id="star-4">
    <label for="star-4">
      <span class="hidden">4 star</span>
    </label>
    <input type="radio" class="star" name="star" id="star-5">
    <label for="star-5">
      <span class="hidden">5 star</span>
    </label>
  </div>
</fieldset>
```

<!-- TODO - come back and work on why the order is reversed plus work on styling -->

<example>
  <fieldset>
    <legend>
      Rate this product
    </legend>
    <div class="star-rating" role="radiogroup">
      <input type="radio" class="hidden-visually star" name="star" id="star-1">      
      <label for="star-1">
        <span class="hidden-visually">1 star</span>
      </label>
      <input type="radio" class="hidden-visually star" name="star" id="star-2" data-icon="tablet">
      <label for="star-2">
        <span class="hidden-visually">2 stars</span>
      </label>
      <input type="radio" class="hidden-visually star" name="star" id="star-3">
      <label for="star-3">
        <span class="hidden-visually">3 stars</span>
      </label>
      <input type="radio" class="hidden-visually star" name="star" id="star-4">
      <label for="star-4">
        <span class="hidden-visually">4 stars</span>
      </label>
      <input type="radio" class="hidden-visually star" name="star" id="star-5">
      <label for="star-5">
        <span class="hidden-visually">5 stars</span>
      </label>
    </div>
  </fieldset>
</example>

### Displaying star ratings

The element must clearly express the rating and scale.

```html
  <p class="stars">
    <span class="scale">
    </span>
    <span class="rating">
    </span>
    <span class="hidden-visually">
      Rating: 4 out of 5 stars
    </span>
  </p>
```

<example>
<p class="stars">
    <span class="scale">
    </span>
    <span class="rating">
    </span>
    <span class="hidden-visually">
      Rating: 4 out of 5 stars
    </span>
  </p>
</example>

