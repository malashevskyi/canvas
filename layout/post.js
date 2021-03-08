import Head from 'next/head';
import { useCallback, useState } from 'react';
import Additional from '../components/additional';
import LoadSpinner from '../components/loadSpinner';
import Menu from '../components/menu';
import Navbar from '../components/navbar';
import MenuIsOpenProvider from '../context/menuIsOpenContext';
import postsData from '../data/postsData';

const PostLayout = ({
  children,
  postTitle,
  postDescription,
  tags,
  url,
  faviconIndex,
}) => {
  function getCanvasNames() {
    const names = Object.keys(postsData);
    return names;
  }
  const [filteredCanvasNames, setFilteredCanvasNames] = useState(
    getCanvasNames
  );

  const onEnteredFilterHandler = useCallback((filter) => {
    if (!filter.length) {
      setFilteredCanvasNames(Object.keys(postsData));
      return;
    }

    const newFilteredCanvas = [];
    Object.keys(postsData).forEach((name) => {
      const postsTags = postsData[name].tags;

      for (let i = 0; i < postsTags.length; i++) {
        const tag = postsTags[i];
        if (tag.toLowerCase().includes(filter)) {
          newFilteredCanvas.push(name);
        }
      }
    });
    setFilteredCanvasNames(newFilteredCanvas);
  }, []);

  return (
    <>
      <Head>
        <title>{postTitle}</title>
        <meta name="keywords" content={`Canvas, animation, ${tags}`} />
        <meta name="description" content={postDescription} />
        <meta property="og:title" content={postTitle} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://canvas-phi-fawn.vercel.app/${url}`}
        />
        <meta
          property="og:image"
          content="https://canvas-phi-fawn.vercel.app/images/post-og.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content={postTitle} />
        <meta property="og:description" content={postDescription} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`/favicons/${faviconIndex}/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`/favicons/${faviconIndex}/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`/favicons/${faviconIndex}/favicon-16x16.png`}
        />
        <link
          rel="manifest"
          href={`/favicons/${faviconIndex}/site.webmanifest`}
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Potta+One&display=swap"
        />
      </Head>
      <LoadSpinner />
      <MenuIsOpenProvider>
        <Navbar
          filteredCanvasNames={filteredCanvasNames}
          onEnteredFilter={onEnteredFilterHandler}
        />
        {children}
        <Menu />
      </MenuIsOpenProvider>
      <Additional />
    </>
  );
};

export default PostLayout;
