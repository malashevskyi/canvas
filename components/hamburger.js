import { useContext } from 'react';
import classNames from 'classnames';

import { MenuIsOpenContext } from '../context/menuIsOpenContext';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useContext(MenuIsOpenContext);

  return (
    <div
      className={classNames({
        hamb: true,
        open: isOpen,
      })}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="hamb--bar"></div>
      <div className="hamb--bar"></div>
      <div className="hamb--bar"></div>
    </div>
  );
};

export default Hamburger;