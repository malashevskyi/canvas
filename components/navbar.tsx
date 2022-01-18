import { Box } from '@chakra-ui/layout'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { PostType } from '../types'
import Card from './card'

type NavbarProps = {
  postsData: PostType[]
  group: string
  canvasNames: string[]
}

const Navbar = ({ postsData, group }: NavbarProps) => {
  const state = useSelector((state: RootState) => state)
  const router = useRouter()
  const cardOfCurrentCanvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardOfCurrentCanvasRef) {
      cardOfCurrentCanvasRef.current.scrollIntoView()
    }
  }, [cardOfCurrentCanvasRef])

  return (
    <Box
      pos="fixed"
      top={0}
      right={0}
      zIndex={9999}
      h="100vh"
      w="100%"
      maxW={['253px', '253px', '303px']}
      transition="transform .4s ease"
      willChange="transform"
      transform={`translate(${state.root.menuIsOpen ? 0 : '100%'}, 0)`}
    >
      <Box h="100vh">
        <Box h="100%">
          <Box
            overflowY="auto"
            h="100%"
            pos="relative"
            overflowX="hidden"
            pl="10px"
          >
            {Object.keys(postsData).map((id, index) => {
              const { tags, github } = postsData[id]
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

              const cardProps = {
                id,
                src,
                date,
                tags,
                githubLink: github,
                title: 'Canvas animation - ' + tags.join(', '),
                link: `/${group}/${id}`,
                index,
              }

              if (router.query.id === id) {
                return (
                  <Box ref={cardOfCurrentCanvasRef} key={id}>
                    <Card {...cardProps} />
                  </Box>
                )
              }

              return <Card key={id} {...cardProps} />
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
