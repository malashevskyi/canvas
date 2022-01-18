import { Badge, VStack, Box, Link, Button } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { mainActions } from '../store'
import Preview from './preview'

const Card = ({ date, tags, link, id, title, src, githubLink }) => {
  const router = useRouter()

  const dispatch = useDispatch()

  const onCardClickHandler = (e) => {
    e.preventDefault()
    const text = 'Loading data for all canvases. \n Please wait.'
    dispatch(mainActions.setSpinner(text))
    router.push(link)
  }

  return (
    <Box pos="relative">
      {githubLink && (
        <Button
          as={Link}
          href={githubLink}
          isExternal
          fontSize="11px"
          p={1}
          borderRadius="3px"
          h="20px"
          pos="absolute"
          bottom="20px"
          zIndex={2}
          right={1}
          transform={`translate(${
            router.query.id === id ? '-15px' : '-5px'
          }, 0)`}
        >
          Github
        </Button>
      )}
      <NextLink href={link}>
        <Link
          m={1}
          w="100%"
          pos="relative"
          display="block"
          onClick={onCardClickHandler}
          borderLeft="3px solid"
          borderColor={`${router.query.id === id ? 'yellow.400' : 'blue.200'}`}
          overflow="hidden"
          transform={`translate(${router.query.id === id ? '-10px' : 0}, 0)`}
        >
          <VStack
            as="h2"
            alignItems="flex-start"
            spacing={1}
            p={1}
            pos="absolute"
            top={0}
            left="0"
            zIndex={1}
            mt="2px"
            ml="2px"
            flexWrap="wrap"
            willChange="transform"
            transition="transform .3s ease"
          >
            {tags.map((tag) => (
              <Box
                key={tag}
                color="blue.500"
                fontSize="11px"
                textTransform="uppercase"
                letterSpacing="1px"
                fontWeight="600"
                bg="white"
                px={1}
                borderRadius="2px"
              >
                {tag}
              </Box>
            ))}
          </VStack>
          <Badge
            as="time"
            dateTime={date}
            pos="absolute"
            right={1}
            bottom={1}
            letterSpacing="2px"
            fontSize="9px"
            color="gray.600"
            zIndex={1}
          >
            {date.slice(0, 10)}
          </Badge>
          <Preview src={src} name={id} title={title} />
        </Link>
      </NextLink>
    </Box>
  )
}

export default Card
