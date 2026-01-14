import React from 'react';
import { resolveAssetUrl } from '../utils';
import { MarkdownVideoProps } from './markdown-video.types';

export const MarkdownVideo: React.FC<MarkdownVideoProps> = ({
  poster,
  children,
  assetBasePath
}) => {
  const posterPath = resolveAssetUrl(poster, assetBasePath) ?? 'movie.svg';

  return (
    <video controls preload="none" poster={posterPath}>
      {children}
    </video>
  );
};
