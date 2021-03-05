import { createContext, useState, useEffect } from 'react';
import Router from 'next/router';

export const LoadSpinnerContext = createContext();

const LoadSpinnerProvider = ({ children }) => {
  const [spinner, setSpinner] = useState({
    active: true,
    text: '',
  });

  useEffect(() => {
    // Router.events.on('routeChangeStart', (url) => {
    //   console.log(url);
    // });
    Router.events.on('routeChangeComplete', (url) => {
      setSpinner({
        active: false,
        text: '',
      });
    });
  }, []);

  return (
    <LoadSpinnerContext.Provider value={[spinner, setSpinner]}>
      {children}
    </LoadSpinnerContext.Provider>
  );
};

export default LoadSpinnerProvider;
