import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { LoadSpinnerContext } from '../context/loadSpinnerContext';

import MainLayout from '../layout/main';

const Home = () => {
  const [, setSpinner] = useContext(LoadSpinnerContext);
  const router = useRouter();

  useEffect(() => {
    setSpinner({
      active: true,
      text: 'Loading main page assets. \n Please wait.',
    });

    setTimeout(() => {
      router.push('/');
    }, 500);
  }, [setSpinner, router]);

  return (
    <MainLayout title="Canvas animations">
      <h1>Canvas</h1>
      <h2>Canvas animations</h2>
    </MainLayout>
  );
};

export default Home;
