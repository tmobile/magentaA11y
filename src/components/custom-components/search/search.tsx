import React from 'react';
import './search.scss';

interface SearchBarProps {
  controlsId: string;
  resultCount: number;
  query: string;
  onQueryChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ controlsId, resultCount, query, onQueryChange }) => {
  return (
    <div className="searchbar">
      <label htmlFor="search1" className="searchbar__label">
          Search to filter the cards:
      </label>
      <input
        className="searchbar__input"
        role="combobox"
        aria-autocomplete="list"
        id="search1"
        type="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        aria-controls={controlsId}
        aria-expanded="false"
        aria-haspopup="false"
      />
      <span className="hidden-visually" role="status">
        {query ? `${resultCount} result${resultCount !== 1 ? 's' : ''} found` : ''}
      </span>
    </div>
  );
};

export default SearchBar;
