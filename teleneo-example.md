---
layout: page
title: Teleneo examples
permalink: /teleneo/
---

## What's happening

### Teleneo at 16px scales like Helvetica or Arial at 14px

<p class="helvetica">This is Helvetica regular 16px: Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Fugiat quo voluptas nulla pariatur? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto beatae vitae dicta sunt explicabo.</p>

<p class="teleneo">This is Teleno regular 16px: Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Fugiat quo voluptas nulla pariatur? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto beatae vitae dicta sunt explicabo.</p>

<p class="helvetica-14">This is Helvetica regular 14px: Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Fugiat quo voluptas nulla pariatur? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto beatae vitae dicta sunt explicabo.</p>

### Compare Helvetica or Arial to TeleNeo Medium rescaled

<p class="helvetica">Helvetica regular 16px: Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Fugiat quo voluptas nulla pariatur? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto beatae vitae dicta sunt explicabo.</p>

<p>TeleNeo Medium rescaled 16px rescaled: Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Fugiat quo voluptas nulla pariatur? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto beatae vitae dicta sunt explicabo.</p>

## Why it's a problem

- For the design system, it means defining font-sizes differently than the default REM value of 16px
- For designers, it means confusion about what type sizes actually mean and what contrast ratios are acceptable.
  - If you want something to be readable, 16px must actually be 18px
  - Smaller legal text at [becomes illegible](https://telekom.github.io/scale/?path=/docs/guidelines-typography--page) for anyone with less than perfect vision
- For customers, it means smaller text that's more difficult to read

## How to fix it

Rescale TeleNeo into TeleNeoUS. This solves a host of design and accessibility issues.

## Teleneo regular 16px

<p class="teleneo">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Fugiat quo voluptas nulla pariatur? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto beatae vitae dicta sunt explicabo.</p>

<p class="teleneo">Laboris nisi ut aliquip ex ea commodo consequat. Esse cillum dolore eu fugiat nulla pariatur. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>

<p class="teleneo">Et harum quidem rerum facilis est et expedita distinctio. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.</p>


## Teleneo regular 16px rescaled 110%

<p class="teleneo-rescaled">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Fugiat quo voluptas nulla pariatur? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto beatae vitae dicta sunt explicabo.</p>

<p class="teleneo-rescaled">Laboris nisi ut aliquip ex ea commodo consequat. Esse cillum dolore eu fugiat nulla pariatur. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>

<p class="teleneo-rescaled">Et harum quidem rerum facilis est et expedita distinctio. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.</p>

## Teleneo medium 16px rescaled 110%

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Fugiat quo voluptas nulla pariatur? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto beatae vitae dicta sunt explicabo.

Laboris nisi ut aliquip ex ea commodo consequat. Esse cillum dolore eu fugiat nulla pariatur. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.

Et harum quidem rerum facilis est et expedita distinctio. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.

## Caveats & disclaimers

- Any existing designers will have to expunge TeleNeo from their devices
- A single frictionless source of truth for TeleNeoUS will have to be provided
- Even if a designer did end up using TeleNeo default, it really won't have a huge impact, their type will just be more readable in production