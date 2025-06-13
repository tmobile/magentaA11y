## General Notes

How to test a table

## Videos

### iOS VoiceOver

<video controls>
  <source src="media/video/native/table/table_IosVoiceOver.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a table

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Focus visibly moves to the first interactive element in table

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the first element in table 
   - Doubletap: Activates any interactive element

3. Listen to screenreader output on all devices

   - Label: Visible table title that describes table’s purpose is announced
   - Column header: Each column header is announced with each row cell beneath it, along with cell data
   - Row header: If applicable, each row header is announced with each cell in row, along with cell data
   - Name: Purpose of any interactive element is clear and matches visible label
   - Role: Most interactive elements identify as a button in iOS and "double tap to activate" in Android
   - State: Expresses its state (disabled/dimmed)

4. Test device settings

   - Text resize: Text can resize up to 200% without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/table](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/table)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a table

GIVEN THAT I am on a screen with a table

1. Scenario: Test keyboard actions

   - WHEN I press the "TAB" key, "ARROW" keys, or "CTRL+TAB" keys 
      - THEN the focus should visibly move to the first interactive element in the table

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate
      - THEN the focus should move to the first element in the table 
   - WHEN I double-tap an interactive element 
      - THEN the element should be activated 

3. Scenario: Test screen reader output on all devices

   - WHEN a screen reader reads the table
      - THEN the visible table title that describes the table’s purpose should be announced 
         - AND each column header should be announced with each row cell beneath it, along with cell data 
         - AND if applicable, each row header should be announced with each cell in the row, along with cell data 
         - AND the purpose of any interactive element should be clear and match its visible label 
         - AND most interactive elements should identify as a "BUTTON" in iOS and announce "DOUBLE TAP TO ACTIVATE" in Android 
         - AND the state of interactive elements (DISABLED or DIMMED) should be expressed if applicable 

4. Scenario: Test device OS settings for text resize

   - WHEN I have increased text size up to 200% in the device settings 
      - THEN all text should resize without losing information

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/table](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/table)

## iOS Developer Notes
### General Notes

   - A container that presents rows of data arranged in one or more columns that may include interactive elements
   - A table is composed of table rows (see table row button component)
   - A table with columns and rows is not common in mobile because of the small viewport. 
   - Table headers can be announced left to right in the heading row along with “heading”. This is optional and duplicative, as each column header will be announced with each cell in every column. 
   - If there is no content in the data cell, announce anything that gives the user this information, such as “not applicable” or “empty cell” along with the column header.
   - Generally, all content in cell is announced together, including an interactive element, if any.
   - If a table row is deleted, screen reader focus should be managed to the most logical place 
   - All column headers must have a visible label that describes column (text or icon)
   - If rows have multiple identical buttons like delete or edit, the programmatic name must be unique for each row (Delete address, Delete phone, etc)
   - Ensure scrolling is supported, if needed
   - Text must enlarge to 200% in each cell

### See the Details section for a specific control for interactive guidance

   - **UIKit**

      - Use `UITableViewController` object to manage a table view
      - Use `TableColumn` for tables with more than one column

   - **SwiftUI**

      - Use `List` as a container for a one column table of data rows
      - Use `Table` - for multiple columns, but only supports iPad

### Focus

   - Use the device's default focus functionality. 
   - Consider how focus should be managed between child elements and their parent views.
   - Initial focus on a screen should land in a logical place, such as back button, screen title, first text field, or first heading.

   - **UIKit**

      - If VoiceOver is not reaching a particular element, set the element's `isAccessibilityElement` to `true`
         - **Note:** You may need to adjust the programmatic name, role, state, and/or value after doing this, as this action may overwrite previously configured accessibility.
      - Use `accessibilityViewIsModal` to contain the screen reader focus inside the modal.
      - To move screen reader focus to newly revealed content, use `UIAccessibility.post(notification:argument:)` that takes in `.screenChanged` and the newly revealed content as the parameter arguments.
      - To NOT move focus, but dynamically announce new content: use `UIAccessibility.post(notification:argument:)` that takes in `.announcement` and the announcement text as the parameter arguments.
      - `UIAccessibilityContainer` protocol: Have a table of elements that defines the reading order of the elements. 

   - **SwiftUI**

      - For general focus management that impacts both screen readers and non-screen readers, use the property wrapper `@FocusState` to assign an identity of a focus state.
         - Use the property wrapper `@FocusState` in conjunction with the view modifier `focused(_:)` to assign focus on a view with `@FocusState` as the source of truth.
         - Use the property wrapper `@FocusState`in conjunction with the view modifier `focused(_:equals:)` to assign focus on a view, when the view is equal to a specific value.
      - If necessary, use property wrapper `@AccessibilityFocusState` to assign identifiers to specific views to manually shift focus from one view to another as the user interacts with the screen with VoiceOver on.

## Android Developer Notes
### General Notes

   - A container that presents rows of data arranged in one or more columns that may include interactive elements
   - A table is composed of table rows (see table row button component)
   - A table with columns and rows is not common in mobile because of the small viewport.
   - Table headers can be announced left to right in the heading row along with “heading”. This is optional and duplicative, as each column header will be announced with each cell in every column. 
   - If there is no content in the data cell, announce anything that gives the user this information, such as “not applicable” or “empty cell” along with the column header.
   - Generally, all content in cell is announced together, including an interactive element, if any.
   - If a table row is deleted, screen reader focus should be managed to the most logical place 
   - All column headers must have a visible label that describes column (text or icon)
   - If rows have multiple identical buttons like delete or edit, the programmatic name must be unique for each row (Delete address, Delete phone, etc)
   - Ensure scrolling is supported, if needed
   - Text must enlarge to 200% in each cell

### See the Details section for a specific control for interactive guidance

   - **Android Views**

      - `TableLayout` and `TableRow`

   - **Jetpack Compose**

      - Use `Column` and `Row`

### Focus

   - Only manage focus when needed. Primarily, let the device manage default focus
   - Consider how focus should be managed between child elements and their parent views
   - Initial focus on a screen should land in a logical place (back button, screen title, first text field, first heading)

   - **Android Views**

      - `importantForAccessibility` makes the element visible to the Accessibility API
      - `android:focusable`
      - `android=clickable`
      - Implement an `onClick( )` event handler for keyboard, as well as `onTouch( )`
      - `nextFocusDown`
      - `nextFocusUp`
      - `nextFocusRight`
      - `nextFocusLeft`
      - `accessibilityTraversalBefore` (or after)
      - To move screen reader focus to newly revealed content: `Type_View_Focused`
      - To NOT move focus, but dynamically announce new content: `accessibilityLiveRegion`(set to polite or assertive)
      - To hide controls: `importantForAccessibility=false`
      - For a `ViewGroup`, set `screenReaderFocusable=true` and each inner object’s attribute to keyboard focus (`focusable=false`)

   - **Jetpack Compose**

      - `Modifier.focusTarget()` makes the component focusable
      - `Modifier.focusOrder()` needs to be used in combination with `FocusRequester` to define focus order
      - `Modifier.onFocusEvent()`, `Modifier.onFocusChanged()` can be used to observe the changes to focus state
      - `FocusRequester` allows to request focus to individual elements with in a group of merged descendant views
      - Example: To customize the focus events
         - step 1: define the focus requester prior. `val (first, second) = FocusRequester.createRefs()`
         - step 2: update the modifier to set the order. `modifier = Modifier.focusOrder(first) { this.down = second }`
         - focus order accepts following values: up, down, left, right, previous, next, start, end
         - step 3: use `second.requestFocus()` to gain focus
