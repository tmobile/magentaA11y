---
layout: entry
title:  "Web page HTML"
categories: html
order: 0

keyboard:
  tab: |
    Enters the page and focuses only interactive elements
  zoom: |
    Content zooms up to 200%

mobile:
  swipe: |
    Focus moves within page
  pinch: |
    Content zooms up to 200%

screenreader:
  name:  |
    The web page has a unique title
  role:  |
    n/a
  group: |
    Contains discoverable landmarks: header, nav, main and footer landmarks
  state: |
    n/a
---
## Developer notes

### Start simple: validate your code

Use the [HTML validator](https://validator.w3.org/nu/) as the foundation for ensuring your page works for everyone.

## Code examples

### Declare a language

This affects how the screenreader pronunciation..

{% highlight html %}
<html lang="en">
</html>
{% endhighlight %}

### Give your page a unique title

If the URL changes, your page needs a title unique to that page in the experience.

{% highlight html %}
<head>
  <title>Page title - Site name</title>
</head>
{% endhighlight %}

### Ensure users can zoom in

{% highlight html %}
<head>
  <meta name="viewport" 
        content="width=device-width, 
        initial-scale=1">
</head>
{% endhighlight %}

### Structure your page with landmarks
This semantic HTML contains all accessibility features by default.

{% highlight html %}
<header>
  <!-- Contains the site title -->
</header>
<nav>
  <!-- Primary navigation menu-->
</nav>
<main> 
  <!-- Main content -->
</main>
<footer>
  <!--  Site map and legal info -->
</footer>
{% endhighlight %}

### Avoid custom elements
This custom main element requires extra attributes.

{% highlight html %}
<div role="main"> 
  <h1>About our company</h1>
  <p>The main content of the page belongs here.</p>
</div>
{% endhighlight %}

#a11y - Web Accessibility Acceptance Criteria

How to test a web page html

Keyboard actions
- Tab: Enters the page and focuses only interactive elements
- Cntrl +/-: Zooms in/out of the page

Mobile screenreader gestures
- Swipe: Focus moves within page
- Pinch: Page zooms in/out

Screenreader output
- Name: The web page has a unique title
- Role: n/a
- Group: Contains discoverable landmarks: header, nav, main and footer landmarks
- State: n/a

Full information: https://www.a11yengineer.com/checklist-web/html/
