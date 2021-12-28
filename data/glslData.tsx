import { Box, Link } from '@chakra-ui/react'

type PostType = {
  number: number
  tags: Array<string>
  credits: () => null | JSX.Element
  github: string
}

interface PostsType {
  [key: string]: PostType
}

function photoUnsplash(name: string, link: string) {
  return (
    <Box>
      Photo by
      <Link
        href={link}
        px={1}
        color="blue.400"
        _hover={{ color: 'blue.600' }}
        isExternal
      >
        {name}
      </Link>
      on
      <Link
        href="https://unsplash.com"
        px={1}
        color="blue.400"
        _hover={{ color: 'blue.600' }}
        isExternal
      >
        Unsplash
      </Link>
    </Box>
  )
}

const glslData: PostsType = {
  '2021-12-28_2': {
    number: 68,
    tags: ['distortion'],
    credits: () =>
      photoUnsplash(
        'ThisisEngineering RAEng',
        'https://unsplash.com/@thisisengineering'
      ),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/glsl/2021-12-28_2',
  },
  '2021-12-28_1': {
    number: 67,
    tags: ['loop', 'circles'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/glsl/2021-12-28_1',
  },
  '2021-12-27_3': {
    number: 66,
    tags: ['fract', 'scale'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/glsl/2021-12-27_3',
  },
  '2021-12-27_2': {
    number: 65,
    tags: ['spot'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/glsl/2021-12-27_2',
  },
  '2021-12-27_1': {
    number: 64,
    tags: ['random'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/glsl/2021-12-27_1',
  },
}

export default glslData
