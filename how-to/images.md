---
layout: how-to-test
title: Images
permalink: /how-to-test/images/
---

## <step-number>1</step-number> Types of images
{: .divider }
There are many types of images. The type of image can be determined by the context of the page being tested. These different types of images have different testing steps.

- **Informative Images:** These are visuals like pictures, photos, and illustrations that convey important information or concepts. To make them accessible, we need to include a brief description in text form that captures the key content of the image.

- **Decorative Images:** Sometimes, images are used purely for aesthetic purposes and don't convey meaningful information. In such cases, it's best to provide an empty text alternative (alt="") to indicate that the image serves a decorative role and doesn't require a description.

- **Functional Images:** Images that serve as links or buttons should have text alternatives that describe their function rather than just their appearance. For example, if you have an image of a printer icon that initiates a printing action, the alt text should convey this functionality, like "Print."

- **Images of Text:** It's generally recommended to avoid putting text within images because it can be challenging for some users. However, if you must use images with text, ensure that the alt text contains the exact same words as the text within the image to maintain consistency.

- **Complex Images such as Graphs and Diagrams:** When using images to present complex data or detailed information, it's crucial to provide a comprehensive text description that conveys all the data and details found in the image. This allows individuals who cannot see the image to still access and understand its content.


## <step-number>2</step-number> How to test
### Automated Testing
{: .divider }

Automated scanning tools, such as [WAVE](https://wave.webaim.org/), [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/), or [Deque's Axe DevTools](https://www.deque.com/blog/axe-devtools-extension-update-new-color-contrast-analyzer/) are a great starting point for image testing. All of these tools can run page scans that quickly generate reports identifying some image issues. Scans are:

- <strong>Good</strong> at identifying simple issues like missing <code>alt</code> attributes on images or empty alt attributes on functional images.
- <strong>Bad</strong> at identifying issues related to alternative text quality or whether or not an image should be marked as decorative and hidden from screen readers.

### Manual testing
{: .divider }
Automated scanning must be complemented with a manual review of the page. Manual image testing can test for alt text quality, ensuring that decorative images are hidden from assistive technology, all text found in images of text are present in alt text, and that functional images have the appropriate alt text.

#### <strong>Getting started</strong>
- Open DevTools in your browser window (<span class="keyboard-key">F12</span>)
- Right-click and select "Inspect" on the image in the page you want to test.

## <step-number>3</step-number> Meaningful Images
{: .divider }
- Check that the image owns an <code>alt</code> attribute.
- Ensure that the <code>alt</code> attribute is present is not empty.
- The <code>alt</code> attribute value / description of the image should be accurate and succinct. It should not consist of information that is not imnportant or duplicates nearby text content.

{::nomarkdown}
<example>
  <img
    src="/assets/images/examples/how-to-images-meaningful-1.png"
    alt="Inspecting an image in DevTools to check alt text, meaningful image">
</example>
{:/}

## <step-number>3</step-number> Decorative Images
{: .divider }
- Ensure that the <code>alt</code> attribute is present and owns an empty or null value. <code>alt=""</code>.
- <strong>Note:</strong> <code>aria-hidden="true"</code> is not needed if an image has an empty or null alt attribute value <code>alt=""</code>.

{::nomarkdown}
<example>
  <img
    src="/assets/images/examples/how-to-images-decorative-1.png"
    alt="Inspecting an image in DevTools to check alt text, decorative image">
</example>
{:/}

## <step-number>3</step-number> Functional Images
{: .divider }
- Ensure that the <code>alt</code> attribute is present and owns a value that includes all of the text found in the image.

{::nomarkdown}
<example>
  <img
    src="/assets/images/examples/how-to-images-functional.png"
    alt="Inspecting an image in DevTools to check alt text, functional image">
</example>
{:/}

- **Note:** Sometimes functional images may have empty or null alt attribute value <code>alt=""</code> and this is ok **if** what text would be the text alternative is moved to the parent control's label. For example, <code>aria-label="Download on the Apple App Store"</code>.

{% highlight html %}
<button aria-label="Download on the Apple App Store">
    <img src="apple.png" alt="">
</button>
{% endhighlight %}

## ✓ Some thing to test for
[content here]

## Video Example
{: .divider }
{% include video-player.html filename = "/assets/media/video/how-to/some-video-here.mp4" title = "Description of the video goes here" vtt="/assets/media/video/how-to/some-video-here.mp4.vtt" %}

## Related WCAG
- x.x.x Some Success Criterion

## Resources
- [A Great Resource](https://google.com/)