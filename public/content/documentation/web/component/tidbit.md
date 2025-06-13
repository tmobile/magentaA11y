## General Notes

How to test a tidbit

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a tidbit

1. Test keyboard only, then screen reader + keyboard actions

   - Arrow-keys: The Tidbit scrolls into view.
   - Tab-key: The focusable link (if present) receives keyboard focus - there is a highly visible focus ring.

2. Test mobile screenreader gestures

   - Swipe: The individual contents of the Tidbit are accessed in this order: Icon, heading, paragraph, link.

3. Listen to screenreader output on all devices

   - Name: The screen reader announces the text alternative for the info icon. Such as "Info", "Error", "Caution", or "Success". 
   - Description: The screen reader announces the visual label for any nested controls and any additional context (e.g. "Learn more Cats are amazing creatures"). _Note:_ Some screen readers require different navigational techniques to get the additional context to announce.
   - Role: It identifies the info icon as an image and the Tidbit heading as a heading.
   - Group: There is no grouping for the Tidbit.

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/tidbit](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/tidbit)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a tidbit

GIVEN THAT I am on a page with a tidbit

1. Keyboard for mobile & desktop

   - WHEN I use the arrow keys I SEE the Tidbit scrolls into view
   - WHEN when I use the tab key I SEE the focusable link (if present) receives keyboard focus - there is a highly visible focus ring

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use the arrow keys
      - I HEAR the screen reader announces the text alternative for the info icon, such as "Info", "Error", "Caution", or "Success"
      - I HEAR the screen reader announces the visual label for any nested controls and any additional context (e.g. "Learn more Cats are amazing creatures"). _Note:_ Some screen readers require different navigational techniques to get the additional context to announce
      - I HEAR it identifies the info icon as an image and the Tidbit heading as a heading
      - I HEAR there is no grouping for the Tidbit
   - WHEN when I use the tab key I HEAR the focusable link (if present) receives keyboard focus - there is a highly visible focus ring

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to contents of the Tidbit are accessed in this order: Icon, heading, paragraph, link
      - I HEAR the screen reader announces the text alternative for the info icon, such as "Info", "Error", "Caution", or "Success"
      - I HEAR the screen reader announces the visual label for any nested controls and any additional context (e.g. "Learn more Cats are amazing creatures"). _Note:_ Some screen readers require different navigational techniques to get the additional context to announce
      - I HEAR it identifies the info icon as an image and the Tidbit heading as a heading
      - I HEAR there is no grouping for the Tidbit

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/tidbit](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/tidbit)

## Code examples

### Use semantic HTML
Typical Tidbit markup consists of an SVG icon, heading, paragraph text, and a link.

### Standard Tidbit
```html
<div class="tidbit">
    <div class="icon">
        <svg role="img" aria-label="Info" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
    </div>
    <div class="content">
        <h4 id="tidbit-heading">Cats are amazing creatures</h4>
        <p>There are over 500 million domestic cats in the world. Cats and humans have been assocaiated for nearly 10,000 years. Cats conserve energy by sleepign for an average of 13-14 hours a day. Cats have flexible bodies and teeth adapted for hunting small animals, such as mice and rats.</p>
        <a href="#" aria-describedby="tidbit-heading" class="tertiary">Learn more</a>
    </div>
</div>
```

<example class="example example--contains-icon">
    <div class="tidbit">
        <div class="icon">
            <svg role="img" aria-label="Info" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
        </div>
        <div class="content">
            <h4 id="tidbit-heading">Cats are amazing creatures</h4>
            <p>There are over 500 million domestic cats in the world. Cats and humans have been assocaiated for nearly 10,000 years. Cats conserve energy by sleepign for an average of 13-14 hours a day. Cats have flexible bodies and teeth adapted for hunting small animals, such as mice and rats.</p>
            <a href="#" aria-describedby="tidbit-heading" class="tertiary">Learn more</a>
        </div>
    </div>
</example>

#### Standard Tidbit - Developer notes
   - Icon: Ensure that the info icon has a text alternative. Add `role="img"` and `aria-label="Info"` to the SVG. The icon used to convey the purpose of the tidbit should be communicated through the label of the icon, such as "Error", "Caution", "Success", or "Info". 
   - Heading: Ensure the bold text found ahead of the Tidbit paragraph text is a heading element. Consider the hiearchy of the page when choosing the heading level.
   - Link: If the link in the Tidbit is using generic text, such as "Learn more" or "More info", ensure that it is programmatically associated with the nearby heading with `aria-describedby`. The `aria-describedby` value will require the `ID` with a matching unique value on the heading element at the top of the Tidbit.

***

### Tidbit with no heading
```html
<div class="tidbit">
    <div class="icon">
        <svg role="img" aria-label="Info" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
    </div>
    <div class="content">
        <p>There are over 500 million domestic cats in the world. Cats and humans have been assocaiated for nearly 10,000 years. Cats conserve energy by sleepign for an average of 13-14 hours a day. Cats have flexible bodies and teeth adapted for hunting small animals, such as mice and rats.</p>
        <a href="#" class="tertiary">Learn more about cats</a>
    </div>
</div>
```

<example>
    <div class="tidbit">
        <div class="icon">
            <svg role="img" aria-label="Info" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
        </div>
        <div class="content">
            <p>There are over 500 million domestic cats in the world. Cats and humans have been assocaiated for nearly 10,000 years. Cats conserve energy by sleepign for an average of 13-14 hours a day. Cats have flexible bodies and teeth adapted for hunting small animals, such as mice and rats.</p>
            <a href="#" class="tertiary">Learn more about cats</a>
        </div>
    </div>
</example>

#### Tidbit with no heading - Developer notes
   - Icon: Ensure that the info icon has a text alternative. Add `role="img"` and `aria-label="Info"` to the SVG. The icon used to convey the purpose of the tidbit should be communicated through the label of the icon, such as "Error", "Caution", "Success", or "Info". 
   - Link: Ensure the link text is meaningful. Avoid generic "Learn more" "Read more" links when there is no heading.

***

### Tidbit with no heading no tertiary link

```html
<div class="tidbit">
    <div class="icon">
        <svg role="img" aria-label="Info" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
    </div>
    <div class="content">
        <p>There are over 500 million domestic cats in the world. Cats and humans have been assocaiated for nearly 10,000 years. Cats conserve energy by sleepign for an average of 13-14 hours a day. Cats have flexible bodies and teeth adapted for hunting small animals, such as mice and rats.</p>
    </div>
</div>
```

<example>
    <div class="tidbit">
        <div class="icon">
            <svg role="img" aria-label="Info" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
        </div>
        <div class="content">
            <p>There are over 500 million domestic cats in the world. Cats and humans have been assocaiated for nearly 10,000 years. Cats conserve energy by sleepign for an average of 13-14 hours a day. Cats have flexible bodies and teeth adapted for hunting small animals, such as mice and rats.</p>
        </div>
    </div>
</example>

#### Tidbit with no heading no tertiary link - Developer notes
   - A tidbit without an action button is used to provide additional information or context about a particular feature or piece of content.
   - Icon: Ensure that the info icon has a text alternative. Add `role="img"` and `aria-label="Info"` to the SVG. The icon used to convey the purpose of the tidbit should be communicated through the label of the icon, such as "Error", "Caution", "Success", or "Info". 

***

### Tidbit - Error example

```html
<div class="tidbit error">
    <div class="icon">
        <svg role="img" aria-label="Error" height="1.5em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
    </div>
    <div class="content">
        <h4 id="tidbit-heading-error">Abess, The Comedy of Errors</h4>
        <p>And thereof came it that the man was mad:
            The venom clamours of a jealous woman
            Poison more deadly than a mad dog's tooth.
            It seems, his sleeps were hinder'd by thy railing,
            And thereof comes it that his head is light. </p>
        <a href="#" aria-describedby="tidbit-heading-error" class="tertiary">Learn more</a>
    </div>
</div>
```

<example>
    <div class="tidbit error">
        <div class="icon">
            <svg role="img" aria-label="Error" height="1.5em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
        </div>
        <div class="content">
            <h4 id="tidbit-heading-error">Abess, The Comedy of Errors</h4>
            <p>And thereof came it that the man was mad:
                The venom clamours of a jealous woman
                Poison more deadly than a mad dog's tooth.
                It seems, his sleeps were hinder'd by thy railing,
                And thereof comes it that his head is light. </p>
            <a href="#" aria-describedby="tidbit-heading-error" class="tertiary">Learn more</a>
        </div>
    </div>
</example>

### Tidbit - Caution example

```html
<div class="tidbit caution">
    <div class="icon">
        <svg role="img" aria-label="Caution" height="1.5em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
    </div>
    <div class="content">
        <h4 id="tidbit-heading-warning">Polonius, The Tragedy of Hamlet</h4>
        <p>Marry, well bethought!
         'Tis told me he hath very oft of late
         Given private time to you, and you yourself
         Have of your audience been most free and bounteous.
         If it be so- as so 'tis put on me,
         And that in way of caution- I must tell you
         You do not understand yourself so clearly
         As it behooves my daughter and your honour.
         What is between you? Give me up the truth. </p>
        <a href="#" aria-describedby="tidbit-heading-warning" class="tertiary">Learn more</a>
    </div>
</div>
```

<example>
    <div class="tidbit caution">
        <div class="icon">
            <svg role="img" aria-label="Caution" height="1.5em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
        </div>
        <div class="content">
            <h4 id="tidbit-heading-warning">Polonius, The Tragedy of Hamlet</h4>
            <p>Marry, well bethought!
            'Tis told me he hath very oft of late
            Given private time to you, and you yourself
            Have of your audience been most free and bounteous.
            If it be so- as so 'tis put on me,
            And that in way of caution- I must tell you
            You do not understand yourself so clearly
            As it behooves my daughter and your honour.
            What is between you? Give me up the truth. </p>
            <a href="#" aria-describedby="tidbit-heading-warning" class="tertiary">Learn more</a>
        </div>
    </div>
</example>

### Tidbit - Success example

```html
<div class="tidbit success">
    <div class="icon">
        <svg role="img" aria-label="Success" height="1.5em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
    </div>
    <div class="content">
        <h4 id="tidbit-heading-success">That went well!</h4>
        <p>'They met me in the day of success: and I have
         learned by the perfectest report, they have more in
         them than mortal knowledge. When I burned in desire
         to question them further, they made themselves air,
         into which they vanished. Whiles I stood rapt in
         the wonder of it, came missives from the king, who
         all-hailed me 'Thane of Cawdor;' by which title,
         before, these weird sisters saluted me, and referred
         me to the coming on of time, with 'Hail, king that
         shalt be!' This have I thought good to deliver
         thee, my dearest partner of greatness, that thou
         mightst not lose the dues of rejoicing, by being
         ignorant of what greatness is promised thee. Lay it
         to thy heart, and farewell.'</p>
        <a href="#" aria-describedby="tidbit-heading-success" class="tertiary">Learn more</a>
    </div>
</div>
```

<example>
    <div class="tidbit success">
        <div class="icon">
            <svg role="img" aria-label="Success" height="1.5em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
        </div>
        <div class="content">
            <h3 id="tidbit-heading-success">Lady Macbeth, Macbeth</h3>
            <p>'They met me in the day of success: and I have
            learned by the perfectest report, they have more in
            them than mortal knowledge. When I burned in desire
            to question them further, they made themselves air,
            into which they vanished. Whiles I stood rapt in
            the wonder of it, came missives from the king, who
            all-hailed me 'Thane of Cawdor;' by which title,
            before, these weird sisters saluted me, and referred
            me to the coming on of time, with 'Hail, king that
            shalt be!' This have I thought good to deliver
            thee, my dearest partner of greatness, that thou
            mightst not lose the dues of rejoicing, by being
            ignorant of what greatness is promised thee. Lay it
            to thy heart, and farewell.'</p>
            <a href="#" aria-describedby="tidbit-heading-success" class="tertiary">Learn more</a>
        </div>
    </div>
</example>

#### Tidbit with Error or Caution or Success - Developer notes
   - Icon: Ensure that the info icon has a text alternative. Add `role="img"` and `aria-label="Info"` to the SVG. The icon used to convey the purpose of the tidbit should be communicated through the label of the icon, such as "Error", "Caution", or "Success". 
   - Do not use Tidbit error variants as a substitute for traditional inline form field validation errors. Each form field should have its own proper inline error validation.

***

## Developer Notes

### Name
   - The icon is an informative image and should have a text alternative of "Info", "Error", "Caution", or "Success".

### Role
   - The "i" icon is an image due to the use of `role="img"` on the SVG.
   - The bold text found the top of the Tidbit has a role of heading due to the use of an `<h2>` element.

## Documentation
   - [WCAG 2.4.4 Link Purpose](https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html)
   - [WCAG 1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)
