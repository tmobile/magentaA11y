## General Notes

How to test a decorative image or icon

## Condensed

### #a11y - Native Accessibility Acceptance Criteria

How to test a decorative image or icon

1. Test keyboard only, then screen reader + keyboard actions

   - Tab, arrow keys or ctl+tab: Image does not receive focus, N/A

2. Test mobile screenreader gestures

   - Swipe: The screenreader ignores the image completely, N/A

3. Listen to screenreader output on all devices

   - Role: The image is not annoucned and is ignored completely, N/A

4. Test device settings

   - Text resize: N/A

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/image-decorative](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/image-decorative)

## Gherkin

### #a11y - Native Accessibility Acceptance Criteria

How to test a decorative image or icon

GIVEN THAT I am on a screen with a decorative image or icon

1. Scenario: Test keyboard actions

   - WHEN I use keyboard navigation
      - THEN the image or icon is ignored, N/A

2. Scenario: Test mobile screen reader gestures

   - WHEN I swipe to navigate 
      - THEN focus moves to the image or icon
         - I HEAR that the image or icon is ignored, N/A

3. Scenario: Test screen reader output on all devices

   - WHEN I use a screenreader (Talkback, VoiceOver) 
      - AND I swipe to browse to an image or icon
         - I HEAR the image or icon is ignored, N/A

4. Scenario: Test device OS settings for text resize

   - WHEN I have increased text size in device settings 
      - AND I swipe to browse to an image or icon
         - I HEAR the image or icon is ignored, N/A

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/image-decorative](https://www.magentaa11y.com/MagentaA11yV2#/native-criteria/patterns/image-decorative)

## iOS Developer Notes
### General Notes

If images are only decorative, or if the information they convey is already provided by nearby text, they should be ignored by screen readers and removed from the swipe order. This helps people who use screen readers and have low vision or are blind. 

### Examples of Decorative Icons and Images

   - A caret icon is included within a table row/list item/blade. This icon should not be read by a screen reader or be in the swipe order. Instead it should be grouped with the relevant, adjacent text. In this case the text before it acts as a label. The caret icon is simply there for visual reinforcement. 
   - A battery icon is next to the text string of "Battery". This icon should not be read by a screen reader or be in the swipe order. Instead it should be grouped with the relevant, adjacent, text.
   - An image is used as a decorative design element to break up a page or visually introduce a new section and is not crucial to understanding the purpose or content of the page. This image probably does not need to be read by a screen reader, be in the swipe order, or be grouped with adjacent text.

### Focus

Images and icons that are strictly decorative should not receive focus but should be skipped in the swipe and tab (with an external keyboard) order. 

### SwiftUI

   - Use the modifier `.accessibilityHidden(true)` to hide an icon or image from VoiceOver, Full Keyboard Access, and switch control.
   - Use the `Image(decorative:)` initializer to mark an image as purely decorative. This ensures the image is not announced by VoiceOver, not focusable by Full Keyboard Access or Switch Control, and not included in the accessibility tree.

### UIKit

   - Use `imageView.isAccessibilityElement = false` to ensure the image view is ignored by VoiceOver, meaning it won't be announced or focusable.

## Android Developer Notes
### General Notes

If images are only decorative, or if the information they convey is already provided by nearby text, they should be ignored by screen readers and removed from the swipe order. This helps people who use screen readers and have low vision or are blind. 

### Examples of Decorative Icons and Images

   - A caret icon is included within a table row/list item/blade. This icon should not be read by a screen reader or be in the swipe order. Instead it should be grouped with the relevant, adjacent text. In this case the text before it acts as a label. The caret icon is simply there for visual reinforcement. 
   - A battery icon is next to the text string of "Battery". This icon should not be read by a screen reader or be in the swipe order. Instead it should be grouped with the relevant, adjacent, text.
   - An image is used as a decorative design element to break up a page or visually introduce a new section and is not crucial to understanding the purpose or content of the page. This image probably does not need to be read by a screen reader, be in the swipe order, or be grouped with adjacent text.

### Focus

Images and icons that are strictly decorative should not receive focus but should be skipped in the swipe and tab (with an external keyboard) order. 

### Android Views

   - Use `android:importantForAccessibility="no"` to ensure that the image is not considered for accessibility purposes. This will prevent TalkBack from announcing the image.

### Jetpack Compose

   - Set `contentDescription = null` for decorative elements to ensure that the content description is not announced by TalkBack.
Example: `Image(painter = painterResource(id = R.drawable.decorative_image), contentDescription = null)`
