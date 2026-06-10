import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';

interface ContentItem {
  label: string;
  name: string;
  generalNotes?: string | null;
  developerNotes?: string | null;
}

export const useSearch = (items: ContentItem[]) => {
  const [query, setQuery] = useState(''); // start with query being ''

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ['label', 'developerNotes', 'generalNotes'],
        threshold: 0.2,
        // useTokenSearch: true, // can add in fuzzier search .. or perhaps toggle this at some point for pro folks who want to search "card" or "aria-busy" etc
        includeScore: true,
      }),
    [items]
  );

  const matches = query ? fuse.search(query).map((r) => r.item) : null;
  const results = matches && matches.length === 0
    ? [{ label: 'No results found', name: 'no-results', generalNotes: "No criteria matches this search."}]
    : matches;

  return { query, setQuery, results };
};
