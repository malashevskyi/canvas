import { GetStaticProps } from 'next'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Cards from '../../components/cards'
import MainLayout from '../../layout/main'
import { mainActions } from '../../store'
import { FeedDataType } from '../../types'
import getFeedPostsData from '../../utils/getFeedPostsData'

type IndexProps = {
  postsDataServer: FeedDataType[]
}

const Index: React.FC<IndexProps> = ({ postsDataServer }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(mainActions.resetSpinner())
  }, [])

  const posts = Object.keys(postsDataServer).map((key) => postsDataServer[key])

  return (
    <MainLayout title="Canvas animations">
      <Cards posts={posts} group="glsl" />
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = getFeedPostsData('glslData.json')

  return {
    props: { postsDataServer: data },
  }
}

export default Index
