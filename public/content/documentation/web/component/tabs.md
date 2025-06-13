## General Notes

How to test tabs

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test tabs

1. Test keyboard only, then screen reader + keyboard actions

      - Tab key: Focus visibly moves to the active tab and then the open tab panel

      - Left/right-arrow-keys (automatic activation): Moves focus to the next or previous tab and activates the tab

      - Left/right-arrow-keys (manual activation): Moves focus to the next or previous tab

      - Spacebar or enter (manual activation): Activates the focused tab

2. Test mobile screenreader gestures

      - Swipe: Focus moves to the tabs and then the open tab panel

      - Doubletap: Activates the tab

3. Listen to screenreader output on all devices

      - Name: Its label and purpose is clear

      - Role: It identifies itself as a tab

      - State: It expresses its state (selected/pressed/checked)

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/tabs](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/tabs)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test tabs

GIVEN THAT I am on a page with tabs

1. Keyboard for mobile & desktop

      - WHEN I use the tab key to move focus to a tab I SEE focus is strongly visually indicated on the activated tab

      - IF TAB ACTIVATION IS MANUAL when I use the left/right arrow keys I SEE focus moves to other tabs and I use the spacebar or enter key to activate the tab

      - IF TAB ACTIVATION IS AUTOMATIC when I use the left/right arrow keys I SEE the tab is activated

      - THEN when I use the tab key I SEE focus moves to the activated tab panel

2. Desktop screenreader

      - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 

      - I use the tab key to move focus to a tab
         - I HEAR its label and purpose is clear
         - I HEAR it identifies itself as a tab
         - I HEAR it expresses its state (selected/pressed/checked)

      - IF TAB ACTIVATION IS MANUAL when I use the left/right arrow keys I HEAR focus moves to other tabs and I use the spacebar or enter key to activate the tab

      - IF TAB ACTIVATION IS AUTOMATIC when I use the left/right arrow keys I HEAR the tab is activated

      - THEN when I use the tab key I HEAR focus moves to the activated tab panel

3. Mobile screenreader

      - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND

      - I swipe to focus on a tab
         - I HEAR its label and purpose is clear
         - I HEAR it identifies itself as a tab
         - I HEAR it expresses its state (selected/pressed/checked)

      - THEN when I doubletap with the tab in focus I HEAR the state is changed



Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/tabs](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/tabs)

## Tab groups

Tabs can be useful in scenarios where content is repetitive and doesn't require direct comparison. In these instances, they can effectively organize information without compromising functionality. When implemented thoughtfully, tabs can enhance accessibility by simplifying navigation and helping users quickly locate the information they need.

However, tab groups can also pose challenges for accessibility and usability when not implemented effectively. Poorly designed tab groups often lead to a cluttered presentation of content, which can detract from the overall user experience rather than enhance it. Ensuring that tab groups are thoughtfully structured is crucial for making content more accessible and user-friendly.

### Potential issues with tab groups:

   - **Accessibility**: Many screen reader users struggle with navigating tab groups using arrow keys, potentially missing crucial content.
   - **Interaction Rates**: Engagement is typically low for content beyond the first tab panel.
   - **Visibility of Content**: Content is hidden by default, and not all users are aware of how to access it.
   - **Comparative Information**: Users cannot easily compare information presented across multiple tabs.

### Recommended alternatives:

Instead of using tab groups, consider these alternatives:

   - Breaking the page into clear sections with concise copywriting.
   - Use expandable sections (accordions) for better organization.
   - Create separate pages for different topics

### Tab activation types:

Tabs can be built to be activated **automatically** or **manually**.

- **Automatic** tabs become activated immediately upon focus via a mouse click or the arrow keys.
- **Manual** tabs can receive focus via the arrow keys, but require the user to press either `Enter` or `Space`, or click them with their mouse to activate them.

You can find additional guidance as well as examples of automatic and manually activated tab groups on the [WAI-ARIA Authoring Practices Guide Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) page. 

### Code considerations

   - **Tablist**: The main container for tabs requires `role="tablist"`.
   - **Tabs**: Each tab within the `tablist` requires `role="tab"`.
   - **Content Panels**: Each content area for a tab is called a `role="tabpanel"`.
   - **Labels**: Each `tabpanel` needs to have an `aria-labelledby` attribute that points to the corresponding `tab` label. 
   - **Control Association**: Each `tab` has an `aria-controls` attribute linking it to its corresponding `tabpanel`.
   - **Active Tab**: The currently selected tab has `aria-selected` set to true; all other tabs have it set to false.
   - **Orientation**: If the tablist is vertical, it has `aria-orientation` set to vertical. By default, it is horizontal.

### Code Example

```html
<div class="tabs">
  <div role="tablist">
    <button role="tab"
            aria-selected="true" 
            aria-controls="alpha-tab" 
            id="alpha">
            Alpha
    </button>
    <button role="tab" 
            aria-selected="false" 
            aria-controls="bravo-tab" 
            id="bravo" 
            tabindex="-1">
            Bravo
    </button>
    <button role="tab" 
            aria-selected="false" 
            aria-controls="charlie-tab" 
            id="charlie" 
            tabindex="-1">
            Charlie
    </button>
  </div>
  <div role="tabpanel" 
       id="alpha-tab" 
       aria-labelledby="alpha"
       tabindex="0">
    <p>Alpha is the first letter of the NATO alphabet</p>
  </div>
  <div role="tabpanel" 
       id="bravo-tab" 
       aria-labelledby="bravo"
       tabindex="0">
    <p>Bravo is the second letter of the NATO alphabet</p>
  </div>
  <div role="tabpanel" 
       id="charlie-tab" 
       aria-labelledby="charlie"
       tabindex="0">
    <p>Charlie is the third letter of the NATO alphabet</p>
  </div>
</div>
```