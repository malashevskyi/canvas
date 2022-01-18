import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as canvases from '../../canvases/_index'
import PostLayout from '../../layout/post'
import { mainActions, RootState } from '../../store'
import NotFound from '../404'
import getPostsData from '../../utils/getPostsData'
import { PostType } from '../../types'

type PostProps = {
  id: string
  postsDataServer: PostType[]
}

const Post: React.FC<PostProps> = ({ id, postsDataServer }) => {
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

    if (!state.root.canvas2D) {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement

      dispatch(mainActions.setCanvas2D(canvas))
    }
  }, [])

  const router = useRouter()
  if (!id) {
    dispatch(mainActions.setSpinner(true))
    return null
  }
  if (!postsDataServer[id]) {
    return <NotFound title="Post" />
  }

  const post = postsDataServer[id]

  if (!post) {
    return <NotFound title="Post" />
  }

  const postTitle = 'Canvas animation №' + post.number
  const postDescription = 'Canvas animation - ' + post.tags.join(' / ')
  const tags = post.tags.join(', ')
  const url = `canvas2d/${id}`

  return (
    <PostLayout
      postTitle={postTitle}
      postDescription={postDescription}
      tags={tags}
      url={url}
      group="canvas2d"
      postsData={postsDataServer}
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
  const data = getPostsData('canvas2dData.json')

  if (context.params) {
    return { props: { id: context.params.id, postsDataServer: data } }
  }

  return { props: {} }
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export default Post
