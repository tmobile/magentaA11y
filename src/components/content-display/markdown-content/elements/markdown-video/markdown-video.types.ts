import { BaseMarkdownElementProps } from '../types';

export interface MarkdownVideoProps extends BaseMarkdownElementProps {
  poster?: string;
  children?: React.ReactNode;
}
