import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import glslData from '../../data/glslData'
import * as canvases from '../../glsl/_index'
import PostLayout from '../../layout/post'
import { mainActions, RootState } from '../../store'
import NotFound from '../404'

type PostProps = {
  id: string
}

const Post: React.FC<PostProps> = ({ id }) => {
  const state = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(mainActions.resetSpinner())

    return () => {
      dispatch(mainActions.resetSpinner())
    }
  }, [])

  useEffect(() => {
    if (!window['timelines']) {
      window['timelines'] = []
    }

    if (!state.root.canvasGL) {
      // const canvas2d = document.getElementById('canvas') as HTMLCanvasElement
      const canvasGL = document.getElementById('canvasGL') as HTMLCanvasElement

      // dispatch(mainActions.setCanvas2D(canvas2d))
      dispatch(mainActions.setCanvasGL(canvasGL))
    }
  }, [])

  const router = useRouter()
  if (!glslData[id]) {
    return <NotFound title="Post" />
  }

  const post = glslData[id]

  if (!post) {
    return <NotFound title="Post" />
  }

  const postTitle = 'Canvas animation №' + post.number
  const postDescription = 'Canvas animation - ' + post.tags.join(' / ')
  const tags = post.tags.join(', ')
  const url = `glsl/${id}`

  return (
    <PostLayout
      postTitle={postTitle}
      postDescription={postDescription}
      tags={tags}
      url={url}
      group="glsl"
      postsData={glslData}
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

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.params) {
    return { props: { id: context.params.id } }
  }

  return { props: {} }
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   if (context.params) {
//     return { props: { id: context.params.id } }
//   }

//   return { props: {} }
// }

export default Post
