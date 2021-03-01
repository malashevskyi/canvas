import { useContext } from 'react';
import classNames from 'classnames';

import { MenuIsOpenContext } from '../context/menuIsOpenContext';

const MenuButton = () => {
  const [isOpen, setIsOpen] = useContext(MenuIsOpenContext);

  return (
    <button
      className="menu-item"
      onClick={() => setIsOpen(!isOpen)}
    >
     Menu
    </button>
  );
};

export default MenuButton;