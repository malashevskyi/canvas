import React from 'react';
import Logo from './logo';
import Hamburger from './hamburger';

const Header = ({ menuOpen, onSwitchMenu }) => {  
  return (
    <header className="header">
      <Logo />
      <Hamburger menuOpen={menuOpen} onChange={onSwitchMenu} />
    </header>
  );
};

export default Header;
