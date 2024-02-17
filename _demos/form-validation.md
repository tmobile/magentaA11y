---
layout: form-validation
title:  "Form Validation"
---

{::nomarkdown}
{% include /examples/form-validation.html %}
{:/}

<h2>UX / Accessibility Requirements</h2>
<ul>
    <li>Helper text at the top of the form indicating how required fields are marked with asterisk *</li>
    <li>Submit button is always interactive</li>
    <li>Errors only appear after form submission</li>
    <li>Errors do not automatically appear while user is typing or moves away from a field with their input device</li>
    <li>Upon submission, keyboard focus moves to the first field with the error</li>
    <li>Errors are programmatically associated with <code>aria-describedby</code> pointing to a unique ID found on the element wrapping the error message</li>
    <li>Required fields have the <code>required</code> attribute</li>
    <li>Form fields with errors have <code>aria-invalid="true"</code></li>
    <li>Optionally, errors that have been fixed by the user can be removed a the user moves away from a field with their input device</li>
</ul>

<div class="demo-validation-code-example">
    {% highlight html %}
    {% include /examples/form-validation.html %}
    {% endhighlight %}
</div>