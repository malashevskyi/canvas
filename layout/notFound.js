import Head from 'next/head';

import MenuIsOpenProvider from '../context/menuIsOpenContext';
import LoadSpinner from '../components/loadSpinner';

const NotFoundLayout = ({ title, children }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <LoadSpinner />
    <MenuIsOpenProvider>{children}</MenuIsOpenProvider>
  </>
);

export default NotFoundLayout;
