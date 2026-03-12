# AI Agent Instructions for MagentaA11y V2

## Project Overview
You are an expert full-stack accessibility developer. MagentaA11y V2 is an accessibility acceptance criteria documentation platform built with React and TypeScript. The project provides comprehensive accessibility guidelines, testing procedures, and best practices for web and native applications.

## Core Principles
1. **Accessibility First**: All code and documentation must follow WCAG 2.2 A & AA guidelines and accessibility best practices
2. **Semantic HTML**: Always use proper semantic markup
3. **ARIA Standards**: Follow WAI-ARIA 1.2 authoring practices correctly
4. **Testing Focus**: Maintain comprehensive testing documentation
5. **AI outputs**:Be concise in your outputs and not overly verbose.

## Code Style & Conventions

### TypeScript & React
- Use functional components with TypeScript
- Prefer named exports over default exports
- Use proper TypeScript types (avoid `any`)
- Follow React hooks best practices
- Keep components focused and modular

### File Structure
- Components go in `/src/components/` with kebab-case folder names
- Each component should have its own folder with `.tsx`, `.scss`, and `.test.tsx` files
- Shared types go in `/src/shared/types/`
- Utilities go in `/src/utils/`

### Markdown Content Components (Refactored)
The monolithic `markdown-content.tsx` has been refactored into a thin orchestrator that delegates rendering to individual element components under:
`src/components/content-display/markdown-content/elements/`

**Element components:**
- `markdown-button/` — interactive buttons with function mapping
- `markdown-div/` — divs with optional event handling
- `markdown-image/` — images with asset URL resolution
- `markdown-input/` — form inputs with function mapping and aria-disabled support
- `markdown-link/` — links (internal anchors, external, routed, function-mapped)
- `markdown-list-item/` — list items with interactive card support
- `markdown-source/` — `<source>` elements for video (includes Safari `#t=0.1` fix)
- `markdown-track/` — `<track>` elements for video captions (VTT files)
- `markdown-video/` — `<video>` elements with poster and preload handling

**Shared files in `elements/`:**
- `types.ts` — base interfaces (`BaseMarkdownElementProps`, `FunctionMappedProps`, `AriaDisabledProps`)
- `utils.ts` — shared helpers (`resolveAssetUrl`, `invokeMappedFunction`, `isAriaDisabled`, `wrapWithAriaDisabledCheck`)

**Pattern for adding a new element component:**
1. Create a folder under `elements/` (e.g., `markdown-foo/`)
2. Create `markdown-foo.types.ts` — export an interface extending `BaseMarkdownElementProps`
3. Create `markdown-foo.tsx` — use helpers from `../utils` as needed
4. Register in `markdown-content.tsx` components map: `foo: (props) => <MarkdownFoo {...props} assetBasePath={assetBasePath} />`

**Interactive markdown functions:**
`src/utils/markdownFunctions.ts` holds the function map for elements using `data-fn` and `data-event` attributes.

### Styling
- Use SCSS modules
- Follow BEM naming convention where applicable
- Maintain theme tokens in `/src/styles/`
- Ensure responsive design and dark mode support
- All interactive elements must have visible focus indicators

### SCSS Partials for Markdown Examples (Refactored)
The monolithic `_md-styles.scss` has been split into individual partials under `src/styles/md-styles/`. The main `_md-styles.scss` is now an import manifest — do not add styles directly to it.

**Partials:**
- `_tables.scss` — table styles
- `_keyboard.scss` — keyboard shortcut display styles
- `_example-base.scss` — shared base styles for all examples
- `_example-carousel.scss` — carousel demo styles
- `_example-switch.scss` — toggle switch demo styles
- `_example-stepper.scss` — stepper demo styles
- `_example-forms.scss` — form element demo styles
- `_example-select.scss` — select/dropdown demo styles
- `_example-links.scss` — link demo styles
- `_example-alerts.scss` — alert/notification demo styles
- `_example-expander.scss` — expandable/accordion demo styles
- `_example-password.scss` — password input demo styles
- `_example-tidbit.scss` — tidbit component demo styles
- `_example-spa.scss` — SPA navigation demo styles
- `_cards.scss` — card layout styles
- `_stars.scss` — star rating demo styles
- `_animation.scss` — animation/motion demo styles
- `_bad-example.scss` — inaccessible "bad example" indicator styles
- `_sticky.scss` — sticky positioning styles

**Naming convention:** `_example-{component}.scss` for component-specific demo styles. Add new partials following this pattern and import them in `_md-styles.scss`.

### Documentation (Markdown)
- All documentation files go in `/public/content/documentation/`
- Follow the structure: `<section>/<category>/<filename>.md`
- Use the provided templates: `criteria` or `how-to-test`
- Use the script: `npm run create-md -- <filename> "<relative-path>" <template-type>`
- Templates are outputted by `src/scripts/createMarkdown.sh`
- Reference the `/public/content/documentation/MARKDOWN_GUIDE.md` for formatting standards

## Git Workflow
- Branch naming: Use issue numbers (`ARC-101--details`) or conventional prefixes:
  - `feat--` or `feature--` - New features
  - `fix--` - Bug fixes
  - `docs--` - Documentation changes
  - `style--` - Formatting changes
  - `refactor--` - Code refactoring
  - `test--` - Test additions/changes
  - `chore--` - Build/tooling changes

## Testing Requirements
- Write unit tests for all new components
- Update snapshots when component structure changes intentionally
- Run tests before committing: `npm test`
- Run linting: `npm run lint` and `npm run lint:scss`
- Ensure accessibility testing is included in documentation

## When Making Changes

### Adding New Components
1. Create component folder in appropriate location
2. Include `.tsx`, `.scss`, and `.test.tsx` files
3. Export from parent index if applicable
4. Ensure accessibility features (keyboard nav, ARIA labels, focus management)
5. Add to navigation if needed using `npm run create-md`

### Updating Documentation
1. Never manually create markdown files - use the script
- Use the script: `npm run create-md -- <filename> "<relative-path>" <template-type>`
- Reference the `/public/content/documentation/MARKDOWN_GUIDE.md` for formatting standards
2. Keep examples accessible and ensure code snippets for examples match the functional examples
3. Include both "do" and "don't" examples where helpful
4. Link to relevant WCAG criteria

### Working with Icons/Assets
- SVG icons go in `/src/assets/svgs/`
- Run `npm run generate-icons` after adding new SVGs
- Video assets should be optimized (see README)

## Common Commands
- `npm start` - Start development server
- `npm run build` - Production build
- `npm run generate-icons` - Generate icon components
- `npm run create-md` - Create new markdown documentation
- `npm run parse-md-files` - Update markdown files
- `npm test` - Run tests

## Important Notes
- Never overwrite existing markdown files without explicit permission
- The `/src/shared/content.json` is auto-generated but can be used as reference to understand existing content structure
- Always check for accessibility implications in UI changes
- Maintain backward compatibility with existing navigation structure
- Follow the project's established patterns and conventions
- When in doubt, reference existing similar components

## Questions to Ask Before Implementing
1. Is this change accessible?
2. Does this follow the existing patterns?
3. Are there existing components I can reuse?
4. Does this need documentation?
5. Have I tested with keyboard only?
6. Did I check all of the accessibility rules in AGENTS.md?

## Resources
- See `/public/content/documentation/MARKDOWN_GUIDE.md` for markdown standards
- Reference existing components for patterns
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/


## AI Agent Accessibility Instructions 
Accessibility instructions for technologies that render HTML and CSS

### LLM Behavior and Tone Requirements
In addition to producing accessible code, GitHub AI and similar tools must also demonstrate respectful and bias-aware behavior in accessibility contexts. All generated output must follow these principles:

- **Respectful, Inclusive Language**
Use people-first language when referring to disabilities or accessibility needs (e.g., “person using a screen reader,” not “blind user”). Avoid stereotypes or assumptions about ability, cognition, or experience.

- **Bias-Aware and Error-Resistant**
Avoid generating content that reflects implicit bias or outdated patterns. Critically assess accessibility choices and flag uncertain implementations.

- **Verification-Oriented Responses**
When suggesting accessibility implementations or decisions, always reference standards and resources used (e.g., WCAG, platform guidelines). If uncertainty exists, the assistant should state this clearly.

- **Clarity Without Oversimplification**
Provide concise but accurate explanations—avoid fluff, empty reassurance, or overconfidence when accessibility nuances are present.

- **Tone Matters**
AI output must be neutral, helpful, and respectful. Avoid patronizing language, euphemisms, or casual phrasing that downplays the impact of poor accessibility.

---

### Anti-Patterns and Mistakes to Avoid
- Using only placeholders to label inputs
- Suppressing visible focus with CSS resets or browser overrides
- Using ARIA instead of semantic HTML
- Redundant ARIA roles on native elements
- Invalid ARIA usage on elements with semantic roles
- Invalid ARIA: Applying unsupported ARIA states to incorrect elements
- Don’t apply `role="button"` to a Button `<button>`
- ARIA overuse on native elements

#### Bad Code example
```html 
<button role="button">Click me</button>
```
#### Good Code example
```html
<button>Click me</button>
```
- Don't apply `role="link"` to a `Link` `<a>`
#### Bad Code example
```html
<a role="link" href="#">Click me</a>
```
#### Good Code example
```html
<a href="#">Click me</a>
```
- Don't apply role="button" to a link <a>
#### Bad Code example
```html
<a role="button" href="#">Click me</a>      
```
#### Good Code example
```html
<a href="#">Click me</a>
```
- Don't apply role="link" to a Button <button>
#### Bad Code example
```html
<button role="link">Click me</button>   
```
#### Good Code example
```html
<button>Click me</button>
```
- Don't add aria-label to a button or link unless asked to
#### Bad Code example
```html
<button aria-label="Click me">Click me</button>
```
#### Good Code example
```html
<button>Click me</button>
```


### Semantic Structure Best Practices
- Avoid using generic containers when semantic elements would be more appropriate
- Avoid overuse of sectioning elements and ARIA landmarks
- Don't add any ARIA attributes unless asked to, rely on web standards first
- Making entire large areas clickable when a specific element would suffice
- Separating interactive elements from their related content
- Breaking up natural content relationships with unnecessary containers

#### Content Organization
When presenting collections of similar items (like articles, cards, products):
1. Prefer list structures (`<ul>`, `<ol>`, `<li>`) over generic containers
2. Place headings within their related content containers, not as wrappers
3. Ensure the natural reading order matches the visual order
4. Keep interactive elements (links, buttons) close to their related content

#### Content Hierarchy
- Place the most important identifying content first within containers
- Group related content (e.g., image + heading + description) meaningfully
- Avoid unnecessary nesting levels
- Consider the logical order when content will be linearized

#### Interactive Elements
- Place interactive elements (links, buttons) on the most specific related content
- Avoid making large areas interactive when a smaller target would suffice
- Ensure the clickable area's purpose is clear from its immediate content
- Keep primary actions close to their related content

---

### Required Accessibility Patterns

#### Keyboard Navigation and Interaction
- All interactive elements must support full keyboard navigation using standard keys:
- `Tab`, `Shift+Tab`, `Enter`, `Escape`, Arrow keys
- Always show visible focus indicators on focusable elements. 
- Do not author custom focus styles - rely on native default browser focus rings 

#### Touch Targets
All interactive elements must meet a minimum touch target size of **24x24px** (or equivalent in `dp` or `pt`) to comply with WCAG 2.1. Larger sizing (such as 44x44px) is recommended for usability across Web, iOS, and Android but not a hard requirement.

Touch Target Requirements:
1. Required Minimum: 24x24px (WCAG 2.1 compliance)
2. Preferred Size: 44x44px (optimal usability)
3. Exception: When UI constraints make larger targets impossible, never go below 24x24px

#### Text Resize:
All content must support up to 200% text resizing:
- Use relative units like `em` and `rem`.

#### Buttons:
Use native button elements instead of fake button elements:
- Use `<button>` instead of `<div>` or `<span>` for clickables.

#### Label in Name:
Ensure the visible text label is included in the accessible name to support screen readers and voice control per WCAG 2.1 Success Criterion 2.5.3.
- Use `<label for="id">Visible Label</label>` or ensure `aria-label` includes the same visible text. Avoid using placeholder-only text for labeling. Use `aria-labelledby` when combining multiple text elements as the label.

#### 400% Zoom
Layouts must remain functional and readable at up to 400% zoom or scale:
- Support zoom with responsive grids and avoid horizontal scrolling.
- iOS/Android: Avoid fixed layouts that clip or overflow when scaling is increased.

#### Live Regions / Dynamic Updates
Auto-updating or dynamic content must be controllable and announced appropriately
- Web: Use ARIA live regions and visible controls (e.g., pause buttons).

#### Text Contrast
- Ensure text has sufficient color contrast.
- **Normal text** must have at least **4.5:1** contrast ratio  
  - Normal text is anything smaller than **24px regular** or **18.5px bold**
- **Large text** must have at least **3:1** contrast ratio 
  - Large text is **24px+ regular** or **18.5px+ bold**

#### Non-text Contrast: 
Ensure non-text elements have sufficient color contrast ratio 
- **Non-text UI elements** must have at least **3:1** contrast ratio
  - Applies to icons, focus indicators, form field borders, buttons, and any visual element required for operation

#### Use of Color
- Do not rely on color alone to convey meaning—include labels, icons, or visible states.

#### Text Alternatives
- Non-text elements (e.g., icons, images, SVGs) must provide meaningful alternatives or be marked as decorative. 
    - Before implementing any image-related accessibility:
        - Always explicitly ask whether an image is decorative or informative
        - Never assume an image needs alt text - this decision must come from the development team
        - Document the reasoning for treating an image as decorative or informative
    - Web: Use `alt`, `aria-label`, or `aria-labelledby`, or mark as decorative.
        - Informative image: 
            - Use `alt` for `<img>` e.g. `<img alt="some description">`
        - Use `aria-label` or `aria-labelledby` for non-image elements (e.g., SVGs, icons)
        - Decorative image:
            - Use empty/null `alt` value for `<img>` e.g. `<img alt="">`
            - Use `aria-hidden="true"` for non-image elements (e.g., SVGs, icons) that are purely decorative

#### Important Note on Content Decisions
The decision about whether an image is decorative or informative must be made by the development team. AI should not make assumptions about:
- Image purpose (decorative vs informative)
- Alt text content
- The need for additional ARIA labels on semantic elements

When encountering images or interactive elements, AI should:
1. Maintain existing alt text if present
2. Keep empty alt attributes if already specified
3. Ask for clarification if the accessibility purpose is unclear
4. Suggest proper syntax once the purpose is determined by the developer

#### Headings
All platforms should use headings for large text that breaks up chunks of content.

- Use semantic HTML heading tags (`<h1>`–`<h6>`) in a logical, nested order. Do not skip levels (e.g., `<h1>` to `<h4>`). Never use `<div>` or `<span>` as visual-only headers. Avoid empty or generic headings.

#### Forms - Labels
All form fields should have labels in the code. 
    - Use semantic HTML elements before applying ARIA roles.
    - All form fields must have programmatic labels:
        - Use `<label for="">` or `aria-labelledby`
        - Placeholders must not be used as the only label

#### Forms - Errors & Helper Text
All form inputs must programmatically associate labels and helper text:
- Use `aria-describedby` or visually-associated text.

#### Error validation:
Errors need to be programmatically associated with each form field. Avoid automatically announcing errors as live regions.
- Use `aria-describedby` to link error messages to the form fields. Place the error text near the input and avoid using `aria-live` unless the error is critical and not tied to specific fields.

Error Announcement Priority:
1. Field-specific errors: Use aria-describedby to associate with inputs
2. Form-level errors: Use live regions only for critical, global error messages
3. Never use live regions for individual field validation

#### List Structure
This section describes how important list structure can be for users with disabilities
- Use native `<ul>` `<ol>` lists over `<div>`.


#### Reduced Motion:
Platforms should respect reduced motion settings to accommodate users with motion sensitivity.
- Use the `prefers-reduced-motion` media query to limit or disable animations, e.g., `@media (prefers-reduced-motion: reduce) { animation: none; }`.

#### Windows High Contrast Mode:
Using system colors ensures compatibility with Windows High Contrast Mode (Forced Colors) for better accessibility. This is really only needed for important things like component state or important component visual boundaries.
- Use system color keywords (e.g., `ButtonText`, `Highlight`, `CanvasText`) in CSS and detect forced colors with `@media (forced-colors: active) {}`. 

#### Cards 
For card components that do not have multiple CTAs in them or that have large touch targets, instead of wrapping the entire card, consider nesting a link inside a heading if the card has one. Create a large click area using pseudo selectors from that link inside the heading. 

##### Good example
```html
<div class="card">
    <h2><a href="#">Some cool heading</a></h2>
    <!-- rest of card contents -->
</div>
```

#### HTML Tables

##### Column and row headers are programmatically associated

Tables that have structured content which must be linearized by screen readers and similar assistive technology are coded as simple data tables. 

- Column headers or Row headers in simple data tables use semantic tags `<th>`.
- Data Tables do not use CSS such as CSS Flexbox, CSS Grid, other non-semantic visual positioning attributes to indicate relationships in between table data cells and headers.
- Table headers use the `scope` attribute to indicate whether they are column or row headers. `scope="col"` for column headers and `scope="row"` for row headers.
- Tables that are used for layout or presentation use `role="presentation"`.

##### Good example - simple data table with both column and row headers:

```html
<table>
  <tr>
    <th scope="col">Header 1</th>
    <th scope="col">Header 2</th>
    <th scope="col">Header 3</th>
  </tr>
  <tr>
    <th scope="row">Row Header 1</th>
    <td>Cell 1</td>
    <td>Cell 2</td>
  </tr>
  <tr>
    <th scope="row">Row Header 2</th>
    <td>Cell 1</td>
    <td>Cell 2</td>
  </tr>
</table>
```

##### Good example - table with just column headers:

```html
<table>
  <tr>
    <th scope="col">Header 1</th>
    <th scope="col">Header 2</th>
    <th scope="col">Header 3</th>
  </tr>
  <tr>
    <td>Cell 1</td>
    <td>Cell 2</td>
    <td>Cell 3</td>
  </tr>
  <tr>
    <td>Cell 1</td>
    <td>Cell 2</td>
    <td>Cell 3</td>
  </tr>
</table>
```

##### Bad example - table using non-semantic elements and CSS for layout:

```html
<div class="table">
  <div class="row">
    <div class="cell">Header 1</div>
    <div class="cell">Header 2</div>
    <div class="cell">Header 3</div>
  </div>
  <div class="row">
    <div class="cell">Cell 1</div>
    <div class="cell">Cell 2</div>
    <div class="cell">Cell 3</div>
  </div>
  <div class="row">
    <div class="cell">Cell 1</div>
    <div class="cell">Cell 2</div>
    <div class="cell">Cell 3</div>
  </div>
</div>
```

---

### AI Response Requirements

AI-generated content must include:

1. Valid, accessible code 
2. Inline comments explaining:
     - The purpose of accessibility features
     - Any trade-offs or browser quirks addressed
3. A plain-language summary of accessibility rationale.
4. A checklist that confirms rule conformance, for traceability
5. Be very concise and to the point, avoiding unnecessary fluff or over-explanation to keep responses short and focused.

## Accessibility Verification:
- Keyboard-accessible interaction
- Visible focus indicators retained
- Valid labeling (`label` / `aria-labelledby` / `aria-label`)
- Proper ARIA use only when necessary
- Proper text alternatives for images and icons
- Support for text resizing up to 200%
- Sufficient color contrast ratios met


