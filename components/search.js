import React, { useEffect, useCallback, useState, useContext } from 'react'
import classNames from 'classnames'
import Image from 'next/image'

import postsData from '../data/postsData'
import useMousePosition from '../hooks/useMousePosition'
import { MenuIsOpenContext } from '../context/menuIsOpenContext'

const tags = []
const postsDataKeys = Object.keys(postsData)

function addPostTags(postTags) {
  for (let i = 0; i < postTags.length; i++) {
    if (tags.indexOf(postTags[i]) === -1) tags.push(postTags[i])
  }
}
function addTags() {
  for (let i = 0; i < postsDataKeys.length; i++) {
    const postTags = postsData[postsDataKeys[i]].tags

    addPostTags(postTags)
  }
}
addTags()

const Search = React.memo(({ onEnteredFilter }) => {
  const [enteredFilter, setEnteredFilter] = useState('')
  const [isFocus, setIsFocus] = useState(false)

  const [isOpen] = useContext(MenuIsOpenContext)

  const position = useMousePosition()

  const getElementClick = useCallback(
    () => document.elementFromPoint(position.x, position.y),
    [position]
  )
  const hideTags = useCallback(
    (e) => {
      const closest = getElementClick().closest('.tags')

      if (closest === null) {
        setIsFocus(false)
      }
    },
    [getElementClick]
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter.length !== 0) {
        onEnteredFilter(enteredFilter.toLowerCase())
      } else {
        onEnteredFilter('')
      }
    }, 200)

    // check if menu closed, close tags
    if (!isOpen) hideTags()

    return () => {
      clearTimeout(timer)
    }
  }, [enteredFilter, onEnteredFilter, hideTags, isOpen])

  function onInputChangeHandler(e) {
    setEnteredFilter(e.target.value.trim())
    if (enteredFilter === '') {
      setIsFocus(true)
    }
  }

  function onTagClickHandler(e) {
    e.stopPropagation()
    document.querySelector('.navbar-search input').focus()

    if (e.target.classList.contains('tags')) {
      setEnteredFilter('')
      return
    }
    setEnteredFilter(e.target.textContent)
  }

  function onFocusHandler() {
    setIsFocus(true)
  }

  function clearInput() {
    setEnteredFilter('')
    document.querySelector('.navbar-search input').focus()
  }

  return (
    <>
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
          type="button"
          className={classNames({
            clean: true,
            active: enteredFilter.length > 0,
          })}
          onClick={clearInput}
        >
          <Image
            src="/images/clean-icon.svg"
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
        aria-hidden="true"
        onClick={onTagClickHandler}
        onKeyDown={onTagClickHandler}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            aria-hidden="true"
            onClick={(e) => onTagClickHandler(e)}
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  )
})

export default Search
