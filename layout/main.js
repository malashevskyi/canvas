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
      </Head>
      <div className="main">
        {children}
      </div>
      <LoadSpinner />
    </Fragment>
  );
};

export default MainLayout;
