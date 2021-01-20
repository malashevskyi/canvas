import React, { useContext } from 'react';
import classNames from 'classnames';
import { useLocation, Link } from 'react-router-dom';
import { List, AutoSizer } from 'react-virtualized';

import Preview from './preview';
import Search from './search';
import { MenuIsOpenContext } from '../context/menuIsOpenContext';
import * as previews from '../images/loadImages';
import postDates from '../data/postDates';

const Navbar = ({
  onEnteredFilter,
  filteredCanvasNames,
}) => {
  const location = useLocation();
  const [isOpen] = useContext(MenuIsOpenContext);

  function rowRenderer({ key, index, style }) {
    const name = filteredCanvasNames[index];
    return (
      <div
        style={style}
        key={key}
        className={classNames({
          'navbar-menu--item': true,
          active: location.pathname === `/${name}`,
        })}
        // onClick={() => setIsOpen(false)}
      >
        <Link to={name}>
          <h2 className="navbar-menu--title">{name}</h2>
          <Preview name={name} preview={previews[name]} />
          <time dateTime={postDates[name]}>
            <span>{postDates[name]}</span>
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
