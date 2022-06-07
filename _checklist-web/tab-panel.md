---
layout: entry
title:  "Tab group"
description: "How to test accessible tab panels"
categories: main

keyboard:
  tab key: |
    Focus visibly moves to the active tab and then the open tab panel
  left/right-arrow-keys: |
    Moves focus to the next or previous tab
  spacebar or enter: |
    Activates the tab
        
mobile:
  swipe: |
    Focus moves to the tabs and then the open tab panel
  doubletap: |
    Activates the tab

screenreader:
  name:  |
    Its label and purpose is clear
  role:  |
    It identifies itself as a tab
  state: |
    It expresses its state (selected/pressed/checked)

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to a tab
    result: |
      focus is strongly visually indicated on the selected tab
  - then:  | 
      the left/right arrow keys
    result: |
      focus moves to other tabs
  - then:  |
      the spacebar or enter key to activate the tab
    result: |
      the tab is selected
  - then:  |
      the tab key
    result: |
      focus moves to the selected tab panel

gherkin-mobile:
  - when:  |
      swipe to focus on a tab
  - then:  |
      doubletap with the tab in focus
    result: |
      the state is changed
---

## Avoid tab groups

- Many people who use a screenreader don't know how to operate a tab group with the arrow keys and can miss parts of the content.
- Tab groups are a solution used when a page has become bloated with content and designer seek to condense even more information into a tighter space.
- Interaction rates will be exceedingly low for anything but the first tab panel.
- Rather than cramming more content into the page, consider breaking the page into more concise sections or separate pages.

### Still need a solution?

- Use **radio buttons** as tabs. This will be easier to understand for screenreader users (as is done with this website's tabs).

## Code examples

- [More details and working examples](https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/)

### Use semantic HTML where possible

{% highlight html %}
{% include /examples/tab-group.html %}
{% endhighlight %}
