import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import PostLayout from '../../layout/post'
import * as canvases from '../../canvases/_index'
import postsData from '../../data/postsData'
import { LoadSpinnerContext } from '../../context/loadSpinnerContext'
import NotFound from '../404'
import { GetServerSideProps } from 'next'
import { GlobalContext } from '../../context/globalContext'

type PostProps = {
  id: string
}

const Post: React.FC<PostProps> = ({ id }) => {
  const { dispatch: setSpinner } = useContext(LoadSpinnerContext)
  const { state: globalState, dispatch: setGlobalContext } =
    useContext(GlobalContext)

  useEffect(() => {
    setSpinner({
      active: false,
      text: '',
    })

    return () => {
      setSpinner({
        active: true,
        text: '',
      })
    }
  }, [setSpinner])

  // remove react-virtualized errors, seems it isn't supported anymore...
  useEffect(() => {
    console.clear()
  }, [])

  useEffect(() => {
    if (!window['timelines']) {
      window['timelines'] = []
    }

    if (!globalState.canvas2D) {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement
      setGlobalContext({
        ...globalState,
        canvas2D: canvas,
      })
    }
    console.log(globalState)
  }, [])

  const router = useRouter()
  if (!postsData[id]) {
    return <NotFound title="Post" />
  }

  const post = postsData[id]

  if (!post) {
    return <NotFound title="Post" />
  }

  const postTitle = 'Canvas animation №' + post.number
  const postDescription = 'Canvas animation - ' + post.tags.join(' / ')
  const tags = post.tags.join(', ')
  const url = `post/${id}`

  return (
    <PostLayout
      postTitle={postTitle}
      postDescription={postDescription}
      tags={tags}
      url={url}
    >
      {router.query.id &&
        (() => {
          const postName = '_' + id.replace(/-/g, '_')

          if (canvases[postName]) {
            const Canvas = canvases[postName]

            return <Canvas />
          }
          return ''
        })()}
    </PostLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params) {
    return { props: { id: context.params.id } }
  }

  return { props: {} }
}

export default Post
