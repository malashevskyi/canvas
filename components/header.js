

import Logo from './logo';
import GithubLogo from './githubLogo';
import Hamburger from './hamburger';

const Header = ({ menuOpen, onSwitchMenu }) => {  
  return (
    <header className="header">
      <Hamburger menuOpen={menuOpen} onChange={onSwitchMenu} />
      <Logo />
      <GithubLogo />
    </header>
  );
};

export default Header;
