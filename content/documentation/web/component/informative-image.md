## General Notes

How to test an informative image

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test an informative image

1. Test keyboard only, then screen reader + keyboard actions

   - Arrow-keys: Screen reader reads the alt text 

2. Test mobile screenreader gestures

   - Swipe: The screenreader reads the alt text 

3. Listen to screenreader output on all devices

   - Name: The content of the image alt text is clear 
   - Role: It identifies its role as an image or graphic     

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/informative-image](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/informative-image)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test an informative image

GIVEN THAT I am on a page with an informative image

1. Keyboard for mobile & desktop

   - WHEN I use the arrow keys to browse to an image I SEE the image comes into view

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND I use the arrow keys to browse to an image
   - 
      - I HEAR the content of the image alt text is clear 
      - I HEAR it identifies its role as an image or graphic 

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND I swipe to browse to an image
   - 
      - I HEAR the content of the image alt text is clear 
      - I HEAR it identifies its role as an image or graphic 

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/informative-image](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/informative-image)

## Is this image decorative or informative?

If the image conveys important meaning, and there's no other text on the page which explains the concept within it, then the image is likely informative. If the image is included for purely stylistic purposes and doesn't impart any meaning to the rest of the content on the page, then the image is likely decorative. In this case, check out the [decorative image checklist](/web-criteria/component/decorative-image) item instead. 


If your image contains text inside it, it should not! This is a violation of [WCAG AA 1.4.5 Images of Text](https://www.w3.org/WAI/WCAG21/Understanding/images-of-text.html). Exceptions exist for logos.

## Describe the content of the image
If you were describing the image to someone via phone conversation and they couldn't see what you were looking at, what would you say?

```html
<img src="/farm.jpg" 
     alt="Rustic barn surrounded by rolling hills" />
```

## Using inline SVG

### Inline SVG that conveys meaning

Inline SVGs require some special code to be read consistently in all screenreaders:
- Name: either `aria-label` or `<title />`
- Role: `role="img"`

If you are using a `<use />` element, add `aria-hidden="true"` to it.

#### Using title

```html
<svg role="img" focusable="false">
  <title>Accessible Name</title>
  <use xlink:href="#svg-id" aria-hidden="true" />
  
  <!-- if not using <use> then the child elements of the inline SVG would go here -->

</svg>
```

#### Using aria-label

```html
<svg role="img" aria-label="Accessible name" focusable="false">
  <use href="#svg-id" aria-hidden="true" />

  <!-- if not using <use> then the child elements of the inline SVG would go here -->

</svg>
```

## Animated gifs

### Animations (like gifs) can be accessible if:
- they are set to stop after 5 seconds or 
- if users are presented with a way to pause it

## Videos

### Android Talkback

<video controls>
  <source src="media/video/web/informative-image/Android-Talkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>


### iOS VoiceOver

<video controls>
  <source src="media/video/web/informative-image/iOS-VoiceOver.mp4" type="video/webm">
  Your browser does not support the video tag.
</video>

### Windows JAWS Chrome

<video controls>
  <source src="media/video/web/informative-image/Windows-JAWS-Chrome.mp4" type="video/webm">
  Your browser does not support the video tag.
</video>

### Windows NVDA Chrome

<video controls>
  <source src="media/video/web/informative-image/Windows-NVDA-Chrome.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

### MacOS Voiceover Safari 

<video controls>
  <source src="media/video/web/informative-image/Android-Talkback.webm" type="video/webm">
  Your browser does not support the video tag.
</video>


## Further reading
- This page owes a lot to this exhaustive blog post: [Contextually Marking up accessible images and SVGs by Scott O'Hara](https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html)
- [W3C Image decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/)
- [WCAG 1.1.1 Non-text Content (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)
- [WCAG SC 1.4.5 Images of Text (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text)
- [WCAG SC 2.2.2 Pause, Stop, Hide (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)