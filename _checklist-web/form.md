---
layout: entry
title:  "Form"
description: "How to code and test an accessible text input for Web"
categories: form
order: 1

keyboard:
  tab: |
    Focus moves visibly to the inputs inside the form
      
mobile:
  swipe: |
    Focus moves to the inputs inside the form
  keyboard: |
    Keyboard appears

screenreader:
  name:  |
    If multiple forms are present (Ex: Search, Sign in, Newsletter subscription), the form should have a name
  role:  |
    It is discoverable with screenreader shortcuts as a form landmark along with its name

gherkin-keyboard: 
  - when:  |
      the tab key to move focus to inputs inside the form
    result: |
      focus is strongly visually indicated

gherkin-mobile:
  - when:  |
      swipe to focus on inputs inside the form

---

## Building accessible forms

### Do not auto-focus

- Automatically moving focus to an input field is very confusing for people using assistive technology.

### Group inputs

Use `fieldset` and `legend` (directly under the first fieldset tag) that describes  groupings such as
- Sign in or Sign up
- Personal information
- Shipping address
- Credit card information

### Affordance: field width indicates the expected input

Form field width should afford the user space to enter the characters will be required. **Do not** arbitrarily limit the width of names, usernames, passwords or emails.

- Middle initial should be wide enough to accommodate 1 character
- State should be wide enough to accommodate 2 characters
- Zip code should be wide enough to accommodate 5 characters

### Why we stack inputs

**Do not** put forms in multiple columns.

- People are accustomed to scrolling vertically. There is no advantage to making the page take up less vertical space.
- People with low vision may be using a zoom tool, enlarging the view of their screen and thus only seeing a portion of the form. If there is a column on the right side, it will be difficult to discover the fields.

### Why we use autocomplete

- Autocomplete is helpful for all customers leading to a speedier conversion
- For those with motor disabilities, it eliminates the need to laboriously enter information

## Code examples

### Use semantic HTML

{::nomarkdown}
<example>
{% include /examples/form-sign-in.html %}
</example>
{:/}

{% highlight html %}
{% include /examples/form-sign-in.html %}
{% endhighlight %}

### Credit card information

- This form uses minimal unobtrusive masking to make the credit card number more readable. (When done poorly, masking can can cause the field to be read repeatedly as the mask refreshes)
- Autofill attributes to help customers complete fields with less effort. 
- Using `inputmode="numeric"` brings up the numeric keyboard on mobile devices making entry easier.

{::nomarkdown}
<example>
{% include /examples/form-payment.html %}
</example>
{:/}

{% highlight html %}
{% include /examples/form-payment.html %}
{% endhighlight %}

### Shipping information

{::nomarkdown}
<example>
{% include /examples/form-shipping.html %}
</example>
{:/}

{% highlight html %}
{% include /examples/form-shipping.html %}
{% endhighlight %}

### Contact form

{::nomarkdown}
<example>
{% include /examples/form-contact.html %}
</example>
{:/}

{% highlight html %}
{% include /examples/form-contact.html %}
{% endhighlight %}
