import React from 'react';
import { resolveAssetUrl } from '../utils';
import { MarkdownVideoProps } from './markdown-video.types';

/**
 * Component for rendering video elements within markdown content.
 * Resolves poster image URLs and handles children (usually <source> tags).
 */
export const MarkdownVideo: React.FC<MarkdownVideoProps> = ({
  poster,
  children,
  assetBasePath
}) => {
  // Resolve the poster URL using the base path
  const posterPath = resolveAssetUrl(poster, assetBasePath);

  return (
    <video controls preload="metadata" poster={posterPath}>
      {children}
    </video>
  );
};
