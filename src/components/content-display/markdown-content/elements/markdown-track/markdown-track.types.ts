import { BaseMarkdownElementProps } from '../types';

export interface MarkdownTrackProps extends BaseMarkdownElementProps {
  src?: string;
  kind?: string;
  srcLang?: string;
  label?: string;
}
