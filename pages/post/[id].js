import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import PostLayout from '../../layout/post';
import * as canvases from '../../canvases/_index';
import { useGUI } from '../../hooks/useGUI';
import postsData from '../../data/postsData';
import { LoadSpinnerContext } from '../../context/loadSpinnerContext';
import NotFound from '../404';

const Post = ({ id }) => {
  const [spinner, setSpinner] = useContext(LoadSpinnerContext);
  const router = useRouter();
  const [canvasCheck, setCanvasCheck] = useState('');
  const gui = useGUI();
  
  if (!postsData[id]) {
    return <NotFound title="Post" />
  }
  
  const postTitle = 'Canvas animation №' + postsData[id].number; 
  const postDescription = 'Canvas animation - ' + postsData[id].tags.join(' / '); 
  const tags = postsData[id].tags.join(', '); 
  const url = `post/${id}`; 

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
    <PostLayout
      postTitle={postTitle}
      postDescription={postDescription}
      tags={tags}
      url={url}
    >

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
    </PostLayout>
  );
};

Post.getInitialProps = (context) => {
  return {
    id: context.query.id,
  }
}

export default Post;
