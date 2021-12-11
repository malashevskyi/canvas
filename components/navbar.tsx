import { Button } from '@chakra-ui/button'
import { Badge, Box, VStack, Link } from '@chakra-ui/layout'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { AutoSizer, List } from 'react-virtualized'
import { MenuIsOpenContext } from '../context/menuIsOpenContext'
import postsData from '../data/canvas2dData'
import Preview from './preview'

const Navbar = ({ canvasNames }) => {
  const location = useRouter()
  const { isOpen } = useContext(MenuIsOpenContext)

  const [thisNavbarIndex] = useState(
    canvasNames.findIndex((el) => el === location.query.id)
  )

  function rowRenderer({ key, index, style }) {
    const name = canvasNames[index]
    if (!name) return null

    const postData = postsData[name]

    const date = `${name?.slice(0, 4)}-${name?.slice(5, 7)}-${name?.slice(
      8,
      10
    )}`
    let imgTitle = ''

    const githubLink = postData.github

    return (
      <Box
        style={style}
        key={key}
        pos="relative"
        pl="10px"
        _before={{
          content: '""',
          pos: 'absolute',
          zIndex: 0,
          w: '100%',
          h: '100%',
          top: 0,
          right: '-10px',
        }}
      >
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
            bottom="27px"
            zIndex={2}
            right={1}
            transform={`translate(${
              location.query.id === name ? '-25px' : 0
            }, 0)`}
          >
            Github
          </Button>
        )}
        <NextLink href={`/canvas2d/${name}`}>
          <Link
            d="block"
            borderLeft="3px solid"
            borderColor={`${
              location.query.id === name ? 'yellow.400' : 'blue.200'
            }`}
            overflow="hidden"
            transform={`translate(${
              location.query.id === name ? '-10px' : 0
            }, 0)`}
          >
            <VStack
              as="h2"
              alignItems="flex-start"
              spacing={1}
              p={1}
              pos="absolute"
              top={0}
              left="0"
              zIndex={2}
              mt="2px"
              ml="2px"
              flexWrap="wrap"
              willChange="transform"
              transition="transform .3s ease"
            >
              {postData.tags.map((tag) => (
                <Box
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
            <Preview
              willChange="transform"
              transition="transform .3s ease"
              title={imgTitle}
              name={name}
            />
            <Badge
              as="time"
              dateTime={date}
              pos="absolute"
              right={1}
              bottom={2}
              letterSpacing="2px"
              fontSize="9px"
              color="gray.600"
              zIndex={2}
            >
              {date.slice(0, 10)}
            </Badge>
          </Link>
        </NextLink>
      </Box>
    )
  }

  return (
    <Box
      pos="fixed"
      top={0}
      right={0}
      zIndex={10}
      h="100vh"
      w="100%"
      maxW={['253px', '253px', '303px']}
      transition="transform .4s ease"
      willChange="transform"
      transform={`translate(${isOpen ? 0 : '100%'}, 0)`}
    >
      <Box h="100vh">
        <Box h="100%">
          <Box overflowY="auto" h="100%" pos="relative" overflowX="hidden">
            <AutoSizer>
              {({ height }) => (
                <List
                  width={300}
                  height={height}
                  rowCount={canvasNames.length}
                  rowHeight={125}
                  rowRenderer={rowRenderer}
                  overscanRowCount={3}
                  scrollToIndex={thisNavbarIndex}
                  scrollToAlignment="start"
                />
              )}
            </AutoSizer>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
