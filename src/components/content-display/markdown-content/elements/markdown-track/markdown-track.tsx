import React from 'react';
import { resolveAssetUrl } from '../utils';
import { MarkdownTrackProps } from './markdown-track.types';

/**
 * Component for rendering <track> elements within markdown video components.
 * Resolves the track source URL using the asset base path.
 */
export const MarkdownTrack: React.FC<MarkdownTrackProps> = ({
  src,
  kind,
  srcLang,
  label,
  assetBasePath
}) => {
  const resolvedSrc = resolveAssetUrl(src, assetBasePath);
  return <track src={resolvedSrc} kind={kind} srcLang={srcLang} label={label} />;
};
