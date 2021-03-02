import { useEffect } from 'react';
import '../styles/globals.sass';
import ReactNotification from 'react-notifications-component';
import LoadSpinnerProvider from '../context/loadSpinnerContext';
import { useRouter } from 'next/router';
import postsData from '../data/postsData';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const canvasContainer = document.querySelector('body > .container');

    const hideCanvas = () => {
      canvasContainer.setAttribute(
        'style',
        'opacity: 0; width: 0; height: 0; z-index: -1;'
      );
    };
    const showCanvas = () => {
      canvasContainer.removeAttribute('style');
    };

    if (router.pathname === '/post/[id]') {
      // if the post is not found
      if (!postsData[router.query.id]) hideCanvas();
      // if the post exists
      if (postsData[router.query.id]) showCanvas();
    } else {
      // hide canvas on all other urls
      hideCanvas();
    }
  });

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
