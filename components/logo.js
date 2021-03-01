import { useContext } from 'react';
import { useRouter } from 'next/router';
import { LoadSpinnerContext } from '../context/loadSpinnerContext';

const Logo = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useContext(LoadSpinnerContext);
  
  const onLogoClickHandler = (e) => {
    e.preventDefault();

    // activate spinner
    setIsActive(true);

    // open index page with delay
    setTimeout(() => {
      router.push("/");
    }, 700);
  }
  
  return (
    <h1 className="title">
      <a href="/" onClick={onLogoClickHandler}>Canvas</a>
    </h1>
  );
};

export default Logo;
