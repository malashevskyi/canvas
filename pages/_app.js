import { useContext } from 'react';
import '../styles/globals.sass';
import MainLayout from '../layout/main';
import ReactNotification from 'react-notifications-component'
import LoadSpinnerProvider from '../context/loadSpinnerContext';

function MyApp({ Component, pageProps }) {
  return (
    // <React.StrictMode>
    <LoadSpinnerProvider>
      <Component {...pageProps} />
      <ReactNotification />
    </LoadSpinnerProvider>
    // </React.StrictMode>
  );
}

export default MyApp;
