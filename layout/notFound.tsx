import Head from 'next/head';
import LoadSpinner from '../components/loadSpinner';
import MenuIsOpenProvider from '../context/menuIsOpenContext';

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
