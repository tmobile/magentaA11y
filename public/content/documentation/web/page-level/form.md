## General Notes

How to test a web form for accessibility.

## Condensed

### #a11y - Web Accessibility Acceptance Criteria

How to test a web form for accessibility

1. Test keyboard only, then screen reader + keyboard actions
   - Skip-links: Not commonly used for form entry, but useful for jumping to a form landmark.
   - Tab: Focus moves to each form control in logical order, strong visual focus indicator.
   - Forms mode: Enabled when screen reader lands on a form field.

2. Test mobile screenreader gestures
   - Swipe: Focus moves to form controls inside the form.
   - Doubletap: Activates controls as expected.

3. Listen to screenreader output on all devices
    - Role: It is discoverable with screenreader shortcuts as a form landmark along with its name
   - Name: If multiple forms are present (Ex: Search, Sign in, Newsletter subscription), the form must have a name.
   - Group: Groups of related fields are identified with fieldset/legend or aria attributes.
   - Instructions: Presented before the form or inline, announced in order.
   - Errors: Errors are announced when inputs are invalid.

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/page-level/form](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/page-level/form)

## Gherkin

### #a11y - Web Accessibility Acceptance Criteria

How to test a web form for accessibility

GIVEN THAT I am on a page with a web form

1. Keyboard for mobile & desktop
   - WHEN I use the tab key to move focus to a form field
      - I SEE focus is visually indicated
      - I SEE the focus moves in a logical order

2. Desktop screenreader
   - WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
   - I use the tab key to move focus to inputs inside the form
     - I HEAR If multiple forms are present (Ex: Search, Sign in, Newsletter subscription), the form must have a name
     - I HEAR It is discoverable with screenreader shortcuts as a form landmark along with its name
     - I HEAR the screenreader switch from browse shortcuts to forms shortcuts

3. Mobile screenreader
   - WHEN I use a mobile screenreader (Talkback, VoiceOver) AND
   - I swipe to focus on inputs inside the form
     - I HEAR If multiple forms are present (Ex: Search, Sign in, Newsletter subscription), the form must have a name
     - I HEAR It is discoverable with screenreader shortcuts as a form landmark along with its name
     - I HEAR the screenreader switch from browse shortcuts to forms shortcuts

Full information: [https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/page-level/form](https://www.magentaa11y.com/MagentaA11yV2#/web-criteria/page-level/form)

## Building accessible forms

### Do not auto focus inputs

- Automatically moving focus to an input field is very confusing for people using assistive technology.

### Group inputs

Use `fieldset` and `legend` to group related fields, such as:
- Sign in
- Shipping address
- Payment information

### Error handling

- Individual inputs must have [programmatically described errors](https://www.magentaa11y.com/checklist-web/hint-help-error/) read by the screen reader on focus.
- For long forms, list all errors in an [alert](https://www.magentaa11y.com/checklist-web/alert/) with links back to each invalid input on submission attempts.

## UX guidance

### Affordance: field width indicates the expected input

Form field width should afford the user space to enter the characters that will be required. Do not arbitrarily limit the width of names, usernames, passwords or emails.

Practical Examples
  - Middle initial should be wide enough to accommodate 1 character
  - State abbreviations should be wide enough to accommodate 2 characters
  - Zip code must be wide enough to accommodate 5 characters
  - Pin numbers reflect the number of digits expected


### Why we stack inputs

Do not put forms in multiple columns.
- People are accustomed to scrolling vertically. There is no advantage to making the page take up less vertical space.
- People with low vision may be using a zoom tool, enlarging the view of their screen and thus only seeing a portion of the form. If there is a column on the right side, it will be difficult to discover the fields.
- Do not place submit buttons in a sidebar unless there is also a submit button at the bottom of the form


### Why we use autocomplete
- Utilizing [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete) allows users automated assistance in filling out form field values.
- Autocomplete is helpful for all customers leading to a speedier conversion
- For those with motor disabilities, it eliminates the need to laboriously enter information


## Code examples

### Use semantic HTML

```html
<form aria-label="Sign in">
  <fieldset>
    <legend>Sign in</legend>
    <label for="username">Username</label>
    <input type="text" id="username">
    <button type="submit">Sign in</button>
  </fieldset>
</form>
```

<example>
    <form aria-label="Sign in">
      <fieldset>
        <legend>Sign in</legend>
        <label for="username">Username</label>
        <input type="text" id="username">
        <button class="Magentaa11y-button Magentaa11y-button--primary" type="submit">Sign in</button>
      </fieldset>
    </form>
</example>


### Credit card information

Use `fieldset` and `legend` to group related fields, such as:
- This form uses minimal unobtrusive masking to make the credit card number more readable. (When done poorly, masking can can cause the field to be read repeatedly as the mask refreshes)
- Autofill attributes to help customers complete fields with less effort.
- Using `inputmode="numeric"` brings up the numeric keyboard on mobile devices making entry easier.

```html
<form aria-label="Payment information">
  <fieldset>
    <legend>
      Enter your payment information
    </legend>
      
    <div class="card-number-container">
      <label for="card-number">Card Number</label>
        
      <button type="button" class="cc-camera secondary">
         <span class="hidden-visually">Use camera to</span> 
         Scan
         <span class="hidden-visually">card number</span>
      </button>
        
      <input type="text" 
              name="cardnumber" 
              id="card-number" 
              autocomplete="cc-number"
              inputmode="numeric"
              pattern="[0-9]*"
              aria-describedby="description-card-number"
              required>

      <div id="description-card-number" class="hint secure-icon">
        Secure form protected by 8 bit encryption
      </div>
    </div>
      
    <fieldset>
      <legend>
        Expiration <span aria-hidden="true">(MM YY)</span>
      </legend>
      <div class="expiry-container">
          
        <label class="hidden-visually" for="cc-exp-month">Expiration Month (MM)</label>
        <input type="text"
              maxlength="2"  
              name="ccmonth" 
              id="cc-exp-month"
              inputmode="numeric"
              autocomplete="cc-exp-month"
              pattern="[0-9]*"
              required>
          
        <label class="hidden-visually" for="cc-exp-year">Expiration Year (YY)</span></label>
        <input type="text"
              maxlength="2"  
              name="ccyear" 
              id="cc-exp-year"
              inputmode="numeric"
              autocomplete="cc-exp-year"
              pattern="[0-9]*"
              required>
      </div>
    </fieldset>

    <label for="cc-name">Name on card</label>
    <input type="text"
          name="ccname" 
          id="cc-name"
          autocomplete="cc-name"
          maxlength="19" 
          required>

    <label for="cc-cvc">Security code</label>
    <input type="text" 
            maxlength="5" 
            name="cvc" 
            id="cc-cvc"  
            autocomplete="cc-csc"
            inputmode="numeric"
            pattern="[0-9]*"
            aria-describedby="description-cc-cvc"
            required>
    <div id="description-cc-cvc" class="hint">
      <button type="button" class="inline-link">What's a security code?</button>
          
    </div>
  </fieldset>
</form>
```

<example>
    <form aria-label="Payment information">
        <fieldset>
            <legend>Enter your payment information</legend>
            <div class="card-number-container">
                <label for="card-number">Card Number</label>
                <button type="button" class="cc-camera secondary">
                   <span class="hidden-visually">Use camera to</span> 
                   Scan
                   <span class="hidden-visually">card number</span>
                </button>
                <input type="text" 
                       name="cardnumber" 
                       id="card-number" 
                       autocomplete="cc-number"
                       inputmode="numeric"
                       pattern="[0-9]*"
                       aria-describedby="description-card-number"
                       required>
                <div id="description-card-number" class="hint secure-icon">
                  Secure form protected by 8 bit encryption
                </div>
            </div>
        </fieldset>
        <fieldset>
            <legend>Expiration <span aria-hidden="true">(MM YY)</span></legend>
            <div class="expiry-container">
                <label class="hidden-visually" for="cc-exp-month">Expiration Month (MM)</label>
                <input type="text"
                       maxlength="2"  
                       name="ccmonth" 
                       id="cc-exp-month"
                       inputmode="numeric"
                       autocomplete="cc-exp-month"
                       pattern="[0-9]*"
                       required>
                <label class="hidden-visually" for="cc-exp-year">Expiration Year (YY)</label>
                <input type="text"
                      maxlength="2"  
                      name="ccyear" 
                      id="cc-exp-year"
                      inputmode="numeric"
                      autocomplete="cc-exp-year"
                      pattern="[0-9]*"
                      required>
            </div>
        </fieldset>
        <label for="cc-name">Name on card</label>
        <input type="text"  
               name="ccname" 
               id="cc-name" 
               autocomplete="cc-name" 
               maxlength="19" 
               required>
        <label for="cc-cvc">Security code</label>
        <input type="text" 
               maxlength="5" 
               name="cvc" 
               id="cc-cvc"  
               autocomplete="cc-csc"
               inputmode="numeric"
               pattern="[0-9]*"
               aria-describedby="description-cc-cvc"
               required>
        <div id="description-cc-cvc" class="hint">
            <button  type="button" class="Magentaa11y-button Magentaa11y-button--primary inline-link">What's a security code?</button>
        </div>
    </form>
</example>

### Shipping Information

```html
<form aria-label="Shipping information">
  <fieldset>
    <legend>
      Shipping information
    </legend>
      
    <label for="address-line1">
      Address line 1
    </label>
    <input type="text" 
            id="address-line1"
            autocomplete="address-line1">
      
    <label for="address-line2">
      Address line 2
    </label>
    <input type="text" 
            id="address-line2"
            autocomplete="address-line2">
      
    <label for="address-level2">
      City
    </label>
    <input type="text" 
            id="address-level2"
            autocomplete="address-level2">
    <label for="address-level1">
        
      State
    </label>
    <select id="address-level1" 
            autocomplete="address-level1">
      <option value="" selected disabled>Choose a state</option>
      <option value="AL">Alabama</option>
      <option value="AK">Alaska</option>
      <option value="AZ">Arizona</option>
      <option value="AR">Arkansas</option>
      <option value="CA">California</option>
      <option value="CO">Colorado</option>
      <option value="CT">Connecticut</option>
      <option value="DE">Delaware</option>
      <option value="DC">District Of Columbia</option>
      <option value="FL">Florida</option>
      <option value="GA">Georgia</option>
      <option value="HI">Hawaii</option>
      <option value="ID">Idaho</option>
      <option value="IL">Illinois</option>
      <option value="IN">Indiana</option>
      <option value="IA">Iowa</option>
      <option value="KS">Kansas</option>
      <option value="KY">Kentucky</option>
      <option value="LA">Louisiana</option>
      <option value="ME">Maine</option>
      <option value="MD">Maryland</option>
      <option value="MA">Massachusetts</option>
      <option value="MI">Michigan</option>
      <option value="MN">Minnesota</option>
      <option value="MS">Mississippi</option>
      <option value="MO">Missouri</option>
      <option value="MT">Montana</option>
      <option value="NE">Nebraska</option>
      <option value="NV">Nevada</option>
      <option value="NH">New Hampshire</option>
      <option value="NJ">New Jersey</option>
      <option value="NM">New Mexico</option>
      <option value="NY">New York</option>
      <option value="NC">North Carolina</option>
      <option value="ND">North Dakota</option>
      <option value="OH">Ohio</option>
      <option value="OK">Oklahoma</option>
      <option value="OR">Oregon</option>
      <option value="PA">Pennsylvania</option>
      <option value="RI">Rhode Island</option>
      <option value="SC">South Carolina</option>
      <option value="SD">South Dakota</option>
      <option value="TN">Tennessee</option>
      <option value="TX">Texas</option>
      <option value="UT">Utah</option>
      <option value="VT">Vermont</option>
      <option value="VA">Virginia</option>
      <option value="WA">Washington</option>
      <option value="WV">West Virginia</option>
      <option value="WI">Wisconsin</option>
      <option value="WY">Wyoming</option>
    </select>
      
    <label for="postal-code">
      Zip postal code
    </label>
    <input type="text" 
            id="postal-code"
            inputmode="numeric"
            pattern="[0-9]*"
            autocomplete="postal-code"
            maxlength="5">
  </fieldset>
</form>
```

<example>
    <form aria-label="Shipping information">
      <fieldset>
        <legend>
          Shipping information
        </legend>
        <label for="address-line1">
          Address line 1
        </label>
        <input type="text" 
                id="address-line1"
                autocomplete="address-line1">
        <label for="address-line2">
          Address line 2
        </label>
        <input type="text" 
                id="address-line2"
                autocomplete="address-line2">
        <label for="address-level2">
          City
        </label>
        <input type="text" 
                id="address-level2"
                autocomplete="address-level2">
        <label for="address-level1">
          State
        </label>
        <select id="address-level1" 
                autocomplete="address-level1">
          <option value="" selected disabled>Choose a state</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
        <label for="postal-code">
          Zip postal code
        </label>
        <input type="text" 
                id="postal-code"
                inputmode="numeric"
                pattern="[0-9]*"
                autocomplete="postal-code"
                maxlength="5">
      </fieldset>
    </form>
</example>

### Contact Form

```html
<form aria-label="Contact us">
  <fieldset>
    <legend>
      Preferred contact method
    </legend>
  
    <input type="radio" name="method" id="contact-email" checked>
    <label for="contact-email">Email</label>
  
    <input type="radio" name="method" id="contact-sms">
    <label for="contact-sms">SMS text</label>
  
    <input type="radio" name="method" id="contact-phone">
    <label for="contact-phone">Phone</label>
  </fieldset>

  <fieldset>
    <legend>
      Your information
    </legend>

    <label for="email">
      Email address
    </label>
    <input id="email"
           type="email"
           autocomplete="email"
           spellcheck="false"
           aria-describedby="hint-email">
    <div class="hint" id="hint-email">
      We’ll never sell or share your information
    </div>

    <label for="phone">
      Phone number
    </label>
    <input  type="tel"
            id="phone"
            inputmode="numeric"
            autocomplete="tel"
            aria-describedby="hint-phone">
    <div class="hint" id="hint-phone">
      Format: 573-268-9692
    </div>

    <label for="message">
      Your message
    </label>
    <textarea id="message"></textarea> 
      

  </fieldset>
</form>
```
<example>
    <form aria-label="Contact us">
          <fieldset>
            <legend>
              Preferred contact method
            </legend>
            <input type="radio" name="method" id="contact-email" checked>
            <label for="contact-email">Email</label>
            <input type="radio" name="method" id="contact-sms">
            <label for="contact-sms">SMS text</label>
            <input type="radio" name="method" id="contact-phone">
            <label for="contact-phone">Phone</label>
          </fieldset>
          <fieldset>
            <legend>
              Your information
            </legend>
            <label for="email">
              Email address
            </label>
            <input id="email"
                   type="email"
                   autocomplete="email"
                   spellcheck="false"
                   aria-describedby="hint-email">
            <div class="hint" id="hint-email">
              We’ll never sell or share your information
            </div>
            <label for="phone">
              Phone number
            </label>
            <input  type="tel"
                    id="phone"
                    inputmode="numeric"
                    autocomplete="tel"
                    aria-describedby="hint-phone">
            <div class="hint" id="hint-phone">
              Format: 573-268-9692
            </div>
            <label for="message">
              Your message
            </label>
            <textarea id="message"></textarea>
          </fieldset>
        </form>
</example>

## Output from inputs
- Screenreader support varies
- Output can be used for a dynamic content that changes based on user inputs (example: a calculator).
- Alternatively, using a custom element with `role=”status”` will achieve more predictable results.

```html
<form oninput="result.value=parseInt(rent.value)+parseInt(utilities.value)">
  <fieldset>
    <legend>
      Calculate monthly expenses
    </legend>
    
    <label for="rent">Monthly rent</label>
    <input type="text" id="rent" inputmode="numeric" value="2500" maxlength="4">

    <label for="utilities">Monthly utilities</label>
    <input type="text" id="utilities" inputmode="numeric" value="500" maxlength="4">
    
    <label for="result">Total</label>
    <input 
      readonly 
      type="text"
      id="result"
      inputmode="numeric" 
      value="3000" 
      maxlength="6">
  </fieldset>
</form>
```

## Further Reading
- [WebAIM Accessible Form validation and error recovery](https://webaim.org/techniques/formvalidation/)

