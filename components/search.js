import React, { Fragment, useEffect, useState, useContext } from 'react';
import classNames from 'classnames';

import postsData from '../data/postsData';
import { useMousePosition } from '../hooks/useMousePosition';
import { MenuIsOpenContext } from '../context/menuIsOpenContext';
import Image from 'next/image';

const tags = [];

for (let key in postsData) {
  const postTags = postsData[key].tags;

  for (let i = 0; i < postTags.length; i++) {
    if (tags.indexOf(postTags[i]) === -1) tags.push(postTags[i]);
  }
}

const Search = React.memo(({ onEnteredFilter }) => {
  const [enteredFilter, setEnteredFilter] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const [isOpen, setIsOpen] = useContext(MenuIsOpenContext);

  let position = useMousePosition();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter.length !== 0) {
        onEnteredFilter(enteredFilter.toLowerCase());
      } else {
        onEnteredFilter('');
      }
    }, 200);

    // check if menu closed, close tags
    if (!isOpen) hideTags();

    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, onEnteredFilter]);

  function getElementClick() {
    return document.elementFromPoint(position.x, position.y);
  }

  function onInputChangeHandler(e) {
    setEnteredFilter(e.target.value.trim());
    if (enteredFilter === '') {
      setIsFocus(true);
    }
  }

  function onTagClickHandler(e) {
    e.stopPropagation();
    document.querySelector('.navbar-search input').focus();

    if (e.target.classList.contains('tags')) {
      setEnteredFilter('');
      return;
    }
    setEnteredFilter(e.target.textContent);
  }

  function onFocusHandler() {
    setIsFocus(true);
  }
  function hideTags(e) {
    const closest = getElementClick().closest('.tags');

    if (closest === null) {
      setIsFocus(false);
    }
  }

  function clearInput() {
    setEnteredFilter('');
    document.querySelector('.navbar-search input').focus();
  }

  return (
    <Fragment>
      <div className="navbar-search">
        <input
          value={enteredFilter}
          type="text"
          placeholder="Search"
          onFocus={onFocusHandler}
          onBlur={(e) => hideTags(e)}
          onChange={(e) => onInputChangeHandler(e)}
        />
        <button
          className={classNames({
            clean: true,
            active: enteredFilter.length > 0,
          })}
          onClick={clearInput}
        >
          <Image
            src={'/images/clean-icon.svg'}
            alt="clean input"
            width="80%"
            height="80%"
          />
        </button>
      </div>
      <div
        className={classNames({
          tags: true,
          active: isFocus,
        })}
        onClick={onTagClickHandler}
      >
        {tags.map((tag) => (
          <span key={tag} onClick={(e) => onTagClickHandler(e)}>
            {tag}
          </span>
        ))}
      </div>
    </Fragment>
  );
});

export default Search;
