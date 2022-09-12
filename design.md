---
layout: page
title: Design criteria
permalink: /design/
---

Any deliverable must be able to fulfill these acceptance criteria.

- [For web design systems](#for-web-design-systems)
- [For full experience web designs](#for-full-experience-web-designs)
- [For native app design systems](#for-native-app-design-systems)
- [For full experience native designs](#for-full-experience-native-designs)


## For web design systems
{: .divider tabindex="-1"}

### Given that I have delivered a design component

- When I examine any component therein
  - Interactive component type size is optically no smaller than 16px Helvetica
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

## For full experience web designs
{: .divider tabindex="-1"}

When delivering part of a user journey that uses existing design components that already meet accessibility acceptance criteria.

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
  - Color is not used as the sole means of conveying meaning

## For native app design systems
{: .divider tabindex="-1"}

### Given that I have delivered a design component 
- When I examine any component therein 
- Then I see 
  - The type size is no smaller than 14px on system fonts for both Android and iOS 
  - Any interactive target areas are no smaller than 44x44 
    - Ex: An info button 
  - Any interactive component has a 3:1 minimum contrast ratio against adjacent elements 
    - Ex: A button against its background 
  - Any change of state exhibits a 3:1 minimum contrast ratio 
    - Ex: A checked radio input compared to unchecked 
    - Ex: A disabled checkbox compared to defaults 
  - Color is not used as the sole means of conveying meaning 

## For full experience native designs 
{: .divider tabindex="-1"}

When delivering part of a user journey that uses existing design components that already meet accessibility acceptance criteria. 

### Given that I have delivered a native app UI design for development 

- When I open the accessibility annotation layer 
- Then I see 
  - Text headings are noted as headings 
  - Links and buttons are assigned name and role 
  - Icon buttons are assigned a name 
  - Alternative text for images is defined 
  - For custom components Name and role  
  - Color is not used as the sole means of conveying meaning 
  - Animations are noted to not last more than 5 seconds 