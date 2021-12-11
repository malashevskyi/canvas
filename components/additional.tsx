import { useDisclosure } from '@chakra-ui/hooks'
import { Box, Center, HStack, VStack, Badge } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import postsData from '../data/canvas2dData'
import useWindowSize from '../hooks/useWindowSize'
import ArrowInfo from './arrowInfo'
import GithubButton from './githubButton'

const Additional = () => {
  const { isOpen, onToggle } = useDisclosure()
  const location = useRouter()
  const windowSize = useWindowSize()

  const post = postsData[location.query.id.toString()]

  const githubLink = post.github
  const credits = post.credits()

  return (
    <>
      <Box
        pos="fixed"
        bottom="0"
        left="0"
        w="100%"
        display={windowSize.height > 320 ? ['none', 'block'] : 'none'}
        zIndex={9999}
        willChange="transform"
        transform={`translate(0, ${isOpen ? 0 : '100%'})`}
        transition="transform .3s ease"
      >
        <Center borderTop="solid 3px" borderColor="blue.300" bg="white" p={6}>
          <ArrowInfo onClick={onToggle} additionalOpen={isOpen} />

          <VStack w="100%" spacing={4}>
            <Box as="h1" fontSize="20px" letterSpacing="1px">
              Canvas animation №{post.number}
            </Box>
            <HStack wrap="wrap" spacing={1}>
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  color="gray.500"
                  letterSpacing="1px"
                  fontSize="11px"
                >
                  {tag}
                </Badge>
              ))}
            </HStack>
            <Box mb="201px">
              {githubLink && <GithubButton link={githubLink} />}
            </Box>
            {credits && (
              <Center borderTop="solid 1px" borderColor="gray.200" w="100%">
                <Box as="h3" letterSpacing="1px" textAlign="center" pt={3}>
                  Credits: <br />
                  {credits}
                </Box>
              </Center>
            )}
          </VStack>
        </Center>
      </Box>
    </>
  )
}

export default Additional
