## General Notes

How to test a date picker dialog

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a date picker dialog

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Focus visibly moves to the date grid table and calendar navigation buttons
   - Escape: The dialog closes and focus returns to the launch button
   - Arrow keys: Date selection visibly moves through next/previous days
   - Page up/down: Changes the grid of dates to the previous/next month
   - Shift + page up/down: Changes the grid of dates to the previous/next year
   - Home/end: Moves focus to the first/last day of the current week
   - Spacebar or enter: Activates the date picker buttons and calendar navigation buttons

2. Test mobile screenreader gestures

   - Swipe: Focus moves through elements, expresses its state
   - Doubletap: Activates the element in focus

3. Listen to screenreader output on all devices

   - Name: The purpose of each control is clear
   - Role: Buttons identify as buttons, dialog identifies itself dialog or modal, date grid table may identify itself as table or grid
   - Group: The launch button indicates it has a popup, menu or dialog; days are announced with month and year
   - State: Date options express state (pressed, selected, disabled/dimmed)

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/web/date-picker](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/web/date-picker)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a date picker dialog

GIVEN THAT I am on a page with a date picker dialog

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to the date dialog button I SEE focus is strongly visually indicated
   - THEN when I use the spacebar and/or enter key I SEE the date picker dialog appears
   - THEN when I use the arrow keys I SEE the selection moves through next/previous dates
   - THEN when I use the home/end key I SEE the selection moves to the first/last day of the current week
   - THEN when I use the page up/down key I SEE the grid of dates moves to the next/previous month
   - THEN when I use shift key + page up/down I SEE the grid of dates moves to the next/previous year
   - THEN when I use the spacebar and/or enter key I SEE the button or selection is activated
   - THEN when I use the escape key I SEE the date picker dialog disappears and focus returns to the date dialog button

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use the tab key to move focus to the date dialog button
      - I HEAR the purpose of each control is clear
      - I HEAR buttons identify as buttons, dialog identifies itself dialog or modal, date grid table may identify itself as table or grid
      - I HEAR the launch button indicates it has a popup, menu or dialog; days are announced with month and year
      - I HEAR date options express state (pressed, selected, disabled/dimmed)
   - THEN when I use the spacebar and/or enter key I HEAR the date picker dialog appears
   - THEN when I use the arrow keys I HEAR the selection moves through next/previous dates
   - THEN when I use the home/end key I HEAR the selection moves to the first/last day of the current week
   - THEN when I use the page up/down key I HEAR the grid of dates moves to the next/previous month
   - THEN when I use shift key + page up/down I HEAR the grid of dates moves to the next/previous year
   - THEN when I use the spacebar and/or enter key I HEAR the button or selection is activated
   - THEN when I use the escape key I HEAR the date picker dialog disappears and focus returns to the date dialog button

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to focus on the date dialog button
      - I HEAR the purpose of each control is clear
      - I HEAR buttons identify as buttons, dialog identifies itself dialog or modal, date grid table may identify itself as table or grid
      - I HEAR the launch button indicates it has a popup, menu or dialog; days are announced with month and year
      - I HEAR date options express state (pressed, selected, disabled/dimmed)
   - THEN when I doubletap with the button in focus I HEAR the date picker dialog appears
   - THEN when I swipe through the dialog I HEAR the date options and controls come into focus
   - THEN when I doubletap with the selection or button in focus I HEAR the intended action occurs

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/web/date-picker](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/web/date-picker)

## Developer Notes

[Full WAI-ARIA requirements](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html)

### An accessible date picker will have the following components:

#### Launch button

   - This button opens the date picker
   - Focus returns to this button upon closing the date picker dialog

#### Date picker popup dialog

   - The dialog itself should be labelled by the month and year with `aria-labelledby="month-year-heading-id"`
   - Use `aria-live="polite"` for the dialog, `aria-live="polite"` for month/year heading

#### Calendar navigation buttons

   - Use `aria-label="Previous"` and `aria-label="Next"` to name the "<" and ">" buttons, respectively

#### Date grid table

   - Use `aria-labelledby="month-year-heading-id"` to label the table and `id="month-year-heading-id"` to the element doing the labelling 

#### Date picker buttons

   - Use `aria-selected="true"` to indicate state of individual date buttons

## Videos

### iOS VoiceOver

<video controls>
  <source src="media/video/web/date-picker/date-picker_IosVoiceOver.mp4" type="video/webm">
  Your browser does not support the video tag.
</video>

### Android Talkback

<video controls>
  <source src="media/video/web/date-picker/date-picker_AndroidTalkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Windows JAWS Chrome

<video controls>
  <source src="media/video/web/date-picker/date-picker_WindowsJawsChrome.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### Windows NVDA Chrome

<video controls>
  <source src="media/video/web/date-picker/date-picker_WindowsNvdaChrome.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### MacOS VoiceOver Safari

<video controls>
  <source src="media/video/web/date-picker/date-picker_MacOsVoiceOverSafari.webm" type="video/webm">
  Your browser does not support the video tag.
</video>
