## General Notes

How to test a link

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a link

1. Test keyboard only, then screen reader + keyboard actions

   - Tab: Focus visibly moves to the link
   - Enter: Activates the link

2. Test mobile screenreader gestures

   - Swipe: Focus moves to the link
   - Doubletap: Activates the link

3. Listen to screenreader output on all devices

   - Name: Its purpose is clear
   - Role: It identifies itself as a link


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/link](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/link)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a link

GIVEN THAT I am on a page with a link

1. Keyboard for mobile & desktop

   - WHEN I use the tab key to move focus to a link I SEE focus is strongly visually indicated
   - THEN when I use the enter key to activate the link I SEE my browser goes somewhere

2. Desktop screenreader

   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use the tab key to move focus to a link
      - I HEAR its purpose is clear
      - I HEAR it identifies itself as a link
   - THEN when I use the enter key to activate the link I HEAR my browser goes somewhere

3. Mobile screenreader

   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to focus on a link
      - I HEAR its purpose is clear
      - I HEAR it identifies itself as a link
   - THEN when I doubletap with the link in focus I HEAR my browser goes somewhere


Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/link](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/component/link)


## Links vs buttons

### If it goes somewhere, it's `<a>` link

- When the user clicks a link, they are taken to a different location in the site
  - Either another page or even another area of the same page
- A link can look like a big shiny button but it must be coded as `<a>` link

### If it does something, it's a `<button>`

- Buttons cause an action to occur on the same page
  - Submit a form (even when submission takes you to a new page)
  - Open a menu
  - Launch a modal
  - Expand details
- A button can look like a link, but it must be coded as a `<button>`

## Code examples

### Use semantic HTML with common sense names

This semantic HTML contains all accessibility features by default. 

```html
<a href="/about/">
  About
</a>
```

<example>
<a href="/about/">
  About
</a>
</example>

### Name links logically

- **Do not** use a heading with a generic link below. 
- Instead, make the heading a link or programmatically associate the link with the heading using <code>aria-describedby</code>.

<h4 class="bad-example"> Bad example</h4>

```html
<h3>About our coffee subscriptions</h3>
<p>Get the best coffee delivered to your door</p>
<a href="/about/">
   Learn more
```

#### Good examples

```html
<h3><a href="/about/">About our coffee subscriptions</a></h3>
<p>Get the best coffee delivered to your door</p>
```

```html
<h3 id="unique-id">About our coffee subscriptions</h3>
<p>Get the best coffee delivered to your door</p>
<a href="/about/" aria-describedby="unique-id">
   Learn more
</div>
```

### Making a link with no `href` focusable

- **Do not** put anything but a URL in the `href`
- A link with no `href` will not be focusable with the keyboard without `tabindex="0"`.
- Add `role="link"` to ensure screen reader reads the role

```html
<a tabindex="0" role="link">
  About
</a>
```

<example>
<a tabindex="0" role="link">
  About
</a>
</example>

### Avoid custom elements

This custom button requires extra attributes and keyboard event listeners.

```html
<custom-element role="link" tabindex="0">
  About
</custom-element>
```

### Repeating text links

Sometimes the design will call for multiple links with the same text label. In a case like this, `aria-label` can be used to name each link's purpose.

```html
<button>Get free coffee</button>
<a href="/free-coffee-tc/" aria-label="Free coffee terms and conditions">
  Terms & Conditions
</a>
<button>Get free donuts</button>
<a href="/free-donuts-tc/" aria-label="Free donuts terms and conditions">
  Terms & Conditions
</a>
```

### Don't duplicate the visible text name in the `aria-label`

**Do not** repeat the inner text content of a link in the `aria-label`.

<h4 class="bad-example"> Bad example</h4>

```html
<a href="/do-NOT-repeat-yourself/" 
   aria-label="Do NOT repeat yourself">
   Do not repeat yourself
</div>
```

### Don't use javascript in `href`

- **Do not** use `"href="javascript:void(0)"`. 
- When screen readers read the `href`, it becomes confusing and nonsensical 

<h4 class="bad-example"> Bad example</h4>

```html
<a href="javascript:void(0)">
   Do not use javascript in href
</div>
```

### Don't use "#" in `href`

<h4 class="bad-example"> Bad example</h4>

```html
<a href="#">
   Do not use # to populate the `href`
</div>
```

## Disabled links

- If it's unavoidable to have a disabled link present you'll need these attributes for the screen reader:
  - `tabindex="0"`
  - `role="link"`
  - `aria-disabled="true"`

```html
<a tabindex="0" role="link" aria-disabled="true">
  Continue
</a>
```

### Complex examples

<example>
   <h2 class="h-bravo">Product Card with multiple controls</h2>
   <p>This example demonstrates an approach taken for when the card may have multiple controls within it.</p>
   <div class="product-list multiple-controls">
   <div class="product-list-item">
      <div class="offer-container">
         <button type="button" class="offer-btn" aria-label="Save $400 with offer for mPhone Universe Max Extra Phabulous">
         Save $400 with offer
         </button>
      </div>
      <div class="link-container">
         <!-- The link DOES NOT wrap the entire description -->
         <h3 class="product-heading">
         <a class="product-link" href="/demos/">
            <span class="brand">
               mPhone
            </span>
            <span class="product-title">
               Universe Max Extra Phabulous
            </span>
         </a>
         </h3>
         <div class="product-image-container">
         <img class="product-image" src="media/images/mobile-phone.png" alt="mPhone Universe Max Extra Phabulous"/>
         </div>
         <ul id="meta" class="product-meta">
         <li class="rating">4.8 Stars</li>
         <li class="network">7G <span class="hidden-visually">network compatibility</span></li>
         </ul>
         <div class="end-cap">
         <ul id="colors" class="product-colors">
            <li class="red"><span class="hidden-visually">Sunset Red</span></li>
            <li class="gold"><span class="hidden-visually">Golden Canyon</span></li>
            <li class="blue"><span class="hidden-visually">Blue</span></li>
            <li class="gray"><span class="hidden-visually">Graphite</span></li>
         </ul>
         <ul id="pricing" class="product-pricing">
            <li class="monthly">
               <div><strong>Monthly</strong></div>
               <strong>
               $22.00<span class="hidden-visually">,</span>
               </strong>
               <span class="hidden-visually">
               Original price:
               </span>        
               <s>$50.00</s>
               <div>For 36 months</div>
            </li>
            <li class="today">
               <div><strong>Today</strong></div>
               $0
               <div>down + tax</div>
            </li>
            <li class="full-price">
               <strong>Full price</strong> $1,789<span class="hidden-visually">,</span>
               <span class="hidden-visually">
               Original price:
               </span>        
               <s>$1,998</s>
            </li>
         </ul>
         </div>
      </div>
   </div>
   </div>
   <h2 class="h-bravo">Product Card as a single link</h2>
   <p>This card is a single link and does not consist of any other nested controls. Use of <code>aria-labelledby</code> and <code>aria-describedby</code> to control how the card is announced by screen readers.</p>
   <div class="product-list big-links">
   <div class="product-list-item">
      <a href="/demos/" 
         aria-labelledby="prod-0-eyebrow prod-0-name" 
         aria-describedby="prod-0-meta-rating prod-0-meta-network prod-0-colors product-0-price-monthly product-0-price-today product-0-price-full">
         <div class="offer-container">
         <svg style="display: inline-block;" role="img" aria-label="Promo" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg> 15% off your next order
         </div>
         <div class="link-container">
         <h3 class="product-heading">
               <span class="brand" id="prod-0-eyebrow">
               mPhone
               </span>
               <span class="product-title" id="prod-0-name">
               Universe Max Extra Phabulous
               </span>
         </h3>
         <div class="product-image-container">
            <img class="product-image" src="media/images/mobile-phone.png" alt=""/>
         </div>
         <ul id="meta" class="product-meta">
            <li class="rating" id="prod-0-meta-rating">4.8 Stars</li>
            <li class="network" id="prod-0-meta-network">7G <span class="hidden-visually">network compatibility</span></li>
         </ul>
         <div class="end-cap">
            <span id="prod-0-colors" class="hidden-visually">Four colors available</span>
            <!-- hide colors - use visually hidden text x colors avialable -->
            <!-- reduces verbosity and all colors are available on PDP -->
            <ul id="colors" class="product-colors" aria-hidden="true">
               <li class="red"></li>
               <li class="gold"></li>
               <li class="blue"></li>
               <li class="gray"></li>
            </ul>
            <ul id="pricing" class="product-pricing">
               <li class="monthly" id="product-0-price-monthly">
               <div><strong>Monthly</strong></div>
               <strong>
                  $22.00<span class="hidden-visually">,</span>
               </strong>
               <span class="hidden-visually">
                  Original price:
               </span>        
               <s>$50.00</s>
               <div>For 36 months</div>
               </li>
               <li class="today" id="product-0-price-today">
               <div><strong>Today</strong></div>
               $0
               <div>down + tax</div>
               </li>
               <li class="full-price" id="product-0-price-full">
               <strong>Full price</strong> $1,789<span class="hidden-visually">,</span>
               <span class="hidden-visually">
                  Original price:
               </span>        
               <s>$1,998</s>
               </li>
            </ul>
         </div>
         </div>
      </a>
   </div>
   </div>
</example>

```html
<h2 class="h-bravo">Product Card with multiple controls</h2>
<p>This example demonstrates an approach taken for when the card may have multiple controls within it.</p>
<div class="product-list multiple-controls">
  <div class="product-list-item">
    <div class="offer-container">
      <button type="button" class="tertiary" aria-label="Save $400 with offer for mPhone Universe Max Extra Phabulous">
        Save $400 with offer
      </button>
    </div>
    <div class="link-container">
      <!-- The link DOES NOT wrap the entire description -->
      <h3 class="product-heading">
        <a class="product-link" href="/demos/">
          <span class="brand">
            mPhone
          </span>
          <span class="product-title">
            Universe Max Extra Phabulous
          </span>
        </a>
      </h3>
      <div class="product-image-container">
        <img class="product-image" src="../assets/images/products/mobile-phone.png" alt="mPhone Universe Max Extra Phabulous"/>
      </div>
      <ul id="meta" class="product-meta">
        <li class="rating">4.8 Stars</li>
        <li class="network">7G <span class="hidden-visually">network compatibility</span></li>
      </ul>
      <div class="end-cap">
        <ul id="colors" class="product-colors">
          <li class="red"><span class="hidden-visually">Sunset Red</span></li>
          <li class="gold"><span class="hidden-visually">Golden Canyon</span></li>
          <li class="blue"><span class="hidden-visually">Blue</span></li>
          <li class="gray"><span class="hidden-visually">Graphite</span></li>
        </ul>
        <ul id="pricing" class="product-pricing">
          <li class="monthly">
            <div><strong>Monthly</strong></div>
            <strong>
              $22.00<span class="hidden-visually">,</span>
            </strong>
            <span class="hidden-visually">
              Original price:
            </span>        
            <s>$50.00</s>
            <div>For 36 months</div>
          </li>
          <li class="today">
            <div><strong>Today</strong></div>
            $0
            <div>down + tax</div>
          </li>
          <li class="full-price">
            <strong>Full price</strong> $1,789<span class="hidden-visually">,</span>
            <span class="hidden-visually">
              Original price:
            </span>        
            <s>$1,998</s>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
<h2 class="h-bravo">Product Card as a single link</h2>
<p>This card is a single link and does not consist of any other nested controls. Use of <code>aria-labelledby</code> and <code>aria-describedby</code> to control how the card is announced by screen readers.</p>
<div class="product-list big-links">
  <div class="product-list-item">
    <a href="/demos/" 
      aria-labelledby="prod-0-eyebrow prod-0-name" 
      aria-describedby="prod-0-meta-rating prod-0-meta-network prod-0-colors product-0-price-monthly product-0-price-today product-0-price-full">
      <div class="offer-container">
        <svg style="display: inline-block;" role="img" aria-label="Promo" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg> 15% off your next order
      </div>
      <div class="link-container">
        <h3 class="product-heading">
            <span class="brand" id="prod-0-eyebrow">
              mPhone
            </span>
            <span class="product-title" id="prod-0-name">
              Universe Max Extra Phabulous
            </span>
        </h3>
        <div class="product-image-container">
          <img class="product-image" src="/assets/images/products/mobile-phone.png" alt=""/>
        </div>
        <ul id="meta" class="product-meta">
          <li class="rating" id="prod-0-meta-rating">4.8 Stars</li>
          <li class="network" id="prod-0-meta-network">7G <span class="hidden-visually">network compatibility</span></li>
        </ul>
        <div class="end-cap">
          <span id="prod-0-colors" class="hidden-visually">Four colors available</span>
          <!-- hide colors - use visually hidden text x colors avialable -->
          <!-- reduces verbosity and all colors are available on PDP -->
          <ul id="colors" class="product-colors" aria-hidden="true">
            <li class="red"></li>
            <li class="gold"></li>
            <li class="blue"></li>
            <li class="gray"></li>
          </ul>
          <ul id="pricing" class="product-pricing">
            <li class="monthly" id="product-0-price-monthly">
              <div><strong>Monthly</strong></div>
              <strong>
                $22.00<span class="hidden-visually">,</span>
              </strong>
              <span class="hidden-visually">
                Original price:
              </span>        
              <s>$50.00</s>
              <div>For 36 months</div>
            </li>
            <li class="today" id="product-0-price-today">
              <div><strong>Today</strong></div>
              $0
              <div>down + tax</div>
            </li>
            <li class="full-price" id="product-0-price-full">
              <strong>Full price</strong> $1,789<span class="hidden-visually">,</span>
              <span class="hidden-visually">
                Original price:
              </span>        
              <s>$1,998</s>
            </li>
          </ul>
        </div>
      </div>
    </a>
  </div>
</div>
``` 


## Further Reading
- [WCAG 1.4.1 Use of Color (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)
- [WCAG 2.1.1 Keyboard (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard)
- [WCAG 2.4.4 Link Purpose (In Context) (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html)
- [WCAG 2.5.3 Label in Name (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html)
- [WCAG 4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)