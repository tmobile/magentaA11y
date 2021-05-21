---
layout: demo
title: A simple HTML webpage
---

## How do screenreaders work?

Screenreader applications describe the content, name and state of elements on a web page, allowing someone to use the page without seeing it.

People navigate what they hear with the keyboard or by swiping on a touch device.

There are 3 common ways screenreaders interact with the page.

### Browse mode

Screenreaders can simply read the entire page item by item by:

- Pressing the arrow keys
- Letting the screen reader itself read all content

### Keyboard shortcuts

Screenreaders can use keyboard shortcuts to perform tasks like: 

- Skip from heading to heading.
- Locate forms
- Navigate tables

### List views

Screenreaders can gather some types of content into a single menu to quickly locate:

- Headings
- Landmarks (like header, navigation, main content, form and footer)


## Interactive content

Properly formed features are fully accessible and describe their current state. In this case, expanded or collapsed.

{::nomarkdown}
{% include /examples/details-summary.html %}
{:/}


## Forms

Forms consist of interactive controls and inputs that express their name, role and state.

{::nomarkdown}
<form aria-label="Example form">
{:/}

Different components use specific keyboard interactions to change state.

{::nomarkdown}
{% include /examples/input-radio.html %}
{:/}

{::nomarkdown}
{% include /examples/input-text.html %}
{:/}

{::nomarkdown}
{% include /examples/button.html %}
{:/}

{::nomarkdown}
</form>
{:/}