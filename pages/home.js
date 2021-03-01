import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import LoadSpinner from '../components/loadSpinner';
import { LoadSpinnerContext } from '../context/loadSpinnerContext';


const Index = ({ comments, postsData }) => {
  const [spinner, setSpinner] = useContext(LoadSpinnerContext);
  const router = useRouter();

  useEffect(() => {
    setSpinner({
      active: true,
      text: 'Loading main page assets. \n Please wait.'
    });

    setTimeout(() => {
      router.push("/");
    }, 500);
  }, [])

  return (
    <div>
      <LoadSpinner />
      <h1>Canvas</h1>
      <h2>Canvas animations</h2>
    </div>
  );
};

export default Index;
