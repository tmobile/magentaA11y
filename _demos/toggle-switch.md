---
layout: demo
title:  "Toggle switch"
---

## Good examples

Use toggle switches for applying system states, not performing actions.

{::nomarkdown}
{% include /examples/input-switch.html %}
{:/}


## Bad examples

- Don't use toggle switches for contextual states or where a checkbox makes more sense.
- Ask yourself, "Would I respond "On/Off" verbally to any of these questions?

{::nomarkdown}
{% include /examples/input-switch-bad-example.html %}
{:/}

### Why are these examples better?

- The shipping/billing checkbox affirms a contextual true/false statement.
- The "Filter by color" checkbox controls a contextual filter, not an app wide setting.
- Removing the state from the "Call blocking" label makes the switch purpose and position clear.