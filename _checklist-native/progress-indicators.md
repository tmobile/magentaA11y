---
layout: entry
title:  "Progress Indicators" 
categories: controls 

keyboard:
  tab, arrow keys or Ctl+tab: |
    Progress Indicators are not keyboard focusable components.
  spacebar: |
    Progress Indicators are not keyboard focusable components.
  enter: |
    Progress Indicators are not keyboard focusable components.

mobile:
  swipe: |
      Focus moves to the element, expresses its name e.g. "Loading"
          
mobile gestures:
  swipe: |
    Progress Indicators are not swipeable components.
  doubletap: |
    Progress Indicators are not interactive components.
    
screenreader: 
  name:  |
    A meaningful label e.g. "Loading"
  role:  |
    The Progress Indicator does not have a role
  group: |
    The Progress Indicator is not grouped
  state: |
    The Progress Indicator does not have a state

settings:
  text resize: |
    The Progress Indicator does not respond to text resize
---

<!-- 
    iOS: https://developer.apple.com/design/human-interface-guidelines/progress-indicators
    Android: https://m2.material.io/components/progress-indicators/android
    Android - Newer: https://m3.material.io/components/progress-indicators/overview
-->

## iOS

<!-- 
Enter Developer Notes for iOS, add additional information if needed
-->
## Developer notes
- Progress indicators let people know that your app isn’t stalled while it loads content or performs lengthy operations.
- There are two types of Progress Indicators: Determinate and Indeterminate. 
    - Determinate, for a task with a well-defined duration, such as a file conversion. Ex. Progress Bar
    - Indeterminate, for unquantifiable tasks, such as loading or synchronizing complex data. Ex. Circular progress indicator


<!-- 
Enter information for iOS Name, update information below with appropriate details, or remove details not needed
-->
### Name
- The label for the Progress Indicator should be meaningful. e.g. "Loading"

<!-- 
Enter information for iOS Name using UIKIT, update below with appropriate details, replace _component with new component name or appropriate description
-->
- **UIKit**
  - `ProgressView` Use a [progress view](https://developer.apple.com/documentation/SwiftUI/ProgressView) to show that a task is incomplete but advancing toward completion.

<!-- 
Enter information for iOS Name using SwiftUI, update below with appropriate details
-->
- **SwiftUI**
  - `UIProgressView` The [UIProgressView](https://developer.apple.com/documentation/uikit/uiprogressview) class provides properties for managing the style of the progress bar and for getting and setting values that are pinned to the progress of a task.
  - `UIActivityIndicatorView` For an indeterminate progress indicator — or a “spinner” — use an instance of the [UIActivityIndicatorView](https://developer.apple.com/documentation/uikit/uiactivityindicatorview) class.


<!-- 
Enter information for iOS Focus, update below with appropriate details
-->
### Focus
- Focus does not move to the progress indicator when it appears, but screen reader users should be able to discover it if navigating within the screen while it is present.


<!-- 
Enter information for iOS VoiceOver announcements for the specific component, update below with appropriate details and announcement examples
--> 
### Announcement examples
- "Loading"

## Android

<!-- 
Enter Developer Notes for Android, add additional information if needed
-->
## Developer notes
- In Material Design, there are two types of progress indicators: Determinate and Indeterminate.
- Progress indicators visually surface the status of an operation.
- Progress indicators express an unspecified wait time or display the length of a process.
- Progress indicators inherit accessibility support from the ProgressBar class in the framework. 

<!-- 
Enter information for Android Name, update information below with appropriate details, or remove details not needed
-->
### Name
- The label for the Progress Indicator should be meaningful. e.g. "Loading"

<!-- 
Enter information for Android Name for Android Views, update information below with appropriate details, or remove details not needed
-->
- **Android Views**
  - [todo] `progressIndicator.contentDescription = contentDescription`

<!-- 
Enter information for Android Name for Jetpack Compose, update information below with appropriate details, or remove details not needed
-->
- **Jetpack Compose**
  - `LinearProgressIndicator` or `CircularProgressIndicator` Use either the [LinearProgressIndicator](https://developer.android.com/reference/com/google/android/material/progressindicator/LinearProgressIndicator) or [CircularProgressIndicator](https://developer.android.com/reference/com/google/android/material/progressindicator/CircularProgressIndicator) composables and pass a value for the progress parameter.


<!-- 
Enter information for Android Focus, update information below with appropriate details, or remove details not needed
-->
### Focus
- Focus does not move to the progress indicator when it appears, but screen reader users should be able to discover it if navigating within the screen while it is present.

### Announcement examples
- "Loading"
