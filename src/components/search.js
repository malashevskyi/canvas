import React, { useEffect, useState } from 'react';

const Search = React.memo(({ onEnteredFilter }) => {
  const [enteredFilter, setEnteredFilter] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter.length !== 0) {
        onEnteredFilter(enteredFilter.toLowerCase());
      } else {
        onEnteredFilter('');
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, onEnteredFilter]);

  function onInputChangeHandler(e) {
    setEnteredFilter(e.target.value.trim());
  }

  return (
    <div className="navbar-search">
      <input
        value={enteredFilter}
        type="text"
        placeholder="Search"
        onChange={(e) => onInputChangeHandler(e)}
      />
    </div>
  );
});

export default Search;
