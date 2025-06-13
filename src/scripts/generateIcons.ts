import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to directories and files
const iconsDirectory = path.join(__dirname, '../assets/svgs');
const iconsFilePath = path.join(__dirname, '../shared/Icons.ts');
const svgExportsFilePath = path.join(
  __dirname,
  '../shared/icons-svg-exports.tsx'
);
const typeDeclarationsFilePath = path.join(
  __dirname,
  '../shared/icons-svg-exports.d.ts'
);

// Converts a string to camelCase, removing spaces and other invalid characters
const toCamelCase = (str: string): string => {
  return str
    .replace(/[-_ ](.)/g, (_, char) => char.toUpperCase()) // Convert -char, _char, or space-char to Uppercase char
    .replace(/ /g, '') // Remove any remaining spaces
    .replace(/^./, (char) => char.toLowerCase()); // Ensure the first character is lowercase
};

const generateIcons = () => {
  try {
    const files = fs
      .readdirSync(iconsDirectory)
      .filter((file) => file.endsWith('.svg'));

    let iconsObjectContent = 'export const Icons = {\n';
    let svgExportsContent = '';
    let typeDeclarationsContent =
      'declare module "shared/icons-svg-exports" {\n  import React from "react";\n\n';

    files.forEach((file) => {
      const originalName = path.basename(file, '.svg'); // Remove the .svg extension
      const camelCaseName = toCamelCase(originalName); // Convert to camelCase

      // Generate content for `Icons.ts`
      iconsObjectContent += `  ${camelCaseName}: "${camelCaseName}",\n`;

      // Read the SVG file content
      const svgContent = fs
        .readFileSync(path.join(iconsDirectory, file), 'utf-8')
        .trim();

      // Extract the inner SVG markup (removes the outer `<svg>` tag)
      const innerSvg = svgContent
        .replace(/^<svg[^>]*>/, '')
        .replace(/<\/svg>$/, '');

      // Generate React component for `icons-svg-exports.tsx`
      svgExportsContent += `
export const ${camelCaseName} = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
    focusable="false"
>${innerSvg}</svg>
);\n`;

      // Generate type declarations for `icons-svg-exports.d.ts`
      typeDeclarationsContent += `  export const ${camelCaseName}: React.FC<React.SVGProps<SVGSVGElement>>;\n`;
    });

    iconsObjectContent += '};\n\n';
    iconsObjectContent +=
      'export type Icon = (typeof Icons)[keyof typeof Icons];\n'; // Add Icon type export
    typeDeclarationsContent += '}\n';

    // Write `Icons.ts`
    fs.writeFileSync(iconsFilePath, iconsObjectContent, 'utf-8');
    console.log(`Icons file generated successfully at ${iconsFilePath}`);

    // Write `icons-svg-exports.tsx`
    const svgExportsHeader = `import React from 'react';\n\n`;
    fs.writeFileSync(
      svgExportsFilePath,
      svgExportsHeader + svgExportsContent,
      'utf-8'
    );
    console.log(
      `SVG exports file generated successfully at ${svgExportsFilePath}`
    );

    // Write `icons-svg-exports.d.ts`
    fs.writeFileSync(
      typeDeclarationsFilePath,
      typeDeclarationsContent,
      'utf-8'
    );
    console.log(
      `Type declarations file generated successfully at ${typeDeclarationsFilePath}`
    );
  } catch (error) {
    console.error('Error generating icons:', error);
  }
};

generateIcons();
