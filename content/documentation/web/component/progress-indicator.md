## General Notes

How to test a progress indicator

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a progress indicator

1. Test keyboard only, then screen reader + keyboard actions

   - Arrow keys: Content within the progress indicator is browsed in a logical order

2. Test mobile screenreader gestures

   - Swipe: Content within the progress indicator is browsed in a logical order

3. Listen to screenreader output on all devices

   - Name: The progress indicator purpose is clear
   - Role: It identifies itself as some kind of progress indicator
   - State: It expresses its current value if it dynamically changes

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/progress-indicator](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/progress-indicator)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a progress indicator

GIVEN THAT I am on a page with a progress indicator

1. Keyboard for mobile & desktop

   - WHEN I use the arrow key to browse to a progress bar I SEE the progress bar comes into view

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use the arrow key to browse to a progress bar
      - I HEAR the progress indicator purpose is clear
      - I HEAR it identifies itself as some kind of progress indicator
      - I HEAR it expresses its current value if it dynamically changes

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to browse to a progress bar
      - I HEAR the progress indicator purpose is clear
      - I HEAR it identifies itself as some kind of progress indicator
      - I HEAR it expresses its current value if it dynamically changes

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/progress-indicator](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/progress-indicator)

## Developer Notes

### Name
   - Use `aria-label="Progress bar name"` when there is not a visible title.

### Role
   - Use `role="progressbar"`.

### Group
   - If the progress bar is describing another region of the page, use `aria-describedby="progressbar-id"` with its paired `id="progressbar-id"` to connect the two elements.

### State
   - The state will be read out to the screen reader user by default.

### Focus
   - Progress bar is not usually focusable.

## Code examples

### Progress bar

There are many variations of progress bars and loading spinners, some of which may not need to be a true progress bar at all.

   - [WAI-ARIA Multi-page form examples](https://www.w3.org/WAI/tutorials/forms/multi-page/)

Support varies by screen reader. It's recommended to add full ARIA attributes, even when using a `<progress>` element.

### Use semantic HTML

   - This semantic HTML contains all accessibility features by default. 
   - While not a requirement, it is focusable to increase discoverability.

```html
<progress role="progressbar"
          id="progress"
          tabindex="0"
          class="progress"
          aria-label="File upload"
          value="50"
          aria-valuemin="0"
          aria-valuenow="50"
          aria-valuemax="100"
          max="100">
```

<example>
<progress role="progressbar"
          id="progress"
          tabindex="0"
          class="progress"
          aria-label="File upload"
          value="50"
          aria-valuemin="0"
          aria-valuenow="50"
          aria-valuemax="100"
          max="100">
</example>

### Spinner loading takeover

   - There are many variations of loaders and spinners.
   - While a takeover spinner modal is present, other content on the page must be inert.

#### Use semantic HTML

   - This semantic HTML contains all accessibility features using a dialog.
      - The `<progress>` element can be used to describe the state.

#### Ensure content is ready before being available

   - If content is being loaded slowly behind the spinner inside an `aria-live` region, use `aria-busy="true"` to keep it from being announced until the update is complete.

```html
<!-- Use aria-busy if content doesn't all load at once -->
<div id="really-slow-app" 
     aria-live="polite" 
     aria-busy="false">
     
  <button id="showModal">
    Launch spinner
  </button>

  <dialog role="dialog"
          class="takeover"
          id="modal"
          tabindex="-1"
          aria-modal="true"
          aria-labelledby="modal-title">
    <section>
      <div class="progress-spinner">
        <progress role="progressbar" 
                  id="modal-title" 
                  tabindex="0" 
                  aria-label="Loading">
      </div>
    </section>
  </dialog>
</div>
```

<!-- TODO: the button should open this modal - should we add text in the loading modal that says you can use your ESCAPE key to close the modal for those who are unfamiliar?

<example>
<!-- Use aria-busy if content doesn't all load at once
<div id="really-slow-app" 
     aria-live="polite" 
     aria-busy="false">
     
  <button id="showModal">
    Launch spinner
  </button>

  <dialog role="dialog"
          class="takeover"
          id="modal"
          tabindex="-1"
          aria-modal="true"
          aria-labelledby="modal-title">
    <section>
      <div class="progress-spinner">
        <progress role="progressbar" 
                  id="modal-title" 
                  tabindex="0" 
                  aria-label="Loading">
      </div>
    </section>
  </dialog>
</div>
</example> -->

### Inline dynamic loading waiting example

This example dynamically injects progress updates that will be read by a screen reader:
   - `aria-busy="true"` indicates that the region is busy
   - `aria-describedby` allows the current progress to be read when the button is focused
   - `aria-disabled` reinforces that the save action is incomplete
   - `role="status"` has an implicit `aria-live="polite"` and `aria-atomic="true"`, meaning the entire content of the status will be read on each update

```html
<div 
  id="slow-app"
  aria-live="polite">
  
  <button 
    id="trigger-progressbar"
    aria-describedby="progress-busy"
    aria-disabled="false">
      Save
  </button>

  <div class="progress-busy inert" role="status">
    <span id="progress-busy">
    </span> 
  </div>
</div>
```

<!-- TODO: demo doesn't currently work

<example>
<div 
  id="slow-app"
  aria-live="polite">
  
  <button 
    id="trigger-progressbar"
    aria-describedby="progress-busy"
    aria-disabled="false">
      Save
  </button>

  <div class="progress-busy inert" role="status">
    <span id="progress-busy">
    </span> 
  </div>
</div>
</example> -->

## Further Reading
   - [WCAG 1.1.1 Non-text Content (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html)
   - [WCAG 1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)
   - [WCAG 1.4.11 Non-text Contrast (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
   - [WCAG 4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)
   - [WCAG 4.1.3 Status Messages (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)
