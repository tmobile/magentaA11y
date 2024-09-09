# About MagentaA11y

MagentaA11y is a tool built to simplify the process of accessibility testing. 

We wanted to build an intuitive way for product teams to define "done" in a way that ensures accessible experiences work for everyone.

It uses Jekyll with a custom theme as a CMS and relies on markdown for entry creation.

## Disclaimer

- This is not a comprehensive list of all of the WCAG success criteria or techniques required to become WCAG compliant and should not be used as such.
- Adherence to this list also does not guarantee that a digital asset will be free from accessibility issues or complaints.

## Using MagentaA11y

Product owners, designers, developers or testers can use the checklist builder to collect testing instructions for web or native app components.

These testing criteria are displayed in markdown format for easy copying/pasting into project management tools like Jira.

### Testing instructions includes:

- How to test with keyboard
- How to test with screen reader
- How to test with a screen reader on a mobile device
- Link to the full entry

### Each entry contains:

- Video demos with recommended screen reader browser pairings
- Code examples
- Developer notes
- Links to official [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) and [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) documentation

## Contribute 

MagentaA11y is built and maintained by the [T-Mobile Accessibility Resource Center](https://github.com/tmobile/magentaA11y/graphs/contributors). 

### Here are some ways to contribute:

- Add a concise [demo video](/demos/) using a screen reader that's not yet covered.
- Add an entry for a component that is not included.
- Fix a typo or edit for consistent language.

## JSON Integration

You can integrate MagentaA11y acceptance criteria into your own tools using these JSON feeds:

- [Web Acceptance Criteria JSON](/criteria-web.json)
- [Native App Acceptance Criteria JSON](/criteria-native.json)

## MagentaA11y.com accessibility

MagentaA11y holds itself accountable to following a layered testing strategy.

### CI process

[Lighthouse CI](https://github.com/treosh/lighthouse-ci-action) triggers warnings for performance and SEO  and errors for accessibility on key pages and rendered templates.

{% highlight json %}
{% include_relative lighthouserc.json %}
{% endhighlight %}

### Results tracking

Results are uploaded to a [Heroku based](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/recipes/heroku-server/README.md) [LHCI server for tracking](https://aqueous-fortress-57504.herokuapp.com/app/projects)
- Installation note: to deploy, use git push heroku HEAD:main

## Local installation instructions

A11yEngineer is a Jekyll based site hosted by Github Pages. Follow Github's instructions for installing locally.

- [Clone the open source repo from T-Mobile](https://github.com/tmobile/magentaA11y)
- [Testing your GitHub Pages site locally with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll)
- Helpful links for installing Jekyll with Ruby 3.0
  - [Install Ruby 3.0 · macOS Big Sur or Catalina for Intel or Apple Silicon](https://mac.install.guide/ruby/3.html)
  - [Install Ruby 3.0 · macOS Big Sur or Catalina with Homebrew for Intel or Apple Silicon](https://mac.install.guide/ruby/13.html)
  - Note: Ruby 3.0 will require WEBrick
    - Add `gem "webrick"` to  Gemfile

## License

MagentaA11y is [open sourced by T-Mobile](https://opensource.t-mobile.com/) and released under the Apache 2.0 License.