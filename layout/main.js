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

const MainLayout = ({ title, children }) => {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content="Canvas, animation" />
        <meta name="description" content="Canvas animations" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
        <meta property="og:image" content="/images/main-og.jpg" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        <meta property="og:site_name" content={title} />
        <meta property="og:description" content="Canvas animations" />

        <link rel="apple-touch-icon" sizes="180x180" href={`/favicons/${1}/apple-touch-icon.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`/favicons/${1}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`/favicons/${1}/favicon-16x16.png`} />
        <link rel="manifest" href={`/favicons/${1}/site.webmanifest`} />
      </Head>
      <div className="main">
        {children}
      </div>
      <LoadSpinner />
    </Fragment>
  );
};

export default MainLayout;
