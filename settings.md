---
layout: page
title: Settings
permalink: /settings/
---

These settings will be copied/pasted along with acceptance criteria, allowing teams to know who to contact to get help.




<fieldset>
  <legend>Support information</legend>

  <label for="sme-a11y">Accessibility Subject Matter Expert</label>
  <textarea id="sme-a11y"  rows="5" aria-describedby="sme-a11y-description">
Use MagentaA11y.com/settings to declare where to find help for design, development and testing.
  </textarea>
  <div id="sme-a11y-description" class="hint">
    Example: Name and email of assigned accessibility team members
  </div>

  <label for="chat-a11y">Chat support</label>
  <input type="text" id="chat-a11y"/>
  <div id="chat-a11y-description" class="hint">
    Example: Link to accessibility chat support (ex: Slack channel)
  </div>

</fieldset>


<fieldset>
  <legend>Criteria preferences</legend>
  {% include criteria-tabs.html %}
  <input type="checkbox" role="switch" id="sme-a11y-include">
  <label for="sme-a11y-include">Support information in criteria</label>

</fieldset>