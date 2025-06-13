declare module 'favicons' {
  export interface FaviconOptions {
    path?: string;
    appName?: string;
    appShortName?: string;
    appDescription?: string;
    developerName?: string;
    developerURL?: string;
    dir?: 'auto' | 'ltr' | 'rtl';
    lang?: string;
    background?: string;
    theme_color?: string;
    appleStatusBarStyle?: 'default' | 'black' | 'black-translucent';
    display?: 'browser' | 'standalone' | 'fullscreen' | 'minimal-ui';
    orientation?: 'any' | 'natural' | 'portrait' | 'landscape';
    scope?: string;
    start_url?: string;
    preferRelatedApplications?: boolean;
    relatedApplications?: { platform: string; url: string; id?: string }[];
    icons?: {
      android?: boolean;
      appleIcon?: boolean;
      appleStartup?: boolean;
      coast?: boolean;
      favicons?: boolean;
      firefox?: boolean;
      windows?: boolean;
      yandex?: boolean;
    };
  }

  export interface FaviconResponse {
    images: Array<{ name: string; contents: Buffer }>;
    files: Array<{ name: string; contents: string }>;
    html: string[];
  }

  export default function favicons(
    source: string | Buffer | string[],
    options: FaviconOptions
  ): Promise<FaviconResponse>;
}
