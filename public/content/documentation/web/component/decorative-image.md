## General Notes

How to test a decorative image

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a decorative image

1. Test keyboard only, then screen reader + keyboard actions
    - Arrow-keys: Screenreader ignores the image completely

2. Test mobile screenreader gestures
    - Swipe: The screenreader ignores the image completely

3. Listen to screenreader output on all devices
    - Role: The image is ignored

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/decorative-image](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/decorative-image)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a decorative image

GIVEN THAT I am on a page with a decorative image

1. Keyboard for mobile & desktop

    - WHEN I use the arrow keys to browse to an image I SEE the image is skipped and ignored

2. Desktop screenreader

    - I use the arrow keys to browse to an image
      - I HEAR The image is ignored

3. Mobile screenreader

    - I swipe to browse to an image
      - I HEAR The image is ignored

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/decorative-image](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/decorative-image)

## Decorative images

There are times that images shouldn't be read because it would be repetitive or not add any value in addition to the existing page content. These types of images are generally included for purely stylistic purposes and don't impart any meaning to the rest of the content on the page.

## Is this image decorative or informative?

If the image conveys important meaning, and there's no other text on the page which explains the concept within it, then the image is likely informative. In this case, check out the [informative image checklist](/checklist-web/image) item instead.

## Decorative images still require an alt attribute

- To have valid HTML, the `alt` attribute must still be present, even when set to the empty empty value of `alt`. Note that `alt` and `alt=""` (no space) are equivalent in HTML.
  - When the `alt` attribute is empty, the screen reader ignores it (and will not read anything).
  - When the `alt` attribute is missing, the screen reader will read the `src` name or filename of the image which is a very poor user experience.

<example class="example example--contains-icon">
  <h3 class="h-charlie decorated">
    <img src="media/images/icons/icon-info.svg" alt=""> 
    Note: Your plan might be changing soon.
  </h3>
  <a href="tel:8888888888" className="decorated">
    <img src="media/images/icons/icon-phone.svg" class="icon" alt="">
      Call us: 888-888-8888
  </a>
</example>

```html
<h3 class="h-charlie decorated">
  <img
    src="media/images/icons/icon-info.svg"
    class="icon"
    alt="" />
  Note: Your plan might be changing soon.
</h3>
<a 
  href="tel:8888888888"
  class="decorated">
  <img 
    src="media/images/icons/icon-phone.svg"
    class="icon"
    alt="" />
    Call us: 888-888-8888
</a>
```

## Using inline SVG

### Inline SVG that is decorative

Inline SVGs require some special code to be hidden properly from screen readers:

- `aria-hidden="true"`

If you are using a `<use />` element, add `aria-hidden="true"`.

```html
<svg aria-hidden="true" focusable="false">
  <use href="#svg-id" aria-hidden="true" />
  <!-- if not using <use> then the child elements 
       of the inline SVG would go here -->
</svg>
```

## Further reading

- This page owes a lot to this exhaustive blog post: [Contextually Marking up accessible images and SVGs by Scott O'Hara](https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html)
- [W3C Image decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/)
