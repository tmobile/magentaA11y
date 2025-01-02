---
layout: entry
title:  "Decorative Images and Icons" 
categories: patterns 


keyboard:
  arrow keys: |
    Screenreader ignores the image completely
          
mobile:
  swipe: |
    The screenreader ignores the image completely
    
screenreader:
  role:  |
    The image is ignored

gherkin-keyboard: 
  - when:  |
      the arrow keys to browse to an image
    result: |
      the image is skipped and ignored

gherkin-mobile:
  - when:  |
      swipe to browse to an image

wcag:
  - name: Perceivable
    list:
      - criteria: All non-text content that is purely for decoration or which repeats existing on-screen text nearby should be ignored and skipped over by screenreaders.

settings:
  text resize: |
    Text can resize up to 200% without losing information.  Text in images do not resize.
    
---

## General
If images are only decorative, or if the information they convey is already provided by nearby text, they should be ignored by screen readers and removed from the swipe order. This helps people who have low vision or are blind. 

### Examples
- A caret icon is included within a table row/list item/blade. This icon should not be read by a screen reader or be in the swipe order. Instead it should be grouped with the relevant, adjacent text. In this case the text before it acts as a label. The caret icon is simply there for visual reinforcement. 
- A battery icon is next to "Battery" text. This icon should not be read by a screen reader or be in the swipe order. Instead it should be grouped with the relevant, adjacent text.
- An image is used as a decorative design element to break up a page or visually introduce a new section. This image may not need to be read by a screen reader, be in the swipe order, or be grouped with adjacent text.

## iOS

### Developer notes
If an image does not convey meaning or is used for styling purposes, do not add alt text and skip it in the swipe order for the screen reader user.

- **SwiftUI**
  - use the modifier `.accessibilityHidden(true)` to hide an icon or image from VoiceOver, Full Keyboard Access, and switch control.

- **UIKit**
  - use `Image(decorative: "pencil")` to hide the icon or image from screen readers
  - use `image.isAccessibilityElement = false` so that it is not focusable

### Focus
- Decorative images and icons should be skipped in the swipe order. 

## Android

### Developer notes

- **Android Views**
  - Use `android:importantForAccessibility="no"`

- **Jetpack Compose**
  - Set `contentDescription` to null for decorative elements.
