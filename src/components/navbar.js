import React, { useContext } from 'react';
import classNames from 'classnames';
import { useLocation, Link } from 'react-router-dom';

import Preview from './preview';
import Search from './search';
import { MenuIsOpenContext } from '../context/menuIsOpenContext';
import * as previews from '../images/loadImages';

const postDates = {
  Orbit_2: '2021-01-14',
  Orbit: '2021-01-14',
  CircleOrnament: '2021-01-13',
  Bouquet: '2021-01-12',
  Jelly_2: '2021-01-11',
  Festoon_2: '2021-01-10',
  Festoon: '2021-01-10',
  ParticlesInMouseDirection: '2021-01-09',
  Jelly: '2021-01-08',
  Necklace: '2021-01-07',
  StainedGlass: '2021-01-06',
  StarrySky: '2021-01-05',
  Balls: '2021-01-04',
  ParticlesMoveInACircle: '2021-01-03',
  Firework: '2021-01-02',
};

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
