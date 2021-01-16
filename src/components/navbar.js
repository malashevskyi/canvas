import React, { useContext } from 'react';
import classNames from 'classnames';
import { useLocation, Link } from 'react-router-dom';

import Preview from './preview';
import Search from './search';
import { MenuIsOpenContext } from '../context/menuIsOpenContext';
import * as previews from '../images/loadImages';
import postDates from '../data/postDates';

const Navbar = ({ onEnteredFilter, filteredCanvasNames }) => {
  const location = useLocation();
  const [isOpen] = useContext(MenuIsOpenContext);

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
          <ul className="navbar-menu--list">
            {filteredCanvasNames.map((name) => {
              return (
                <li
                  className={classNames({
                    'navbar-menu--item': true,
                    active: location.pathname === `/${name}`,
                  })}
                  key={name}
                  // onClick={() => setIsOpen(false)}
                >
                  <Link to={name}>
                    <h2 className="navbar-menu--title">{name}</h2>
                    <Preview name={name} preview={previews[name]} />
                    <time dateTime={postDates[name]}>
                      <span>{postDates[name]}</span>
                    </time>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
