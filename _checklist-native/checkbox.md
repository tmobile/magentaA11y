---
layout: entry
title:  "Checkbox"
categories: controls

keyboard:
  tab or arrow keys: |
    Focus visibly moves to the checkbox
  spacebar: |
    Activates on iOS and Android
  enter: |
    Activates on Android
      
mobile:
  swipe: |
    Focus moves to the element, expresses its name, role, state
  doubletap: |
    Checkbox toggles between checked and unchecked states.

screenreader:
  name:  |
    Name describes the purpose of the control and matches the visible label
  role:  |
    Identifies itself as a Check box in Android and a Button in iOS
  group: |
    Visible label can be grouped with the check box in a single swipe
  state: |
    Expresses its state (disabled/dimmed, checked, not checked)

settings:
  text resize: |
    Text can resize up to 200% without losing information

---

## Developer notes
- A check box lets the user choose between two opposite states, actions or values  
- You should use a native control when at all possible vs a custom element, as it will automatically and correctly announce the role without additional development effort
- A check box should just toggle between checked and unchecked.  It should not automatically navigate the user to another field or screen when activated, as that may cause a change of context.  Revealing new information on the same screen as a result of activating a checkbox is usually not a change of context.
- Name, Role, State must be announced when focus is on the control. Announcing the label before the checkbox does not meet this requirement.

## **iOS**


## **Android**

#### Code example
{% highlight html %}
{% include /examples/native-checkbox-android-compose.html %}
{% endhighlight %}

### Name

-   Programmatic name describes the purpose of the control
-   Programmatic name matches the visible text label 

- **Android Views**  
  - `android:text` XML attribute
  - Optional: use `contentDescription` for a more descriptive name, depending on type of view and for elements (icons) without a visible label
  - `contentDescription` overrides `android:text`  
  - Use `labelFor` attribute to associate the visible label with the control (Best practice)
- **Android Compose**
  - By default, the simple checkbox composable is readout & focused separately from its label text, which makes it hard to understand the context. 
  - Use `Row` composable with `toggleable` (recommended practice) to have entire row including its label focused for selection and it allows screenreader to read the name and role together. 
  - Optional: use `Modifier.semantics {  contentDescription = "" }` for a more descriptive name

### Role
-   When not using native controls (custom controls), roles will need to be manually coded.

- **Android Views**
  - CheckBox Class
  - Announced as "checkbox"
- **Android Compose**
  - Simple checkbox composable. Alternatively use `Row` composable and `toggleable` grouped with `Checkbox`. Code example above.
  - Announced as "checkbox"

### Groupings
-   Group visible label with button (if applicable) to provide a programmatic name for the button

- **Android Views**
  - ViewGroup
  - Set the container object's `android:screenReaderFocusable` attribute to true, and each inner object's `android:focusable` attribute to false. In doing so, accessibility services can present the inner elements' `contentDescription` or names, one after the other, in a single announcement.
  -  use `labelFor`
- **Android Compose**
  - `Modifier.semantics(mergeDescendants = true) {}` is equivalent to importantForAccessibility when compared to android views.
  - Specifying `onCheckedChange = null` on simple checkbox composable when combined with `Row` composable and `toggleable` allows the checkbox for grouping.  
  - `FocusRequester` can be used to request focus to individual components with in the group. More on FocusRequester in the focus section below.
 
### State
-   When native code is not available for a state, add the state to the programmatic name (label).  Add logic when needed. 

- **Android Views**
  - Active: `android:enabled=true`, `isChecked`, `setChecked`
  - Disabled: `android:enabled=false`. Announced as: "disabled"
- **Android Compose**
  - `Checkbox(checked = true)` announced as checked and `Checkbox(checked = false)` announced as unchecked.
  - Enabled:  `Checkbox(enabled = true)` 
  - Disabled: `Checkbox(enabled = false)`. Announcement: disabled 
  - When using checkbox composable with row and toggleable, need to specify `Modifier.toggleable(enabled = false)` along with `Checkbox(enabled = false)`
  - Use `modifier = Modifier.semantics { stateDescription = "" }` to have a customized state announcement.

### Focus

  - Only manage focus when needed. Primarily, let the device manage default focus
  - Consider how focus should be managed between child elements and their parent views
  - External keyboard tab order often follows the screen reader focus, but sometimes needs focus management

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
     - To hide controls: `Important_For_Accessibility_false`
     - For a `ViewGroup`, set `screenReaderFocusable=true` and each inner object’s attribute to keyboard focus (`focusable=false`)
  - **Android Compose**
    - `Modifier.focusTarget()` makes the component focusable
    - `Modifier.focusOrder()` used in combination with FocusRequesters to define focus order.
    - *Example:* to customize the focus events behaviour
        - step 1: define the focus requester prior. `val (first, second) = FocusRequester.createRefs()`
        - step 2: update the modifier to set the order: `modifier = Modifier.focusOrder(first) { this.down = second }`
        - focus order takes values like: down, left, right, up, previous, next, start, end
    - `FocusRequester` allows to request focus to individual components with in a group of merged descendant views. 
    - `Modifier.onFocusEvent()`, `Modifier.onFocusChanged()` can be used to observe the changes to focus state
