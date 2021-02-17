import React, { useContext } from 'react';
import classNames from 'classnames';
import { useLocation, Link } from 'react-router-dom';
import { List, AutoSizer } from 'react-virtualized';

import Preview from './preview';
import Search from './search';
import { MenuIsOpenContext } from '../context/menuIsOpenContext';
import * as previews from '../images/loadImages';
import postsData from '../data/postsData';
import GithubLink from './githubLink'
import CodePenLink from './codePenLink'

const Navbar = ({
  onEnteredFilter,
  filteredCanvasNames,
}) => {
  const location = useLocation();
  const [isOpen] = useContext(MenuIsOpenContext);

  const mainIndex = filteredCanvasNames.findIndex((i) => i === 'Main');
  if (mainIndex !== -1) filteredCanvasNames.splice(mainIndex, 1);

  function rowRenderer({ key, index, style }) {
    const name = filteredCanvasNames[index];
    if (!name) return;
    
    const postData = postsData[name.slice(1)];

    console.log(postData);
    const date = `${name?.slice(1, 5)}-${name?.slice(5, 7)}-${name?.slice(7, 9)}`;
    let imgTitle = '';
    let titleTags = '';

    const githubLink = postData.github;
    const codePenLink = postData.codePen;

    postData.tags.forEach(tag => {
      titleTags += `/ ${tag} `;
      imgTitle += `${tag} `;
    });
    titleTags = titleTags.slice(1);

    return name === 'Main' ? null : (
      <div
        style={style}
        key={key}
        className={classNames({
          'navbar-menu--item': true,
          active: location.pathname === `/${name.slice(1)}`,
        })}
        // onClick={() => setIsOpen(false)}
      >
        {codePenLink && <CodePenLink link={codePenLink} />}
        {githubLink && <GithubLink link={githubLink} />}
        <Link to={name.slice(1)}>
          <h2 className="navbar-menu--title">
            {titleTags}
          </h2>
          <Preview name={imgTitle} preview={previews[name]} />
          <time dateTime={date}>
            <span>{date}</span>
          </time>
        </Link>
      </div>
    );
  }

  return (
    <div
      className={classNames({
        navbar: true,
        open: isOpen,
      })}
    >
      <div className="navbar--inner">
        <Search onEnteredFilter={onEnteredFilter} />
        <nav className="navbar-menu">
          <div className="navbar-menu--list">
            <AutoSizer>
              {({ height }) => {
                return (
                  <List
                    width={300}
                    height={height}
                    rowCount={filteredCanvasNames.length}
                    rowHeight={125}
                    rowRenderer={rowRenderer}
                    overscanRowCount={3}
                  />
                );
              }}
            </AutoSizer>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
