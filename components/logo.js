import { useContext } from 'react';
import { useRouter } from 'next/router';
import { LoadSpinnerContext } from '../context/loadSpinnerContext';

const Logo = () => {
  const router = useRouter();
  const [, setSpinner] = useContext(LoadSpinnerContext);

  const onLogoClickHandler = (e) => {
    e.preventDefault();

    // activate spinner
    setSpinner({
      active: true,
      text: 'Loading main page assets. \n Please wait.',
    });

    // open index page with delay
    setTimeout(() => {
      router.push('/');
    }, 700);
  };

  return (
    <a href="/" className="menu-item" onClick={onLogoClickHandler}>
      <h1>All animations</h1>
    </a>
  );
};

export default Logo;
