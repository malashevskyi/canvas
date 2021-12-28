import { Box, Link } from '@chakra-ui/react'

export function article(link: string) {
  return (
    <Box>
      Inspired by the
      <Link
        href={link}
        px={1}
        color="blue.400"
        _hover={{ color: 'blue.600' }}
        isExternal
      >
        article
      </Link>
    </Box>
  )
}
export function photoUnsplash(name: string, link: string) {
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
export function video(link: string) {
  return (
    <Box>
      Inspired by the&nbsp;
      <Link
        href={link}
        color="blue.400"
        _hover={{ color: 'blue.600' }}
        isExternal
      >
        video
      </Link>
    </Box>
  )
}
export function codesandbox(link: string) {
  return (
    <Box>
      Inspired by the
      <Link
        href={link}
        px={1}
        color="blue.400"
        _hover={{ color: 'blue.600' }}
        isExternal
      >
        codesandbox
      </Link>
    </Box>
  )
}
export function codepen(link: string) {
  return (
    <Box>
      Inspired by the
      <Link
        href={link}
        px={1}
        color="blue.400"
        _hover={{ color: 'blue.600' }}
        isExternal
      >
        codepen
      </Link>
    </Box>
  )
}
