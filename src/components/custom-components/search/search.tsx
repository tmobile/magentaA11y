import React from 'react';
import './search.scss';

interface SearchBarProps {
  controlsId: string;
  resultCount: number;
  query: string;
  onQueryChange: (q: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ controlsId, resultCount, query, onQueryChange }) => {
  const resultsString = resultCount === 0 ? 'No results found' : `${resultCount} result${resultCount !== 1 ? 's' : ''} found`;

  return (
    <div className="searchbar" role="search">
      <label htmlFor="criteriaSearch" className="searchbar__label">
          Search to filter:
      </label>
      <input
        className="searchbar__input"
        id="criteriaSearch"
        type="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)} // returns new value to setQuery in hook
        aria-controls={controlsId}
      />
      <span className="hidden-visually" role="status">
        {resultsString}
      </span>
    </div>
  );
};

export default SearchBar;
