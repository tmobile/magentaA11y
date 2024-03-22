---
layout: form-validation
title:  "Form Validation"
---

{::nomarkdown}
{% include /examples/form-validation.html %}
{:/}

<h2>UX / Accessibility Requirements</h2>
<ul>
    <li>A <code>form</code> element consists of a <code>fieldset</code> and it has a <code>legend</code>.</li>
    <li>Helper text at the top of the form indicating how required fields are marked with an asterisk *</li>
    <li>The helper text is programmatically associated with the <code>fieldset</code> via <code>aria-describedby</code>.</li>
    <li>Submit button is always interactive [avoid disabled submit buttons to indicate the form is not complete].</li>
    <li>Submit button has a <code>type="submit"</code>.</li> 
    <li>Inline errors can appear dynamically but they should not own <code>aria-live</code> or <code>role="alert"</code>. This helps reduce screen reader announcement collision or interruptions.</li>
    <li>Upon submission, keyboard focus moves to the first field with the error.</li>
    <li>Errors are programmatically associated with <code>aria-describedby</code> pointing to a unique ID found on the element wrapping the error message.</li>
    <li>Required fields have the <code>required</code> attribute.</li>
    <li>Form fields with errors have <code>aria-invalid="true"</code>.</li>
    <li>When errors are fixed by the user, automatically remove those errors from the page and remove <code>aria-invalid="true"</code> and reference to the error in <code>aria-describedby</code>.</li>
    <li>Form fields own <code>autocomplete</code> attributes with <a href="https://www.w3.org/TR/WCAG21/#input-purposes">appropriate values</a> which is a requirement for <a href="https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html">1.3.5 Identify Input Purpose (Level AA)</a>.</li>
    <li>Note: The alert popup upon successful submission is for demo purposes only and real-world confirmations should not follow this pattern.</li>
</ul>

<div class="demo-validation-code-example">
    {% highlight html %}
    {% include /examples/form-validation.html %}
    {% endhighlight %}
</div>