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
import Header from '../components/header';
import Navbar from '../components/navbar';
import postsData from '../data/postsData';
import Additional from '../components/additional'


const MainLayout = ({ title, children }) => {
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
        <title>{title}</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Potta+One&display=swap"/>
      </Head>
      <MenuIsOpenProvider>
        <Header />
        <Navbar
          filteredCanvasNames={filteredCanvasNames}
          onEnteredFilter={onEnteredFilterHandler}
        />
        {children}
      </MenuIsOpenProvider>
      <Additional />
    </Fragment>
  );
};

export default MainLayout;
