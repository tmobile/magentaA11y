---
layout: entry
title:  "Decorative Images and Icons" 
categories: patterns 


keyboard:
  arrow keys: |
    Image does not receive focus
          
mobile:
  swipe: |
    The screenreader ignores the image completely

# gherkin-keyboard: 
#   - when:  |
#       the arrow keys to browse to an image
#     result: |
#       the image is skipped and ignored

# gherkin-mobile:
#   - when:  |
#       swipe to browse to an image

# wcag:
#   - name: Perceivable
#     list:
 #      - criteria: All non-text content that is purely for decoration or which repeats existing on-screen text nearby should be ignored and skipped over by screen readers.
    
---

## General
If images are only decorative, or if the information they convey is already provided by nearby text, they should be ignored by screen readers and removed from the swipe order. This helps people who use screen readers and have low vision or are blind. 

### Examples of Decorative Icons and Images
- A caret icon is included within a table row/list item/blade. This icon should not be read by a screen reader or be in the swipe order. Instead it should be grouped with the relevant, adjacent text. In this case the text before it acts as a label. The caret icon is simply there for visual reinforcement. 
- A battery icon is next to the text string of "Battery". This icon should not be read by a screen reader or be in the swipe order. Instead it should be grouped with the relevant, adjacent, text.
- An image is used as a decorative design element to break up a page or visually introduce a new section and is not crucial to understanding the purpose or content of the page. This image probably does not need to be read by a screen reader, be in the swipe order, or be grouped with adjacent text.

## Focus
Images and icons that are strictly decorative should not receive focus but should be skipped in the swipe and tab (with an external keyboard) order. 

## iOS

### Developer notes
- **SwiftUI**
  - Use the modifier `.accessibilityHidden(true)` to hide an icon or image from VoiceOver, Full Keyboard Access, and switch control.
  - Use the `Image(decorative:)` initializer to mark an image as purely decorative. This ensures the image is not announced by VoiceOver, not focusable by Full Keyboard Access or Switch Control, and not included in the accessibility tree.

- **UIKit**
  - Use `imageView.isAccessibilityElement = false` to ensure the image view is ignored by VoiceOver, meaning it won't be announced or focusable.

## Android

### Developer notes

- **Android Views**
  - Use `android:importantForAccessibility="no"` to ensure that the image is not considered for accessibility purposes. This will prevent TalkBack from announcing the image.

- **Jetpack Compose**
  - Set `contentDescription = null` for decorative elements to ensure that the content description is not announced by TalkBack.
Example: `Image(painter = painterResource(id = R.drawable.decorative_image), contentDescription = null)`
