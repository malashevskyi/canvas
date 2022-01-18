import { Flex } from '@chakra-ui/react'
import { FeedDataType } from '../types'
import Card from './card'

type CardsProps = {
  posts: FeedDataType[]
  group: string
}

const Cards: React.FC<CardsProps> = ({ posts, group }) => {
  return (
    <Flex align="center" justify="center" wrap="wrap">
      {posts.map(({ id, title, tags }, index) => {
        const date = id.slice(0, 10)
        let src = ''

        if (group === 'canvas2d') {
          src = `/images/previews/${id}.png`
        } else if (group === 'glsl') {
          src = `/images/glsl-previews/${id}.png`
        } else if (group === 'three') {
          src = `/images/three-previews/${id}.png`
        } else if (group === 'samples') {
          src = `/images/samples-previews/${id}.png`
        }
        return (
          <Card
            key={id}
            id={id}
            title={title}
            tags={tags}
            link={`/${group}/${id}`}
            date={date}
            src={src}
            githubLink={null}
            index={index}
          />
        )
      })}
    </Flex>
  )
}

export default Cards
