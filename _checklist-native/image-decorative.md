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

## Decorative images
There are times that images and icons shouldn't be read because it would be repetitive or not add any value to the existing page content. These types of images are generally included for purely stylistic purposes and don't impart any meaning to the rest of the content on the page. Or, the image or icon's visual information may be already given using adjacent text and so would be repetitive for a screen reader user. 


## iOS

### Developer notes
- If an image does not convey meaning or is used for styling purposes, do not add alt text and skip it in the swipe order for the screen reader user.

### Focus
- Decorative images and icons should be skipped in the swipe order. 

## Android

### Developer notes

- **Android Views**
  - Use `android:importantForAccessibility="no"`

- **Jetpack Compose**
  - Set contentDescription to null for decorative elements.
