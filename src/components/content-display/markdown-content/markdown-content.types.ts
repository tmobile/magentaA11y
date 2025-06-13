export interface MediaProps {
  src?: string;
  alt?: string;
  type?: string;
  children?: React.ReactNode;
  poster?: string;
}

export enum Criteria {
  Condensed = 'Condensed',
  Gherkin = 'Gherkin',
  Criteria = 'Criteria',
}

export interface ContentTab {
  label: string;
  content: string;
  tab: string;
}

export interface SavedCriteria extends ContentTab {
  id: string;
  savedAt: Date;
}

export interface MarkdownContentProps {
  content: string;
  activeTab?: number;
  assetBasePath?: string;
}
