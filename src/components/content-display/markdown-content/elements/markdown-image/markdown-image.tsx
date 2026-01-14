import React from 'react';
import { MarkdownImageProps } from './markdown-image.types';
import { resolveAssetUrl } from '../utils';

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
