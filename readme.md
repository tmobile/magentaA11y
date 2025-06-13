# MagentaA11y V2

## Table of Contents

- [Getting Started](#getting-started)
- [Creating a PR](#creating-a-pr)
- [Available Scripts](#available-scripts)
- [Key Features](#key-features)
- [Deployment](#deployment)
- [Optimize Video Assets](#optimize-video-assets)

---

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have [Node.js](https://nodejs.org/) installed. It is recommended to use the latest LTS version.

### Installation

To set up the application, clone the repository and install dependencies:

```bash
git clone https://github.com/KArbeRes/MagentaA11yV2.git
cd MagentaA11yV2
npm install
```

---

## Creating a PR

- start in the main branch, you can check you are there by running `git branch`
- Run a `git fetch` to ensure you have the latest
- If there is new code, pull it down: `git pull origin main`
- Start a new branch, I recommend using the issue number, such as `ARC-101--details` or the feat/fix/revert/chore/style convention such as `fix--lindsay-400-menu`:
  - feat or feature: (new feature for the user, not a new feature for build script)
  - fix: (bug fix for the user, not a fix to a build script)
  - docs: (changes to the documentation)
  - style: (formatting, missing semi colons, etc; no production code change)
  - refactor: (refactoring production code, eg. renaming a variable)
  - test: (adding missing tests, refactoring tests; no production code change)
  - chore: (updating grunt tasks etc; no production code change)
- Create the new branch with `git checkout -b ARC-101--criteria-button`

### Pushing your work

While you are working, make sure you to pull and rebase on main as you go:

- `git fetch`
- `git rebase origin/main`

To push your work:

- `git diff .` // check what has changed in all the files you worked on
- `git add .` // adds all new files
- `git commit -m "fix: x message with updates"` // add commit message
- `git push origin ARC101--criteria-button`

## Available Scripts

### Development

- **`npm start`**: Starts the app in development mode.

  - Automatically generates navigation buttons and icons.
  - Accessible at [http://localhost:3000](http://localhost:3000).

### Building and Deployment

- **`npm run build`**: Builds the app for production, optimizing all assets.
- **`npm run deploy`**: Deploys the app to GitHub Pages.

### Utility Scripts

- **`npm run generate-icons`**: Generates React components for all SVG icons and updates type definitions.
- **`npm run generate-faveicons`**: Creates favicon assets.
- **`npm run create-md`**: Updates side navigation buttons dynamically.

### Markdown Generation Script

- **`npm run create-md`**: Generates structured Markdown files using predefined templates.

### Parse Markdown file updates

- **`npm run parse-md-files`**: Generates updates to Markdown files.

#### What the Script Does

1. **Creates Markdown files**:
   Based on the third argument, it inserts either a _"criteria"_ or _"how-to-test"_ accessibility testing template.
2. **Supports content categorization**: Sections for **Android/iOS Developer Notes, Video embeds**, and more.
3. **Avoids overwriting existing files**: If a file already exists, the script exits safely without making changes.

#### Running the Script

```bash
npm run create-md -- <filename> "<relative-path>" <template-type>
```

- `<filename>`: Name of the Markdown file to generate (without `.md`).
- `<relative-path>`: Folder path under `public/content/documentation/`.
- `<template-type>`: Must be either `criteria` or `how-to-test`.

#### Examples

```bash
npm run create-md -- textarea "native/controls" criteria
```

```bash
npm run create-md -- "images" "how-to-test/components" how-to-test
```

> 🗂️ When running the `create-md` script, files are saved to the `public/content/documentation` directory.  
> The relative path you provide is resolved within this base directory.

### Markdown File Structure

All documentation Markdown files should be stored under the following structure:

```
public/content/documentation/<section>/<category>/<filename>.md
```

- `<section>` could be something like `native`, `web`, or `how-to-test`
- `<category>` groups related content such as `components`, `notifications`, or any custom grouping
- `<filename>.md` is the name of the actual Markdown file

📁 This structure helps the app dynamically parse and render content correctly in the UI. The script `create-md` automatically respects and creates this structure based on the path you provide.

These commands will create:

```
public/content/documentation/native/controls/textarea.md
```

```
public/content/documentation/how-to-test/components/images.md
```

- If the category folder, such as "inputs", does not exist, it will be created.
- If the file already exists, the script will **exit with an error** to prevent accidental overwrites.

---

## Deployment

The app is deployed via GitHub Pages. Follow these steps to deploy:

1. Ensure GitHub Pages is enabled in your repository settings.
2. Update the `homepage` field in `package.json`:

   ```json
   "homepage": "https://<username>.github.io/<repository-name>"
   ```

3. Run:

   ```bash
   npm run deploy
   ```

   Your application will be live at:

   ```
   https://<username>.github.io/<repository-name>
   ```

   https://karberes.github.io/MagentaA11yV2/#/home

---

## Support

For issues, suggestions, or contributions, please open a GitHub issue or submit a pull request.

---
