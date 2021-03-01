import { createContext, useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';


export const LoadSpinnerContext = createContext();

const LoadSpinnerProvider = ({ children }) => {
  const [spinner, setSpinner] = useState({
    active: true,
    text: ''
  });
  const router = useRouter();
  
  useEffect(() => {
    // Router.events.on('routeChangeStart', (url) => {});
    Router.events.on('routeChangeComplete', (url) => {
      setSpinner({
        active: false,
        text: ''
      })
    });
  }, []);

  return (
    <LoadSpinnerContext.Provider value={[spinner, setSpinner]}>
      {children}
    </LoadSpinnerContext.Provider>
  );
};

export default LoadSpinnerProvider;