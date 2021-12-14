import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import PostLayout from '../../layout/post'
import * as canvases from '../../glsl/_index'
import glslData from '../../data/glslData'
import { LoadSpinnerContext } from '../../context/loadSpinnerContext'
import NotFound from '../404'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
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

  useEffect(() => {
    if (!window['timelines']) {
      window['timelines'] = []
    }

    if (!globalState.canvas2D) {
      const canvas2d = document.getElementById('canvas') as HTMLCanvasElement
      const canvasGL = document.getElementById('canvasGL') as HTMLCanvasElement
      setGlobalContext({
        ...globalState,
        canvas2D: canvas2d,
      })
      setGlobalContext({
        ...globalState,
        canvasGL: canvasGL,
      })
    }
    console.log(globalState)
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
