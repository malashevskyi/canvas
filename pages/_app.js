import { useEffect } from 'react';
import '../styles/globals.sass';
import ReactNotification from 'react-notifications-component';
import { useRouter } from 'next/router';

import LoadSpinnerProvider from '../context/loadSpinnerContext';
import postsData from '../data/postsData';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const { id } = router.query;
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
      if (!postsData[id]) hideCanvas();
      // if the post exists
      if (postsData[id]) showCanvas();
    } else {
      // hide canvas on all other urls
      hideCanvas();
    }
  });

  return (
    <LoadSpinnerProvider>
      {/* eslint-disable-next-line */}
      <Component {...pageProps} />
      <ReactNotification />
    </LoadSpinnerProvider>
  );
}

export default MyApp;
