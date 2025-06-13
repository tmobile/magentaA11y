import favicons, { FaviconOptions, FaviconResponse } from 'favicons';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration options
const config: FaviconOptions = {
  path: 'app-assets/', // Relative path without leading slash
  appName: 'MagentaA11y',
  appShortName: 'MagentaA11y',
  appDescription:
    'MagentaA11y is a tool built to simplify the process of accessibility testing.',
  developerName: 'Kevin Arbelaez',
  developerURL: 'https://www.linkedin.com/in/kevin-arbelaez/',
  background: '#FFFFFF',
  theme_color: '#f6288f',
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    favicons: true,
    windows: true,
    yandex: false,
  },
};

const logoPath: string = path.resolve(
  __dirname,
  '../assets/svgs/brand-logo-magenta.svg'
);

const generateFavicons = async () => {
  try {
    const publicDir: string = path.resolve(__dirname, '../../public');
    const appAssetsDir: string = path.join(publicDir, 'app-assets');
    const manifestPath = path.join(publicDir, 'manifest.json');

    // Ensure app-assets directory exists
    if (!fs.existsSync(appAssetsDir))
      fs.mkdirSync(appAssetsDir, { recursive: true });

    const response: FaviconResponse = await favicons(logoPath, config);

    // Save generated assets in the app-assets directory
    response.images.forEach((image) => {
      fs.writeFileSync(path.join(appAssetsDir, image.name), image.contents);
    });

    // Merge existing manifest with the generated one
    let existingManifest: any = {};
    if (fs.existsSync(manifestPath)) {
      existingManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    }

    const generatedManifest = JSON.parse(
      response.files
        .find((file) => file.name === 'manifest.webmanifest')!
        .contents.toString()
    );

    // Remove leading slash from icon paths
    if (generatedManifest.icons) {
      generatedManifest.icons = generatedManifest.icons.map((icon: any) => ({
        ...icon,
        src: icon.src.startsWith('/') ? icon.src.substring(1) : icon.src,
      }));
    }

    // Preserve custom fields from the existing manifest
    const mergedManifest = {
      ...generatedManifest,
      id: existingManifest.id || '/',
      start_url: existingManifest.start_url || '/',
      screenshots: existingManifest.screenshots || [],
      launch_handler: existingManifest.launch_handler || {},
      categories: existingManifest.categories || [],
    };

    // Write the merged manifest back to the file
    fs.writeFileSync(manifestPath, JSON.stringify(mergedManifest, null, 2));
    console.log('Manifest file updated with preserved custom fields!');

    // Save the generated HTML tags
    fs.writeFileSync(
      path.join(publicDir, 'meta-tags.html'),
      response.html.join('\n')
    );

    console.log('Favicons generated successfully in the public directory!');
  } catch (error) {
    console.error('Error generating favicons:', (error as Error).message);
  }
};

// Call the function
generateFavicons();
