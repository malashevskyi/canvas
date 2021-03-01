import {
  Fragment,
  useState,
  useEffect,
  useCallback,
} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

import MenuIsOpenProvider from '../context/menuIsOpenContext';
import Navbar from '../components/navbar';
import postsData from '../data/postsData';
import Additional from '../components/additional';
import LoadSpinner from '../components/loadSpinner';
import Menu from '../components/menu';


const PostLayout = ({ title, children, postTitle, postDescription, tags, url }) => {
  function getCanvasNames() {
    const names = Object.keys(postsData);
    return names;
  }
  const [
    filteredCanvasNames,
    setFilteredCanvasNames,
  ] = useState(getCanvasNames);
  const [allCanvasNames] = useState(getCanvasNames);
  const router = useRouter();

  const onEnteredFilterHandler = useCallback((filter) => {
    if (!filter.length) {
      setFilteredCanvasNames(Object.keys(postsData));
      return;
    }

    const newFilteredCanvas = [];
    Object.keys(postsData).forEach((name) => {
      if (name !== 'Main') {
        const postsTags = postsData[name].tags;

        for (let i = 0; i < postsTags.length; i++) {
          const tag = postsTags[i];
          if (tag.toLowerCase().includes(filter)) {
            newFilteredCanvas.push(name);
            continue;
          }
        }
      }
    });
    setFilteredCanvasNames(newFilteredCanvas);
  }, []);

  return (
    <Fragment>
      <Head>
        <title>{postTitle}</title>
        <meta name="keywords" content={`Canvas, animation, ${tags}`} />
        <meta name="description" content={postDescription} />
        <meta property="og:title" content={postTitle} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`/${url}`} />
        <meta property="og:image" content="/images/main-og.jpg" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        <meta property="og:site_name" content={postTitle} />
        <meta property="og:description" content={postDescription} />
        
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Potta+One&display=swap"/>
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
    </Fragment>
  );
};

export default PostLayout;
