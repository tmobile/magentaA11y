import fs from 'fs';
import { Heading, Parent, Root, RootContent, Text } from 'mdast';
import { gfmTableToMarkdown } from 'mdast-util-gfm-table';
import { toMarkdown } from 'mdast-util-to-markdown';
import path from 'path';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { DocumentationCategory } from 'shared/types/shared-types';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const documentationDir = path.join(
  __dirname,
  '../../public/content/documentation'
);
const outputPath = path.join(__dirname, '../shared/content.json');

// Format names to a label format
const formatLabel = (name: string) =>
  name
    .replace(/-/g, ' ')
    .replace(/\.md$/i, '')
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

// Check if a node is a heading
const isHeading = (node: RootContent): node is Heading =>
  node.type === 'heading' && (node as Heading).depth !== undefined;

// Check if a node has children
const hasChildren = (node: any): node is Parent =>
  Array.isArray((node as Parent).children);

// Extract sections and omit H1 headers
const extractSections = (content: string) => {
  const tree = remark().use(remarkParse).use(remarkGfm).parse(content) as Root;

  const sections: Record<string, RootContent[]> = {};
  let currentSection:
    | 'generalNotes'
    | 'gherkin'
    | 'condensed'
    | 'criteria'
    | 'videos'
    | 'androidDeveloperNotes'
    | 'iosDeveloperNotes'
    | 'other' = 'other';

  sections[currentSection] = [];

  if (hasChildren(tree)) {
    const nodes = tree.children;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if (isHeading(node) && node.depth === 2 && hasChildren(node)) {
        const headingText = (node.children[0] as Text).value.toLowerCase();

        if (headingText === 'general notes') {
          currentSection = 'generalNotes';
        } else if (headingText === 'gherkin') {
          currentSection = 'gherkin';
        } else if (headingText === 'condensed') {
          currentSection = 'condensed';
        } else if (headingText === 'criteria') {
          currentSection = 'criteria';
        } else if (headingText === 'android developer notes') {
          currentSection = 'androidDeveloperNotes';
        } else if (headingText === 'ios developer notes') {
          currentSection = 'iosDeveloperNotes';
        } else if (headingText === 'videos') {
          currentSection = 'videos';
        } else {
          currentSection = 'other';
        }

        if (!sections[currentSection]) {
          sections[currentSection] = [];
        }

        // Only include the heading in the 'other' section
        if (currentSection === 'other') {
          sections[currentSection].push(node);
        }
      } else {
        sections[currentSection].push(node);
      }
    }
  }

  // Serialize each section back to markdown
  return {
    generalNotes: sections['generalNotes']
      ? toMarkdown(
          { type: 'root', children: sections['generalNotes'] },
          { extensions: [gfmTableToMarkdown()] }
        ).trim()
      : null,
    gherkin: sections['gherkin']
      ? toMarkdown(
          { type: 'root', children: sections['gherkin'] },
          { extensions: [gfmTableToMarkdown()] }
        ).trim()
      : null,
    condensed: sections['condensed']
      ? toMarkdown(
          { type: 'root', children: sections['condensed'] },
          { extensions: [gfmTableToMarkdown()] }
        ).trim()
      : null,
    criteria: sections['criteria']
      ? toMarkdown(
          { type: 'root', children: sections['criteria'] },
          { extensions: [gfmTableToMarkdown()] }
        ).trim()
      : null,
    videos: sections['videos']
      ? toMarkdown(
          { type: 'root', children: sections['videos'] },
          { extensions: [gfmTableToMarkdown()] }
        ).trim()
      : null,
    androidDeveloperNotes: sections['androidDeveloperNotes']
      ? toMarkdown(
          { type: 'root', children: sections['androidDeveloperNotes'] },
          { extensions: [gfmTableToMarkdown()] }
        ).trim()
      : null,
    iosDeveloperNotes: sections['iosDeveloperNotes']
      ? toMarkdown(
          { type: 'root', children: sections['iosDeveloperNotes'] },
          { extensions: [gfmTableToMarkdown()] }
        ).trim()
      : null,
    developerNotes: sections['other']
      ? toMarkdown(
          { type: 'root', children: sections['other'] },
          { extensions: [gfmTableToMarkdown()] }
        ).trim()
      : null,
  };
};

// Get directory structure
const getDirectoryStructure = (dirPath: string): any => {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  return items
    .map((item) => {
      const itemPath = path.join(dirPath, item.name);

      if (item.isDirectory()) {
        return {
          label: formatLabel(item.name),
          name: item.name,
          children: getDirectoryStructure(itemPath),
        };
      } else if (item.isFile() && item.name.endsWith('.md')) {
        const content = fs.readFileSync(itemPath, 'utf-8');
        const sections = extractSections(content);

        return {
          label: formatLabel(item.name),
          name: item.name.replace('.md', ''),
          type: 'file',
          ...sections,
        };
      }
      return null;
    })
    .filter(Boolean);
};

// Generate content data
const generateContentData = () => {
  try {
    const documentation = fs.readdirSync(documentationDir, {
      withFileTypes: true,
    });

    const unorderedContentData = documentation.reduce((acc, item) => {
      if (item.isDirectory()) {
        acc[item.name] = getDirectoryStructure(
          path.join(documentationDir, item.name)
        );
      }
      return acc;
    }, {} as Record<string, any>);

    const orderedKeys = [
      DocumentationCategory.WEB,
      DocumentationCategory.NATIVE,
      DocumentationCategory.HOW_TO_TEST,
    ];

    const contentData: Record<string, any> = {};
    for (const key of orderedKeys) {
      if (unorderedContentData[key]) {
        contentData[key] = unorderedContentData[key];
      }
    }

    fs.writeFileSync(outputPath, JSON.stringify(contentData, null, 2));
    console.log('Content data generated successfully.');
  } catch (error) {
    console.error('Error generating content data:', error);
  }
};

generateContentData();
