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

Tab groups are a sub-par solution used in a couple of scenarios:

- A page has become bloated with content and the designer seeks to condense even more information into a tighter space. 
- It's also possible a product owner still believes it's the year 1999 and people don't know how to scroll. 

Either way, it's about trying to cram low quality content into a page until it becomes a high quality experience, which is not a good plan.

### Why tab groups are problematic

- Many people who use a screenreader don't know how to operate a tab group with the arrow keys and can miss parts of the content.
- It requires the screenreader user to repeatedly parse the content to consume it.
- Interaction rates will be exceedingly low for anything but the first tab panel (like a carousel).
- It hides content from the user by default and not everyone will notice or know how it works.
- If users need to compare information they cannot

### What to do instead

Rather than cramming more content into the page, consider other designs such as:

- Breaking the page into more concise sections with tight copywriting
- Putting content inside expander/accordions
- Using separate pages

#### Wait, then why are you using tabs on this site?

- See above: The page has become bloated with content and the designer seeks to condense even more information into a tighter space. The information in the tabs is largely the same and not something the user needs to compare, so there's no loss of functionality.

## Code examples

- [More details and working examples](https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/)
- You can also use **radio buttons** as controls. This will be easier to understand for screenreader users (as is done with this website's tabs).
- Note: an `aria-selected` state is explicity required as some screenreaders will assume the tab is selected unless delared `false`.

### Use semantic HTML where possible

{% highlight html %}
{% include /examples/tab-group.html %}
{% endhighlight %}