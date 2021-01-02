import React from 'react';
import Logo from './logo';
import Hamburger from './hamburger';

const Header = ({ menuOpen, onSwitchMenu }) => {  
  return (
    <header className="header">
      <Hamburger menuOpen={menuOpen} onChange={onSwitchMenu} />
      <Logo />
    </header>
  );
};

export default Header;
