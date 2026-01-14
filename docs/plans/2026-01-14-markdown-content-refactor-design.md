# Markdown Content Component Refactor Design

**Date:** 2026-01-14
**Status:** Approved
**Author:** Design collaboration with user

## Overview

Refactor the `markdown-content.tsx` component to eliminate spaghetti code by extracting each element renderer into its own component file. This will improve maintainability, testability, and code clarity.

## Current State

The current `markdown-content.tsx` file (~400 lines) contains 8 inline element renderers within the ReactMarkdown `components` prop:
- `li` - Interactive card handling
- `img` - Image rendering with asset path resolution
- `video` - Video element with poster support
- `source` - Video source element
- `a` - Complex link handling (function-mapped, anchors, external, internal)
- `button` - Button with icon support and function mapping
- `input` - Input with event handling, aria-disabled, controlled/uncontrolled state
- `div` - Div with function mapping and role management

## Goals

1. **Separation of Concerns:** Each element type gets its own component file
2. **Improved Type Safety:** Replace `any` types with proper TypeScript interfaces
3. **Extract Repeated Logic:** Create shared utilities for common patterns
4. **Simplify Complex Logic:** Break down complex conditionals with helper functions
5. **Maintainability:** Make the codebase easier to understand and modify

## Architecture

### Directory Structure

```
markdown-content/
├── markdown-content.tsx          # Main orchestrator (simplified to ~50 lines)
├── markdown-content.types.ts     # Shared types
├── markdown-content.scss         # Styles
├── elements/                     # New directory for renderers
│   ├── types.ts                  # Shared element types
│   ├── utils.ts                  # Shared utilities
│   ├── markdown-list-item/
│   │   ├── markdown-list-item.tsx
│   │   └── markdown-list-item.types.ts
│   ├── markdown-image/
│   │   ├── markdown-image.tsx
│   │   └── markdown-image.types.ts
│   ├── markdown-video/
│   │   ├── markdown-video.tsx
│   │   └── markdown-video.types.ts
│   ├── markdown-source/
│   │   └── markdown-source.tsx
│   ├── markdown-link/
│   │   ├── markdown-link.tsx
│   │   └── markdown-link.types.ts
│   ├── markdown-button/
│   │   ├── markdown-button.tsx
│   │   └── markdown-button.types.ts
│   ├── markdown-input/
│   │   ├── markdown-input.tsx
│   │   └── markdown-input.types.ts
│   └── markdown-div/
│       ├── markdown-div.tsx
│       └── markdown-div.types.ts
```

### Naming Convention

**Pattern:** `Markdown{Element}` (e.g., `MarkdownImage`, `MarkdownButton`, `MarkdownLink`)

**Rationale:** Makes it clear these are markdown renderers, not general components, preventing naming conflicts.

### Dependency Management

**Approach:** Pass dependencies as props (not context or hooks)

**Shared Dependencies:**
- `markdownFunctionMap` - Passed to components that support `data-fn` attribute
- `assetBasePath` - Passed to media components (img, video, source)

**Benefits:**
- Clean and explicit
- Easy to test
- No hidden dependencies
- Simple to understand data flow

## Shared Code

### Shared Types (elements/types.ts)

```typescript
import { MarkdownFunctionMap } from 'utils/markdownFunctions';

// Base props for all markdown elements
export interface BaseMarkdownElementProps {
  markdownFunctionMap: MarkdownFunctionMap;
  assetBasePath?: string;
}

// For elements with data-fn attribute
export interface FunctionMappedProps {
  'data-fn'?: string;
  'data-event'?: 'onClick' | 'onChange' | 'onInput' | 'onMouseDown' | 'onMouseUp';
}

// For elements with aria-disabled
export interface AriaDisabledProps {
  'aria-disabled'?: string | boolean;
}

// Event handler type
export type MarkdownEventHandler = (event: any) => void;
```

### Shared Utilities (elements/utils.ts)

```typescript
// Invoke mapped markdown functions safely
export const invokeMappedFunction = (fn: unknown, event: unknown): void => {
  if (typeof fn === 'function') {
    (fn as (ev: unknown) => void)(event);
  }
};

// Check if element is aria-disabled
export const isAriaDisabled = (props: Record<string, unknown>): boolean => {
  return props['aria-disabled'] === 'true' || props['aria-disabled'] === true;
};

// Wrap event handler with aria-disabled check
export const wrapWithAriaDisabledCheck = (
  handler: (e: any) => void,
  disabled: boolean
) => (e: any) => {
  if (disabled) {
    e.preventDefault();
    return;
  }
  handler(e);
};

// Resolve asset URLs (relative vs absolute)
export const resolveAssetUrl = (
  src: string | undefined,
  basePath: string | undefined
): string | undefined => {
  if (!src) return undefined;
  return src.startsWith('http') ? src : `${basePath}/${src}`;
};
```

## Component Design Patterns

### Simple Components (Image, Video, Source)

**Characteristics:**
- No complex logic
- Primarily use shared utilities
- Minimal props
- Single responsibility

**Example:**
```typescript
export const MarkdownImage: React.FC<MarkdownImageProps> = ({
  src,
  alt,
  assetBasePath
}) => {
  const resolvedSrc = resolveAssetUrl(src, assetBasePath);
  return resolvedSrc ? (
    <img src={resolvedSrc} alt={alt} loading="lazy" />
  ) : (
    <span>{alt}</span>
  );
};
```

### Medium Complexity (Link, ListItem, Div)

**Characteristics:**
- Multiple code paths
- Extract helper functions for clarity
- Clear separation of concerns

**Pattern:**
```typescript
// Helper functions at top
const isInternalAnchor = (href: string): boolean => href.startsWith('#');
const isExternalUrl = (href: string): boolean => { /* ... */ };

// Component with clear conditional flow
export const MarkdownLink: React.FC<MarkdownLinkProps> = (props) => {
  // Early returns for each case
  if (fnKey && handler) { /* function-mapped */ }
  if (!href) { /* plain link */ }
  if (isInternalAnchor(href)) { /* anchor */ }
  if (isExternalUrl(href)) { /* external */ }
  return /* internal route */;
};
```

### Complex Components (Input, Button)

**Characteristics:**
- Multiple event types
- State management considerations
- Variant handling (e.g., icon buttons)
- Extensive use of shared utilities

**Pattern:**
```typescript
// Type guards and validators at top
const shouldUseDefaultChecked = (type?: string, role?: string): boolean => {
  return type === 'radio' || role === 'switch';
};

const createAriaDisabledProps = () => ({ /* ... */ });

// Component with clear sections
export const MarkdownInput: React.FC<MarkdownInputProps> = (props) => {
  // Extract and compute values
  const fn = fnKey && markdownFunctionMap[fnKey];
  const disabled = isAriaDisabled(rest);

  // Handle no function case
  if (!fnKey || typeof fn !== 'function') { /* ... */ }

  // Handle function-mapped case
  const eventHandlers = { /* ... */ };
  return <input {...props} {...eventHandlers} />;
};
```

## Refactoring Improvements

### 1. Extract Repeated Logic

**Before:** Duplicate aria-disabled checks in multiple components
**After:** `isAriaDisabled()` and `wrapWithAriaDisabledCheck()` utilities

**Before:** Duplicate URL resolution logic
**After:** `resolveAssetUrl()` utility

**Before:** Duplicate function invocation logic
**After:** `invokeMappedFunction()` utility

### 2. Improve Type Safety

**Before:**
```typescript
const fnKey = (props as any)['data-fn'];
```

**After:**
```typescript
export interface FunctionMappedProps {
  'data-fn'?: string;
  'data-event'?: 'onClick' | 'onChange' | 'onInput' | 'onMouseDown' | 'onMouseUp';
}

export interface MarkdownLinkProps extends FunctionMappedProps {
  // ...
}
```

### 3. Simplify Complex Logic

**Before:** Large nested conditionals
**After:** Extract helper functions with descriptive names

**Example:**
```typescript
// Before: Inline complexity
if (typeof className === 'string' && className.includes('card') && className.includes('interactive')) {
  // ...
}

// After: Clear intent
const isInteractiveCard = (className?: string): boolean => {
  return typeof className === 'string' &&
         className.includes('card') &&
         className.includes('interactive');
};

if (isInteractiveCard(className)) {
  // ...
}
```

## Main Component Simplification

The main `markdown-content.tsx` will be reduced from ~400 lines to ~50 lines:

```typescript
const MarkdownContent: React.FC<MarkdownContentProps> = ({
  content,
  assetBasePath,
}) => {
  const navigate = useNavigate();
  const markdownFunctionMap = getMarkdownFunctionMap(navigate);

  if (!content.length) {
    return null;
  }

  return (
    <div className="MagentaA11y__content-details">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{
          li: (props) => <MarkdownListItem {...props} />,
          img: (props) => <MarkdownImage {...props} assetBasePath={assetBasePath} />,
          video: (props) => <MarkdownVideo {...props} assetBasePath={assetBasePath} />,
          source: (props) => <MarkdownSource {...props} assetBasePath={assetBasePath} />,
          a: (props) => <MarkdownLink {...props} markdownFunctionMap={markdownFunctionMap} />,
          button: (props) => <MarkdownButton {...props} markdownFunctionMap={markdownFunctionMap} />,
          input: (props) => <MarkdownInput {...props} markdownFunctionMap={markdownFunctionMap} />,
          div: (props) => <MarkdownDiv {...props} markdownFunctionMap={markdownFunctionMap} />,
        }}
      >
        {content || ''}
      </ReactMarkdown>
    </div>
  );
};
```

## Benefits

1. **Maintainability:** Each component is small, focused, and easy to understand
2. **Testability:** Components can be tested in isolation
3. **Type Safety:** Proper TypeScript interfaces throughout
4. **Reusability:** Shared utilities can be used across components
5. **Discoverability:** Clear file structure makes it easy to find code
6. **Scalability:** Easy to add new element renderers or modify existing ones

## Implementation Order

1. Create `elements/` directory structure
2. Create `elements/types.ts` and `elements/utils.ts`
3. Extract simple components first (Image, Video, Source)
4. Extract medium complexity components (ListItem, Div)
5. Extract complex components (Link, Button, Input)
6. Update main `markdown-content.tsx` to use new components
7. Verify all functionality works as before
8. Remove old inline component code

## Testing Strategy

- Verify each component renders correctly in isolation
- Test all code paths (function-mapped, static, aria-disabled, etc.)
- Ensure asset path resolution works for all media types
- Verify interactive card functionality (ListItem)
- Test all link types (internal, external, anchor, function-mapped)
- Confirm button variants (regular, icon, function-mapped)
- Validate input event handling and controlled/uncontrolled states

## Success Criteria

- Main component reduced to ~50 lines
- All element renderers in separate files
- No `any` types in new code
- Shared utilities eliminate duplication
- All existing functionality preserved
- TypeScript compilation with no errors
