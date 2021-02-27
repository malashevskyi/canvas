import React from 'react';
import '../styles/globals.sass';
import MainLayout from '../layout/main';
import ReactNotification from 'react-notifications-component'

function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <Component {...pageProps} />
      <ReactNotification />
    </React.StrictMode>
  );
}

export default MyApp;
