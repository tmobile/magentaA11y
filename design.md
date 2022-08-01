---
layout: page
title: Design criteria
permalink: /design/
---

Any deliverable must be able to fulfill these acceptance criteria.

## For web design systems

### Given that I have delivered a design component

- When I examine any component therein
  - The type size is no smaller than 16px Helvetica or Arial as reference
  - Any interactive target areas are no smaller than 44x44
    - Ex: A video play button
  - Any interactive component has a 3:1 minimum contrast ratio against adjacent elements
    - Ex: A button against its background
  - Any change of state exhibits a 3:1 minimum contrast ratio
    - Ex: A checked radio input compared to unchecked
    - Ex: A disabled checkbox compared to defaults
  - The focus indication has a 3:1 or greater contrast ratio between the default and focused states
  - The focus indication has a 3:1 or greater contrast ratio against adjacent elements
  - The focus indication has a minimum area equal to the width of the element and 2px in height
    - Ex: A button with a 1px focus outline meets the minimum
  - Color is not used as the sole means of conveying meaning

## For full experience designs

### Given that I have delivered a web UI design for development

- When I open the accessibility annotation layer
- Then I see
  - HTML `<title>` is defined
  - HTML meta description is defined
  - Logical headings are defined (h1, h2, h3)
  - Links and buttons are assigned name and role
  - Alternative text for images is defined
  - Ambiguously named components have defined `aria-label` attributes
  - For custom components Name, role state and group name is defined in the accessibility annotation layer
  - Form labels and fields are stacked vertically with no multi-column layouts
  - Input fields are sized to accommodate the expected character count