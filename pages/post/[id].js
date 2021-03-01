import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../../layout/main';
import * as canvases from '../../canvases/_index';
import { useGUI } from '../../hooks/useGUI';
import postsData from '../../data/postsData';
import { LoadSpinnerContext } from '../../context/loadSpinnerContext';

const Post = ({ id }) => {
  const [spinner, setSpinner] = useContext(LoadSpinnerContext);
  const router = useRouter();
  const [canvasCheck, setCanvasCheck] = useState('');
  const gui = useGUI();
  let Canvas = null;

  useEffect(() => {
    setSpinner({
      active: false,
      text: ''
    });
    
    return () => {
      setSpinner({
        active: true,
        text: ''
      });
    }
  }, []);

  return (
    <MainLayout>

      {router.query.id && (() => {
        const postName = '_' + id.replace(/-/g, '_');

        if (canvases[postName]) {
          const Canvas = canvases[postName];

          return <Canvas gui={gui} />;
        } else {
          return '';
        }

      })()
      }
    </MainLayout>
  );
};

Post.getInitialProps = (context) => {
  return {
    id: context.query.id,
  }
}

export default Post;
