import React, { useEffect, useContext } from 'react';
import classNames from 'classnames';
import { useLocation, Link } from 'react-router-dom';

import Preview from './preview';
import Search from './search';
import { MenuIsOpenContext } from '../context/menuIsOpenContext';

const postDates = {
  Test: '2021-01-01'
};

const Navbar = ({ onEnteredFilter, filteredCanvasNames }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useContext(MenuIsOpenContext);

  useEffect(() => {
    console.log('Navbar is Open', isOpen);
  });
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
            {filteredCanvasNames.map(name => {
              return (
                <li
                  className={classNames({
                    'navbar-menu--item': true,
                    active: location.pathname === `/${name}`,
                  })}
                  key={name}
                  onClick={() => setIsOpen(false)}
                >
                  <Link to={name}>
                    <h2 className="navbar-menu--title">{name}</h2>
                    <Preview name={name} />
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
