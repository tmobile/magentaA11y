import React from 'react';
import { MarkdownImageProps } from './markdown-image.types';
import { resolveAssetUrl } from '../utils';

/**
 * Component for rendering images within markdown content.
 * Resolves the image source URL using the asset base path and applies lazy loading.
 */
export const MarkdownImage: React.FC<MarkdownImageProps> = ({
  src,
  alt,
  assetBasePath
}) => {
  const resolvedSrc = resolveAssetUrl(src, assetBasePath);

  // If the image URL is resolved, render an <img> tag, otherwise fallback to the alt text
  return resolvedSrc ? (
    <img src={resolvedSrc} alt={alt} loading="lazy" />
  ) : (
    <span>{alt}</span>
  );
};
