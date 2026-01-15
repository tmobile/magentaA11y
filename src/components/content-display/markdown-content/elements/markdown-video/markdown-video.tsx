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
  // Resolve the poster URL using the base path, default to movie.svg if not found
  const posterPath = resolveAssetUrl(poster, assetBasePath) ?? 'movie.svg';

  return (
    <video controls preload="none" poster={posterPath}>
      {children}
    </video>
  );
};
