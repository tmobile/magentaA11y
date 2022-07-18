---
layout: demo
title: Radio filter
---

Alternative to tabs or custom listbox menu

{% highlight html %}
{% include /examples/input-radio-filter.html %}
{% endhighlight %}

{::nomarkdown}
<example>
{% include /examples/input-radio-filter.html %}
</example>
{:/}

## Pros

Tabs seem like a natural pattern, but many screen reader users don't know the keyboard shortcuts (arrows/home/end) for tabs. Radio inputs, however, are well known.

## Cons

The only problem here is that for the sighted keyboard user, the [affordance of radio input functionality](https://tink.uk/perceived-affordances-and-the-functionality-mismatch/) is lost if it doesn't look like radio inputs.

## Alternatives

This could be accomplished with an [exclusive button group](https://lea.verou.me/2022/07/button-group/).