/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { getMarkdownFunctionMap } from 'utils/markdownFunctions';
import { MarkdownContentProps } from './markdown-content.types';
import { MarkdownListItem } from './elements/markdown-list-item/markdown-list-item';
import { MarkdownImage } from './elements/markdown-image/markdown-image';
import { MarkdownVideo } from './elements/markdown-video/markdown-video';
import { MarkdownSource } from './elements/markdown-source/markdown-source';
import { MarkdownLink } from './elements/markdown-link/markdown-link';
import { MarkdownButton } from './elements/markdown-button/markdown-button';
import { MarkdownInput } from './elements/markdown-input/markdown-input';
import { MarkdownDiv } from './elements/markdown-div/markdown-div';
import { MarkdownTrack } from './elements/markdown-track/markdown-track';

import './markdown-content.scss';

/**
 * Component that renders markdown content using ReactMarkdown.
 * It uses custom components to override default HTML element rendering,
 * enabling special features like asset URL resolution and custom function mapping.
 */
const MarkdownContent: React.FC<MarkdownContentProps> = ({
  content,
  assetBasePath,
}) => {
  const navigate = useNavigate();
  // Initialize the function map for custom markdown interactions
  const markdownFunctionMap = getMarkdownFunctionMap(navigate);

  if (!content.length) {
    return null;
  }

  return (
    <div className="MagentaA11y__content-details">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom overrides for standard markdown elements
          li: (props) => <MarkdownListItem {...props} />,
          img: (props) => <MarkdownImage {...props} assetBasePath={assetBasePath} />,
          video: (props) => <MarkdownVideo {...props} assetBasePath={assetBasePath} />,
          source: (props) => <MarkdownSource {...props} assetBasePath={assetBasePath} />,
          track: (props) => <MarkdownTrack {...props} assetBasePath={assetBasePath} />,
          a: (props) => <MarkdownLink {...props} markdownFunctionMap={markdownFunctionMap} />,
          button: (props) => <MarkdownButton {...props} markdownFunctionMap={markdownFunctionMap} />,
          input: (props) => <MarkdownInput {...props} markdownFunctionMap={markdownFunctionMap} />,
          div: (props) => <MarkdownDiv {...props} markdownFunctionMap={markdownFunctionMap} />,
        }}
      >
        {content || ''}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
