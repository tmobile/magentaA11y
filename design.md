---
layout: page
title: Design criteria
permalink: /design/
---

Any deliverable must be able to fulfill these acceptance criteria.

## For design systems

### Given that I have delivered a design component

- When I examine any component therein
- Then I see
  - The type size is no smaller than 16px
  - Any interactive target areas are no smaller than 48x48 
  - The focus indication has a minimum area equal to the width of the element and 4px in height.
  - The focus state has a 3:1 or greater contrast ratio between the default and focused states.
  - The focus indication has a 3:1 or greater contrast ratio against adjacent elements.
  - Color is not used as the sole means of conveying meaning

## For full experience designs

### Given that I have delivered a UI design for development

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